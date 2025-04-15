import { Float, GizmoHelper, GizmoViewport, useHelper, OrbitControls } from '@react-three/drei';
import { useRef } from 'react';
import * as THREE from 'three';
// import { PivotControls } from '@react-three/drei';
import { Perf } from 'r3f-perf';
import { folder } from 'leva';

import PrintablesConfig from '../Config/printables3D.js';

import { PivotControls } from '../Utils/pivotControls/index.tsx';
import { getDebug, addDebug } from '../Utils/Debug.js';

export default function PrintablesExperience3D(){
    const directionalLight = useRef();
    {getDebug() ? useHelper(directionalLight, THREE.DirectionalLightHelper, 1) : null };
    let config = addDebug("3d experience", {
        ambientLight: folder({
            ambientLight_intensity: {
                value: PrintablesConfig.ambientLight.intensity,
                min: 0,
                max: 10,
                step: 0.1,
                label: "intensity"
            },
            ambientLight_color: {
                value: PrintablesConfig.ambientLight.color,
                label: "color"
            }
        }, {collapsed: true}),
        pointLight: folder({
            pointLight_position: {
                value: PrintablesConfig.pointLight.position,
                min: -10,
                max: 10,
                step: 0.1,
                label: "position"
            },
            pointLight_intensity: {
                value: PrintablesConfig.pointLight.intensity,
                min: 0,
                max: 10,
                step: 0.1,
                label: "intensity"
            },
            pointLight_color: {
                value: PrintablesConfig.pointLight.color,
                label: "color"
            }
        }, {collapsed: true}),
        printables: folder({
            printables_float: folder({
                printables_float_speed: {
                    value: PrintablesConfig.printables.float.speed,
                    min: 0,
                    max: 10,
                    step: 0.1,
                    label: "speed"
                },
                printables_float_rotationIntensity: {
                    value: PrintablesConfig.printables.float.rotationIntensity,
                    min: 0,
                    max: 10,
                    step: 0.1,
                    label: "rotationIntensity"
                },
                printables_float_floatIntensity: {
                    value: PrintablesConfig.printables.float.floatIntensity,
                    min: 0,
                    max: 10,
                    step: 0.1,
                    label: "floatIntensity"
                },
                printables_float_floatingRange: {
                    value: PrintablesConfig.printables.float.floatingRange,
                    min: -10,
                    max: 10,
                    step: 0.1,
                    label: "floatingRange"
                }
            }, {collapsed: true}),
            printables_scale: {
                value: PrintablesConfig.printables.scale,
                min: 0,
                max: 10,
                step: 0.1,
                label: "scale"
            },
            printables_position: {
                value: PrintablesConfig.printables.position,
                min: -10,
                max: 10,
                step: 0.1,
                label: "position"
            },
            printables_rotation: {
                value: PrintablesConfig.printables.rotation,
                min: 0,
                max: 2*Math.PI,
                step: 0.1,
                label: "rotation"
            },
            printables_color: {
                value: PrintablesConfig.printables.color,
                label: "color"
            }
        }, {collapsed: true})
    });
    if(config == null){
        config = {...PrintablesConfig}
    }else{
        //ouput fix
        config.ambientLight = {}
        config.ambientLight.intensity = config.ambientLight_intensity;
        delete config.ambientLight_intensity;
        config.ambientLight.color = config.ambientLight_color;
        delete config.ambientLight_color;
        config.pointLight = {}
        config.pointLight.position = config.pointLight_position;
        delete config.pointLight_position;
        config.pointLight.intensity = config.pointLight_intensity;
        delete config.pointLight_intensity;
        config.pointLight.color = config.pointLight_color;
        delete config.pointLight_color;
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
        //folder labels fix
        setTimeout(function(){
            jQuery('.leva-c-dosbYs').each(function(){
                $(this).children().last().text($(this).children().last().text().split("_").pop());
            });
        }, 1000);
    }
    const Printables = function(){
        return <Float speed={config.printables.float.speed} rotationIntensity={config.printables.float.rotationIntensity} floatIntensity={config.printables.float.floatIntensity} floatingRange={config.printables.float.floatingRange}>
            <group scale={config.printables.scale} position={config.printables.position} rotation={config.printables.rotation}>
                <mesh>
                    <boxGeometry />
                    <meshStandardMaterial color={config.printables.color} />
                </mesh>
                <mesh position={[0, -1, -0.5]}>
                    <planeGeometry />
                    <meshStandardMaterial color={config.printables.color} />
                </mesh>
            </group>
        </Float>;
    };
    return <>
        {getDebug() ? <Perf position="bottom-left" logsPerSecond={1} chart={{hz: 1, length: 80}} /> : null}
        {getDebug() ? <OrbitControls makeDefault/> : null}
        {getDebug() ? <GizmoHelper>
            <GizmoViewport />
        </GizmoHelper> : null}
        <ambientLight intensity={config.ambientLight.intensity} color={config.ambientLight.color} />
        <directionalLight ref={directionalLight} position={config.pointLight.position} intensity={config.pointLight.intensity} color={config.pointLight.color} />
        {getDebug() ? <PivotControls anchor={[0, 0, 0]} depthTest={false}>
            <Printables />
        </PivotControls> : <Printables />}
    </>;
};
