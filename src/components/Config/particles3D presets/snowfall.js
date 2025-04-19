export default {
    showCube: false,
    dimension: "3D",
    velocity: 2,
    boundaryType: "passthru",
    antialias: false,
    direction: {
        xMin: -0.6,
        xMax: 0.3,
        yMin: -1,
        yMax: -0.6,
        zMin: -0.6,
        zMax: 0.3
    },
    lines: {
        colorMode: "rainbow",
        color: "#351CCB",
        transparency: 0.9,
        limitConnections: true,
        maxConnections: 20,
        minDistance: 150,
        visible: false
    },
    particles: {
        colorMode: "solid",
        color: "#ffffff",
        transparency: 0.9,
        shape: "circle",
        boundingBox: "canvas",
        count: 2500,
        minSize: 1,
        maxSize: 25,
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
