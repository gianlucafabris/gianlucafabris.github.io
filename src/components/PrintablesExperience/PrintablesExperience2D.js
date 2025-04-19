import React, { useRef, useEffect } from 'react';
import { folder } from 'leva';

import { addLevaDebug } from '../Utils/Debug.js';

import PrintablesConfig from '../Config/printables2D.js';

function draw(canvas, config){
    const context = canvas.getContext('2d');
    context.beginPath();
    context.lineTo(10, 116);
    context.lineTo(72, 150);
    context.lineTo(72, 82);
    context.lineTo(10, 46);
    context.fillStyle = config.ambientLight.color;
    context.fill();
    context.beginPath();
    context.lineTo(10, 185);
    context.lineTo(10, 116);
    context.lineTo(72, 150);
    context.moveTo(72, 10);
    context.lineTo(10, 46);
    context.lineTo(72, 82);
    context.lineTo(72, 150);
    context.lineTo(130, 116);
    context.lineTo(130, 46);
    context.fillStyle = config.printables.color;
    context.fill();
}

export default function PrintablesExperience2D({printablesContainer}) {
    let config = addLevaDebug("2d experience", {
        ambientLight: folder({
            ambientLight_color: {
                value: PrintablesConfig.ambientLight.color,
                label: "color"
            }
        }, {collapsed: true}),
        printables: folder({
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
        config.ambientLight.color = config.ambientLight_color;
        delete config.ambientLight_color;
        config.printables = {}
        config.printables.color = config.printables_color;
        delete config.printables_color;
        //folder labels fix
        setTimeout(function(){
            jQuery('.leva-c-dosbYs').each(function(){
                $(this).children().last().text($(this).children().last().text().split("_").pop());
            });
        }, 1000);
    }
    const canvasRef = useRef(null);
    useEffect(() => {
        const canvas = canvasRef.current;
        canvas.id = "printables2DCanvas";
        canvas.height = 200;
        canvas.width = 140;
        draw(canvas, config);
    }, [config]);
    $(window).on("resize", function(){
        const canvas = $("#printables2DCanvas")[0];
        canvas.height = 200;
        canvas.width = 140;
        draw(canvas, config);
    });
    return <>
        <div className={printablesContainer}>
            <canvas ref={canvasRef} width={395} height={340} />
        </div>
    </>;
};
