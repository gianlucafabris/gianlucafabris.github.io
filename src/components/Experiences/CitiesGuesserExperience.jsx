import { Canvas, useLoader } from '@react-three/fiber';
import { OrbitControls, OrthographicCamera, PerspectiveCamera, Environment, useTexture } from '@react-three/drei';
import { useRef, useEffect, useState, useMemo } from 'react';
import * as THREE from 'three';
import { FileLoader } from "three";

//configs
import CitiesConfig from '../Config/citiesguesser.js';

//debug
import { GizmoHelper, GizmoViewport, useHelper } from '@react-three/drei';
import { Perf } from 'r3f-perf';
import { folder } from 'leva';

import { useDebugFlag, useLevaDebug, DebugPivot } from '../Utils/Debug.jsx';

function getHeightAt(terrain, hmap, lat, lon) {
    // lat/lon to row/column
    const i = (lat - terrain["bounds"]["minlat"]) / (terrain["bounds"]["maxlat"] - terrain["bounds"]["minlat"]);
    const j = (lon - terrain["bounds"]["minlon"]) / (terrain["bounds"]["maxlon"] - terrain["bounds"]["minlon"]);

    const i0 = Math.floor(i * (terrain["h"] - 1));
    const j0 = Math.floor(j * (terrain["w"] - 1));

    const di = i* (terrain.h - 1) - i0;
    const dj = j* (terrain.w - 1) - j0;
    const i1 = Math.min(i0 + 1, terrain["h"] - 1);
    const j1 = Math.min(j0 + 1, terrain["w"] - 1);

    // bilinear interpolation
    const h00 = hmap[i0][j0];
    const h01 = hmap[i0][j1];
    const h10 = hmap[i1][j0];
    const h11 = hmap[i1][j1];

    const h0 = h00 * (1 - dj) + h01 * dj;
    const h1 = h10 * (1 - dj) + h11 * dj;
    return h0 * (1 - di) + h1 * di;
}

function Building({element, terrain, hmap}){
    const { type, bounds, height, geometry } = element;

    const shape = useMemo(function(){
        if(type == "way"){
            const s = new THREE.Shape();
            geometry.forEach(function([y, x], i){
                i === 0 ? s.moveTo(x, y) : s.lineTo(x, y);
            });
            return s;
        }else{
            return null;
        }
    }, [element]);

    const terrainHeight = useMemo(function(){
        return getHeightAt(terrain, hmap, terrain.bounds.maxlat - ((bounds.minlat + bounds.maxlat) / 2 - terrain.bounds.minlat), (bounds.minlon + bounds.maxlon) / 2);
    }, [element, terrain]);
    
    return <>
        {type == "way" ? <mesh position={[0, terrainHeight, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <extrudeGeometry args={[shape, { depth: height, bevelEnabled: false }]} />
            <meshStandardMaterial color="white" />
        </mesh> : null}
    </>;
};

function Terrain({terrain, color, displacement}){
    const geometry = useMemo(function(){
        const geo = new THREE.PlaneGeometry(terrain.textureSize * terrain.tiles * terrain.scale, terrain.textureSize * terrain.tiles * terrain.scale, terrain.textureSize * terrain.tiles - 1, terrain.textureSize * terrain.tiles - 1);
        return geo;
    }, [terrain]);

    return <mesh geometry={geometry} position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <meshStandardMaterial map={color} displacementMap={displacement} displacementScale={terrain.height} transparent />
    </mesh>;
}

function Experience({ city }){
    const color = useTexture(`/src/osm/${city}_color.png`);
    const displacement = useTexture(`/src/osm/${city}_displacement.png`);

    const osmDatajson = useLoader(FileLoader, `/src/osm/${city}.json`);
    const osmData = useMemo(function(){
        return JSON.parse(osmDatajson);
    }, [osmDatajson]);

    // const buildings = osmData["buildings"];
    const terrain = osmData["terrain"];

    const hmap = useMemo(function(){
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        const { width, height } = displacement.image;
        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(displacement.image, 0, 0, width, height);
        const imageData = ctx.getImageData(0, 0, width, height).data;
        const hmap = Array.from({ length: height }, function(_, row){
            const arr = new Float32Array(width);
            for(let col = 0; col < width; col++){
                const idx = (row * width + col) * 4;
                arr[col] = imageData[idx] / 255 * (terrain.height);
            }
            return arr;
        });
        return hmap;
    }, [displacement, terrain]);

    return <>
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 20, 10]} intensity={1} />
        {/* {buildings.map(function(element, index){
            return <Building key={index} element={element} terrain={terrain} hmap={hmap} />;
        })} */}
        <Terrain terrain={terrain} color={color} displacement={displacement} />
        {import.meta.env.DEV && useDebugFlag() ? <OrbitControls makeDefault /> : <OrbitControls makeDefault minPolarAngle={Math.PI * 10 / 180} maxPolarAngle={Math.PI * 80 / 180} />}
    </>;
};

export default function CitiesGuesserExperience({citiesguesserContainer}){
    if(import.meta.env.DEV){
        console.log("CitiesGuesser experience initialized");
    }

    // TODO
    // tutti parametri leva/config
    // camera in base scale*textureSize*tiles
    // supporto scale/textureSize/tiles

    return <>
        <div className={citiesguesserContainer} style={{width: "100%", height: "calc(100vh - 2*(80px + 10px + 20px))"}}>
            <Canvas gl={function(gl){
                gl.toneMapping = THREE.LinearToneMapping;
                gl.toneMappingExposure = 1.0;
                gl.outputColorSpace = THREE.SRGBColorSpace;
            }}>
                <PerspectiveCamera makeDefault position={[0, 10000, 10000]} fov={30} near={10} far={100000} onUpdate={function(self){
                    self.lookAt(0, 0, 0);
                }} />
                <Experience city={"Rome"} />
            </Canvas>
        </div>
    </>;
};
