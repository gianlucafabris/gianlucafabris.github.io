import { Canvas } from '@react-three/fiber';
import { Float, GizmoHelper, GizmoViewport, useHelper, OrbitControls, PivotControls, PerspectiveCamera, useTexture } from '@react-three/drei';
import { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { Perf } from 'r3f-perf';
import { folder } from 'leva';
// import { StatsGl } from '@react-three/drei';

import { getDebug, addLevaDebug } from '../Utils/Debug.js';
// import { MyStatsGL } from '../Utils/MyStatsGL.js';

// import SolarSystemConfig from '../Config/SolarSystem.js';

function Experience(){
    const [colorMap, displacementMap, roughnessMap] = useTexture(['/src/img/solarsystem/03_Earth/Earth_color.jpg', '/src/img/solarsystem/03_Earth/Earth_height.jpg', '/src/img/solarsystem/03_Earth/Earth_water.jpg'])
    return <>
        <ambientLight intensity={0.4} />
        <pointLight position={[7, 7, 7]} />
        <mesh position={[0, 0, 0]} rotation={[0, 0, 0]}>
            <sphereGeometry args={[6.367, 1024, 512]} />
            <meshStandardMaterial map={colorMap} displacementMap={displacementMap} displacementScale={0.020} roughnessMap={roughnessMap} />
        </mesh>
        <OrbitControls />
    </>;
    // const [colorMap, displacementMap] = useTexture(['/src/img/solarsystem/03_Earth/Moon_color.jpg', '/src/img/solarsystem/03_Earth/Moon_height.jpg'])
    // return <>
    //     <ambientLight intensity={0.4} />
    //     <pointLight position={[2, 2, 2]} />
    //     <mesh position={[0, 0, 0]} rotation={[0, 0, 0]}>
    //         <sphereGeometry args={[1.737, 1024, 512]} />
    //         <meshStandardMaterial map={colorMap} displacementMap={displacementMap} displacementScale={0.020} />
    //     </mesh>
    //     <OrbitControls />
    // </>;
};

export default function SolarSystemExperience({solarSystemContainer}){
    jQuery(window).on("resize", function(){
        jQuery(`.${solarSystemContainer} canvas`)[0].height = 1;
        jQuery(`.${solarSystemContainer} canvas`)[0].width = 1;
    });
    return <>
        <div className={solarSystemContainer} style={{ width: "100%", height: "calc(100vh - 2 * 116px)" }}>
            <Canvas gl={function(gl){
                gl.toneMapping = THREE.LinearToneMapping;
                gl.toneMappingExposure = 1.0;
                gl.outputColorSpace = THREE.SRGBColorSpace;
            }}>
                <PerspectiveCamera makeDefault position={[-7, 7, 7]} fov={75} near={0.1} far={1000} onUpdate={function(self){self.lookAt(0, 0, 0)}}/>
                <Experience />
            </Canvas>
        </div>
    </>;
};
