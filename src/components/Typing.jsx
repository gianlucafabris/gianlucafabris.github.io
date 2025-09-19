import { $ as jQuery } from "react-jquery-plugin";
import { useEffect, useRef } from "react";
import Typed from "typed.js";

// debug
let folder = null;
let useLevaDebug = null;
if(import.meta.env.DEV){
    const leva = await import("leva");
    const debug = await import("./utils/Debug.jsx");
    folder = leva.folder;
    useLevaDebug = debug.useLevaDebug;
}

export default function Typing({ typedContainer, TypingConfig }){
    const typedRef = useRef();

    let config = {...TypingConfig};
    
    if(import.meta.env.DEV){
        // debug
        config = useLevaDebug("typed", {
            strings: folder({
                ...TypingConfig.strings.reduce(function(acc, str, i){
                    acc[`string_${i}`] = {value: str, label: `${i}`};
                    return acc;
                }, {})
            }, {collapsed: true}),
            stringsElement: {value: (TypingConfig.stringsElement == null ? "" : TypingConfig.stringsElement)},
            typeSpeed: {value: TypingConfig.typeSpeed, min: 0, max: 100, step: 1},
            startDelay: {value: TypingConfig.startDelay, min: 0, max: 10000, step: 100},
            backSpeed: {value: TypingConfig.backSpeed, min: 0, max: 100, step: 1},
            smartBackspace: {value: TypingConfig.smartBackspace},
            shuffle: {value: TypingConfig.shuffle},
            backDelay: {value: TypingConfig.backDelay, min: 0, max: 10000, step: 100},
            fadeOut: {value: TypingConfig.fadeOut},
            fadeOutClass: {value: TypingConfig.fadeOutClass},
            fadeOutDelay: {value: TypingConfig.fadeOutDelay, min: 0, max: 10000, step: 100},
            loop: {value: TypingConfig.loop},
            loopCount: {value: TypingConfig.loopCount, min: 0, max: 1000, step: 1},
            showCursor: {value: TypingConfig.showCursor},
            cursorChar: {value: TypingConfig.cursorChar},
            autoInsertCss: {value: TypingConfig.autoInsertCss},
            attr: {value: (TypingConfig.attr == null ? "" : TypingConfig.attr)},
            bindInputFocusEvents: {value: TypingConfig.bindInputFocusEvents},
            contentType: {value: TypingConfig.contentType, options: ["html", "null"]}
        });

        if(config == null || JSON.stringify(config) === "{}"){
            config = {...TypingConfig}
        }else{
            //ouput fix
            config.strings = TypingConfig.strings.map(function(str, i){
                return config[`string_${i}`];
            });
            TypingConfig.strings.map(function(str, i){
                delete config[`string_${i}`];
            });
            if(config.stringsElement != null && (config.stringsElement == "" || config.stringsElement.trim() == "")){
                config.stringsElement = null;
            }
            if(config.attr != null && (config.attr == "" || config.attr.trim() == "")){
                config.attr = null;
            }
        }
    }

    useEffect(function(){
        jQuery("body").append(`<div class="${typedContainer}box"><span id="${typedContainer}"></span></div>`);
        return function(){
            jQuery("body>#" + typedContainer).parent().remove();
        };
    }, []);

    useEffect(function(){
        if(import.meta.env.DEV){
            console.log("Typed.js initialized");
        }
        typedRef.current = new Typed("#" + typedContainer, config);
        return function(){
            typedRef.current?.destroy();
        };
    }, [config]);

    return <>
        <div className={typedContainer + "box"}>
            <span id={typedContainer}></span>
        </div>
    </>;
};
