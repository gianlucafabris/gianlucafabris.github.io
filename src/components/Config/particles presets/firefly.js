export default {
    fullScreen: {
        enable: true,
        zIndex: -1,
    },
    fpsLimit: 120,
    particles: {
        number: {
            value: 0,
        },
        color: {
            value: "#ffffff",
        },
        life: {
            duration: {
                value: 5,
                sync: false,
            },
            count: 1,
        },
        opacity: {
            value: { min: 0.1, max: 1 },
            animation: {
                enable: true,
                speed: 3,
            },
        },
        size: {
            value: {
                min: 3,
                max: 6,
            },
        },
        move: {
            enable: true,
            speed: 3,
            random: false,
            size: true,
        },
    },
    interactivity: {
        events: {
            onHover: {
                enable: true,
                mode: "trail",
            },
            resize: true,
        },
        modes: {
            trail: {
                delay: 0.5,
                pauseOnStop: true,
                quantity: 4,
            },
        },
    },
    background: {
        color: "#000000",
    },
};
