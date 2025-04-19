export default {
    detectRetina: true,
    background: {
        color: "#000000",
    },
    fpsLimit: 120,
    emitters: {
        direction: "top",
        life: {
            count: 0,
            duration: 0.1,
            delay: 0.1,
        },
        rate: {
            delay: 0.05,
            quantity: 1,
        },
        size: {
            width: 100,
            height: 0,
        },
        position: {
            y: 100,
            x: 50,
        },
    },
    particles: {
        number: {
            value: 0,
        },
        destroy: {
            mode: "split",
            bounds: {
                top: {
                    min: 10,
                    max: 30
                },
            },
            split: {
                sizeOffset: false,
                count: 1,
                factor: {
                    value: 0.333333,
                },
                rate: {
                    value: {
                        min: 75,
                        max: 150
                    },
                },
                particles: {
                    color: {
                        value: ["#ff595e", "#ffca3a", "#8ac926", "#1982c4", "#6a4c93"],
                    },
                    stroke: {
                        width: 0,
                    },
                    number: {
                        value: 0,
                    },
                    opacity: {
                        value: {
                            min: 0.1,
                            max: 1,
                        },
                        animation: {
                            enable: true,
                            speed: 0.7,
                            sync: false,
                            startValue: "max",
                            destroy: "min",
                        },
                    },
                    shape: {
                        type: "circle",
                    },
                    size: {
                        value: {
                            min: 1,
                            max: 2
                        },
                        animation: {
                            enable: true,
                            speed: 5,
                            count: 1,
                            sync: false,
                            startValue: "min",
                            destroy: "none",
                        },
                    },
                    life: {
                        count: 1,
                        duration: {
                            value: {
                                min: 1,
                                max: 2,
                            },
                        },
                    },
                    move: {
                        decay: {
                            min: 0.075,
                            max: 0.1
                        },
                        enable: true,
                        gravity: {
                            enable: true,
                            inverse: false,
                            acceleration: 5,
                        },
                        speed: {
                            min: 5,
                            max: 15
                        },
                        direction: "none",
                        outModes: "destroy",
                    },
                },
            },
        },
        life: {
            count: 1,
        },
        shape: {
            type: "line",
        },
        size: {
            value: {
                min: 0.1,
                max: 50,
            },
            animation: {
                enable: true,
                sync: true,
                speed: 90,
                startValue: "max",
                destroy: "min",
            },
        },
        stroke: {
            color: {
                value: "#ffffff",
            },
            width: 1,
        },
        rotate: {
            path: true,
        },
        move: {
            enable: true,
            gravity: {
                acceleration: 15,
                enable: true,
                inverse: true,
                maxSpeed: 100,
            },
            speed: {
                min: 10,
                max: 20,
            },
            outModes: {
                default: "destroy",
                top: "none",
            },
            trail: {
                fillColor: "#000000",
                enable: true,
                length: 10,
            },
        },
    },
    sounds: {
        enable: true,
        events: [
            {
                event: "particleRemoved",
                audio: [
                    "https://particles.js.org/audio/explosion0.mp3",
                    "https://particles.js.org/audio/explosion1.mp3",
                    "https://particles.js.org/audio/explosion2.mp3",
                ],
            },
        ],
        volume: 50,
    },
};
