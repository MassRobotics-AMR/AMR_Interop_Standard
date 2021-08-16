Installation

Download linux node binaries here: https://nodejs.org/dist/v14.16.0/node-v14.16.0-linux-x64.tar.xz (other OS/versions may also work, but this is the only tested version)

Follow the instructions here: https://github.com/nodejs/help/wiki/Installation#how-to-install-nodejs-via-binary-archive-on-linux,
replacing the VERSION variable with "v14.16.0" (without the quotes) in the case of the version downloaded from the link above.
If you are using a different version or OS, you might need to change the other variables or follow a different guide.

$ cd /path/to/project
$ npm run install-server

-----------------------
Run Server

$ npm run start

-----------------------
Setup Schema

- Add your schema file by replacing the file:
  server/schema/schema.json
with your schame file. Make sure the extension is .json. Valid schema files should also be json files.

- Update the test message file with your test message by replacing the file:
  server/schema/test-message.json

-----------------------
Endpoints

Connect to UI:
http://<hostname>:3000

Connect to websocket:
ws://<hostname>:3000

-----------------------
Dev of Front End

WARNING: Requires node version 6.7.0

Update package.json's ajv version to: 6.12.6

cd /path/to/project
npm run install-all
gulp watch
