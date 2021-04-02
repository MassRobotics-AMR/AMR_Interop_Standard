const Express = require('express');
const BodyParser = require('body-parser');
const port = require('./props').port;

const app = Express();
app.use(BodyParser.urlencoded({extended: true}));

app.use(Express.static('dist'));

require('express-ws')(app);

require('./services/server')(app);

app.listen(port, function() {
  console.log(`Starting MassRobotics Interoperability Working Group schema validator service. Listening on port ${port}`);
});