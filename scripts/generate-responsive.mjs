// Generates responsive image variants (-480.<ext>, -768.<ext>, -1280.<ext>)
// for every JPG/PNG in public/screenshots/ plus the community logos in public/.
// Usage: node scripts/generate-responsive.mjs
import sharp from 'sharp';
import { readdir, stat } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const widths = [480, 768, 1280];

const targets = [
    path.join(root, 'public', 'screenshots'),
];
const singleFiles = [
    path.join(root, 'public', 'logo-tende.jpg'),
    path.join(root, 'public', 'logo-t4.png'),
];

const VARIANT_RE = /-(480|768|1280)\.(jpe?g|png|webp)$/i;
const SUPPORTED_RE = /\.(jpe?g|png)$/i;

async function processFile(file) {
    if (!SUPPORTED_RE.test(file)) return;
    if (VARIANT_RE.test(file)) return; // skip already-generated variants
    if (!existsSync(file)) return;

    const ext = path.extname(file);
    const base = file.slice(0, -ext.length);
    const meta = await sharp(file).metadata();
    if (!meta.width) return;

    for (const w of widths) {
        const out = `${base}-${w}${ext}`;
        const targetW = Math.min(w, meta.width);
        let pipeline = sharp(file).resize({ width: targetW, withoutEnlargement: true });
        if (/\.jpe?g$/i.test(ext)) pipeline = pipeline.jpeg({ quality: 82, mozjpeg: true });
        else if (/\.png$/i.test(ext)) pipeline = pipeline.png({ compressionLevel: 9 });
        await pipeline.toFile(out);
        process.stdout.write(`  -> ${path.relative(root, out)}\n`);
    }
}

async function processDir(dir) {
    if (!existsSync(dir)) return;
    const entries = await readdir(dir);
    for (const name of entries) {
        const full = path.join(dir, name);
        const s = await stat(full);
        if (s.isFile()) await processFile(full);
    }
}

console.log('Generating responsive variants...');
for (const dir of targets) await processDir(dir);
for (const f of singleFiles) await processFile(f);
console.log('Done.');
