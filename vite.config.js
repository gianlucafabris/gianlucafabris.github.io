import { defineConfig, transformWithEsbuild } from 'vite'
import react from '@vitejs/plugin-react'
import glsl from "vite-plugin-glsl";

export default defineConfig({
    root: 'src/',
    publicDir: '../public/',
    plugins: [
        // React support
        react(),
        // GLSL support
        glsl(),
        // .js file support as if it was JSX
        {
            name: 'load+transform-js-files-as-jsx',
            enforce: 'pre',
            async transform(code, id){
                if(!id.match(/src\/.*\.js$/)) return null
                return transformWithEsbuild(code, id, {loader: 'jsx', jsx: 'automatic'});
            }
        }
    ],
    server: {
        host: true,
        open: !('SANDBOX_URL' in process.env || 'CODESANDBOX_HOST' in process.env),
        watch: {
            // Restart server on static/public file change
            ignored: ['!../public/**']
        }
    },
    build: {
        outDir: '../build',
        emptyOutDir: true,
        sourcemap: true,
        target: 'esnext',
        minify: 'esbuild'
    }
})
