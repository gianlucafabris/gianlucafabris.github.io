import { useEffect } from 'react';
import Typed from 'typed.js';
import { folder, button } from 'leva';

import { addLevaDebug } from './Utils/Debug';

export default function Typing({typedContainer, typingConfig}){
    let typedJS;
    let config = addLevaDebug("typed", {
        strings: folder({
            strings_0: {
                value: typingConfig.strings[0],
                label: "0"
            }
        }, {collapsed: true}), // TODO array
        stringsElement: {
            value: (typingConfig.stringsElement == null ? "" : typingConfig.stringsElement)
        },
        typeSpeed: {
            value: typingConfig.typeSpeed,
            min: 0,
            max: 100,
            step: 1
        },
        startDelay: {
            value: typingConfig.startDelay,
            min: 0,
            max: 10000,
            step: 100
        },
        backSpeed: {
            value: typingConfig.backSpeed,
            min: 0,
            max: 100,
            step: 1
        },
        smartBackspace: {
            value: typingConfig.smartBackspace
        },
        shuffle: {
            value: typingConfig.shuffle
        },
        backDelay: {
            value: typingConfig.backDelay,
            min: 0,
            max: 10000,
            step: 100
        },
        fadeOut: {
            value: typingConfig.fadeOut
        },
        fadeOutClass: {
            value: typingConfig.fadeOutClass
        },
        fadeOutDelay: {
            value: typingConfig.fadeOutDelay,
            min: 0,
            max: 10000,
            step: 100
        },
        loop: {
            value: typingConfig.loop
        },
        loopCount: {
            value: (typingConfig.loopCount == Infinity ? 0 : typingConfig.loopCount),
            min: 0,
            max: 1000,
            step: 1
        },
        showCursor: {
            value: typingConfig.showCursor
        },
        cursorChar: {
            value: typingConfig.cursorChar
        },
        autoInsertCss: {
            value: typingConfig.autoInsertCss
        },
        attr: {
            value: (typingConfig.attr == null ? "" : typingConfig.attr)
        },
        bindInputFocusEvents: {
            value: typingConfig.bindInputFocusEvents
        },
        contentType: {
            value: typingConfig.contentType,
            options: ["html", "null"]
        },
        onBegin: button(typingConfig.onBegin),
        onComplete: button(typingConfig.onComplete),
        preStringTyped: button(typingConfig.preStringTyped),
        onStringTyped: button(typingConfig.onStringTyped),
        onLastStringBackspaced: button(typingConfig.onLastStringBackspaced),
        onTypingPaused: button(typingConfig.onTypingPaused),
        onTypingResumed: button(typingConfig.onTypingResumed),
        onReset: button(typingConfig.onReset),
        onStop: button(typingConfig.onStop),
        onStart: button(typingConfig.onStart),
        onDestroy: button(typingConfig.onDestroy)
    });
    if(config == null){
        config = {...typingConfig}
    }else{
        //ouput fix
        config.strings = [];
        config.strings[0] = config.strings_0; // TODO array
        delete config.strings_0;
        if(config.stringsElement != null && (config.stringsElement == "" || config.stringsElement.trim() == "")){
            config.stringsElement = null;
        }
        if(config.loopCount == 0){
            config.loopCount = Infinity;
        }
        if(config.attr != null && (config.attr == "" || config.attr.trim() == "")){
            config.attr = null;
        }
        config.onBegin = typingConfig.onBegin;
        config.onComplete = typingConfig.onComplete;
        config.preStringTyped = typingConfig.preStringTyped;
        config.onStringTyped = typingConfig.onStringTyped;
        config.onLastStringBackspaced = typingConfig.onLastStringBackspaced;
        config.onTypingPaused = typingConfig.onTypingPaused;
        config.onTypingResumed = typingConfig.onTypingResumed;
        config.onReset = typingConfig.onReset;
        config.onStop = typingConfig.onStop;
        config.onStart = typingConfig.onStart;
        config.onDestroy = typingConfig.onDestroy;
        //folder labels fix
        setTimeout(function(){
            jQuery('.leva-c-dosbYs').each(function(){
                $(this).children().last().text($(this).children().last().text().split("_").pop());
            });
        }, 1000);
    }
    useEffect(function(){
        jQuery("body").append(`<div class="${typedContainer}box"><span id="${typedContainer}"></span></div>`);
        return function(){
            jQuery("body>#" + typedContainer).parent().remove();
        };
    }, []);
    useEffect(function(){
        typedJS = new Typed("#" + typedContainer, config);
        return function(){
            typedJS.destroy();
        };
    }, [config]);
    return <>
        <div className={typedContainer + "box"}>
            <span id={typedContainer}></span>
        </div>
    </>;
};
