# meteor-ci-package-release

[![Build Status](https://travis-ci.org/raix/meteor-ci-package-release.svg?branch=master)](https://travis-ci.org/raix/meteor-ci-package-release)
[![Greenkeeper badge](https://badges.greenkeeper.io/raix/meteor-ci-package-release.svg)](https://greenkeeper.io/)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

Npm module for releasing meteor packages from CI

# Create login token

```bash
$ meteor-ci create-token
# or with a key:
$ meteor-ci create-token --key superSecret
```

# Login via token

```bash
$ meteor-ci login j...iBhk=
# or with a key:
$ meteor-ci login j...iBhk= --key superSecret
```

# Travis example
```yaml
language: node_js
cache:
  directories:
    - ~/.npm
    - "node_modules"
node_js:
  - '8'
install:
  - npm install
  - curl https://install.meteor.com/ | sh
  - export PATH=$HOME/.meteor:$PATH
script:
  - npx meteor-ci login ${USER_TOKEN} --key ${TOKEN_KEY}
  - meteor whoami
```
