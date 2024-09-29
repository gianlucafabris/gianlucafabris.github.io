export default {
    showCube: false,
    dimension: "2D",
    velocity: 2,
    boundaryType: "bounce",
    antialias: false,
    direction: {
        xMin: -1,
        xMax: 1,
        yMin: -1,
        yMax: 1,
        zMin: -1,
        zMax: 1
    },
    lines: {
        colorMode: "rainbow",
        color: "#351CCB",
        transparency: 0.9,
        limitConnections: true,
        maxConnections: 20,
        minDistance: 110,
        visible: true
    },
    particles: {
        colorMode: "rainbow",
        color: "#3FB568",
        transparency: 0.9,
        shape: "circle",
        boundingBox: "canvas",
        count: 300,
        minSize: 20,
        maxSize: 50,
        visible: true
    },
    cameraControls: {
        enabled: true,
        enableDamping: true,
        dampingFactor: 0.2,
        enableZoom: true,
        autoRotate: false,
        autoRotateSpeed: 0.3,
        resetCameraFlag: true
    }
};
