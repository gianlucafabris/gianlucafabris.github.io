import { $ as jQuery } from 'react-jquery-plugin';
import { Container, Row, Col } from 'react-bootstrap';
import { useEffect, useRef, useMemo, useCallback } from 'react';
import { useLocation } from 'react-router';

//debug
import { PivotControls } from '@react-three/drei';
import { Leva, folder, button, useControls } from 'leva';
import Stats from 'stats-js';
import * as Spector from 'spectorjs';

let active = false;

export function useDebugFlag(){
    return active;
}

export function DebugPivot({ children, position = [0, 0, 0], rotation = [0, 0, 0], scale = 1, disableTranslation = false, disableRotations = false, disableScaling = false }){
    return <PivotControls anchor={[0, 0, 0]} depthTest={false} disableAxes={disableTranslation} disableSliders={disableTranslation} disableRotations={disableRotations} disableScaling={disableScaling} scale={scale} rotation={rotation}>
        <group position={position}>
            {children}
        </group>
    </PivotControls>;
}

//Leva
export function useLevaDebug(name, options){
    // console.log("Leva Debug Initialized", name);
    if(import.meta.env.DEV){
        const obj = useControls(active ? name : "", active ? options : {}, { collapsed: true }, [active]);
    
        //folder labels fix
        setTimeout(function(){
            jQuery('.leva-c-dosbYs').each(function(){
                $(this).children().last().text($(this).children().last().text().split("_").pop());
            });
        }, 1000);
        
        return active ? obj : {};
    }
};

//Stats
let stats;

function useStats(){
    const requestRef = useRef();
    const statsRef = useRef();
    const lastUpdate = useRef(0);


    const tick = useCallback(function(){
        if(!statsRef.current){
            return;
        }
        statsRef.current.begin();
        requestRef.current = requestAnimationFrame(tick);
        statsRef.current.end();

        const now = Date.now();
        if(now >= lastUpdate.current + 1000){
            updateParticlesPanel();
            lastUpdate.current = now;
        }
        return function(){
            cancelAnimationFrame(requestRef.current);
        }
    }, []);

    useEffect(function(){
        // console.log("Stats initialized");
        if(import.meta.env.DEV && active){
            const dp = window.devicePixelRatio;
            window.devicePixelRatio = 2;
            statsRef.current = new Stats();
            stats = statsRef.current;
            window.devicePixelRatio = dp;
            jQuery("body").append(statsRef.current.dom);
            jQuery("body").children().last().wrap("<div id='stats-js'></div>");
            requestRef.current = requestAnimationFrame(tick);
            return function(){
                if(requestRef.current){
                    cancelAnimationFrame(requestRef.current);
                }
                jQuery("#stats-js").remove();
                statsRef.current = null;
            };
        }
    }, [active]);
}

// panels color
// gray
// "#000000"  "#000000"  //black
// "#7f7f7f"  "#111111"  //gray
// "#ffffff"  "#222222"  //white
// primary
// "#00007f"  "#000011"  //dark blue
// "#007f00"  "#001100"  //dark green
// "#7f0000"  "#110000"  //dark red
// "#0000ff"  "#000022"  //blue
// "#00ff00"  "#002200"  //green - MS
// "#ff0000"  "#220000"  //red
// "#7f7fff"  "#111122"  //light blue
// "#7fff7f"  "#112211"  //light green
// "#ff7f7f"  "#221111"  //light red
// secondary
// "#007f7f"  "#001111"  //dark cyan
// "#7f007f"  "#110011"  //dark magenta
// "#7f7f00"  "#111100"  //dark yellow
// "#00ffff"  "#002222"  //cyan - FPS
// "#ff00ff"  "#220022"  //magenta
// "#ffff00"  "#222200"  //yellow
// "#7fffff"  "#112222"  //light cyan
// "#ff7fff"  "#221122"  //light magenta
// "#ffff7f"  "#222211"  //light yellow - P
// tertiary
// "#007fff"  "#001122"  //sky blue
// "#ff007f"  "#220011"  //pink - MB
// "#7fff00"  "#112200"  //lime
// "#00ff7f"  "#002211"  //spring green
// "#7f00ff"  "#110022"  //purple
// "#ff7f00"  "#221100"  //orange

// Particles panel
let particlesPanel;
let particlesArray = [];

export function useParticlesPanel(array){
    // console.log("Stats particles panel initialized");
    particlesArray = array;
    if(import.meta.env.DEV && active && stats && !particlesPanel){
        let dp =  window.devicePixelRatio;
        window.devicePixelRatio = 2;
        let panel = new Stats.Panel("P", "#ffff7f", "#222211");
        window.devicePixelRatio = dp;
        particlesPanel = stats.addPanel(panel);
        stats.showPanel(0);
        updateParticlesPanel();
    }
    if(!active && particlesPanel){
        particlesPanel = null;
    }
};

function updateParticlesPanel(){
    if(particlesPanel){
        particlesPanel.update(particlesArray.length, 1000);
    }
}

//Spector
function useSpector(){
    const requestRef = useRef();

    const tick = useCallback(function(){
        requestRef.current = requestAnimationFrame(tick);
        $(".fpsCounterComponent").text("");
        return function(){
            cancelAnimationFrame(requestRef.current);
        }
    }, []);
    
    useEffect(function(){
        // console.log("Spector initialized");
        if(import.meta.env.DEV && active){
            const spector = new Spector.Spector();
            requestRef.current = requestAnimationFrame(tick);
            spector.displayUI();
            return function(){
                spector.stopCapture();
                if(requestRef.current){
                    cancelAnimationFrame(requestRef.current);
                }
                jQuery(".captureMenuComponent").parent().remove();
                jQuery(".resultViewComponent").remove();
            };
        }else{
            return function(){
                
            };
        }
    }, [active]);
}

export function Debug(){
    const location = useLocation();
    active = useMemo(function(){
        const queryParams = new URLSearchParams(location.search);
        return queryParams.has("debug");
    }, [location.search]);

    if(import.meta.env.DEV){
        useStats();
        useSpector();
    }

    return <>
        {import.meta.env.DEV && active ? <Leva oneLineLabels={true} /> : null}
        {import.meta.env.DEV && active ? <div id="overlay">
            <Container>
                <Row>
                    {Array.from({length: 12}).map(function(_, idx){
                        return <Col md={1} key={idx}><div className="overlay-col"></div></Col>;
                    })}
                </Row>
            </Container>
        </div> : null}
    </>;
};
