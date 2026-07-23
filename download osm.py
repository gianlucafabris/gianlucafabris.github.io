import requests
import math

def eq_projection(lat, lon, lat_c, lon_c):
    lat = 6372797 * math.radians(lat - lat_c)
    lon = 6372797 * math.radians(lon - lon_c) * math.cos(math.radians(lat_c))
    return lat, lon

city = "Rome"
country = "Italy"

city_r = requests.get(f"https://nominatim.openstreetmap.org/search?city={city}&country={country}&format=json", headers={"User-Agent": "TEST"}).json()
print(city_r)
print(city_r[0]["osm_id"])
print(city_r[0]["boundingbox"])

queryOSM = f"""
[out:json];
relation({city_r[0]["osm_id"]});
out geom;
"""
response = requests.post("https://overpass-api.de/api/interpreter", data={"data": queryOSM}).json()
print(response)
print(response["elements"][0]["bounds"])
print([member["geometry"] if [member["type"] == "way"] else None for member in response["elements"][0]["members"]])

# # normalization bbox
# bbox = [float(city_r[0]["boundingbox"][0]), float(city_r[0]["boundingbox"][2]), float(city_r[0]["boundingbox"][1]), float(city_r[0]["boundingbox"][3])]
# bbox_norm = [float(city_r[0]["boundingbox"][0]), float(city_r[0]["boundingbox"][2]), float(city_r[0]["boundingbox"][1]), float(city_r[0]["boundingbox"][3])]
# lat_c = (bbox_norm[0] + bbox_norm[2]) / 2
# lon_c = (bbox_norm[1] + bbox_norm[3]) / 2
# bbox_norm[0], bbox_norm[1] = eq_projection(bbox_norm[0], bbox_norm[1], lat_c, lon_c)
# bbox_norm[2], bbox_norm[3] = eq_projection(bbox_norm[2], bbox_norm[3], lat_c, lon_c)
# # normalization
# for key, items in data.items():
#     items[:] = [el for el in items if el["type"] != "node"]
#     for element in items:
#         element["bounds"]["minlat"], element["bounds"]["minlon"] = eq_projection(element["bounds"]["minlat"], element["bounds"]["minlon"], lat_c, lon_c)
#         element["bounds"]["maxlat"], element["bounds"]["maxlon"] = eq_projection(element["bounds"]["maxlat"], element["bounds"]["maxlon"], lat_c, lon_c)
#         if element["type"] == "way":
#             if "geometry" in element:
#                 for point in element["geometry"]:
#                     point["lat"], point["lon"] = eq_projection(point["lat"], point["lon"], lat_c, lon_c)
#         elif element["type"] == "relation":
#             element["members"][:] = [el for el in element["members"] if el["type"] != "node"]
#             for member in element["members"]:
#                 if "geometry" in member:
#                     for point in member["geometry"]:
#                         point["lat"], point["lon"] = eq_projection(point["lat"], point["lon"], lat_c, lon_c)

# TODO
# https://map2model.com/
