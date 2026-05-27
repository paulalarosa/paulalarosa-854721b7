import sharp from 'sharp';
import { promises as fs } from 'node:fs';
import path from 'node:path';

const ASSETS_DIR = 'src/assets';

const TARGETS = [
  { input: 'khaos_home_real.png', width: 1600, formats: ['webp', 'jpg'] },
];

const formatOptions = {
  webp: { quality: 82, effort: 6 },
  jpg: { quality: 85, progressive: true, mozjpeg: true },
  avif: { quality: 60, effort: 5 },
};

const friendlySize = (bytes) =>
  bytes >= 1024 * 1024
    ? `${(bytes / (1024 * 1024)).toFixed(2)} MB`
    : `${(bytes / 1024).toFixed(1)} kB`;

for (const target of TARGETS) {
  const inputPath = path.join(ASSETS_DIR, target.input);
  const { size: originalSize } = await fs.stat(inputPath);
  const { name } = path.parse(target.input);

  console.log(`\n▸ ${target.input}  (${friendlySize(originalSize)})`);

  for (const format of target.formats) {
    const outputPath = path.join(ASSETS_DIR, `${name}.${format === 'jpg' ? 'jpg' : format}`);
    const pipeline = sharp(inputPath).resize({ width: target.width, withoutEnlargement: true });

    if (format === 'webp') pipeline.webp(formatOptions.webp);
    else if (format === 'jpg') pipeline.jpeg(formatOptions.jpg);
    else if (format === 'avif') pipeline.avif(formatOptions.avif);

    await pipeline.toFile(outputPath);
    const { size } = await fs.stat(outputPath);
    const reduction = ((1 - size / originalSize) * 100).toFixed(0);
    console.log(`  → ${path.basename(outputPath)}  ${friendlySize(size)}  (-${reduction}%)`);
  }
}

console.log('\nDone. Update component imports to point at the new files, then delete the originals if no longer referenced.');
