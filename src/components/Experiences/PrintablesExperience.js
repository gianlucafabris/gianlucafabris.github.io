import { Canvas } from '@react-three/fiber';
import { OrthographicCamera, Float, GizmoHelper, GizmoViewport, useHelper, OrbitControls, PivotControls, PerspectiveCamera } from '@react-three/drei';
import { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { Perf } from 'r3f-perf';
import { folder } from 'leva';
// import { StatsGl } from '@react-three/drei';

import { getDebug, addLevaDebug } from '../Utils/Debug.js';
// import { MyStatsGL } from '../Utils/MyStatsGL.js';

import PrintablesConfig from '../Config/printables.js';

function Experience(){
    const directionalLight = useRef();
    const directionalLightTarget = useRef();
    let config_debug = addLevaDebug("3d experience debug", {
        show_3Ddebug: {
            value: true,
            label: "show 3Ddebug"
        },
        show_pivotcontrols: {
            value: true,
            label: "show pivot controls"
        }
    });
    if(config_debug == null){
        config_debug = {};
        config_debug.show_3Ddebug = false;
        config_debug.show_pivotcontrols = false;
    }
    let config = addLevaDebug("3d experience", {
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
        directionalLight: folder({
            directionalLight_position: {
                value: PrintablesConfig.directionalLight.position,
                min: -10,
                max: 10,
                step: 0.1,
                label: "position"
            },
            directionalLight_lookAt: {
                value: PrintablesConfig.directionalLight.lookAt,
                min: -10,
                max: 10,
                step: 0.1,
                label: "lookAt"
            },
            directionalLight_intensity: {
                value: PrintablesConfig.directionalLight.intensity,
                min: 0,
                max: 10,
                step: 0.1,
                label: "intensity"
            },
            directionalLight_color: {
                value: PrintablesConfig.directionalLight.color,
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
        //folder labels fix
        setTimeout(function(){
            jQuery('.leva-c-dosbYs').each(function(){
                $(this).children().last().text($(this).children().last().text().split("_").pop());
            });
        }, 1000);
    }
    useHelper(getDebug() && config_debug.show_3Ddebug && directionalLight, THREE.DirectionalLightHelper, config.directionalLight.intensity/10, config.directionalLight.color);
    useEffect(function(){
        if(directionalLight.current && directionalLightTarget.current){
            directionalLight.current.target = directionalLightTarget.current;
        }
    }, []);
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
    // TODO leva pivotcontrols
    return <>
        {getDebug() ? <Perf position="bottom-left" logsPerSecond={1} chart={{hz: 1, length: 80}} antialias overClock showGraph matrixUpdate /> : null}
        {getDebug() ? <OrbitControls makeDefault/> : null}
        {getDebug() && config_debug.show_3Ddebug ? <GizmoHelper>
            <GizmoViewport />
        </GizmoHelper> : null}
        <ambientLight intensity={config.ambientLight.intensity} color={config.ambientLight.color} />
        {getDebug() && config_debug.show_3Ddebug && config_debug.show_pivotcontrols ? <>
            <PivotControls anchor={[0, 0, 0]} depthTest={false} disableRotations disableScaling scale={0.5}>
                <group position={config.directionalLight.position}>
                    <directionalLight ref={directionalLight} position={[0, 0, 0]} intensity={config.directionalLight.intensity} color={config.directionalLight.color} />
                    <mesh scale={[0.1, 0.1, 0.1]}>
                        <sphereGeometry args={[0.1, 16, 16]} />
                        <meshBasicMaterial color="red" />
                    </mesh>
                </group>
            </PivotControls>
            <PivotControls anchor={[0, 0, 0]} depthTest={false} disableRotations disableScaling scale={0.5}>
                <mesh ref={directionalLightTarget} position={config.directionalLight.lookAt} scale={[0.1, 0.1, 0.1]}>
                    <sphereGeometry args={[0.1, 16, 16]} />
                    <meshBasicMaterial color="red" />
                </mesh>
            </PivotControls>
        </> : <directionalLight ref={directionalLight} position={config.directionalLight.position} intensity={config.directionalLight.intensity} color={config.directionalLight.color} />}
        {getDebug() && config_debug.show_3Ddebug && config_debug.show_pivotcontrols ? <PivotControls anchor={[0, 0, 0]} rotation={config.printables.rotation} depthTest={false}>
            <Printables />
        </PivotControls> : <Printables />}
    </>;
};

export default function PrintablesExperience({printablesContainer}){
    jQuery(window).on("resize", function(){
        jQuery(`.${printablesContainer} canvas`)[0].height = 1;
        jQuery(`.${printablesContainer} canvas`)[0].width = 1;
    });
    return <>
        <div className={printablesContainer} style={{ width: "100%", height: "390px" }}>
            <Canvas gl={function(gl){
                gl.toneMapping = THREE.LinearToneMapping;
                gl.toneMappingExposure = 1.0;
                gl.outputColorSpace = THREE.SRGBColorSpace;
            }}>
                {/* <PerspectiveCamera makeDefault position={[-3, 3, 3]} fov={75} near={0.1} far={1000} onUpdate={function(self){self.lookAt(0, 0, 0)}}/> */}
                <OrthographicCamera makeDefault position={[-3, 3, 3]} zoom={150} onUpdate={function(self){self.lookAt(0, 0, 0)}}/>
                <Experience />
            </Canvas>
        </div>
    </>;
};
