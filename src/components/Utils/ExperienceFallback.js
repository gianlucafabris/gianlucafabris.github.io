function isCanvas3DSupported(){
    try{
        const canvas = document.createElement('canvas');
        const canvas3DSupported = !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl') || canvas.getContext('webgl2') || canvas.getContext('webgpu')));
        canvas.remove();
        return canvas3DSupported;
    }catch(e){
        return false;
    }
}

function isCanvas2DSupported(){
    try{
        const canvas = document.createElement('canvas');
        const canvas2DSupported = !!canvas.getContext('2d');
        canvas.remove();
        return canvas2DSupported;
    }catch(e){
        return false;
    }
}

export default function Comparer({E3D, E2D, EI, ...rest}){
    if (isCanvas3DSupported()) {
        return <E3D {...rest} />;
    } else if (isCanvas2DSupported()) {
        return <E2D {...rest} />;
    } else {
        return <EI {...rest} />;
    }
};