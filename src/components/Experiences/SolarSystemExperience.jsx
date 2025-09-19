import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, Environment, useTexture } from "@react-three/drei";
import { useRef, useMemo, useEffect } from "react";
import { Vector3, Vector2, Color, DoubleSide, PointLightHelper, LinearToneMapping, SRGBColorSpace } from "three";
import { useControls } from "leva";

import { useFetchJson } from "../utils/Json.jsx";

//debug
let GizmoHelper = null;
let GizmoViewport = null;
let useHelper = null;
let Perf = null;
let folder = null;
let useDebugFlag = null;
let useLevaDebug = null;
let DebugPivot = null;
if(import.meta.env.DEV){
    const drei = await import("@react-three/drei");
    const f3f_perf = await import("r3f-perf");
    const leva = await import("leva");
    const debug = await import("../utils/Debug.jsx");
    GizmoHelper = drei.GizmoHelper;
    GizmoViewport = drei.GizmoViewport;
    useHelper = drei.useHelper;
    Perf = f3f_perf.Perf;
    folder = leva.folder;
    useDebugFlag = debug.useDebugFlag;
    useLevaDebug = debug.useLevaDebug;
    DebugPivot = debug.DebugPivot;
}

//configs
let SolarSystemConfigUrl = "/assets/configs/solarsystem.json";

const Planet = function({planet, config_planet, sun_direction}){
    const materialRef = useRef();

    const urls = useMemo(function(){
        const out = {};
        planet.textures?.forEach(function(tex, i){
            out[tex.type] = config_planet.textures[i] || tex.url;
        });
        return out;
    }, [planet, config_planet]);

    const loaded = useTexture(Object.values(urls));
    const textureMap = useMemo(function(){
        const map = {};
        Object.keys(urls).forEach(function(type, i){
            map[type] = loaded[i];
            return map;
        });
        return map;
    }, [urls]);

    const uniformsRef = useRef({
        dayTexture: { value: textureMap.color },
        nightTexture: { value: textureMap.color_night },
        emissiveTexture: { value: textureMap.emissive_night },
        displacementTexture: { value: textureMap.displacement },
        specularTexture: { value: textureMap.specular },
        sunDirection: { value: new Vector3(Math.cos(sun_direction), 0, -Math.sin(sun_direction)).normalize() },
    });
    
    useEffect(function(){
        uniformsRef.current.sunDirection.value.set(Math.cos(sun_direction), 0, -Math.sin(sun_direction)).normalize();
    }, [sun_direction]);

    let config_atmosphere = useControls(textureMap.color_atmosphere ? planet.name : "", textureMap.color_atmosphere ? {
        color_atmosphere: {value: true, label: "Show atmosphere"}
    } : {}, {collapsed: true}, [planet]);
    config_atmosphere = textureMap.color_atmosphere ? config_atmosphere : {};

    //TODO
    // fix textures doesnt reload on link change

    return <>
        <mesh>
            <sphereGeometry args={[config_planet.radius, 512, 256]} />
            <meshPhysicalMaterial ref={materialRef} map={!textureMap.color_night ? textureMap.color : null} displacementMap={textureMap.displacement} displacementScale={textureMap.displacement ? config_planet.elevation*config_planet.elevationScale : 0} displacementBias={textureMap.displacement ? config_planet.elevationBias*config_planet.elevationScale : 0} roughnessMap={textureMap.specular} emissiveMap={textureMap.emissive} emissive={textureMap.emissive ? new Color(0xffffff) : new Color(0x000000)} emissiveIntensity={textureMap.emissive ? 0.1 : 0.0} onBeforeCompile = {function(shader){
                if(textureMap.color_night){
                    shader.uniforms.dayTexture = uniformsRef.current.dayTexture;
                    shader.uniforms.nightTexture = uniformsRef.current.nightTexture;
                    shader.uniforms.sunDirection = uniformsRef.current.sunDirection;
                    if(textureMap.emissive_night){
                        shader.uniforms.emissiveTexture = uniformsRef.current.emissiveTexture;
                    }
                    if(planet.name === "Earth"){
                        shader.uniforms.displacementTexture = uniformsRef.current.displacementTexture;
                        shader.uniforms.specularTexture = uniformsRef.current.specularTexture;
                        shader.uniforms.shallowWaterDayColor = { value: new Color(0x3a94ff) };
                        shader.uniforms.deepWaterDayColor = { value: new Color(0x112e49) };
                        shader.uniforms.shallowWaterNightColor = { value: new Color(0x19466f) };
                        shader.uniforms.deepWaterNightColor = { value: new Color(0x000000) };
                    }
                    // Vertex shader
                    shader.vertexShader = shader.vertexShader.replace('#include <common>', `
                        #include <common>
                        varying vec3 vWorldNormal;
                        varying vec2 vUv_custom;
                    `).replace('#include <uv_vertex>', `
                        #include <uv_vertex>
                        vUv_custom = uv;
                        vWorldNormal = normalize(mat3(modelMatrix) * normal);
                    `);
                    // Fragment shader
                    shader.fragmentShader = shader.fragmentShader.replace('#include <common>', `
                        #include <common>
                        uniform sampler2D dayTexture;
                        uniform sampler2D nightTexture;
                        uniform vec3 sunDirection;
                        varying vec2 vUv_custom;
                        varying vec3 vWorldNormal;
                        ${textureMap.emissive_night ? "uniform sampler2D emissiveTexture;" : ""}
                        ${planet.name === "Earth" ? `
                            uniform sampler2D displacementTexture;
                            uniform sampler2D specularTexture;
                            uniform vec3 shallowWaterDayColor;
                            uniform vec3 deepWaterDayColor;
                            uniform vec3 shallowWaterNightColor;
                            uniform vec3 deepWaterNightColor;
                        ` : ""}
                    `).replace('#include <map_fragment>', `
                        #include <map_fragment>
                        float d = dot(normalize(vWorldNormal), normalize(sunDirection));
                        float blend = smoothstep(-0.5, 0.5, d);
                        vec4 dayColor = texture2D(dayTexture, vUv_custom);
                        vec4 nightColor = texture2D(nightTexture, vUv_custom);
                        diffuseColor = mix(nightColor, dayColor, blend);
                        ${textureMap.emissive_night ? `
                            vec4 emissive = texture2D(emissiveTexture, vUv_custom);
                            totalEmissiveRadiance += emissive.rgb * (1.0 - blend) * 0.1;
                        ` : ""}
                        ${planet.name === "Earth" ? `
                            float waterMask = 0.0;
                            waterMask = 1.0 - texture2D(specularTexture, vUv_custom).r;
                            float height = texture2D(displacementTexture, vUv_custom).r;
                            float waterDepthFactor = smoothstep(0.3, 0.7, height);
                            vec3 waterDayColor = mix(deepWaterDayColor, shallowWaterDayColor, waterDepthFactor);
                            vec3 waterNightColor = mix(deepWaterNightColor, shallowWaterNightColor, waterDepthFactor);
                            vec3 waterColor = mix(waterNightColor, waterDayColor, blend);
                            diffuseColor.rgb = mix(diffuseColor.rgb, waterColor, waterMask);
                        ` : ""}
                    `);
                }
            }} />
        </mesh>
        {textureMap.color_atmosphere && config_atmosphere.color_atmosphere ? <mesh>
            <sphereGeometry args={[config_planet.radius + 0.015, 64, 32]} />
            <meshPhysicalMaterial map={textureMap.color_atmosphere} transparent />
        </mesh> : null}
        {textureMap.color_rings ? <mesh>
            <latheGeometry args={[[new Vector2(config_planet.radius * config_planet.ringsRange[0], 0), new Vector2(config_planet.radius * config_planet.ringsRange[1], 0)], 64]} />
            <meshPhysicalMaterial map={textureMap.color_rings} side={DoubleSide} transparent={true} />
        </mesh> : null}
    </>;
};

function Experience({solarSystemConfing: SolarSystemConfig, planetWithSatellites, mode}){
    const pointLight = useRef();

    const planet = mode === "satellite" ? planetWithSatellites.selectedSatellite : planetWithSatellites.selectedPlanet;
    const elevationScale = mode === "satellite" ? 0.01 : 0.1;

    let config_debug = {
        show_3Ddebug: false,
        show_pivotcontrols: false
    };
    
    let config = {...SolarSystemConfig};
    delete config.planets;
    config.planet = {...planet};
    config.planet.textures = planet.textures.map(function(tex, i){
        return tex.url;
    });
    delete config.planet.satellites;
    config.planet.elevationScale = elevationScale;
    config.sun_position = 0;
    
    if(import.meta.env.DEV){
        // debug
        config_debug = useLevaDebug("3d experience debug", {
            show_3Ddebug: {value: true, label: "show 3Ddebug"},
            show_pivotcontrols: {value: true, label: "show pivot controls"}
        });
    
        if(config_debug == null || JSON.stringify(config_debug) === '{}'){
            config_debug = {
                show_3Ddebug: false,
                show_pivotcontrols: false
            };
        }
        config = useLevaDebug("3d experience", {
            ambientLight: folder({
                ambientLight_intensity: {value: SolarSystemConfig.ambientLight.intensity, min: 0, max: 10, step: 0.1, label: "intensity"},
                ambientLight_color: {value: SolarSystemConfig.ambientLight.color, label: "color"}
            }, {collapsed: true}),
            pointLight: folder({
                pointLight_intensity: {value: SolarSystemConfig.pointLight.intensity, min: 0, max: 10e12, step: 1000, label: "intensity"},
                pointLight_color: {value: SolarSystemConfig.pointLight.color, label: "color"}
            }, {collapsed: true}),
            planet: folder({
                planet_name: {value: planet.name, label: "name"},
                planet_radius: {value: planet.radius, min: 0, max: 1000, step: 0.001, label: "radius"},
                planet_rotation: {value: planet.rotation, min: 0, max: Math.PI * 2, step: 0.001, label: "rotation"},
                planet_distance: {value: planet.distance, min: 0, max: 5000000, step: 5000, label: "distance"},
                planet_elevation: {value: planet.elevation, min: 0, max: 50, step: 0.001, label: "elevation"},
                planet_elevationBias: {value: planet.elevationBias, min: -50, max: 50, step: 0.001, label: "elevationBias"},
                planet_textures: folder({
                    ...planet.textures.reduce(function(acc, tex, i){
                        acc[`planet_texture_${tex.type}`] = {value: tex.url, label: tex.type};
                        return acc;
                    }, {})}, {collapsed: true}),
                planet_elevationScale: {value: elevationScale, min: 0.001, max: 1, step: 0.001, label: "elevationScale"},
                ...(planet.textures.some(function(tex){ return tex.type === "color_rings"; }) ? {
                    planet_ringsRange: {value: planet.ringsRange, min: 1.0, max: 20.0, step: 0.1, label: "ringsRange"}
                } : {})
            }, {collapsed: true}),
            sun_position: {value: 0, min: 0, max: Math.PI * 2, step: 0.001, label: "sun position"}
        });
    
        if(config == null || JSON.stringify(config) === '{}'){
            config = {...SolarSystemConfig};
            delete config.planets;
            config.planet = {...planet};
            config.planet.textures = planet.textures.map(function(tex, i){
                return tex.url;
            });
            delete config.planet.satellites;
            config.planet.elevationScale = elevationScale;
            config.sun_position = 0;
        }else{
            //ouput fix
            config.ambientLight = {}
            config.ambientLight.intensity = config.ambientLight_intensity;
            delete config.ambientLight_intensity;
            config.ambientLight.color = config.ambientLight_color;
            delete config.ambientLight_color;
            config.pointLight = {}
            config.pointLight.intensity = config.pointLight_intensity;
            delete config.pointLight_intensity;
            config.pointLight.color = config.pointLight_color;
            delete config.pointLight_color;
            config.planet = {};
            config.planet.name = config.planet_name;
            delete config.planet_name;
            config.planet.radius = config.planet_radius;
            delete config.planet_radius;
            config.planet.rotation = config.planet_rotation;
            delete config.planet_rotation;
            config.planet.distance = config.planet_distance;
            delete config.planet_distance;
            config.planet.elevation = config.planet_elevation;
            delete config.planet_elevation;
            config.planet.elevationBias = config.planet_elevationBias;
            delete config.planet_elevationBias;
            config.planet.textures = planet.textures.map(function(tex, i){
                return config[`planet_texture_${tex.type}`];
            });
            planet.textures.map(function(tex, i){
                delete config[`planet_texture_${tex.type}`];
            });
            config.planet.elevationScale = config.planet_elevationScale;
            delete config.planet_elevationScale;
            if(planet.textures.some(function(tex){ return tex.type === "color_rings"; })){
                config.planet.ringsRange = config.planet_ringsRange;
                delete config.planet_ringsRange;
            }
            
        }
        
        useHelper(useDebugFlag() && config_debug.show_3Ddebug && pointLight, PointLightHelper, config.pointLight.intensity/10, config.pointLight.color);
    }

    const sun_distance = mode === "satellite" ? planetWithSatellites.selectedPlanet.distance : config.planet.distance;

    //TODO api
    // rotation light -> ~year
    // rotation planet -> ~day + rot axis
    // other (sun distance planet ~year)
    // fix light intensity near to strong/far to weak

    // TODO leva pivotcontrols
    return <>
        {import.meta.env.DEV && useDebugFlag() ? <Perf position="bottom-left" logsPerSecond={1} chart={{hz: 1, length: 80}} antialias overClock showGraph matrixUpdate /> : null}
        {import.meta.env.DEV && useDebugFlag() && config_debug.show_3Ddebug ? <GizmoHelper>
            <GizmoViewport />
        </GizmoHelper> : null}
        <ambientLight intensity={planet.name == "Sun" ? 3.5 : config.ambientLight.intensity} color={config.ambientLight.color} />
        {import.meta.env.DEV && useDebugFlag() && config_debug.show_3Ddebug && config_debug.show_pivotcontrols ? <DebugPivot disableRotations disableScaling scale={planet.radius * 0.5}>
            <group position={[0, 0, 0]} rotation={[0, config.sun_position, 0]} scale={[1, 1, 1]}>
                <pointLight ref={pointLight} position={[sun_distance, 0, 0]} rotation={[0, 0, 0]} scale={[1, 1, 1]} intensity={planet.name == "Sun" ? 0 : config.pointLight.intensity} color={config.pointLight.color} />
            </group>
            <mesh position={[sun_distance, 0, 0]} rotation={[0, 0, 0]} scale={[0.1, 0.1, 0.1]}>
                <sphereGeometry args={[0.1, 16, 16]} />
                <meshBasicMaterial color="red" envMapIntensity={0} />
            </mesh>
        </DebugPivot> : <group position={[0, 0, 0]} rotation={[0, config.sun_position, 0]} scale={[1, 1, 1]}>
            <pointLight ref={pointLight} position={[sun_distance, 0, 0]} rotation={[0, 0, 0]} scale={[1, 1, 1]} intensity={planet.name == "Sun" ? 0 : config.pointLight.intensity} color={config.pointLight.color} />
        </group>}
        <Environment background files={['/assets/solarsystem/background/px.png', '/assets/solarsystem/background/nx.png', '/assets/solarsystem/background/py.png', '/assets/solarsystem/background/ny.png', '/assets/solarsystem/background/pz.png', '/assets/solarsystem/background/nz.png']} />
        {import.meta.env.DEV && useDebugFlag() && config_debug.show_3Ddebug && config_debug.show_pivotcontrols ? <DebugPivot rotation={config.planet.rotation} scale={planet.radius * 0.5}>
            <Planet planet={planet} config_planet={config.planet} sun_direction={config.sun_position} />
        </DebugPivot> : <Planet planet={planet} config_planet={config.planet} sun_direction={config.sun_position} />}
        {import.meta.env.DEV && useDebugFlag() ? <OrbitControls makeDefault /> : <OrbitControls makeDefault enablePan={false} enableZoom={false} />}
    </>;
};

export default function SolarSystemExperience({solarSystemContainer, planet}){
    const { data: SolarSystemConfig, loading: SolarSystemConfigLoading, error: SolarSystemConfigError } = useFetchJson(SolarSystemConfigUrl);
    
    // TODO
    // modale (in pagina)
    // textures
    // api
    // parametri pianeta/glsl/api/altro... in leva/config
    
    if(import.meta.env.DEV){
        console.log("SolarSystem experience initialized");
    }

    return <>
        <div className={solarSystemContainer} style={{width: "100%", height: "calc(100vh - 2*(80px + 10px + 20px) - (48px + 20px))"}}>
            <Canvas gl={function(gl){
                gl.toneMapping = LinearToneMapping;
                gl.toneMappingExposure = 1.0;
                gl.outputColorSpace = SRGBColorSpace;
            }}>
                <PerspectiveCamera makeDefault position={[planet.selectedSatellite?.radius*10 || planet.selectedPlanet.radius*10, 0, 0]} fov={30} near={planet.selectedSatellite?.radius/2 || planet.selectedPlanet.radius/2} far={planet.selectedSatellite?.radius*1000 || planet.selectedPlanet.radius*1000} onUpdate={function(self){
                    self.lookAt(0, 0, 0);
                }} />
                {SolarSystemConfigLoading ? /*<div>Loading...</div>*/ null : SolarSystemConfigError ? /*<div>Error loading solar system config: {SolarSystemConfigError.message}</div>*/ null : <Experience solarSystemConfing={SolarSystemConfig} planetWithSatellites={planet} mode={planet.selectedSatellite ? "satellite" : "planet"} />}
            </Canvas>
        </div>
    </>;
};
