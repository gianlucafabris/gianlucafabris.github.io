import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import glsl from "vite-plugin-glsl";

export default defineConfig({
    root: 'src/',
    publicDir: '../public/',
    plugins: [
        // React support
        react(),
        // GLSL support
        glsl()
    ],
    server: {
        host: true,
        open: !('SANDBOX_URL' in process.env || 'CODESANDBOX_HOST' in process.env),
        watch: {
            // Restart server on static/public file change
            ignored: ['!../public/**'],
            usePolling: true,
            interval: 100
        }
    },
    build: {
        outDir: '../dist',
        emptyOutDir: true,
        sourcemap: true,
        target: 'esnext',
        minify: 'esbuild'
    }
})
