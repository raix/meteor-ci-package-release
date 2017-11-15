#!/usr/bin/env node
const program = require('commander');
const createToken = require('./createToken');
const login = require('./loginViaToken');
const die = require('./die');

const packageJson = require('../package.json');

program.version(packageJson.version);

program
  .command('create-token')
  .description('Generate encrypted login token')
  .option('-k, --key [secret]', 'Lock login token with secret key')
  .action(({ key }) => {
    try {
      createToken(key);
    } catch (err) {
      die(err.message);
    }
  });

program
  .command('login [token]')
  .description('Login via token')
  .option('-k, --key [secret]', 'Unlock token with secret key')
  .action((token, { key }) => {
    try {
      login(token, key);
    } catch (err) {
      die(err.message);
    }
  });

program.parse(process.argv);
