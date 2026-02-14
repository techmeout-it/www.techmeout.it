import { defineConfig } from 'astro/config';

export default defineConfig({
    // Output statico (default) — perfetto per hosting Aruba
    output: 'static',
    // Build nella cartella dist/
    outDir: './dist',
    // Genera file come lavori.html invece di lavori/index.html
    build: {
        assets: 'assets',
        format: 'file'
    }
});
