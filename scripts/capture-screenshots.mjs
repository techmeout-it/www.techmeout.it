// Captures portfolio screenshots at 1280x800 and writes JPEGs to public/screenshots.
// Usage: npx -y playwright@latest install chromium && node scripts/capture-screenshots.mjs
import { chromium } from 'playwright';
import { mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const sites = [
    { url: 'https://ansiblepilot.com',           file: 'ansiblepilot.jpg' },
    { url: 'https://copypastelearn.com',         file: 'copypastelearn.jpg' },
    { url: 'https://lucaberton.com',             file: 'lucaberton.jpg' },
    { url: 'https://www.openempower.com',        file: 'openempower.jpg' },
    { url: 'https://terraformpilot.com',         file: 'terraformpilot.jpg' },
    { url: 'https://www.proteinlens.com',        file: 'proteinlens.jpg' },
    { url: 'https://tendedatettoecampeggio.it',  file: 'tendedatettoecampeggio.jpg' },
    { url: 'https://www.t4triveneto.com',        file: 't4triveneto.jpg' },
];

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.resolve(__dirname, '..', 'public', 'screenshots');
await mkdir(outDir, { recursive: true });

const browser = await chromium.launch();
const context = await browser.newContext({
    viewport: { width: 1280, height: 800 },
    deviceScaleFactor: 1,
});

for (const { url, file } of sites) {
    const page = await context.newPage();
    const out = path.join(outDir, file);
    process.stdout.write(`-> ${url} ... `);
    try {
        await page.goto(url, { waitUntil: 'networkidle', timeout: 45000 });
        // small settle for lazy assets / animations
        await page.waitForTimeout(1500);
        await page.screenshot({ path: out, type: 'jpeg', quality: 85, fullPage: false });
        console.log(`saved ${file}`);
    } catch (err) {
        console.log(`FAILED: ${err.message}`);
    } finally {
        await page.close();
    }
}

await browser.close();
