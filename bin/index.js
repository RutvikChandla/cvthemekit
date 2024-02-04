#!/usr/bin/env node
const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')
const fs = require('fs');
const yaml = require('js-yaml');

const argv = yargs(hideBin(process.argv))
  .command('configure', 'use inquirer to prompt for your name')
  .alias('themeID', 't')
  .nargs('t', 1)
  .describe('t', 'Theme ID associated with the store')
  .alias('store', 's')
  .nargs('s', 1)
  .describe('s', 'Store URL. Example: random.mycvshop.com')
  .alias('store', 's')
  .nargs('s', 1)
  .describe('s', 'Store URL. Example: random.mycvshop.com')
  .alias('password', 'p')
  .nargs('p', 1)
  .describe('p', 'Your CV Shop API password')
  .demandOption(['s', 't', 'p'])
  .parse();

const configDir = process.cwd();
const configFile = `${configDir}/config/config.yml`;
console.log(argv._)
if (argv._.includes('configure')) {
  const config = {
    development: {
      theme_id: argv.t,
      store: argv.s,
      password: argv.p
    }
  }
  const yamlStr = yaml.dump(config);
  fs.writeFileSync(configFile, yamlStr, 'utf8');
}



