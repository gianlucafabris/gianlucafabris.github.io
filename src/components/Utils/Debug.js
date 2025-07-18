import * as bootstrap from 'react-bootstrap';

import { useEffect, useRef } from 'react';
import { Leva } from 'leva';
import { folder, button, useControls } from 'leva';
import Stats from 'stats-js';
import * as Spector from 'spectorjs';
// import DebugArray from './DebugArray.js';

const active = window.location.hash.includes("debug") || window.location.search.includes("debug"); //#debug or ?debug

export function getDebug(){
    return active;
}

//Leva
export function addLevaDebug(name, options){
    if(active){
        const object = useControls(name, options, {collapsed: true});
        return object;
    }
    return null;
};

//Stats
let stats;

function AddStats(){
    let time = 0;
    const requestRef = useRef();
    let dp =  window.devicePixelRatio;
    window.devicePixelRatio = 2;
    stats = new Stats();
    window.devicePixelRatio = dp;
    const tick = function(){
        stats.begin();
        requestRef.current = requestAnimationFrame(tick);
        stats.end();
        if(Date.now() >= time + 1000){
            updateParticlesPanel();
            time = Date.now();
        }
        return function(){
            cancelAnimationFrame(requestRef.current);
        }
    }
    useEffect(function(){
        jQuery("body").append(stats.dom)
        jQuery("body").children().last().wrap("<div id='stats-js'></div>");
        requestRef.current = requestAnimationFrame(tick);
        return function(){
            jQuery("#stats-js").remove();
            cancelAnimationFrame(requestRef.current);
        };
    }, []);
}

// panels color
//
// "#ff0000", "#220000" //red
// "#00ff00", "#002200" //green - MS
// "#0000ff", "#000022" //blue
//
// "#ffff00", "#222200" //yellow
// "#00ffff", "#002222" //cyan - FPS
// "#ff00ff", "#220022" //magenta
//
// "#ff007f", "#220011" //red/magenta - MB
// "#7fff00", "#112200" //lime/olive
// "#007fff", "#001122" //indigo
//
// "#ff7f00", "#221100" //orange
// "#00ff7f", "#002211" //turquoise/green
// "#7f00ff", "#110022" //purple
//
// "#ffff7f", "#222211" //yellow - P
// "#ff7fff", "#221122" //pink
// "#7fffff", "#112222" //cyan
//
// "#ffffff", "#222222" //white
// "#7f7f7f", "#111111" //gray

let particlesPanel;
let particlesArray = [];

export function addParticlesPanel(array){
    particlesArray = array;
    if(active && !particlesPanel){
        let dp =  window.devicePixelRatio;
        window.devicePixelRatio = 2;
        let panel = new Stats.Panel("P", "#ffff7f", "#222211");
        window.devicePixelRatio = dp;
        particlesPanel = stats.addPanel(panel);
        stats.showPanel(0);
        updateParticlesPanel();
    }
};

function updateParticlesPanel(){
    if(particlesPanel){
        particlesPanel.update(particlesArray.length, 1000);
    }
}

//Spector
function AddSpector(){
    const spector = new Spector.Spector();
    const requestRef = useRef();
    const tick = function(){
        requestRef.current = requestAnimationFrame(tick);
        $(".fpsCounterComponent").text("");
        return function(){
            cancelAnimationFrame(requestRef.current);
        }
    }
    useEffect(function(){
        requestRef.current = requestAnimationFrame(tick);
        spector.displayUI();
        return function(){
            spector.stopCapture();
            cancelAnimationFrame(requestRef.current);
            jQuery(".captureMenuComponent").parent().remove();
            jQuery(".resultViewComponent").remove();
        };
    }, []);
}

export function Debug(){
    return <>
        {active ? <Leva oneLineLabels={true} /> : null}
        {active ? <AddStats /> : null}
        {active ? <AddSpector /> : null}
        {active ? <div id="overlay">
            <bootstrap.Container>
                <bootstrap.Row>
                    <bootstrap.Col md={1}><div className="overlay-col"></div></bootstrap.Col>
                    <bootstrap.Col md={1}><div className="overlay-col"></div></bootstrap.Col>
                    <bootstrap.Col md={1}><div className="overlay-col"></div></bootstrap.Col>
                    <bootstrap.Col md={1}><div className="overlay-col"></div></bootstrap.Col>
                    <bootstrap.Col md={1}><div className="overlay-col"></div></bootstrap.Col>
                    <bootstrap.Col md={1}><div className="overlay-col"></div></bootstrap.Col>
                    <bootstrap.Col md={1}><div className="overlay-col"></div></bootstrap.Col>
                    <bootstrap.Col md={1}><div className="overlay-col"></div></bootstrap.Col>
                    <bootstrap.Col md={1}><div className="overlay-col"></div></bootstrap.Col>
                    <bootstrap.Col md={1}><div className="overlay-col"></div></bootstrap.Col>
                    <bootstrap.Col md={1}><div className="overlay-col"></div></bootstrap.Col>
                    <bootstrap.Col md={1}><div className="overlay-col"></div></bootstrap.Col>
                </bootstrap.Row>
            </bootstrap.Container>
        </div> : null}
    </>;
};
