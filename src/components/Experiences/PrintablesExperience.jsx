import { Canvas } from '@react-three/fiber';
import { OrbitControls, OrthographicCamera, Float } from '@react-three/drei';
import { useRef, useEffect } from 'react';
import * as THREE from 'three';

//configs
import PrintablesConfig from '../Config/printables.js';

//debug
import { GizmoHelper, GizmoViewport, useHelper } from '@react-three/drei';
import { Perf } from 'r3f-perf';
import { folder } from 'leva';

import { useDebugFlag, useLevaDebug, DebugPivot } from '../Utils/Debug.jsx';

const Printables = function({config}){
    return <Float speed={config.float.speed} rotationIntensity={config.float.rotationIntensity} floatIntensity={config.float.floatIntensity} floatingRange={config.float.floatingRange}>
        <group scale={config.scale} position={config.position} rotation={config.rotation}>
            <mesh>
                <boxGeometry />
                <meshStandardMaterial color={config.color} />
            </mesh>
            <mesh position={[0, -1, -0.5]}>
                <planeGeometry />
                <meshStandardMaterial color={config.color} />
            </mesh>
        </group>
    </Float>;
};

function Experience(){
    const directionalLight = useRef();
    const directionalLightTarget = useRef();

    let config_debug = {
        show_3Ddebug: false,
        show_pivotcontrols: false
    };
    
    let config = {...PrintablesConfig};

    if(import.meta.env.DEV){
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
                ambientLight_intensity: {value: PrintablesConfig.ambientLight.intensity, min: 0, max: 10, step: 0.1, label: "intensity"},
                ambientLight_color: {value: PrintablesConfig.ambientLight.color, label: "color"}
            }, {collapsed: true}),
            directionalLight: folder({
                directionalLight_position: {value: PrintablesConfig.directionalLight.position, min: -10, max: 10, step: 0.1, label: "position"},
                directionalLight_lookAt: {value: PrintablesConfig.directionalLight.lookAt, min: -10, max: 10, step: 0.1, label: "lookAt"},
                directionalLight_intensity: {value: PrintablesConfig.directionalLight.intensity, min: 0, max: 10, step: 0.1, label: "intensity"},
                directionalLight_color: {value: PrintablesConfig.directionalLight.color, label: "color"}
            }, {collapsed: true}),
            printables: folder({
                printables_float: folder({
                    printables_float_speed: {value: PrintablesConfig.printables.float.speed, min: 0, max: 10, step: 0.1, label: "speed"},
                    printables_float_rotationIntensity: {value: PrintablesConfig.printables.float.rotationIntensity, min: 0, max: 10, step: 0.1, label: "rotationIntensity"},
                    printables_float_floatIntensity: {value: PrintablesConfig.printables.float.floatIntensity, min: 0, max: 10, step: 0.1, label: "floatIntensity"},
                    printables_float_floatingRange: {value: PrintablesConfig.printables.float.floatingRange, min: -10, max: 10, step: 0.1, label: "floatingRange"}
                }, {collapsed: true}),
                printables_scale: {value: PrintablesConfig.printables.scale, min: 0, max: 10, step: 0.1, label: "scale"},
                printables_position: {value: PrintablesConfig.printables.position, min: -10, max: 10, step: 0.1, label: "position"},
                printables_rotation: {value: PrintablesConfig.printables.rotation, min: 0, max: 2*Math.PI, step: 0.1, label: "rotation"},
                printables_color: {value: PrintablesConfig.printables.color, label: "color"}
            }, {collapsed: true})
        });
    
        if(config == null || JSON.stringify(config) === '{}'){
            config = {...PrintablesConfig};
        }else{
            //ouput fix
            config.ambientLight = {}
            config.ambientLight.intensity = config.ambientLight_intensity;
            delete config.ambientLight_intensity;
            config.ambientLight.color = config.ambientLight_color;
            delete config.ambientLight_color;
            config.directionalLight = {}
            config.directionalLight.position = config.directionalLight_position;
            delete config.directionalLight_position;
            config.directionalLight.lookAt = config.directionalLight_lookAt;
            delete config.directionalLight_lookAt;
            config.directionalLight.intensity = config.directionalLight_intensity;
            delete config.directionalLight_intensity;
            config.directionalLight.color = config.directionalLight_color;
            delete config.directionalLight_color;
            config.printables = {}
            config.printables.float = {}
            config.printables.float.speed = config.printables_float_speed;
            delete config.printables_float_speed;
            config.printables.float.rotationIntensity = config.printables_float_rotationIntensity;
            delete config.printables_float_rotationIntensity;
            config.printables.float.printables_floatIntensity = config.printables_float_floatIntensity;
            delete config.printables_float_floatIntensity;
            config.printables.float.printables_floatingRange = config.printables_float_floatingRange;
            delete config.printables_float_floatingRange;
            config.printables.scale = config.printables_scale;
            delete config.printables_scale;
            config.printables.position = config.printables_position;
            delete config.printables_position;
            config.printables.rotation = config.printables_rotation;
            delete config.printables_rotation;
            config.printables.color = config.printables_color;
            delete config.printables_color;
        }

        useHelper(useDebugFlag() && config_debug.show_3Ddebug && directionalLight, THREE.DirectionalLightHelper, config.directionalLight.intensity/10, config.directionalLight.color);
    }

    
    useEffect(function(){
        if(directionalLight.current && directionalLightTarget.current){
            directionalLight.current.target = directionalLightTarget.current;
        }
    }, [config.directionalLight.lookAt]);
    
    // TODO leva pivotcontrols
    return <>
        {import.meta.env.DEV && useDebugFlag() ? <Perf position="bottom-left" logsPerSecond={1} chart={{hz: 1, length: 80}} antialias overClock showGraph matrixUpdate /> : null}
        {import.meta.env.DEV && useDebugFlag() ? <OrbitControls makeDefault/> : null}
        {import.meta.env.DEV && useDebugFlag() && config_debug.show_3Ddebug ? <GizmoHelper>
            <GizmoViewport />
        </GizmoHelper> : null}
        <ambientLight intensity={config.ambientLight.intensity} color={config.ambientLight.color} />
        {import.meta.env.DEV && useDebugFlag() && config_debug.show_3Ddebug && config_debug.show_pivotcontrols ? <>
            <DebugPivot position={config.directionalLight.position} disableRotations disableScaling scale={0.5}>
                <directionalLight ref={directionalLight} position={[0, 0, 0]} intensity={config.directionalLight.intensity} color={config.directionalLight.color} />
                <mesh scale={[0.1, 0.1, 0.1]}>
                    <sphereGeometry args={[0.1, 16, 16]} />
                    <meshBasicMaterial color="red" />
                </mesh>
            </DebugPivot>
            <DebugPivot position={config.directionalLight.lookAt} disableRotations disableScaling scale={0.5}>
                <mesh ref={directionalLightTarget} position={[0, 0, 0]} scale={[0.1, 0.1, 0.1]}>
                    <sphereGeometry args={[0.1, 16, 16]} />
                    <meshBasicMaterial color="red" />
                </mesh>
            </DebugPivot>
        </> : <directionalLight ref={directionalLight} position={config.directionalLight.position} intensity={config.directionalLight.intensity} color={config.directionalLight.color} />}
        {import.meta.env.DEV && useDebugFlag() && config_debug.show_3Ddebug && config_debug.show_pivotcontrols ? <DebugPivot>
                <Printables config={config.printables} />
            </DebugPivot> : <Printables config={config.printables} />}
    </>;
};

export default function PrintablesExperience({printablesContainer}){
    if(import.meta.env.DEV){
        console.log("Printables experience initialized");
    }
    
    return <>
        <div className={printablesContainer} style={{width: "100%", height: "390px", position: "relative", minHeight: "390px"}}>
            <Canvas gl={function(gl){
                gl.toneMapping = THREE.LinearToneMapping;
                gl.toneMappingExposure = 1.0;
                gl.outputColorSpace = THREE.SRGBColorSpace;
            }}>
                <OrthographicCamera makeDefault position={[-3, 3, 3]} zoom={150} onUpdate={function(self){
                    self.lookAt(0, 0, 0);
                }}/>
                <Experience />
            </Canvas>
        </div>
    </>;
};
