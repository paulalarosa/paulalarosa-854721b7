import sharp from "sharp";
import path from "node:path";

const SIZE = 128;
const OUT = path.join("src/assets", "grain.png");

const buffer = Buffer.alloc(SIZE * SIZE * 4);
for (let i = 0; i < SIZE * SIZE; i++) {
  const v = Math.floor(Math.random() * 256);
  buffer[i * 4 + 0] = v;
  buffer[i * 4 + 1] = v;
  buffer[i * 4 + 2] = v;
  buffer[i * 4 + 3] = 255;
}

await sharp(buffer, { raw: { width: SIZE, height: SIZE, channels: 4 } })
  .png({ compressionLevel: 9 })
  .toFile(OUT);

console.log(`▸ ${OUT} (${SIZE}x${SIZE}, tileable)`);
