export default {
    fpsLimit: 120,
    particles: {
        bounce: {
            vertical: {
                value: {
                    min: 0.75,
                    max: 0.85,
                },
            },
        },
        color: {
            value: ["#3998d0", "#2eb6af", "#a9bd33", "#fec73b", "#f89930", "#f45623", "#d62e32", "#eb586e", "#9952cf"],
        },
        number: {
            value: 0,
        },
        destroy: {
            mode: "split",
            split: {
                count: 2,
                factor: {
                    value: {
                        min: 1.1,
                        max: 2,
                    },
                },
                rate: {
                    value: {
                        min: 2,
                        max: 3,
                    },
                },
            },
        },
        opacity: {
            value: 0.5,
        },
        size: {
            value: {
                min: 10,
                max: 20,
            },
        },
        move: {
            enable: true,
            gravity: {
                enable: true,
                maxSpeed: 50,
            },
            speed: {
                min: 10,
                max: 20,
            },
            direction: "none",
            random: false,
            straight: false,
            outModes: {
                bottom: "split",
                default: "bounce",
                top: "none",
            },
            trail: {
                enable: true,
                fillColor: "#ffffff",
                length: 3,
            },
        },
    },
    detectRetina: true,
    background: {
        color: "#ffffff",
    },
    emitters: {
        direction: "top",
        life: {
            count: 0,
            duration: 0.15,
            delay: 3,
        },
        rate: {
            delay: 0.1,
            quantity: 5,
        },
        size: {
            width: 0,
            height: 0,
        },
    },
};
