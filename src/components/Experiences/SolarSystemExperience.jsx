import { Canvas } from '@react-three/fiber';
import { GizmoHelper, GizmoViewport, useHelper, OrbitControls, PerspectiveCamera, Environment, useTexture } from '@react-three/drei';
import { useRef, useMemo, useEffect } from 'react';
import * as THREE from 'three';
import { Perf } from 'r3f-perf';
import { folder, useControls } from 'leva';

import { useDebugFlag, useLevaDebug, DebugPivot } from '../Utils/Debug.jsx';

import SolarSystemConfig from '../Config/solarsystem.js';

const Planet = function({planet, config_planet}){
    const urls = useMemo(function(){
        const out = {}
        planet.textures?.forEach(function(tex, i){
            out[tex.type] = config_planet.textures[i] || tex.url
        })
        return out
    }, [planet, config_planet]);

    const loaded = useTexture(Object.values(urls));
    const textureMap = useMemo(function(){
        const map = {}
        Object.keys(urls).forEach(function(type, i){
            return map[type] = loaded[i];
        })
        return map
    }, [urls]);

    let config_atmosphere = useControls(textureMap.color_atmosphere ? planet.name : "", textureMap.color_atmosphere ? {
        color_atmosphere: {value: true, label: "Show atmosphere"}
    } : {}, {collapsed: true}, [planet]);
    config_atmosphere = textureMap.color_atmosphere ? config_atmosphere : {};

    // TODO
    // night
    // zoom near bump (+ intensity α zoom) and far normal
    
    return <>
        <mesh>
            <sphereGeometry args={[config_planet.radius, 512, 256]} />
            <meshPhysicalMaterial map={textureMap.color} bumpMap={textureMap.displacement} bumpScale={textureMap.displacement ? config_planet.elevationBias*config_planet.elevationScale*150 : 0} displacementMap={textureMap.displacement} displacementScale={textureMap.displacement ? config_planet.elevation*config_planet.elevationScale : 0} displacementBias={textureMap.displacement ? config_planet.elevationBias*config_planet.elevationScale : 0} /*normalMap={textureMap.normal} normalScale={textureMap.normal ? new THREE.Vector2(0.75, 0.75) : new THREE.Vector2(0, 0)}*/ aoMap={textureMap.ao} aoMapIntensity={textureMap.ao ? 10 : 0} roughnessMap={textureMap.specular} emissiveMap={textureMap.emissive} emissive={textureMap.emissive ? new THREE.Color(0xffffff) : new THREE.Color(0x000000)} emissiveIntensity={textureMap.emissive ? 0.25 : 0.0} />
        </mesh>
        {textureMap.color_atmosphere && config_atmosphere.color_atmosphere ? <mesh>
            {/* TODO check formula (0.6???) */}
            <sphereGeometry args={[config_planet.radius + 0.1 + (textureMap.displacement ? config_planet.elevation*config_planet.elevationScale * 0.6 + config_planet.elevationBias*config_planet.elevationScale : 0), 64, 32]} />
            <meshPhysicalMaterial map={textureMap.color_atmosphere} transparent />
        </mesh> : null}
        {textureMap.color_rings ? <mesh>
            <latheGeometry args={[[new THREE.Vector2(config_planet.radius * config_planet.ringsRange[0], 0), new THREE.Vector2(config_planet.radius * config_planet.ringsRange[1], 0)], 64]} />
            <meshPhysicalMaterial map={textureMap.color_rings} side={THREE.DoubleSide} transparent={true} />
        </mesh> : null}
    </>;
};

function Experience({planetWithSatellites, mode}){
    const pointLight = useRef();

    const planet = mode === "satellite" ? planetWithSatellites.selectedSatellite : planetWithSatellites.selectedPlanet;
    const elevationScale = mode === "satellite" ? 0.01 : 0.1;

    let config_debug = useLevaDebug("3d experience debug", {
        show_3Ddebug: {value: true, label: "show 3Ddebug"},
        show_pivotcontrols: {value: true, label: "show pivot controls"}
    });
    if(config_debug == null){
        config_debug = {};
        config_debug.show_3Ddebug = false;
        config_debug.show_pivotcontrols = false;
    }

    let config = useLevaDebug("3d experience", {
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
    
    useHelper(useDebugFlag() && config_debug.show_3Ddebug && pointLight, THREE.PointLightHelper, config.pointLight.intensity/10, config.pointLight.color);

    const sun_distance = mode === "satellite" ? planetWithSatellites.selectedPlanet.distance : config.planet.distance;

    //TODO api
    // rotation light
    // rotation planet
    // (sun distance planet)

    // TODO leva pivotcontrols
    return <>
        {useDebugFlag() ? <Perf position="bottom-left" logsPerSecond={1} chart={{hz: 1, length: 80}} antialias overClock showGraph matrixUpdate /> : null}
        {useDebugFlag() && config_debug.show_3Ddebug ? <GizmoHelper>
            <GizmoViewport />
        </GizmoHelper> : null}
        <ambientLight intensity={planet.name == "Sun" ? 3.5 : config.ambientLight.intensity} color={config.ambientLight.color} />
        {useDebugFlag() && config_debug.show_3Ddebug && config_debug.show_pivotcontrols ? <DebugPivot disableRotations disableScaling scale={planet.radius * 0.5}>
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
        <Environment background files={['/src/img/solarsystem/background/px.png', '/src/img/solarsystem/background/nx.png', '/src/img/solarsystem/background/py.png', '/src/img/solarsystem/background/ny.png', '/src/img/solarsystem/background/pz.png', '/src/img/solarsystem/background/nz.png']} />
        {useDebugFlag() && config_debug.show_3Ddebug && config_debug.show_pivotcontrols ? <DebugPivot rotation={config.planet.rotation} scale={planet.radius * 0.5}>
            <Planet planet={planet} config_planet={config.planet} />
        </DebugPivot> : <Planet planet={planet} config_planet={config.planet} />}
        {useDebugFlag() ? <OrbitControls makeDefault /> : <OrbitControls makeDefault enablePan={false} enableZoom={false} />}
    </>;
};

export default function SolarSystemExperience({solarSystemContainer, planet}){
    // TODO
    // modale (in pagina)
    // night
    // bump/normal
    // api

    return <>
        <div className={solarSystemContainer} style={{width: "100%", height: "calc(100vh - 2*(80px + 10px + 20px) - (48px + 20px))"}}>
            <Canvas gl={function(gl){
                gl.toneMapping = THREE.LinearToneMapping;
                gl.toneMappingExposure = 1.0;
                gl.outputColorSpace = THREE.SRGBColorSpace;
            }}>
                <PerspectiveCamera makeDefault position={[planet.selectedSatellite?.radius*10 || planet.selectedPlanet.radius*10, 0, 0]} fov={30} near={planet.selectedSatellite?.radius/2 || planet.selectedPlanet.radius/2} far={planet.selectedSatellite?.radius*1000 || planet.selectedPlanet.radius*1000} onUpdate={function(self){
                    self.lookAt(0, 0, 0);
                }} />
                <Experience planetWithSatellites={planet} mode={planet.selectedSatellite ? "satellite" : "planet"} />
            </Canvas>
        </div>
    </>;
};
