const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const home = require('os').homedir();

const sessionFilename = path.join(home, '.meteorsession');

module.exports = function (cryptToken, sharedKey = '') {
  if (!cryptToken) {
    throw new Error('Please supply token');
  }

  let tokenString = '';

  try {
    const decipher = crypto.createDecipher('aes256', sharedKey);
    tokenString = decipher.update(cryptToken, 'base64', 'utf8');
    tokenString += decipher.final('utf8');
  } catch (ignore) {
    throw new Error('Token could not be unlocked, forgot the key?');
  }

  let tokenData = {};
  try {
    tokenData = JSON.parse(tokenString);
  } catch (ignore) {
    throw new Error('Invalid token data');
  }

  const [ username, userId, token, session ] = tokenData;
  const type = 'meteor-account';

  if (!username || !userId || !token || !session) {
    throw new Error('Invalid token data format');
  }

  fs.writeFileSync(sessionFilename, JSON.stringify({
    sessions: {
      'www.meteor.com': {
        username,
        userId,
        token,
        session,
        type
      }
    }
  }), 'utf-8');

  console.info(`Initialized "${sessionFilename}" for user "${username}"`);
};
