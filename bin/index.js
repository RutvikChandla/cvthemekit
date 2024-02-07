#!/usr/bin/env node
const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers');
const configureCommand = require('./commands/configureCommand');
const getCommand = require('./commands/getCommand');
const watchCommand = require('./commands/watchCommand');
// const watchCommand = require('./watchCommand');

const argv = yargs(hideBin(process.argv))
  .command('configure', 'Create a config.yaml', (yargs) => {
    yargs
      .option('themeid', {
        alias: 't',
        describe: 'Theme ID associated with the store',
        demandOption: true,
        type: 'string'
      })
      .option('store', {
        alias: 's',
        describe: 'Store URL. Example: random.mycvshop.com',
        demandOption: true,
        type: 'string'
      })
      .option('password', {
        alias: 'p',
        describe: 'Your CV Shop API password',
        demandOption: true,
        type: 'string'
      });
  })
  .command('get', 'get themes', (yargs) => {
    yargs
      .option('themeid', {
        alias: 't',
        describe: 'Theme ID associated with the store',
        type: 'string'
      })
      .option('store', {
        alias: 's',
        describe: 'Store URL. Example: random.mycvshop.com',
        type: 'string'
      })
      .option('password', {
        alias: 'p',
        describe: 'Your CV Shop API password',
        type: 'string'
      })
      .option('list', {
        describe: 'List all theme IDs',
        type: 'boolean'
      });
  })
  .command('watch', 'watch themes')
  .showHelpOnFail(true)
  .help()
  .argv;

const command = argv._[0];

switch (command) {
  case 'configure':
    configureCommand(argv);
    // console.log(argv)
    break;
  case 'get':
    getCommand(argv);
    // console.log(argv)
    break;
  case 'watch':
    watchCommand(argv);
    // console.log(argv)
    break;
  default:
    console.error('Invalid command. Run the help command for usage information:');
    break;
}
