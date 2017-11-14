const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const home = require('os').homedir();
const die = require('./die');

const sessionFilename = path.join(home, '.meteorsession');

module.exports = function(sharedKey = '') {
  if (!fs.existsSync(sessionFilename)) {
    die(`Could not open ${sessionFilename}`);
  }

  const currentSession = JSON.parse(fs.readFileSync(sessionFilename, 'utf-8'));

  const meteorSessions = ((currentSession || {}).sessions || {});

  const meteorAccount = Object
    .keys(meteorSessions)
    .map(key => meteorSessions[key])
    .reduce((meteorAccount, session) => meteorAccount || session.type === 'meteor-account' && session, undefined);

  const { username, userId, token } = meteorAccount || {};

  if (!username || !userId || !token) {
    die('You need to login as a meteor developer in order for me to extract a token data');
  }

  const tokenData = JSON.stringify([ username, userId, token ]);

  const cipher = crypto.createCipher('aes256', sharedKey);
  let cipherText = cipher.update(tokenData, 'utf8', 'base64');
  cipherText += cipher.final('base64');

  console.log(`Token data for user "${username}"${sharedKey?' (using key)':''}`);
  console.log(cipherText);
};
