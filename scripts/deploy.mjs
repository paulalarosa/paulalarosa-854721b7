import { execSync } from 'node:child_process';
import { existsSync } from 'node:fs';

const BUCKET = process.env.DEPLOY_BUCKET || 'paulalarosa-bucket2';
const DISTRIBUTION_ID = process.env.CLOUDFRONT_DISTRIBUTION_ID || 'EQ7ALXF37OFQX';
const REGION = process.env.AWS_REGION || 'sa-east-1';
const PROFILE = process.env.AWS_PROFILE || 'paulalarosa';
const DIST_DIR = 'dist';

const profileFlag = `--profile ${PROFILE}`;

const args = new Set(process.argv.slice(2));
const dryRun = args.has('--dry-run');
const skipBuild = args.has('--skip-build');
const skipInvalidate = args.has('--skip-invalidate');

const run = (cmd, label) => {
  console.log(`\n▸ ${label}\n  $ ${cmd}`);
  if (dryRun) {
    console.log('  (dry-run — skipped)');
    return '';
  }
  return execSync(cmd, { stdio: 'inherit' });
};

const runCapture = (cmd) => execSync(cmd, { encoding: 'utf8' });

const checkAwsAuth = () => {
  try {
    const out = runCapture(`aws sts get-caller-identity ${profileFlag}`);
    const id = JSON.parse(out);
    console.log(`✓ AWS identity: ${id.Arn}`);
  } catch {
    console.error(
      `✗ AWS CLI not authenticated for profile "${PROFILE}". ` +
        `Run \`aws configure --profile ${PROFILE}\` or set AWS_PROFILE to an authenticated profile.`,
    );
    process.exit(1);
  }
};

console.log(`\n=== Deploy paulalarosa portfolio ===`);
console.log(`  Bucket           : ${BUCKET}`);
console.log(`  CloudFront dist  : ${DISTRIBUTION_ID}`);
console.log(`  Region           : ${REGION}`);
console.log(`  AWS profile      : ${PROFILE}`);
console.log(`  Mode             : ${dryRun ? 'DRY RUN' : 'LIVE'}`);

checkAwsAuth();

if (!skipBuild) {
  run('npm run build', 'Building production bundle');
}

if (!existsSync(DIST_DIR)) {
  console.error(`✗ ${DIST_DIR}/ does not exist — build first or pass --skip-build only if you have already built.`);
  process.exit(1);
}

run(
  `aws s3 sync ${DIST_DIR} s3://${BUCKET} ${profileFlag} --region ${REGION} --delete ` +
    `--exclude "index.html" --exclude "*.html" ` +
    `--cache-control "public,max-age=31536000,immutable"`,
  'Syncing fingerprinted assets (long cache)',
);

run(
  `aws s3 sync ${DIST_DIR} s3://${BUCKET} ${profileFlag} --region ${REGION} ` +
    `--exclude "*" --include "*.html" ` +
    `--cache-control "public,max-age=0,must-revalidate" ` +
    `--content-type "text/html; charset=utf-8"`,
  'Syncing HTML entry points (no cache)',
);

if (!skipInvalidate) {
  run(
    `aws cloudfront create-invalidation ${profileFlag} --distribution-id ${DISTRIBUTION_ID} --paths "/*"`,
    'Invalidating CloudFront cache',
  );
}

console.log(`\n✓ Deploy complete${dryRun ? ' (dry-run)' : ''}.`);
console.log(`  Public URL: https://paulalarosa.com`);
