#!/usr/bin/env node
var pkg = require(require('path').resolve('./package.json'));
if (pkg.collective) {
  console.log(`\u001b[96m\u001b[1mThank you for using ${pkg.name}!\u001b[96m\u001b[1m`);
  console.log(`\u001b[0m\u001b[96mIf you rely on this package, please consider supporting our open collective:\u001b[22m\u001b[39m`);
  console.log(`> \u001b[94m${pkg.collective.url}/donate\u001b[0m\n`);
}