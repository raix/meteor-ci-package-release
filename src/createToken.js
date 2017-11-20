const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const home = require('os').homedir();

const sessionFilename = path.join(home, '.meteorsession');

module.exports = function (sharedKey = '') {
  if (!fs.existsSync(sessionFilename)) {
    throw new Error(`Could not open ${sessionFilename}`);
  }

  const currentSession = JSON.parse(fs.readFileSync(sessionFilename, 'utf-8'));

  const meteorSessions = ((currentSession || {}).sessions || {});

  const meteorAccount = Object
    .keys(meteorSessions)
    .map(key => meteorSessions[key])
    .reduce((meteorAccount, session) => meteorAccount || session.type === 'meteor-account' && session, undefined);

  const { username, userId, token, session } = meteorAccount || {};

  if (!username || !userId || !token || !session) {
    throw new Error('You need to login as a meteor developer in order for me to extract a token data');
  }

  const tokenData = JSON.stringify([ username, userId, token, session ]);

  const cipher = crypto.createCipher('aes256', sharedKey);
  let cipherText = cipher.update(tokenData, 'utf8', 'base64');
  cipherText += cipher.final('base64');

  console.log(`Token data for user "${username}"${sharedKey ? ' (using key)':''}`);
  console.log(cipherText);
};
