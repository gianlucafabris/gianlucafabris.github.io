export default {
    showCube: false,
    dimension: "2D", //["2D", "3D"]
    boundaryType: "passthru", //["bounce", "passthru"]
    velocity: 2,
    antialias: true,
    direction: {
        xMin: -1,
        xMax: 1,
        yMin: -1,
        yMax: 1,
        zMin: -1,
        zMax: 1
    },
    lines: {
        colorMode: "solid", //["rainbow", "solid"]
        color: "#ffffff",
        transparency: 0.39,
        limitConnections: false,
        maxConnections: 0,
        minDistance: 100,
        visible: true
    },
    particles: {
        colorMode: "solid", //["rainbow", "solid"]
        color: "#ffffff",
        transparency: 1,
        shape: "circle", //["square", "circle"]
        boundingBox: "canvas", //["canvas", "cube"]
        count: 500,
        minSize: 0.1,
        maxSize: 2,
        visible: true
    },
    cameraControls: {
        enabled: false,
        enableDamping: true,
        dampingFactor: 0.2,
        enableZoom: true,
        autoRotate: false,
        autoRotateSpeed: 0.3,
        resetCameraFlag: true
    }
};
