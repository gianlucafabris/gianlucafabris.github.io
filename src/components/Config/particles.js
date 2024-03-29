export default {
    autoplay: true,
    background: {
        color: {
            value: ["#000000"]
            // value: [{
            //     hsl: {
            //         h: {
            //             min: 0,
            //             max: 0
            //         },
            //         s: {
            //             min: 0,
            //             max: 0
            //         },
            //         l: {
            //             min: 0,
            //             max: 0
            //         }
            //     }, //OPTIONAL
            //     hsv: {
            //         h: {
            //             min: 0,
            //             max: 0
            //         },
            //         s: {
            //             min: 0,
            //             max: 0
            //         },
            //         v: {
            //             min: 0,
            //             max: 0
            //         }
            //     }, //OPTIONAL
            //     rgb: {
            //         r: {
            //             min: 0,
            //             max: 0
            //         },
            //         g: {
            //             min: 0,
            //             max: 0
            //         },
            //         b: {
            //             min: 0,
            //             max: 0
            //         }
            //     } //OPTIONAL
            // }]
        },
        image: "",
        opacity: 1,
        position: "",
        repeat: "",
        size: ""
    },
    backgroundMask: {
        composite: "destination-out", //["source-over", "source-in", "source-out", "source-atop", "destination-over", "destination-in", "destination-out", "destination-atop", "lighter", "copy", "xor", "multiply", "screen", "overlay", "darken", "lighten", "color-edge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity"]
        cover: {
            color: {
                value: ["#000000"]
                // value: [{
                //     hsl: {
                //         h: {
                //             min: 0,
                //             max: 0
                //         },
                //         s: {
                //             min: 0,
                //             max: 0
                //         },
                //         l: {
                //             min: 0,
                //             max: 0
                //         }
                //     }, //OPTIONAL
                //     hsv: {
                //         h: {
                //             min: 0,
                //             max: 0
                //         },
                //         s: {
                //             min: 0,
                //             max: 0
                //         },
                //         v: {
                //             min: 0,
                //             max: 0
                //         }
                //     }, //OPTIONAL
                //     rgb: {
                //         r: {
                //             min: 0,
                //             max: 0
                //         },
                //         g: {
                //             min: 0,
                //             max: 0
                //         },
                //         b: {
                //             min: 0,
                //             max: 0
                //         }
                //     } //OPTIONAL
                // }]
            },
            opacity: 1
        },
        enable: false
    },
    delay: {
        min: 0,
        max: 0
    },
    detectRetina: true,
    duration: {
        min: 0,
        max: 0
    },
    fpsLimit: 60,
    fullScreen: {
        enable: false,
        zIndex: 0
    },
    interactivity: {
        detectsOn: "window", //["canvas", "parent", "window"]
        events: {
            onClick: {
                enable: true,
                mode: ["repulse"] //["attract", "bubble", "push", "remove", "repulse", "pause", "trail"]
            },
            onDiv: {
                enable: false,
                mode: ["bubble"], //["bounce", "bubble", "repulse"]
                selectors: ["#particles-js"],
                type: "rectangle" //["circle", "rectangle"]
            },
            onHover: {
                enable: true,
                mode: ["connect", "grab"], //["attract", "bounce", "bubble", "connect", "grab", "light", "repulse", "slow", "trail"]
                parallax: {
                    enable: false,
                    force: 0,
                    smooth: 0
                }
            },
            resize: {
                delay: 0,
                enable: true
            }
        },
        modes: { //???
            attract: {
                distance: 100,
                duration: 0.5,
                easing: "ease-out-quad", //["ease-in-back", "ease-out-back", "ease-in-out-back", "ease-in-circ", "ease-out-circ", "ease-in-out-circ", "ease-in-cubic", "ease-out-cubic", "ease-in-out-cubic", "ease-in-quad", "ease-out-quad", "ease-in-out-quad", "ease-in-quart", "ease-out-quart", "ease-in-out-quart", "ease-in-quint", "ease-out-quint", "ease-in-out-quint", "ease-in-expo", "ease-out-expo", "ease-in-out-expo", "ease-in-sine", "ease-out-sine", "ease-in-out-sine"]
                factor: 1,
                maxSpeed: 50,
                speed: 5
            },
            bounce: {
                distance: 100
            },
            bubble: {
                distance: 100,
                duration: 0.5,
                mix: false,
                opacity: 1,
                color: {
                    value: ["#ffffff"]
                    // value: [{
                    //     hsl: {
                    //         h: {
                    //             min: 0,
                    //             max: 0
                    //         },
                    //         s: {
                    //             min: 0,
                    //             max: 0
                    //         },
                    //         l: {
                    //             min: 0,
                    //             max: 0
                    //         }
                    //     }, //OPTIONAL
                    //     hsv: {
                    //         h: {
                    //             min: 0,
                    //             max: 0
                    //         },
                    //         s: {
                    //             min: 0,
                    //             max: 0
                    //         },
                    //         v: {
                    //             min: 0,
                    //             max: 0
                    //         }
                    //     }, //OPTIONAL
                    //     rgb: {
                    //         r: {
                    //             min: 0,
                    //             max: 0
                    //         },
                    //         g: {
                    //             min: 0,
                    //             max: 0
                    //         },
                    //         b: {
                    //             min: 0,
                    //             max: 0
                    //         }
                    //     } //OPTIONAL
                    // }]
                },
                size: 4,
                divs: {
                    distance: 100,
                    duration: 0.5,
                    mix: false,
                    selectors: [""]
                }
            },
            connect: {
                distance: 100,
                links: {
                    opacity: 0.11
                },
                radius: 100
            },
            grab: {
                distance: 100,
                links: {
                    blink: false,
                    consent: false,
                    opacity: 0.39
                }
            },
            light: {
                area: {
                    gradient: {
                        start: {
                            value: ["#ffffff"]
                            // value: [{
                            //     hsl: {
                            //         h: {
                            //             min: 0,
                            //             max: 0
                            //         },
                            //         s: {
                            //             min: 0,
                            //             max: 0
                            //         },
                            //         l: {
                            //             min: 0,
                            //             max: 0
                            //         }
                            //     }, //OPTIONAL
                            //     hsv: {
                            //         h: {
                            //             min: 0,
                            //             max: 0
                            //         },
                            //         s: {
                            //             min: 0,
                            //             max: 0
                            //         },
                            //         v: {
                            //             min: 0,
                            //             max: 0
                            //         }
                            //     }, //OPTIONAL
                            //     rgb: {
                            //         r: {
                            //             min: 0,
                            //             max: 0
                            //         },
                            //         g: {
                            //             min: 0,
                            //             max: 0
                            //         },
                            //         b: {
                            //             min: 0,
                            //             max: 0
                            //         }
                            //     } //OPTIONAL
                            // }]
                        },
                        stop: {
                            value: ["#000000"]
                            // value: [{
                            //     hsl: {
                            //         h: {
                            //             min: 0,
                            //             max: 0
                            //         },
                            //         s: {
                            //             min: 0,
                            //             max: 0
                            //         },
                            //         l: {
                            //             min: 0,
                            //             max: 0
                            //         }
                            //     }, //OPTIONAL
                            //     hsv: {
                            //         h: {
                            //             min: 0,
                            //             max: 0
                            //         },
                            //         s: {
                            //             min: 0,
                            //             max: 0
                            //         },
                            //         v: {
                            //             min: 0,
                            //             max: 0
                            //         }
                            //     }, //OPTIONAL
                            //     rgb: {
                            //         r: {
                            //             min: 0,
                            //             max: 0
                            //         },
                            //         g: {
                            //             min: 0,
                            //             max: 0
                            //         },
                            //         b: {
                            //             min: 0,
                            //             max: 0
                            //         }
                            //     } //OPTIONAL
                            // }]
                        }
                    },
                    radius: 100
                },
                shadow: {
                    color: {
                        value: ["#000000"]
                        // value: [{
                        //     hsl: {
                        //         h: {
                        //             min: 0,
                        //             max: 0
                        //         },
                        //         s: {
                        //             min: 0,
                        //             max: 0
                        //         },
                        //         l: {
                        //             min: 0,
                        //             max: 0
                        //         }
                        //     }, //OPTIONAL
                        //     hsv: {
                        //         h: {
                        //             min: 0,
                        //             max: 0
                        //         },
                        //         s: {
                        //             min: 0,
                        //             max: 0
                        //         },
                        //         v: {
                        //             min: 0,
                        //             max: 0
                        //         }
                        //     }, //OPTIONAL
                        //     rgb: {
                        //         r: {
                        //             min: 0,
                        //             max: 0
                        //         },
                        //         g: {
                        //             min: 0,
                        //             max: 0
                        //         },
                        //         b: {
                        //             min: 0,
                        //             max: 0
                        //         }
                        //     } //OPTIONAL
                        // }]
                    },
                    length: 2000
                }
            },
            push: {
                default: true,
                groups: [""],
                quantity: 4
            },
            remove: {
                quantity: 2
            },
            repulse: {
                distance: 120,
                duration: 0.5,
                factor: 1,
                speed: 5,
                maxSpeed: 50,
                easing: "ease-out-quad", //["ease-in-back", "ease-out-back", "ease-in-out-back", "ease-in-circ", "ease-out-circ", "ease-in-out-circ", "ease-in-cubic", "ease-out-cubic", "ease-in-out-cubic", "ease-in-quad", "ease-out-quad", "ease-in-out-quad", "ease-in-quart", "ease-out-quart", "ease-in-out-quart", "ease-in-quint", "ease-out-quint", "ease-in-out-quint", "ease-in-expo", "ease-out-expo", "ease-in-out-expo", "ease-in-sine", "ease-out-sine", "ease-in-out-sine"]
                divs: {
                    distance: 100,
                    duration: 0.5,
                    factor: 1,
                    speed: 5,
                    maxSpeed: 50,
                    easing: "ease-out-quad", //["ease-in-back", "ease-out-back", "ease-in-out-back", "ease-in-circ", "ease-out-circ", "ease-in-out-circ", "ease-in-cubic", "ease-out-cubic", "ease-in-out-cubic", "ease-in-quad", "ease-out-quad", "ease-in-out-quad", "ease-in-quart", "ease-out-quart", "ease-in-out-quart", "ease-in-quint", "ease-out-quint", "ease-in-out-quint", "ease-in-expo", "ease-out-expo", "ease-in-out-expo", "ease-in-sine", "ease-out-sine", "ease-in-out-sine"]
                    selectors: [""]
                }
            },
            pause: {},
            slow: {
                factor: 1,
                radius: 100
            },
            trail: {
                delay: 0,
                pauseOnStop: false,
                quantity: 4
            }
        }
    },
    manualParticles: [{
        options: {}, //OPTIONAL particles
        position: {
            x: 0,
            y: 0
        } //OPTIONAL
    }],
    particles: {
        bounce: {
            horizontal: {
                value: {
                    min: 0,
                    max: 0
                }
            },
            vertical: {
                value: {
                    min: 0,
                    max: 0
                }
            }
        },
        collisions: {
            absorb: {
                speed: 0
            },
            bounce: {}, //bounce
            enable: false,
            mode: "bounce", //["absorb", "bounce", "destroy"]
            overlap: {
                enable: false,
                retries: 0
            }
        },
        color: {
            value: ["#ffffff"]
            // value: [{
            //     hsl: {
            //         h: {
            //             min: 0,
            //             max: 0
            //         },
            //         s: {
            //             min: 0,
            //             max: 0
            //         },
            //         l: {
            //             min: 0,
            //             max: 0
            //         }
            //     }, //OPTIONAL
            //     hsv: {
            //         h: {
            //             min: 0,
            //             max: 0
            //         },
            //         s: {
            //             min: 0,
            //             max: 0
            //         },
            //         v: {
            //             min: 0,
            //             max: 0
            //         }
            //     }, //OPTIONAL
            //     rgb: {
            //         r: {
            //             min: 0,
            //             max: 0
            //         },
            //         g: {
            //             min: 0,
            //             max: 0
            //         },
            //         b: {
            //             min: 0,
            //             max: 0
            //         }
            //     } //OPTIONAL
            // }]
            // value: {
            //     animation: {
            //         offset: {
            //             min: 0,
            //             max: 255
            //         }
            //     }
            // }
            // value: {
            //     animation: {
            //         h: {
            //             offset: {
            //                 min: 0,
            //                 max: 360
            //             }
            //         },
            //         s: {
            //             offset: {
            //                 min: 0,
            //                 max: 100
            //             }
            //         },
            //         l: {
            //             offset: {
            //                 min: 0,
            //                 max: 100
            //             }
            //         }
            //     }
            // }
        },
        groups: {}, //particles
        interactivity: {}, //OPTIONAL interactivity
        links: { //???
            blink: false,
            color: {
                value: ["#ffffff"]
                // value: [{
                //     hsl: {
                //         h: {
                //             min: 0,
                //             max: 0
                //         },
                //         s: {
                //             min: 0,
                //             max: 0
                //         },
                //         l: {
                //             min: 0,
                //             max: 0
                //         }
                //     }, //OPTIONAL
                //     hsv: {
                //         h: {
                //             min: 0,
                //             max: 0
                //         },
                //         s: {
                //             min: 0,
                //             max: 0
                //         },
                //         v: {
                //             min: 0,
                //             max: 0
                //         }
                //     }, //OPTIONAL
                //     rgb: {
                //         r: {
                //             min: 0,
                //             max: 0
                //         },
                //         g: {
                //             min: 0,
                //             max: 0
                //         },
                //         b: {
                //             min: 0,
                //             max: 0
                //         }
                //     } //OPTIONAL
                // }]
            },
            consent: false,
            distance: 100,
            enable: true,
            frequency: 1,
            opacity: 0.39,
            shadow: {
                blur: 5,
                color: {
                    value: ["#000000"]
                    // value: [{
                    //     hsl: {
                    //         h: {
                    //             min: 0,
                    //             max: 0
                    //         },
                    //         s: {
                    //             min: 0,
                    //             max: 0
                    //         },
                    //         l: {
                    //             min: 0,
                    //             max: 0
                    //         }
                    //     }, //OPTIONAL
                    //     hsv: {
                    //         h: {
                    //             min: 0,
                    //             max: 0
                    //         },
                    //         s: {
                    //             min: 0,
                    //             max: 0
                    //         },
                    //         v: {
                    //             min: 0,
                    //             max: 0
                    //         }
                    //     }, //OPTIONAL
                    //     rgb: {
                    //         r: {
                    //             min: 0,
                    //             max: 0
                    //         },
                    //         g: {
                    //             min: 0,
                    //             max: 0
                    //         },
                    //         b: {
                    //             min: 0,
                    //             max: 0
                    //         }
                    //     } //OPTIONAL
                    // }]
                },
                enable: false
            },
            triangles: {
                enable: false,
                frequency: 1,
                opacity: 0.11
            },
            width: 1,
            warp: false
        },
        move: {
            angle: {
                offset: {
                    min: 0,
                    max: 0
                },
                value: {
                    min: 0,
                    max: 0
                }
            },
            attract: {
                distance: {
                    min: 100,
                    max: 100
                },
                enable: true,
                rotate: {
                    x: 600,
                    y: 1200
                }
            },
            center: {
                mode: "precise", //["precise", "percent"]
                radius: 1
            },
            decay: {
                min: 0,
                max: 0
            },
            direction: "none", //["bottom", "bottom-left", "bottom-right", "left", "none", "right", "top", "top-left", "top-right", "outside", "inside"]
            distance: {
                horizontal: 10000,
                vertical: 10000
            },
            drift: {
                min: 0,
                max: 0
            },
            enable: true,
            gravity: {
                acceleration: {
                    min: 0,
                    max: 0
                },
                enable: false,
                inverse: false,
                maxSpeed: {
                    min: 0,
                    max: 0
                }
            },
            outModes: {
                bottom: "out", //OPTIONAL ["bounce", "bounce-horizontal", "bounce-vertical", "none", "out", "destroy", "split"]
                default: "out", //["bounce", "bounce-horizontal", "bounce-vertical", "none", "out", "destroy", "split"]
                left: "out", //OPTIONAL ["bounce", "bounce-horizontal", "bounce-vertical", "none", "out", "destroy", "split"]
                right: "out", //OPTIONAL ["bounce", "bounce-horizontal", "bounce-vertical", "none", "out", "destroy", "split"]
                top: "out" //OPTIONAL ["bounce", "bounce-horizontal", "bounce-vertical", "none", "out", "destroy", "split"]
            },
            path: {
                clamp: false,
                delay: {
                    value: {
                        min: 0,
                        max: 0
                    }
                },
                enable: false,
                generator: "", //OPTIONAL ???
                options: "" //???
            },
            random: true,
            size: 1,
            speed: {
                min: 1,
                max: 0.1
            },
            spin: {
                acceleration: {
                    min: 0,
                    max: 0
                },
                enable: false,
                position: {
                    x: 50,
                    y: 50
                } //OPTIONAL
            },
            straight: false,
            trail: {
                enable: false,
                fill: {
                    color: {
                        value: ["#ffffff"]
                        // value: [{
                        //     hsl: {
                        //         h: {
                        //             min: 0,
                        //             max: 0
                        //         },
                        //         s: {
                        //             min: 0,
                        //             max: 0
                        //         },
                        //         l: {
                        //             min: 0,
                        //             max: 0
                        //         }
                        //     }, //OPTIONAL
                        //     hsv: {
                        //         h: {
                        //             min: 0,
                        //             max: 0
                        //         },
                        //         s: {
                        //             min: 0,
                        //             max: 0
                        //         },
                        //         v: {
                        //             min: 0,
                        //             max: 0
                        //         }
                        //     }, //OPTIONAL
                        //     rgb: {
                        //         r: {
                        //             min: 0,
                        //             max: 0
                        //         },
                        //         g: {
                        //             min: 0,
                        //             max: 0
                        //         },
                        //         b: {
                        //             min: 0,
                        //             max: 0
                        //         }
                        //     } //OPTIONAL
                        // }]
                    }, //OPTIONAL
                    image: "" //OPTIONAL
                },
                length: 0
            },
            vibrate: false,
            warp: false
        },
        number: {
            density: {
                enable: true,
                height: 1440,
                width: 2560
            },
            limit: 2000,
            value: 500
        },
        opacity: {
            value: 1,
            random: true,
            animation: {
                destroy: "none", //["none", "max", "min"]
                startValue: "random" //["max", "min", "random"]
            }
        },
        reduceDuplicates: true,
        shadow: {
            blur: 0,
            color: {
                value: ["#000000"]
                // value: [{
                //     hsl: {
                //         h: {
                //             min: 0,
                //             max: 0
                //         },
                //         s: {
                //             min: 0,
                //             max: 0
                //         },
                //         l: {
                //             min: 0,
                //             max: 0
                //         }
                //     }, //OPTIONAL
                //     hsv: {
                //         h: {
                //             min: 0,
                //             max: 0
                //         },
                //         s: {
                //             min: 0,
                //             max: 0
                //         },
                //         v: {
                //             min: 0,
                //             max: 0
                //         }
                //     }, //OPTIONAL
                //     rgb: {
                //         r: {
                //             min: 0,
                //             max: 0
                //         },
                //         g: {
                //             min: 0,
                //             max: 0
                //         },
                //         b: {
                //             min: 0,
                //             max: 0
                //         }
                //     } //OPTIONAL
                // }]
            },
            enable: false,
            offset: {
                x: 0,
                y: 0
            }
        },
        shape: {
            options: [{
                close: false, //OPTIONAL
                fill: false, //OPTIONAL
                particles: {}, //OPTIONAL particles
                //character
                font: "", //OPTIONAL
                style: "", //OPTIONAL
                value: [""], //OPTIONAL
                weight: "", //OPTIONAL
                //image
                height: 0, //OPTIONAL
                replaceColor: false, //OPTIONAL
                src: "", //OPTIONAL
                width: 0, //OPTIONAL
                //star
                inset: 1, //OPTIONAL
                //polygon || star
                sides: 1 //OPTIONAL
            }],
            type: ["circle"] //["character", "image", "polygon", "star", "circle", "square", "triangle"]
        },
        size: {
            value: {
                min: 0.1,
                max: 2
            },
            animation: {
                destroy: "none", //["none", "max", "min"]
                startValue: "random" //["max", "min", "random"]
            }
        },
        stroke: [{
            color: {
                value: ["#000000"]
                // value: [{
                //     hsl: {
                //         h: {
                //             min: 0,
                //             max: 0
                //         },
                //         s: {
                //             min: 0,
                //             max: 0
                //         },
                //         l: {
                //             min: 0,
                //             max: 0
                //         }
                //     }, //OPTIONAL
                //     hsv: {
                //         h: {
                //             min: 0,
                //             max: 0
                //         },
                //         s: {
                //             min: 0,
                //             max: 0
                //         },
                //         v: {
                //             min: 0,
                //             max: 0
                //         }
                //     }, //OPTIONAL
                //     rgb: {
                //         r: {
                //             min: 0,
                //             max: 0
                //         },
                //         g: {
                //             min: 0,
                //             max: 0
                //         },
                //         b: {
                //             min: 0,
                //             max: 0
                //         }
                //     } //OPTIONAL
                // }]
                // value: {
                //     animation: {
                //         offset: {
                //             min: 0,
                //             max: 255
                //         }
                //     }
                // }
                // value: {
                //     animation: {
                //         h: {
                //             offset: {
                //                 min: 0,
                //                 max: 360
                //             }
                //         },
                //         s: {
                //             offset: {
                //                 min: 0,
                //                 max: 100
                //             }
                //         },
                //         l: {
                //             offset: {
                //                 min: 0,
                //                 max: 100
                //             }
                //         }
                //     }
                // }
            }, //OPTIONAL
            opacity: {
                min: 0,
                max: 0
            }, //OPTIONAL
            width: {
                min: 0,
                max: 0
            }
        }],
        zIndex: {
            value: 0,
            opacityRate: 1,
            sizeRate: 1,
            velocityRate: 1
        }
    },
    pauseOnBlur: false,
    pauseOnOutSideViewport: false,
    preset: [""], //OPTIONAL ["", "basic", "confetti", "fireworks", "stars", "snow", "bubbles", "firefly", "links", "fire", "seaAnemone", "fountain", "bigCircles", "blossomFallV1", "FlyingBat"]
    responsive: [{
        maxWidth: 3840,
        mode: "screen", //["screen", "canvas"]
        options: {} //options
    }],
    smooth: true,
    style: "",
    themes: [{
        default: {
            auto: true,
            mode: "any", //["any", "dark", "light"]
            value: false
        },
        name: "",
        options: {} //OPTIONAL options
    }],
    zLayers: 1,
    // absorbers: [{
    //     color: {
    //         value: ["#ffffff"]
    //         // value: [{
    //         //     hsl: {
    //         //         h: {
    //         //             min: 0,
    //         //             max: 0
    //         //         },
    //         //         s: {
    //         //             min: 0,
    //         //             max: 0
    //         //         },
    //         //         l: {
    //         //             min: 0,
    //         //             max: 0
    //         //         }
    //         //     }, //OPTIONAL
    //         //     hsv: {
    //         //         h: {
    //         //             min: 0,
    //         //             max: 0
    //         //         },
    //         //         s: {
    //         //             min: 0,
    //         //             max: 0
    //         //         },
    //         //         v: {
    //         //             min: 0,
    //         //             max: 0
    //         //         }
    //         //     }, //OPTIONAL
    //         //     rgb: {
    //         //         r: {
    //         //             min: 0,
    //         //             max: 0
    //         //         },
    //         //         g: {
    //         //             min: 0,
    //         //             max: 0
    //         //         },
    //         //         b: {
    //         //             min: 0,
    //         //             max: 0
    //         //         }
    //         //     } //OPTIONAL
    //         // }]
    //     },
    //     destroy: false,
    //     draggable: false,
    //     enable: false,
    //     name: "", //OPTIONAL
    //     opacity: 0,
    //     orbits: false,
    //     position: {
    //         x: {
    //             min: 0,
    //             max: 0
    //         },
    //         y: {
    //             min: 0,
    //             max: 0
    //         }
    //     }, //OPTIONAL
    //     size: {
    //         density: 0,
    //         limit: {
    //             mass: 0,
    //             radius: 0
    //         } //OPTIONAL
    //     }
    // }],
    // canvasMask: {
    //     element: jQuery("#particles-js").children()[0], //OPTIONAL
    //     enable: false,
    //     image: {
    //         src: ""
    //     }, //OPTIONAL
    //     override: {
    //         color: false,
    //         opacity: false
    //     },
    //     pixels: {
    //         filter: "", //???
    //         // filter: function(pixel){
    //         //     return false;
    //         // }
    //         offset: 0
    //     },
    //     position: {
    //         x: 0,
    //         y: 0
    //     },
    //     scale: 1,
    //     selector: "", //OPTIONAL
    //     text: {
    //         color: {
    //             value: ["#ffffff"]
    //             // value: [{
    //             //     hsl: {
    //             //         h: {
    //             //             min: 0,
    //             //             max: 0
    //             //         },
    //             //         s: {
    //             //             min: 0,
    //             //             max: 0
    //             //         },
    //             //         l: {
    //             //             min: 0,
    //             //             max: 0
    //             //         }
    //             //     }, //OPTIONAL
    //             //     hsv: {
    //             //         h: {
    //             //             min: 0,
    //             //             max: 0
    //             //         },
    //             //         s: {
    //             //             min: 0,
    //             //             max: 0
    //             //         },
    //             //         v: {
    //             //             min: 0,
    //             //             max: 0
    //             //         }
    //             //     }, //OPTIONAL
    //             //     rgb: {
    //             //         r: {
    //             //             min: 0,
    //             //             max: 0
    //             //         },
    //             //         g: {
    //             //             min: 0,
    //             //             max: 0
    //             //         },
    //             //         b: {
    //             //             min: 0,
    //             //             max: 0
    //             //         }
    //             //     } //OPTIONAL
    //             // }]
    //         },
    //         font: {
    //             family: "",
    //             size: "",
    //             style: "", //OPTIONAL
    //             variant: "", //OPTIONAL
    //             weight: "" //OPTIONAL
    //         },
    //         lines: {
    //             separator: "",
    //             spacing: 0
    //         },
    //         text: ""
    //     } //OPTIONAL
    // },
    // emitters: [{
    //     autoPlay: false,
    //     direction: "none", //OPTIONAL ["bottom", "bottom-left", "bottom-right", "left", "none", "right", "top", "top-left", "top-right", "outside", "inside"]
    //     domId: "particles-js", //OPTIONAL
    //     fill: false,
    //     life: {
    //         count: 0, //OPTIONAL
    //         delay: 0, //OPTIONAL
    //         duration: 0, //OPTIONAL
    //         wait: false
    //     },
    //     name: "", //OPTIONAL
    //     particles: [{}], //OPTIONAL particles
    //     position: {
    //         x: {
    //             min: 0,
    //             max: 0
    //         },
    //         y: {
    //             min: 0,
    //             max: 0
    //         }
    //     }, //OPTIONAL
    //     rate: {
    //         delay: 0,
    //         quantity: 1
    //     },
    //     shape: "circle", //["circle", "square"]
    //     size: {
    //         mode: "precise", //["precise", "percent"]
    //     }, //OPTIONAL
    //     spawnColor: {
    //         value: ["#ffffff"]
    //         // value: [{
    //         //     hsl: {
    //         //         h: {
    //         //             min: 0,
    //         //             max: 0
    //         //         },
    //         //         s: {
    //         //             min: 0,
    //         //             max: 0
    //         //         },
    //         //         l: {
    //         //             min: 0,
    //         //             max: 0
    //         //         }
    //         //     }, //OPTIONAL
    //         //     hsv: {
    //         //         h: {
    //         //             min: 0,
    //         //             max: 0
    //         //         },
    //         //         s: {
    //         //             min: 0,
    //         //             max: 0
    //         //         },
    //         //         v: {
    //         //             min: 0,
    //         //             max: 0
    //         //         }
    //         //     }, //OPTIONAL
    //         //     rgb: {
    //         //         r: {
    //         //             min: 0,
    //         //             max: 0
    //         //         },
    //         //         g: {
    //         //             min: 0,
    //         //             max: 0
    //         //         },
    //         //         b: {
    //         //             min: 0,
    //         //             max: 0
    //         //         }
    //         //     } //OPTIONAL
    //         // }]
    //         // value: {
    //         //     animation: {
    //         //         offset: {
    //         //             min: 0,
    //         //             max: 255
    //         //         }
    //         //     }
    //         // }
    //         // value: {
    //         //     animation: {
    //         //         h: {
    //         //             offset: {
    //         //                 min: 0,
    //         //                 max: 360
    //         //             }
    //         //         },
    //         //         s: {
    //         //             offset: {
    //         //                 min: 0,
    //         //                 max: 100
    //         //             }
    //         //         },
    //         //         l: {
    //         //             offset: {
    //         //                 min: 0,
    //         //                 max: 100
    //         //             }
    //         //         }
    //         //     }
    //         // }
    //     }, //OPTIONAL
    //     startCount: 0
    // }],
    // infection: {
    //     cure: false,
    //     delay: 0,
    //     enable: false,
    //     infections: 0,
    //     stages: [{
    //         color: {
    //             value: ["#ffffff"]
    //             // value: [{
    //             //     hsl: {
    //             //         h: {
    //             //             min: 0,
    //             //             max: 0
    //             //         },
    //             //         s: {
    //             //             min: 0,
    //             //             max: 0
    //             //         },
    //             //         l: {
    //             //             min: 0,
    //             //             max: 0
    //             //         }
    //             //     }, //OPTIONAL
    //             //     hsv: {
    //             //         h: {
    //             //             min: 0,
    //             //             max: 0
    //             //         },
    //             //         s: {
    //             //             min: 0,
    //             //             max: 0
    //             //         },
    //             //         v: {
    //             //             min: 0,
    //             //             max: 0
    //             //         }
    //             //     }, //OPTIONAL
    //             //     rgb: {
    //             //         r: {
    //             //             min: 0,
    //             //             max: 0
    //             //         },
    //             //         g: {
    //             //             min: 0,
    //             //             max: 0
    //             //         },
    //             //         b: {
    //             //             min: 0,
    //             //             max: 0
    //             //         }
    //             //     } //OPTIONAL
    //             // }]
    //         },
    //         duration: 0, //OPTIONAL
    //         infectedStage: 0, //OPTIONAL
    //         radius: 0,
    //         rate: 0
    //     }]
    // },
    // motion: {
    //     disable: false,
    //     reduce: {
    //         factor: 0,
    //         value: true
    //     }
    // },
    // polygonMask: {
    //     data: {
    //         path: [""],
    //         size: {
    //             height: 0,
    //             width: 0
    //         }
    //     }, //OPTIONAL
    //     draw: {
    //         enable: false,
    //         stroke: {
    //             color: {
    //                 value: ["#ffffff"]
    //                 // value: [{
    //                 //     hsl: {
    //                 //         h: {
    //                 //             min: 0,
    //                 //             max: 0
    //                 //         },
    //                 //         s: {
    //                 //             min: 0,
    //                 //             max: 0
    //                 //         },
    //                 //         l: {
    //                 //             min: 0,
    //                 //             max: 0
    //                 //         }
    //                 //     }, //OPTIONAL
    //                 //     hsv: {
    //                 //         h: {
    //                 //             min: 0,
    //                 //             max: 0
    //                 //         },
    //                 //         s: {
    //                 //             min: 0,
    //                 //             max: 0
    //                 //         },
    //                 //         v: {
    //                 //             min: 0,
    //                 //             max: 0
    //                 //         }
    //                 //     }, //OPTIONAL
    //                 //     rgb: {
    //                 //         r: {
    //                 //             min: 0,
    //                 //             max: 0
    //                 //         },
    //                 //         g: {
    //                 //             min: 0,
    //                 //             max: 0
    //                 //         },
    //                 //         b: {
    //                 //             min: 0,
    //                 //             max: 0
    //                 //         }
    //                 //     } //OPTIONAL
    //                 // }]
    //             },
    //             opacity: 0,
    //             width: 0
    //         }
    //     },
    //     enable: false,
    //     inline: {
    //         arrangement: "equidistant" //["equidistant", "one-per-point", "per-point", "random-length", "random-point"]
    //     },
    //     move: {
    //         radius: 0,
    //         type: "path" //["path, radius"]
    //     },
    //     position: {
    //         x: 0,
    //         y: 0
    //     }, //OPTIONAL
    //     scale: 0,
    //     type: "none", //[inline", "inside",  "outside", "none"]
    //     url: "" //OPTIONAL
    // },
    // sounds: [{
    //     enable: false,
    //     events: [{
    //         audio: [{
    //             loop: false,
    //             source: ""
    //         }], //OPTIONAL
    //         event: [""], //???
    //         filter: "", //OPTIONAL
    //         // filter: function(args){
    //         //     return false;
    //         // }, //OPTIONAL
    //         melodies: [{
    //             loop: false,
    //             melodies: [{}], //melodies
    //             notes: [{}], //notes
    //         }], //OPTIONAL
    //         notes: [{
    //             duration: 0,
    //             value: [""] //???
    //         }] //OPTIONAL
    //     }],
    //     icons: {
    //         mute: {
    //             height: 0,
    //             path: "", //OPTIONAL
    //             svg: "", //OPTIONAL
    //             width: 0
    //         },
    //         unmute: {
    //             height: 0,
    //             path: "", //OPTIONAL
    //             svg: "", //OPTIONAL
    //             width: 0
    //         },
    //         volumeDown: {
    //             height: 0,
    //             path: "", //OPTIONAL
    //             svg: "", //OPTIONAL
    //             width: 0
    //         },
    //         volumeUp: {
    //             height: 0,
    //             path: "", //OPTIONAL
    //             svg: "", //OPTIONAL
    //             width: 0
    //         }
    //     },
    //     volume: {
    //         max: 0,
    //         min: 0,
    //         step: 0,
    //         value: 0
    //     }
    // }]
};
