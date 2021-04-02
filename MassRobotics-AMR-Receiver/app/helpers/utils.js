const Handlebars = require('hbsfy/runtime');

Handlebars.registerHelper('json', function(context) {
  return JSON.stringify(context, undefined, 2);
});

Handlebars.registerHelper('eq', function(arg1, arg2, options) {
  return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
});