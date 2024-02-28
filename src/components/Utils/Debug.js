import * as bootstrap from 'react-bootstrap';

import { useEffect, useRef } from 'react';
import { Leva } from 'leva';
import { folder, button, useControls } from 'leva';
import Stats from 'stats-js';
import * as Spector from 'spectorjs';
// import DebugArray from './DebugArray.js';

let stats;
let gpumsPanel;
let particlesPanel;
let particlesArray = [];
const active = window.location.hash.includes("#debug");

export function getDebug(){
    return active;
}

export function addDebug(name, options){
    if(active){
        const object = useControls(name, options, {collapsed: true});
        return object;
    }
    return null;
};

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
export function addParticlesPanel(array){
    particlesArray = array;
    if(active && !particlesPanel){
        let dp =  window.devicePixelRatio;
        window.devicePixelRatio = 2;
        let panel = new Stats.Panel("P", "#ffff7f", "#222211");
        window.devicePixelRatio = dp;
        particlesPanel = stats.addPanel(panel);
        jQuery("#stats-js").children().children().last().css({"width": "160px", "height": "96px"})
        stats.showPanel(0);
        updateParticlesPanel();
    }
};

function updateParticlesPanel(){
    if(particlesPanel){
        particlesPanel.update(particlesArray.length, 1000);
    }
}

export function Debug(){
    let dp =  window.devicePixelRatio;
    window.devicePixelRatio = 2;
    stats = new Stats();
    window.devicePixelRatio = dp;
    const spector = new Spector.Spector();
    if(active){
        let time = 0;
        const requestRef = useRef();
        const tick = function(){
            stats.begin();
            requestRef.current = requestAnimationFrame(tick);
            stats.end();
            $(".fpsCounterComponent").text("");
            if(Date.now() >= time + 1000){
                updateParticlesPanel();
                time = Date.now();
            }
            return function(){
                cancelAnimationFrame(requestRef.current);
            }
        }
        useEffect(function(){
            // Stats
            jQuery("body").append(stats.dom)
            jQuery("body").children().last().wrap("<div id='stats-js'></div>");
            jQuery("#stats-js").children().children().each(function(i){
                $(this).css({"width": "160px", "height": "96px"})
            });
            requestRef.current = requestAnimationFrame(tick);
            // Spector
            spector.displayUI();
            return function(){
                // Stats
                jQuery("#stats-js").remove();
                spector.stopCapture();
                cancelAnimationFrame(requestRef.current);
                // Spector
                jQuery(".captureMenuComponent").parent().remove();
                jQuery(".resultViewComponent").remove();
            };
        }, []);
    }
    return <>
        {active ? <Leva oneLineLabels={true} /> : null}
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
