import math
import os
import json
import requests
from time import sleep
import sys
import time
from shapely.geometry import Point, Polygon
from PIL import Image
from xml.etree.ElementTree import Element, SubElement, tostring
import cairosvg

data = {}

placeholder = "###DATASET###"
heightAPIs = {
    "api.opentopodata.org": {
        "name": "api.opentopodata.org",
        "url_base": f"https://api.opentopodata.org/v1/{placeholder}?locations=",
        "datasets": ["nzdem8m", "ned10m", "eudem25m", "aster30m", "etopo1"], #new zeland, usa, europe, world, world+bathymetry+glaciers - see https://www.opentopodata.org/#public-api
        "url": None,
        "rateLimit": 1,
        "requestLimit": 100,
        "available": True
    },
    "localhost": {
        "name": "localhost",
        "url_base": f"http://127.0.0.1:5000/v1/{placeholder}?locations=",
        "datasets": ["nzdem8m", "ned10m", "eudem25m", "aster30m", "etopo1"], #new zeland, usa, europe, world, world+bathymetry+glaciers - see https://www.opentopodata.org/#public-api
        "url": None,
        "rateLimit": 0.000000001,
        "requestLimit": 100,
        "available": True
    }
}

def progressbar(progress, start, prefix="", size=100, out=sys.stdout):
    hours, r = divmod(((time.time()-start)/progress)*(1-progress), 3600)
    mins, sec = divmod(r, 60)
    if int(hours) > 0:
        time_str = f"{int(hours)}h {int(mins)}m {round(sec,1)}s "
    elif int(mins) > 0:
        time_str = f"{int(mins)}m {round(sec,1)}s    "
    else:
        time_str = f"{round(sec,1)}s    "
    print(f"{prefix}[{u"█"*int(size*progress)}{(" "*int(size*(1-progress)))}] {round(progress*100,1)}% ETE {time_str}", end="\r", file=out, flush=True)
    if progress == 1:
        print("\n", flush=True, file=out)

def to_coords(lon, lat, bbox_norm, scale):
    x = (lon - bbox_norm[1]) / scale
    y = (bbox_norm[2] - lat) / scale
    return (x, y)

def getBounds(bbox_norm, scale):
    global data

    bounds_geom = []
    if "bounds" in data and data["bounds"]:
        # bounds mask
        segments = []
        for member in data["bounds"][0]["members"]:
            if "geometry" in member:
                seg = [to_coords(p["lon"], p["lat"], bbox_norm, scale) for p in member["geometry"]]
                segments.append(seg)

        polygons = []
        while segments:
            polygon = segments.pop(0)
            changed = True
            while changed:
                changed = False
                for i, seg in enumerate(segments):
                    if polygon[-1] == seg[0]:
                        polygon.extend(seg[1:])
                        segments.pop(i)
                        changed = True
                        break
                    elif polygon[-1] == seg[-1]:
                        polygon.extend(reversed(seg[:-1]))
                        segments.pop(i)
                        changed = True
                        break
                    elif polygon[0] == seg[-1]:
                        polygon = seg[:-1] + polygon
                        segments.pop(i)
                        changed = True
                        break
                    elif polygon[0] == seg[0]:
                        polygon = list(reversed(seg[1:])) + polygon
                        segments.pop(i)
                        changed = True
                        break

            if polygon[0] != polygon[-1]:
                polygon.append(polygon[0])

            polygons.append(polygon)

        bounds_geom = polygons
    
    return bounds_geom

def downloadOSM(id, bbox):
    global data

    def query_osm(filter, id, bbox):
        queryOSM = f"""
        [out:json];
        {"area(" + str(id) + ")->.searchArea;" if id else ""}
        (
        way({"area.searchArea" if id else bbox}){filter};
        relation({"area.searchArea" if id else bbox}){filter};
        );
        out geom;
        """
        response = requests.post("https://overpass-api.de/api/interpreter", data={"data": queryOSM})
        sleep(10)
        return response.json()

    #queryOSM
    filters = {
        "nature1": "[\"landuse\"~\"allotments|farmland|farmyard|paddy|animal_keeping|flowerbed|forest|logging|greenhouse_horticulture|meadow|orchard|plant_nursery|vineyard|grass|greenfield\"][\"landuse\"!~\"aquaculture|basin|salt_pond|greenery\"]",
        "nature2": "[\"leisure\"~\"dog_park|garden|nature_reserve|park|playground\"][\"leisure\"!~\"disc_golf_course|firepit|fishing|horse_riding|marina|miniature_golf|picnic_table|pitch|slipway|summer_camp|swimming_area\"]",
        "nature3": "[\"natural\"~\"fell|grassland|heath|moor|scrub|shrubbery|tundra|wood|beach|glacier|mud|water|bare_rock|sand\"][\"natural\"!~\"tree|tree_row|bay|blowhole|cape|coastline|crevasse|geyser|hot_spring|isthmus|peninsula|reef|shingle|shoal|spring|strait|wetland|arch|arete|blockfield|cave_entrance|cliff|dune|earth_bank|fumarole|hill|peak|ridge|rock|saddle|scree|sinkhole|stone|valley|volcano\"]",
        "water": "[\"waterway\"~\"river|riverbank|stream|tidal_channel|canal|drain|ditch\"][\"waterway\"!~\"pressurised|fairway|dock|boatyard|dam|weir|waterfall|lock_gate|soakhole|turning_point|water_point|fuel\"]",
        "roads_pedestrian": "[\"highway\"~\"pedestrian|track|bridleway|path|cycleway\"]",
        "buildings": "[\"building\"~\"apartments|barracks|bungalow|cabin|detached|annexe|dormitory|farm|ger|hotel|house|residential|semidetached_house|stilt_house|terrace|trullo|commercial|industrial|office|retail|supermarket|warehouse|religious|cathedral|chapel|church|kingdom_hall|monastery|mosque|presbytery|synagogue|temple|civic|college|fire_station|government|gatehouse|hospital|kindergarten|museum|public|school|train_station|transportation|university|barn|conservatory|cowshed|farm_auxiliary|greenhouse|stable|livestock|grandstand|pavilion|riding_hall|sports_hall|sports_centre|stadium|allotment_house|hangar|hut|garage|garages|parking|transformer_tower|water_tower|silo|castle|military|pagoda|tower|triumphal_arch|windmill|yes\"][\"building\"!~\"houseboat|static_caravan|tree_house|kiosk|shrine|bakehouse|bridge|toilets|slurry_tank|sty|boathouse|shed|carport|digester|service|tech_cab|storage_tank|beach_hut|bunker|construction|container|guardhouse|outbuilding|quonset_hut|roof|ruins|ship|tent\"]",
        "roads_big": "[\"highway\"~\"motorway|trunk|motorway_link|trunk_link|raceway\"]",
        "roads_medium": "[\"highway\"~\"primary|secondary|primary_link|secondary_link\"]",
        "roads_small": "[\"highway\"~\"tertiary|unclassified|residential|tertiary_link|living_street|service|road|busway\"]"
    }
    #import osm
    print("Loading OSM data...")
    responses = {}
    i = 1
    start = time.time()
    for key, filter in filters.items():
        responses[key] = query_osm(filter, id, bbox)
        progressbar(i/len(filters), start)
        i += 1
    if id:
        queryOSM = f"""
        [out:json];
        relation({id - 3600000000});
        out geom;
        """
        response = requests.post("https://overpass-api.de/api/interpreter", data={"data": queryOSM})
        responses["bounds"] = response.json()

    data["nature"] = responses["nature1"]["elements"] + responses["nature2"]["elements"] + responses["nature3"]["elements"]
    data["water"] = responses["water"]["elements"]
    data["buildings"] = responses["buildings"]["elements"]
    data["roads_big"] = responses["roads_big"]["elements"]
    data["roads_medium"] = responses["roads_medium"]["elements"]
    data["roads_small"] = responses["roads_small"]["elements"]
    data["roads_pedestrian"] = responses["roads_pedestrian"]["elements"]
    if id:
        data["bounds"] = responses["bounds"]["elements"]

def downloadTerrain(bbox, bbox_norm, api, scale, size, bounds_geom):
    global data
    
    def get(api, coordinates):
        start = time.time()
        limit = api["requestLimit"]
        c = ""
        r = None
        count_prev = 0
        count = 0
        while count < len(coordinates):
            c = "|".join(f"{str(round(float(coordinate[0]),4))},{str(round(float(coordinate[1]),4))}" for coordinate in coordinates[count:count+limit])
            count_prev = count
            count += limit
            url = api["url"]
            r2 = requests.get(f"{url}{c}")
            sleep(api["rateLimit"])
            if len(coordinates) > limit:
                progressbar(min(count, len(coordinates))/len(coordinates), start)
            if r2.status_code != 200:
                print("An error occurred, a part of height data is not available, will be set to a default value")
                r2 = {}
                r2["results"] = [{"lat": coordinate[0], "lon": coordinate[1], "elevation": float("+inf")} for coordinate in coordinates[count_prev:count]]
            else:
                r2 = r2.json()
            if r == None:
                r = r2
            else:
                r["results"] += r2["results"]
        return r

    def reliableGet(api, coordinates):
        r = get(api, coordinates)
        initial_count_inf = count_inf = len(list(filter(lambda x: x == float("+inf"), [h["elevation"] for h in r["results"]])))
        if initial_count_inf != 0:
            print("Fixing height data is not available, might take some time")
            start = time.time()
        while count_inf != 0:
            for k in range(len(r["results"])):
                if r["results"][k]["elevation"] == float("+inf"):
                    r2 = get(api, [(r["results"][k]["lat"], r["results"][k]["lon"])])
                    r["results"][k]["elevation"] = r2["results"][0]["elevation"]
            count_inf = len(list(filter(lambda x: x == float("+inf"), [h["elevation"] for h in r["results"]])))
            progressbar(1-count_inf/initial_count_inf, start)
        return r

    print("Loading terrain data...")
    #create grid
    lat_m_per_deg = 111132.92 - 559.82*math.cos(2*math.radians((bbox_norm[0] + bbox_norm[2]) / 2)) + 1.175*math.cos(4*math.radians((bbox_norm[0] + bbox_norm[2]) / 2)) - 0.0023*math.cos(6*math.radians((bbox_norm[0] + bbox_norm[2]) / 2))
    lon_m_per_deg = 111412.84*math.cos(math.radians((bbox_norm[0] + bbox_norm[2]) / 2)) - 93.5*math.cos(2.0*math.radians((bbox_norm[0] + bbox_norm[2]) / 2)) + 0.118*math.cos(4.0*math.radians((bbox_norm[0] + bbox_norm[2]) / 2))
    lat_step = scale * (1/lat_m_per_deg)
    lon_step = scale * (1/lon_m_per_deg)
    h = int(round((bbox_norm[2] - bbox_norm[0]) / scale))
    w = int(round((bbox_norm[3] - bbox_norm[1]) / scale))

    if bounds_geom:
        shapely_polygons = [Polygon(poly) for poly in bounds_geom]
        
        grid = [[(0, 0, 0) for i in range(size)] for j in range(size)]

        coordinates = []
        for i in range(h):
            lat = bbox[0] + i * lat_step
            for j in range(w):
                lon = bbox[1] + j * lon_step
                p = Point((j, h - i))
                if any(poly.contains(p) for poly in shapely_polygons):
                    grid[size - h + i][j] = (lat, lon, 0)
                    coordinates.append((lat, lon))

        response = reliableGet(api, coordinates)

        k = 0
        min_h = float("+inf")
        max_h = float("-inf")
        for i in range(h):
            lat = bbox[0] + i * lat_step
            for j in range(w):
                lon = bbox[1] + j * lon_step
                p = Point((j, h - i))
                if any(poly.contains(p) for poly in shapely_polygons):
                    elevation = response["results"][k]["elevation"]
                    if elevation is None:
                        elevation = 0
                    min_h = min(min_h, elevation)
                    max_h = max(max_h, elevation)
                    grid[size - h + i][j] = (lat, lon, elevation)
                    k += 1
    else:
        grid = [[(0, 0, 0) for i in range(size)] for j in range(size)]
        for i in range(h):
            lat = bbox[0] + i * lat_step
            for j in range(w):
                lon = bbox[1] + j * lon_step
                grid[size - h + i][j] = (lat, lon, 0)

        coordinates = [grid[size - h + i][j] for i in range(h) for j in range(w)]

        response = reliableGet(api, coordinates)

        k = 0
        min_h = float("+inf")
        max_h = float("-inf")
        for i in range(h):
            for j in range(w):
                lat, lon, _ = grid[i][j]
                elevation = response["results"][k]["elevation"]
                if elevation is None:
                    elevation = 0
                min_h = min(min_h, elevation)
                max_h = max(max_h, elevation)
                grid[size - h + i][j] = (lat, lon, elevation)
                k += 1

    data["terrain"] = grid
    data["terrain_min_h"] = min_h
    data["terrain_max_h"] = max_h

def generateColor(scale, textureSize, tiles, bbox_norm, city, bounds_geom):
    global data
    
    def draw_geometry(geometry, style, parent, scale):
        pts = [to_coords(p["lon"], p["lat"], bbox_norm, scale) for p in geometry]
        pts_str = " ".join(f"{x:.2f},{y:.2f}" for (x,y) in pts)
        if len(geometry) >= 3 and geometry[0] == geometry[-1]:
            attrib = {
                "points": pts_str,
                "stroke-linejoin": "round",
                "stroke-linecap": "round"
            }
            if style["fill"] != "none":
                attrib["fill"] = style["fill"]
                attrib["stroke"] = style["stroke"]
                attrib["stroke-width"] = str(style["stroke_width"])
            else:
                attrib["fill"] = "none"
                attrib["stroke"] = style["stroke"]
                attrib["stroke-width"] = str(style["stroke_width"])
            SubElement(parent, "polygon", attrib)
        else:
            attrib = {
                "points": pts_str,
                "fill": "none",
                "stroke": style["stroke"],
                "stroke-width": str(style["stroke_width"]),
                "stroke-linejoin": "round",
                "stroke-linecap": "round"
            }
            SubElement(parent, "polyline", attrib)

    print("Generating color image...")
    # create svg
    svg = Element("svg", {
        "xmlns": "http://www.w3.org/2000/svg",
        "version": "1.1",
        "width": str(textureSize * tiles),
        "height": str(textureSize * tiles),
        "viewBox": f"0 0 {textureSize * tiles} {textureSize * tiles}"
    })

    defs = SubElement(svg, "defs")
    clip = SubElement(defs, "clipPath", {"id": "boundsClip"})

    if bounds_geom:
        for poly in bounds_geom:
            pts_str = " ".join(f"{x:.2f},{y:.2f}" for (x,y) in poly)
            SubElement(clip, "polygon", {"points": pts_str})

    group = SubElement(svg, "g", {"clip-path": "url(#boundsClip)"})

    SubElement(group, "rect", {
        "x": "0", "y": "0", "width": str(textureSize * tiles), "height": str(textureSize * tiles),
        "fill": "rgb(127,127,127)"
    })

    layer_styles = {
        "nature": {"fill": "rgb(0,255,0)", "stroke": "none", "stroke_width": 0},
        "water": {"fill": "none", "stroke": "rgb(0,0,255)", "stroke_width": 1/scale},
        "buildings": {"fill": "rgb(255,255,255)", "stroke": "none", "stroke_width": 0},
        "roads_big": {"fill": "none", "stroke": "rgb(0,0,0)", "stroke_width": 12/scale},
        "roads_medium": {"fill": "none", "stroke": "rgb(0,0,0)", "stroke_width": 6/scale},
        "roads_small": {"fill": "none", "stroke": "rgb(0,0,0)", "stroke_width": 3/scale},
        "roads_pedestrian": {"fill": "none", "stroke": "rgb(140,76,0)", "stroke_width": 1/scale}
    }

    for key, items in data.items():
        if key == "terrain" or key == "terrain_min_h" or key == "terrain_max_h" or key == "bounds":
            continue
        style = layer_styles.get(key)
        for element in items:
            if element.get("type") == "way" and "geometry" in element:
                draw_geometry(element["geometry"], style, group, scale)
            elif element.get("type") == "relation":
                for member in element.get("members", []):
                    if "geometry" in member:
                        draw_geometry(member["geometry"], style, group, scale)

    # svg to png
    cairosvg.svg2png(bytestring=tostring(svg, encoding="utf-8", xml_declaration=True).decode("utf-8"), write_to=os.path.join("public/assets/citiesguesser", f"{city}_color.png"))

def generateDisplacement(textureSize, tiles, city):
    global data

    print("Generating displacement image...")
    # elevation to grayscale
    img_displacement = Image.new("L", (textureSize * tiles, textureSize * tiles), (0))
    pixels = img_displacement.load()
    for i in range(textureSize * tiles):
        for j in range(textureSize * tiles):
            pixels[j, textureSize * tiles - 1 - i] = int(255 * data["terrain"][i][j][2] / (data["terrain_max_h"] - data["terrain_min_h"]))
    
    img_displacement.save(os.path.join("public/assets/citiesguesser", f"{city}_displacement.png"))

def generateJson(scale, textureSize, tiles, city):
    global data

    print("Generating json data...")
    # optimize data
    data_opt = {}
    # buildings = []
    # for element in data["buildings"]:
    #     geometry = None
    #     if element["type"] == "way":
    #         if "geometry" in element:
    #             geometry = [(p["lat"], p["lon"]) for p in element["geometry"]]
    #     elif element["type"] == "relation":
    #         geometry = []
    #         for m in element["members"]:
    #             if "geometry" in m:
    #                 g = [(p["lat"], p["lon"]) for p in m["geometry"]]
    #                 geometry.append(g)
    #     if geometry:
    #         buildings.append({"type": element["type"], "bounds": element["bounds"], "height": element.get("tags", {}).get("height", "3 m").split(" m")[0].split("m")[0], "geometry": geometry})

    # data_opt["buildings"] = buildings

    terrain = {"scale": scale, "textureSize": textureSize, "tiles": tiles, "bounds": {"minlat": data["terrain"][0][0][0], "minlon": data["terrain"][0][0][1], "maxlat": data["terrain"][0][0][0] + scale * textureSize * tiles, "maxlon": data["terrain"][0][0][1] + scale * textureSize * tiles}, "height": data["terrain_max_h"] - data["terrain_min_h"]}
    data_opt["terrain"] = terrain

    if not os.path.exists("public/assets/citiesguesser"):
        os.makedirs("public/assets/citiesguesser")
    with open(os.path.join("public/assets/citiesguesser", f"{city}.json"), "w") as file:
        file.write(json.dumps(data_opt, indent=4))

def downloadData(city, api, time_limit=3600, size_limit=4096, tile_limit=4):
    global data

    def check(testpoint, api):
        global placeholder
        global heightAPIs
        coordinates = f"{str(round(float(testpoint[0]),4))},{str(round(float(testpoint[1]),4))}"
        if api.get("datasets") == None:
            name = api["name"]
            url = api["url"]
            r = requests.get(f"{url}{coordinates}")
            if r.status_code != 200:
                print(f"An error occurred, {name} not available")
                heightAPIs[api["name"]]["available"] = False
            else:
                r = r.json()
                if r["results"][0]["elevation"] == None:
                    print(f"{name} not available")
                    heightAPIs[api["name"]]["available"] = False
        else:
            name = api["name"]
            datasets = api["datasets"]
            for i in range(len(api["datasets"])):
                url = api["url_base"].replace(placeholder, api["datasets"][i])
                r = requests.get(f"{url}{coordinates}")
                sleep(api["rateLimit"])
                if r.status_code != 200:
                    print(f"An error occurred, {name} not available")
                    heightAPIs[api["name"]]["available"] = False
                else:
                    r = r.json()
                    if r["results"][0]["elevation"] != None:
                        heightAPIs[api["name"]]["url"] = url
                        break
                    if i == len(datasets)-1:
                        print(f"{name} not available")
                        heightAPIs[api["name"]]["available"] = False
                        break

    def checkAPI(testpoint, api):
        global heightAPIs
        print("Checking api availablity, might take some time")
        check(testpoint, api)
        api = heightAPIs[api["name"]] #might be changed by check
        #use fallback api
        if not api["available"]:
            i = 0
            for apiname in heightAPIs:
                api = heightAPIs[apiname]
                if api["available"]:
                    check(testpoint, api)
                    api = heightAPIs[api["name"]] #might be changed by check
                    if api["available"]:
                        name = api["name"]
                        print(f"Will be used {name}")
                        break
                if i == len(heightAPIs)-1:
                    print("all height apis are not available")
                    height = False
                    break
                i += 1
        return api

    def eq_projection(lat, lon, lat_c, lon_c):
        lat = 6372797 * math.radians(lat - lat_c)
        lon = 6372797 * math.radians(lon - lon_c) * math.cos(math.radians(lat_c))
        return lat, lon
    
    def calc_scale(bbox_side_meters, total_seconds, max_size, time_per_call=heightAPIs["api.opentopodata.org"]["rateLimit"], points_per_call=heightAPIs["api.opentopodata.org"]["requestLimit"]):
        max_calls = total_seconds / time_per_call
        for scale in range(3, 10, 1): #~[10m-1km]
            points = (bbox_side_meters / 2**scale) ** 2
            calls_needed = points / points_per_call
            side_points = bbox_side_meters // (2**scale)
            if calls_needed <= max_calls and side_points <= max_size:
                return 2**scale
        return 2**max(10, math.ceil(math.log2(bbox_side_meters / max_size)))
    
    def calc_size_tiles(bbox_side_meters, scale, size_limit, tile_limit):
        side_points = math.ceil(bbox_side_meters / scale)
        if side_points <= size_limit:
            return 2**math.ceil(math.log2(side_points)), 1
        else:
            return size_limit, math.ceil(side_points / size_limit)

    # check api availablity
    city_r = requests.get(f"https://nominatim.openstreetmap.org/search?city={city}&format=json", headers={"User-Agent": "TEST"}).json()
    testpoint = (city_r[0]["lat"], city_r[0]["lon"])
    api = checkAPI(testpoint, api)
    # get city
    id = None
    bbox = None
    if city_r[0]["osm_type"] == "relation":
        id = city_r[0]["osm_id"] + 3600000000
    bbox = f"""{city_r[0]["boundingbox"][0]},{city_r[0]["boundingbox"][2]},{city_r[0]["boundingbox"][1]},{city_r[0]["boundingbox"][3]}""" #sud, ovest, nord, est
    # get osm
    downloadOSM(id, bbox)
    # normalization bbox
    bbox = [float(city_r[0]["boundingbox"][0]), float(city_r[0]["boundingbox"][2]), float(city_r[0]["boundingbox"][1]), float(city_r[0]["boundingbox"][3])]
    bbox_norm = [float(city_r[0]["boundingbox"][0]), float(city_r[0]["boundingbox"][2]), float(city_r[0]["boundingbox"][1]), float(city_r[0]["boundingbox"][3])]
    lat_c = (bbox_norm[0] + bbox_norm[2]) / 2
    lon_c = (bbox_norm[1] + bbox_norm[3]) / 2
    bbox_norm[0], bbox_norm[1] = eq_projection(bbox_norm[0], bbox_norm[1], lat_c, lon_c)
    bbox_norm[2], bbox_norm[3] = eq_projection(bbox_norm[2], bbox_norm[3], lat_c, lon_c)
    # normalization
    for key, items in data.items():
        items[:] = [el for el in items if el["type"] != "node"]
        for element in items:
            element["bounds"]["minlat"], element["bounds"]["minlon"] = eq_projection(element["bounds"]["minlat"], element["bounds"]["minlon"], lat_c, lon_c)
            element["bounds"]["maxlat"], element["bounds"]["maxlon"] = eq_projection(element["bounds"]["maxlat"], element["bounds"]["maxlon"], lat_c, lon_c)
            if element["type"] == "way":
                if "geometry" in element:
                    for point in element["geometry"]:
                        point["lat"], point["lon"] = eq_projection(point["lat"], point["lon"], lat_c, lon_c)
            elif element["type"] == "relation":
                element["members"][:] = [el for el in element["members"] if el["type"] != "node"]
                for member in element["members"]:
                    if "geometry" in member:
                        for point in member["geometry"]:
                            point["lat"], point["lon"] = eq_projection(point["lat"], point["lon"], lat_c, lon_c)
    # scale and bounds mask
    scale = calc_scale(round(max(bbox_norm[2] - bbox_norm[0], bbox_norm[3] - bbox_norm[1]), 0), time_limit, size_limit*tile_limit, api["rateLimit"], api["requestLimit"])
    textureSize, tiles = calc_size_tiles(round(max(bbox_norm[2] - bbox_norm[0], bbox_norm[3] - bbox_norm[1]), 0), scale, size_limit, tile_limit)
    bounds_geom = getBounds(bbox_norm, scale)
    # get terrain
    downloadTerrain(bbox, bbox_norm, api, scale, textureSize*tiles, bounds_geom)
    # normalization
    for i in range(textureSize * tiles):
        for j in range(textureSize * tiles):
            lat, lon, elevation = data["terrain"][i][j]
            lat_norm, lon_norm = eq_projection(lat, lon, lat_c, lon_c)
            data["terrain"][i][j] = (lat_norm, lon_norm, elevation - data["terrain_min_h"])
    
    # save data
    generateColor(scale, textureSize, tiles, bbox_norm, city, bounds_geom)
    generateDisplacement(textureSize, tiles, city)
    generateJson(scale, textureSize, tiles, city)

downloadData("Rome", heightAPIs["localhost"], 3600*2, 4096, 4)

# TODO
# img color and displacement support for tiling (4096*4096 per tile and 4*4 tiles)
