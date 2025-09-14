import { $ as jQuery } from 'react-jquery-plugin';
import { useEffect, useRef } from 'react';
import Typed from 'typed.js';

//debug
import { folder, button } from 'leva';

import { useLevaDebug } from './Utils/Debug.jsx';

export default function Typing({ typedContainer, TypingConfig }){
    const typedRef = useRef();

    let config = {...TypingConfig};
    
    if(import.meta.env.DEV){
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
            loopCount: {value: (TypingConfig.loopCount == Infinity ? 0 : TypingConfig.loopCount), min: 0, max: 1000, step: 1},
            showCursor: {value: TypingConfig.showCursor},
            cursorChar: {value: TypingConfig.cursorChar},
            autoInsertCss: {value: TypingConfig.autoInsertCss},
            attr: {value: (TypingConfig.attr == null ? "" : TypingConfig.attr)},
            bindInputFocusEvents: {value: TypingConfig.bindInputFocusEvents},
            contentType: {value: TypingConfig.contentType, options: ["html", "null"]},
            onBegin: button(TypingConfig.onBegin),
            onComplete: button(TypingConfig.onComplete),
            preStringTyped: button(TypingConfig.preStringTyped),
            onStringTyped: button(TypingConfig.onStringTyped),
            onLastStringBackspaced: button(TypingConfig.onLastStringBackspaced),
            onTypingPaused: button(TypingConfig.onTypingPaused),
            onTypingResumed: button(TypingConfig.onTypingResumed),
            onReset: button(TypingConfig.onReset),
            onStop: button(TypingConfig.onStop),
            onStart: button(TypingConfig.onStart),
            onDestroy: button(TypingConfig.onDestroy)
        });

        if(config == null || JSON.stringify(config) === '{}'){
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
            if(config.loopCount == 0){
                config.loopCount = Infinity;
            }
            if(config.attr != null && (config.attr == "" || config.attr.trim() == "")){
                config.attr = null;
            }
            config.onBegin = TypingConfig.onBegin;
            config.onComplete = TypingConfig.onComplete;
            config.preStringTyped = TypingConfig.preStringTyped;
            config.onStringTyped = TypingConfig.onStringTyped;
            config.onLastStringBackspaced = TypingConfig.onLastStringBackspaced;
            config.onTypingPaused = TypingConfig.onTypingPaused;
            config.onTypingResumed = TypingConfig.onTypingResumed;
            config.onReset = TypingConfig.onReset;
            config.onStop = TypingConfig.onStop;
            config.onStart = TypingConfig.onStart;
            config.onDestroy = TypingConfig.onDestroy;
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
