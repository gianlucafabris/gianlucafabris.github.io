import { transformWithEsbuild } from 'vite'
import react from '@vitejs/plugin-react'
import restart from 'vite-plugin-restart'
import glsl from "vite-plugin-glsl";

export default {
    root: 'src/',
    publicDir: '../public/',
    plugins: [
        // Restart server on static/public file change
        restart({
            restart: [ '../public/**' ]
        }),
        // React support
        react(),
        // GLSL support
        glsl(),
        // .js file support as if it was JSX
        {
            name: 'load+transform-js-files-as-jsx',
            async transform(code, id){
                if(!id.match(/src\/.*\.js$/)){
                    return null
                }
                return transformWithEsbuild(code, id, {
                    loader: 'jsx',
                    jsx: 'automatic',
                });
            }
        }
    ],
    server: {
        host: true,
        open: !('SANDBOX_URL' in process.env || 'CODESANDBOX_HOST' in process.env)
    },
    build: {
        outDir: '../build',
        emptyOutDir: true,
        sourcemap: true,
        target: 'esnext',
        minify: 'esbuild'
    }
}