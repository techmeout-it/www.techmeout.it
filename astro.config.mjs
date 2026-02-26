import { defineConfig } from 'astro/config';

export default defineConfig({
    site: 'https://techmeout-it.github.io',
    base: '/www.techmeout.it',
    output: 'static',
    outDir: './dist',
    build: {
        assets: 'assets',
        format: 'file'
    }
});
