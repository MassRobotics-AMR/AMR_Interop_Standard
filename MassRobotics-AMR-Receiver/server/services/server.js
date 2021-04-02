const _ = require('underscore');
const bodyParser = require('body-parser');
const testMessage = require('../schema/test-message.json');
const schema = require('../schema/schema.json');
const Ajv = require("ajv");
const ajv = new Ajv({strictSchema: false});
let validate = ajv.compile(schema);
let UIsockets = {};

module.exports = function(app) {
  app.use(bodyParser.json());

  app.ws('/ui', function(ws, req) {
    console.log('UI has connected via websocket');
    let socketId = new Date().getTime();
    console.log(`UI websocket has id ${socketId}`);
    UIsockets[socketId] = ws;

    ws.on('message', (msg) => {
      console.log('Recieved a test message from UI');
      processMessage(msg);
    });

    ws.on('close', (code, reason) => {
      console.log('UI Websocket has closed.');
      delete UIsockets[socketId];
    });
  });

  app.ws('', function(ws, req) {
    console.log('Robot has connected via websocket');

    ws.on('message', (msg) => {
      console.log('Recieved a message from the robot');
      processMessage(msg);
    });

    ws.on('close', (code, reason) => {
      console.log('Robot Websocket has closed.');
    });
  });

  app.get('/test-message', function(req, res) {
    res.send(testMessage);
  });
};

function processMessage(msg) {
  let hasWellFormedJSON = false;
  let message = {};
  let errors = {};
  try {
    message = JSON.parse(msg);
    hasWellFormedJSON = true;
  } catch(e) {
    console.log('Not valid json');
    errors = [{
      type: 'MalformedJSON',
      message: e.toString()
    }];
    message = msg;
  }

  let result = false;
  if (hasWellFormedJSON) {
    result = validate(message);
    if (!result) {
      errors = validate.errors;
    }
  }
  _.each(UIsockets, (socket) => {
    sendMessage(socket, {
      message: message,
      isValid: result,
      errors: errors
    });
  });
}

function sendMessage(ws, data = {}) {
  try {
    if (ws.readyState != 1) {
      console.log('Not sending message because websocket is not open');
      return;
    }
    ws.send(JSON.stringify(data));
  } catch (e) {
    console.error(e);
  }
}
