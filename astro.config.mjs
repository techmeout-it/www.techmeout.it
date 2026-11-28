import { defineConfig } from 'astro/config';

export default defineConfig({
    site: 'https://www.techmeout.it',
    output: 'static',
    // GitHub Pages ignores public/_redirects, so Astro also writes a
    // meta-refresh page (with canonical + noindex) for each old URL.
    redirects: {
        // T4 Triveneto: site no longer exists and is no longer managed by us
        '/lavori/t4-triveneto': '/lavori/',
    },
    outDir: './dist',
    build: {
        assets: 'assets',
        format: 'directory'
    }
});
