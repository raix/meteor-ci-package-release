# meteor-ci-package-release

[![Greenkeeper badge](https://badges.greenkeeper.io/raix/meteor-ci-package-release.svg)](https://greenkeeper.io/)
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
