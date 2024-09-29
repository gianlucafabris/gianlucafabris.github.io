import React, { useRef, useEffect } from 'react';

import PrintablesConfig from '../Config/printables2D.js';

function draw(canvas){
    const context = canvas.getContext('2d');
    context.beginPath();
    context.lineTo(110, 216);
    context.lineTo(172, 250);
    context.lineTo(172, 182);
    context.lineTo(110, 146);
    context.fillStyle = PrintablesConfig.ambientLight.color;
    context.fill();
    context.beginPath();
    context.lineTo(110, 285);
    context.lineTo(110, 216);
    context.lineTo(172, 250);
    context.moveTo(172, 110);
    context.lineTo(110, 146);
    context.lineTo(172, 182);
    context.lineTo(172, 250);
    context.lineTo(230, 216);
    context.lineTo(230, 146);
    context.fillStyle = PrintablesConfig.printables.color;
    context.fill();
}

export default function PrintablesExperience2D() {
    const canvasRef = useRef(null);
    useEffect(() => {
        const canvas = canvasRef.current;
        canvas.id = "printablesCanvas";
        canvas.height = 395;
        canvas.width = 340;
        draw(canvas);
    }, []);
    $(window).on("resize", function(){
        const canvas = $("#printablesCanvas")[0];
        canvas.height = 395;
        canvas.width = 340;
        draw(canvas);
    });
    return <>
        <canvas ref={canvasRef} width={395} height={340} />
    </>;
};
