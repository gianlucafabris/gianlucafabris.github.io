export default {
    fpsLimit: 120,
    particles: {
        color: {
            value: "#ff0000",
        },
        move: {
            direction: "none",
            enable: true,
            outModes: {
                default: "destroy",
            },
            path: {
                clamp: false,
                enable: true,
                delay: {
                    value: 0,
                },
            },
            random: false,
            speed: 2,
            straight: false,
            trail: {
                fillColor: "#000000",
                length: 30,
                enable: true,
            },
        },
        number: {
            value: 0,
            limit: 300,
        },
        opacity: {
            value: 1,
        },
        shape: {
            type: "circle",
        },
        size: {
            value: {
                min: 1,
                max: 10
            },
            animation: {
                count: 1,
                startValue: "min",
                enable: true,
                speed: 10,
                sync: true,
            },
        },
    },
    background: {
        color: "#000000",
    },
    detectRetina: true,
    emitters: {
        direction: "none",
        rate: {
            quantity: 10,
            delay: 0.3,
        },
        size: {
            width: 0,
            height: 0,
            mode: "precise",
        },
        spawnColor: {
            value: "#ff0000",
            animation: {
                h: {
                    enable: true,
                    offset: {
                        min: -1.4,
                        max: 1.4,
                    },
                    speed: 5,
                    sync: false,
                },
                l: {
                    enable: true,
                    offset: {
                        min: 20,
                        max: 80,
                    },
                    speed: 0,
                    sync: false,
                },
            },
        },
        position: {
            x: 50,
            y: 50,
        },
    },
};
