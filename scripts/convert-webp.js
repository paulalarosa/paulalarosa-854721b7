const fs = require('fs');
const { execSync } = require('child_process');
const files = ['src/assets/khaoskontrol-preview.png']; // Add other files later
files.forEach(file => {
  if (fs.existsSync(file)) {
    try {
      execSync(`npx -y sharp-cli@^3.0.0 form -f webp -q 80 -i ${file} -o ${file.replace('.png', '.webp')}`);
      console.log(`Converted ${file}`);
    } catch (e) { console.error(`Failed ${file}`, e.message); }
  }
});
