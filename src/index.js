#!/usr/bin/env node
const program = require('commander');
const createToken = require('./createToken');
const login = require('./loginViaToken');

const packageJson = require('../package.json');

program.version(packageJson.version);

program
  .command('create-token')
  .description('Generate encrypted login token')
  .option('-k, --key [secret]', 'Lock login token with secret key')
  .action(({ key }) => {
    createToken(key);
  });

program
  .command('login [token]')
  .description('Login via token')
  .option('-k, --key [secret]', 'Unlock token with secret key')
  .action((token, { key }) => {
    login(token, key);
  });

program.parse(process.argv);
