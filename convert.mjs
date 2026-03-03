import { execSync } from 'child_process';
const input = 'src/assets/khaoskontrol-preview.png';
const output = 'src/assets/khaoskontrol-preview.webp';
execSync(`npx -y sharp-cli@2.1.0 -i ${input} -o ${output}`);
console.log('Done');
