(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
require('./utils');
require('./partials');
},{"./partials":2,"./utils":4}],2:[function(require,module,exports){
const Handlebars = require('hbsfy/runtime');
Handlebars.registerPartial('navbar', require('./partials/navbar.hbs'));
},{"./partials/navbar.hbs":3,"hbsfy/runtime":47}],3:[function(require,module,exports){
// hbsfy compiled Handlebars template
var HandlebarsCompiler = require('hbsfy/runtime');
module.exports = HandlebarsCompiler.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var helper;

  return "<div class=\"topbar\">\n  <div class=\"navbar\">\n    <a href='#'>Home</a>\n  </div>\n  <h2 class=\"title\">"
    + this.escapeExpression(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"title","hash":{},"data":data}) : helper)))
    + "</h2>\n</div>";
},"useData":true});

},{"hbsfy/runtime":47}],4:[function(require,module,exports){
const Handlebars = require('hbsfy/runtime');

Handlebars.registerHelper('json', function(context) {
  return JSON.stringify(context, undefined, 2);
});

Handlebars.registerHelper('eq', function(arg1, arg2, options) {
  return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
});
},{"hbsfy/runtime":47}],5:[function(require,module,exports){
// hbsfy compiled Handlebars template
var HandlebarsCompiler = require('hbsfy/runtime');
module.exports = HandlebarsCompiler.template({"1":function(depth0,helpers,partials,data) {
    var stack1;

  return "        <div class=\"message\">\n          <div class=\"message-header\">\n            Status:\n          </div>\n"
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.isValid : depth0),{"name":"if","hash":{},"fn":this.program(2, data, 0),"inverse":this.program(4, data, 0),"data":data})) != null ? stack1 : "")
    + "          <div class=\"message-header\">\n            Message:\n          </div>\n          <div class=\"message-code\">\n            <pre><code>"
    + ((stack1 = (helpers.eq || (depth0 && depth0.eq) || helpers.helperMissing).call(depth0,((stack1 = (depth0 != null ? depth0.errors : depth0)) != null ? stack1.type : stack1),"MalformedJSON",{"name":"eq","hash":{},"fn":this.program(7, data, 0),"inverse":this.program(9, data, 0),"data":data})) != null ? stack1 : "")
    + "</code></pre>\n          </div>\n        </div>\n";
},"2":function(depth0,helpers,partials,data) {
    return "            <div class=\"valid\">\n              VALID\n            </div>\n";
},"4":function(depth0,helpers,partials,data) {
    var stack1;

  return "            <div class=\"not-valid\">\n              NOT VALID\n            </div>\n            <div class=\"message-header\">\n              Errors:\n            </div>\n"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.errors : depth0),{"name":"each","hash":{},"fn":this.program(5, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "");
},"5":function(depth0,helpers,partials,data) {
    return "              <div class=\"error\">\n                <pre><code>"
    + this.escapeExpression((helpers.json || (depth0 && depth0.json) || helpers.helperMissing).call(depth0,depth0,{"name":"json","hash":{},"data":data}))
    + "</code></pre>\n              </div>\n";
},"7":function(depth0,helpers,partials,data) {
    var helper;

  return this.escapeExpression(((helper = (helper = helpers.message || (depth0 != null ? depth0.message : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"message","hash":{},"data":data}) : helper)));
},"9":function(depth0,helpers,partials,data) {
    return this.escapeExpression((helpers.json || (depth0 && depth0.json) || helpers.helperMissing).call(depth0,(depth0 != null ? depth0.message : depth0),{"name":"json","hash":{},"data":data}));
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = this.invokePartial(partials.navbar,depth0,{"name":"navbar","hash":{"title":"Websocket Schema Validator"},"data":data,"helpers":helpers,"partials":partials})) != null ? stack1 : "")
    + "\n<div class=\"content\">\n  <div class=\"group\">\n    <button class=\"primary-button test-message\">Send Test Message</button>\n    <button class=\"primary-button clear-messages\">Clear Messages</button>\n    <div class=\"messages\">\n"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.messages : depth0),{"name":"each","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "    </div>\n  </div>\n</div>";
},"usePartial":true,"useData":true});

},{"hbsfy/runtime":47}],6:[function(require,module,exports){
const Torso = require('backbone-torso');
const _ = require('underscore');
const $ = require('backbone-torso/node_modules/jquery');
const wsService = require('../services/wsService');

module.exports = new (Torso.FormView.extend({
  className: 'home',
  prepareFields: [
    'messages'
  ],

  events: {
    'click .test-message': 'sendTestMessage',
    'click .clear-messages': 'clearMessages'
  },

  /**
   * The handlebars template used by this view
   * @property template {Template}
   */
  template: require('./home-template.hbs'),

  initialize: function() {
    this.messages = [];
    this.on('change', this.render);
    this.listenTo(wsService, 'inbound-message', this.onNewMessage);
    this.wsService = wsService;
  },

  onNewMessage: function(message) {
    this.messages.push(message);
    this.render();
  },

  sendTestMessage: function() {
    $.get('/test-message').done((res) => {
      wsService.send(res);
    });
  },

  clearMessages: function() {
    this.messages = [];
    this.render();
  }
}))();
},{"../services/wsService":9,"./home-template.hbs":5,"backbone-torso":34,"backbone-torso/node_modules/jquery":36,"underscore":48}],7:[function(require,module,exports){
const $ = require('backbone-torso/node_modules/jquery');
const Backbone = require('backbone');
require('./helpers');
Backbone.$ = $;

// Expose some globals
window.$ = $;
window.jQuery = $;

$(window).ready(function () {
  /**
   * The application router object
   */
  let router = require('./router');
  router.start();
  window.app = router;
});


},{"./helpers":1,"./router":8,"backbone":39,"backbone-torso/node_modules/jquery":36}],8:[function(require,module,exports){
var Torso = require('backbone-torso'),
    $ = require('backbone-torso/node_modules/jquery');

module.exports = new (Torso.Router.extend({
  current: null,
  routes: {
    '': 'index'
  },

  /**
   * Stop the history if it's already started. Bind the routes, and start.
   * and start the history.
   * @method start
   */
  start: function() {
    Torso.history.stop();
    this._bindRoutes();
    Torso.history.start();
  },

  /**
   * Initialize the base home view
   */
  index: function() {
    this.switchPerspective(require('./home/homeView'));
  },

  /**
   * Switches the current perspective to be the given perspective.
   */
  switchPerspective: function(nextPerspective) {
    if (this.current) {
      this.current.detach();
    }

    this.current = nextPerspective;
    this.current.attachTo($('.app'));
  }
}))();
},{"./home/homeView":6,"backbone-torso":34,"backbone-torso/node_modules/jquery":36}],9:[function(require,module,exports){
const Torso = require('backbone-torso');
const _ = require('underscore');
const port = require('../../server/props').port;

module.exports = new (Torso.ServiceCell.extend({

  initialize: function(opts = {}) {
    _.defaults(opts, {
      autoReconnect: true
    })
    this.set('autoReconnect', opts.autoReconnect);
    this.activate();
  },

  activate: function() {
    this.connect();
  },

  deactivate: function() {
    this.disconnect();
  },

  isConnected: function() {
    return this.get('connected');
  },

  connect: function() {
    if (this.isConnected()) {
      return;
    }
    let protocol = window.location.protocol == 'https:' ? 'wss:' : 'ws:';
    let socketAddress = `${protocol}//${window.location.host}${window.location.pathname}ui`;
    this.socket = new WebSocket(socketAddress);
    this.socket.onmessage = _.bind(this.onMessage, this);
    this.socket.onclose = _.bind(this.onClose, this);
    this.socket.onopen = _.bind(this.onOpen, this);
  },

  disconnect: function() {
    if (!this.isConnected()) {
      return;
    }
    this.socket.close();
  },

  send: function(message) {
    this.socket.send(JSON.stringify(message));
  },

  onMessage: function(msg) {
    let message = JSON.parse(msg.data);
    this.trigger('inbound-message', message);
  },

  onOpen: function() {
    this.set('connected', true);
  },

  onClose: function() {
    this.set('connected', false);
    if (this.get('autoReconnect')) {
      _.delay(() => {
        if (this.get('autoReconnect')) {
          this.connect();
        }
      }, 1000);
    }
  },
}))();
},{"../../server/props":49,"backbone-torso":34,"underscore":48}],10:[function(require,module,exports){
/**
 * Backbone-Nested 2.0.4 - An extension of Backbone.js that keeps track of nested attributes
 *
 * http://afeld.github.com/backbone-nested/
 *
 * Copyright (c) 2011-2012 Aidan Feldman
 * MIT Licensed (LICENSE)
 */
/*global define, require, module */
(function(root, factory){
  if (typeof exports !== 'undefined') {
      // Define as CommonJS export:
      module.exports = factory(require('backbone-torso/node_modules/jquery'), require("underscore"), require("backbone"));
  } else if (typeof define === 'function' && define.amd) {
      // Define as AMD:
      define(["jquery", "underscore", "backbone"], factory);
  } else {
      // Just run it:
      factory(root.$, root._, root.Backbone);
  }
}(this, function($, _, Backbone) {
  'use strict';


  Backbone.NestedModel = Backbone.Model.extend({

    get: function(attrStrOrPath){
      return Backbone.NestedModel.walkThenGet(this.attributes, attrStrOrPath);
    },

    previous: function(attrStrOrPath){
      return Backbone.NestedModel.walkThenGet(this._previousAttributes, attrStrOrPath);
    },

    has: function(attr){
      // for some reason this is not how Backbone.Model is implemented - it accesses the attributes object directly
      var result = this.get(attr);
      return !(result === null || _.isUndefined(result));
    },

    set: function(key, value, opts){
      var newAttrs = Backbone.NestedModel.deepClone(this.attributes),
        attrPath,
        unsetObj,
        validated;

      if (_.isString(key)){
        // Backbone 0.9.0+ syntax: `model.set(key, val)` - convert the key to an attribute path
        attrPath = Backbone.NestedModel.attrPath(key);
      } else if (_.isArray(key)){
        // attribute path
        attrPath = key;
      }

      if (attrPath){
        opts = opts || {};
        this._setAttr(newAttrs, attrPath, value, opts);
      } else { // it's an Object
        opts = value || {};
        var attrs = key;
        for (var _attrStr in attrs) {
          if (attrs.hasOwnProperty(_attrStr)) {
            this._setAttr(newAttrs,
                          Backbone.NestedModel.attrPath(_attrStr),
                          opts.unset ? void 0 : attrs[_attrStr],
                          opts);
          }
        }
      }

      this._nestedChanges = Backbone.NestedModel.__super__.changedAttributes.call(this);

      if (opts.unset && attrPath && attrPath.length === 1){ // assume it is a singular attribute being unset
        // unsetting top-level attribute
        unsetObj = {};
        unsetObj[key] = void 0;
        this._nestedChanges = _.omit(this._nestedChanges, _.keys(unsetObj));
        validated = Backbone.NestedModel.__super__.set.call(this, unsetObj, opts);
      } else {
        unsetObj = newAttrs;

        // normal set(), or an unset of nested attribute
        if (opts.unset && attrPath){
          // make sure Backbone.Model won't unset the top-level attribute
          opts = _.extend({}, opts);
          delete opts.unset;
        } else if (opts.unset && _.isObject(key)) {
          unsetObj = key;
        }
        this._nestedChanges = _.omit(this._nestedChanges, _.keys(unsetObj));
        validated = Backbone.NestedModel.__super__.set.call(this, unsetObj, opts);
      }


      if (!validated){
        // reset changed attributes
        this.changed = {};
        this._nestedChanges = {};
        return false;
      }


      this._runDelayedTriggers();
      return this;
    },

    unset: function(attr, options) {
      return this.set(attr, void 0, _.extend({}, options, {unset: true}));
    },

    clear: function(options) {
      this._nestedChanges = {};

      // Mostly taken from Backbone.Model.set, modified to work for NestedModel.
      options = options || {};
      // clone attributes so validate method can't mutate it from underneath us.
      var attrs = _.clone(this.attributes);
      if (!options.silent && this.validate && !this.validate(attrs, options)) {
        return false; // Should maybe return this instead?
      }

      var changed = this.changed = {};
      var model = this;

      var setChanged = function(obj, prefix, options) {
        // obj will be an Array or an Object
        _.each(obj, function(val, attr){
          var changedPath = prefix;
          if (_.isArray(obj)){
            // assume there is a prefix
            changedPath += '[' + attr + ']';
          } else if (prefix){
            changedPath += '.' + attr;
          } else {
            changedPath = attr;
          }

          val = obj[attr];
          if (_.isObject(val)) { // clear child attrs
            setChanged(val, changedPath, options);
          }
          if (!options.silent) model._delayedChange(changedPath, null, options);
          changed[changedPath] = null;
        });
      };
      setChanged(this.attributes, '', options);

      this.attributes = {};

      // Fire the `"change"` events.
      if (!options.silent) this._delayedTrigger('change');

      this._runDelayedTriggers();
      return this;
    },

    add: function(attrStr, value, opts){
      var current = this.get(attrStr);
      if (!_.isArray(current)) throw new Error('current value is not an array');
      return this.set(attrStr + '[' + current.length + ']', value, opts);
    },

    remove: function(attrStr, opts){
      opts = opts || {};

      var attrPath = Backbone.NestedModel.attrPath(attrStr),
        aryPath = _.initial(attrPath),
        val = this.get(aryPath),
        i = _.last(attrPath);

      if (!_.isArray(val)){
        throw new Error("remove() must be called on a nested array");
      }

      // only trigger if an element is actually being removed
      var trigger = !opts.silent && (val.length >= i + 1),
        oldEl = val[i];

      // remove the element from the array
      val.splice(i, 1);
      opts.silent = true; // Triggers should only be fired in trigger section below
      this.set(aryPath, val, opts);

      if (trigger){
        attrStr = Backbone.NestedModel.createAttrStr(aryPath);
        this.trigger('remove:' + attrStr, this, oldEl);
        for (var aryCount = aryPath.length; aryCount >= 1; aryCount--) {
          attrStr = Backbone.NestedModel.createAttrStr(_.first(aryPath, aryCount));
          this.trigger('change:' + attrStr, this, oldEl);
        }
        this.trigger('change', this, oldEl);
      }

      return this;
    },

    changedAttributes: function(diff) {
      var backboneChanged = Backbone.NestedModel.__super__.changedAttributes.call(this, diff);
      if (_.isObject(backboneChanged)) {
        return _.extend({}, this._nestedChanges, backboneChanged);
      }
      return false;
    },

    toJSON: function(){
      return Backbone.NestedModel.deepClone(this.attributes);
    },


    // private
    _getDelayedTriggers: function(){
        if (typeof this._delayedTriggers === "undefined"){
            this._delayedTriggers = [];
        }
        return this._delayedTriggers;
    },
    _delayedTrigger: function(/* the trigger args */){
      this._getDelayedTriggers().push(arguments);
    },

    _delayedChange: function(attrStr, newVal, options){
      this._delayedTrigger('change:' + attrStr, this, newVal, options);

      // Check if `change` even *exists*, as it won't when the model is
      // freshly created.
      if (!this.changed) {
        this.changed = {};
      }

      this.changed[attrStr] = newVal;
    },

    _runDelayedTriggers: function(){
      while (this._getDelayedTriggers().length > 0){
        this.trigger.apply(this, this._getDelayedTriggers().shift());
      }
    },

    // note: modifies `newAttrs`
    _setAttr: function(newAttrs, attrPath, newValue, opts){
      opts = opts || {};

      var fullPathLength = attrPath.length;
      var model = this;

      Backbone.NestedModel.walkPath(newAttrs, attrPath, function(val, path, next){
        var attr = _.last(path);
        var attrStr = Backbone.NestedModel.createAttrStr(path);

        // See if this is a new value being set
        var isNewValue = !_.isEqual(val[attr], newValue);

        if (path.length === fullPathLength){
          // reached the attribute to be set

          if (opts.unset){
            // unset the value
            delete val[attr];

            // Trigger Remove Event if array being set to null
            if (_.isArray(val)){
              var parentPath = Backbone.NestedModel.createAttrStr(_.initial(attrPath));
              model._delayedTrigger('remove:' + parentPath, model, val[attr]);
            }
          } else {
            // Set the new value
            val[attr] = newValue;
          }

          // Trigger Change Event if new values are being set
          if (!opts.silent && _.isObject(newValue) && isNewValue){
            var visited = [];
            var checkChanges = function(obj, prefix) {
              // Don't choke on circular references
              if(_.indexOf(visited, obj) > -1) {
                return;
              } else {
                visited.push(obj);
              }

              var nestedAttr, nestedVal;
              for (var a in obj){
                if (obj.hasOwnProperty(a)) {
                  nestedAttr = prefix + '.' + a;
                  nestedVal = obj[a];
                  if (!_.isEqual(model.get(nestedAttr), nestedVal)) {
                    model._delayedChange(nestedAttr, nestedVal, opts);
                  }
                  if (_.isObject(nestedVal)) {
                    checkChanges(nestedVal, nestedAttr);
                  }
                }
              }
            };
            checkChanges(newValue, attrStr);

          }


        } else if (!val[attr]){
          if (_.isNumber(next)){
            val[attr] = [];
          } else {
            val[attr] = {};
          }
        }

        if (!opts.silent){
          // let the superclass handle change events for top-level attributes
          if (path.length > 1 && isNewValue){
            model._delayedChange(attrStr, val[attr], opts);
          }

          if (_.isArray(val[attr])){
            model._delayedTrigger('add:' + attrStr, model, val[attr]);
          }
        }
      });
    }

  }, {
    // class methods

    attrPath: function(attrStrOrPath){
      var path;

      if (_.isString(attrStrOrPath)){
        // TODO this parsing can probably be more efficient
        path = (attrStrOrPath === '') ? [''] : attrStrOrPath.match(/[^\.\[\]]+/g);
        path = _.map(path, function(val){
          // convert array accessors to numbers
          return val.match(/^\d+$/) ? parseInt(val, 10) : val;
        });
      } else {
        path = attrStrOrPath;
      }

      return path;
    },

    createAttrStr: function(attrPath){
      var attrStr = attrPath[0];
      _.each(_.rest(attrPath), function(attr){
        attrStr += _.isNumber(attr) ? ('[' + attr + ']') : ('.' + attr);
      });

      return attrStr;
    },

    deepClone: function(obj){
      return $.extend(true, {}, obj);
    },

    walkPath: function(obj, attrPath, callback, scope){
      var val = obj,
        childAttr;

      // walk through the child attributes
      for (var i = 0; i < attrPath.length; i++){
        callback.call(scope || this, val, attrPath.slice(0, i + 1), attrPath[i + 1]);

        childAttr = attrPath[i];
        val = val[childAttr];
        if (!val) break; // at the leaf
      }
    },

    walkThenGet: function(attributes, attrStrOrPath){
      var attrPath = Backbone.NestedModel.attrPath(attrStrOrPath),
        result;

      Backbone.NestedModel.walkPath(attributes, attrPath, function(val, path){
        var attr = _.last(path);
        if (path.length === attrPath.length){
          // attribute found
          result = val[attr];
        }
      });

      return result;
    }

  });

  return Backbone;
}));

},{"backbone":39,"backbone-torso/node_modules/jquery":36,"underscore":48}],11:[function(require,module,exports){
(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['underscore', './NestedCell'], factory);
  } else if (typeof exports === 'object') {
    var _ = require('underscore');
    var TorsoNestedCell = require('./NestedCell');
    module.exports = factory(_, TorsoNestedCell);
  } else {
    root.Torso = root.Torso || {};
    root.Torso.Behavior = factory(root._, root.Torso.NestedCell);
  }
}(this, function(_, NestedCell) {
  'use strict';

  // Map of eventName: lifecycleMethod
  var eventMap = {
    'before-attached-callback': '_attached',
    'before-detached-callback':  '_detached',
    'before-activate-callback': '_activate',
    'before-deactivate-callback': '_deactivate',
    'before-dispose-callback': '_dispose',
    'render:before-attach-tracked-views': 'attachTrackedViews',
    'render:begin': 'prerender',
    'render:complete': 'postrender',
    'initialize:begin':  'preinitialize',
    'initialize:complete': 'postinitialize'
  };

  /**
   * Allows abstraction of common view logic into separate object
   *
   * @module Torso
   * @class  Behavior
   * @method constructor
   * @author  deena.wang@vecna.com
   */
  var Behavior = NestedCell.extend({
    /**
     * Unique name of the behavior instance w/in a view.  More human readable than the cid.
     * @property alias {String}
     */
    /**
     * @property cidPrefix of Behaviors
     * @type {String}
     */
    cidPrefix: 'b',

    /**
     * Add functions to be added to the view's public API. They will be behavior-scoped.
     * @property mixin
     * @type {Object}
     */
    mixin: {},

    /**
     * The behavior's prepare result will be combined with the view's prepare with the behavior's alias as the namespace.
     * effectively: { <behaviorName>: behavior.prepare() } will be combined with the view's prepare result.
     * @method prepare
     * @return a prepare context suitable to being added to the view's prepare result.
     */
    prepare: _.noop,

    /**
     * @method constructor
     * @override
     * @param behaviorAttributes {Object} the initial value of the behavior's attributes.
     * @param behaviorOptions {Object}
     *   @param behaviorOptions.view {Backbone.View} that Behavior is attached to
     *   @param behaviorOptions.alias {Backbone.View} the alias for the behavior in this view.
     * @param [viewOptions] {Object} options passed to View's initialize
     */
    constructor: function(behaviorAttributes, behaviorOptions, viewOptions) {
      behaviorOptions = behaviorOptions || {};
      if (!behaviorOptions.view) {
        throw new Error('Torso Behavior constructed without behaviorOptions.view');
      }
      this.view = behaviorOptions.view;
      if (!behaviorOptions.alias) {
        throw new Error('Torso Behavior constructed without behaviorOptions.alias');
      }
      this.alias = behaviorOptions.alias;
      this.cid = this.cid || _.uniqueId(this.cidPrefix);
      this.__bindLifecycleMethods();
      NestedCell.apply(this, arguments);
      this.__bindEventCallbacks();
    },

    /**
     * This is called after the view's initialize method is called and will wrap the view's prepare()
     * such that it returns the combination of the view's prepare result with the behavior's prepare result
     * inside it under the behavior's alias.
     * @method __augmentViewPrepare
     * @private
     */
    __augmentViewPrepare: function() {
      var originalViewPrepareFn = _.bind(this.view.prepare, this.view);
      var wrappedPrepareFn = _.wrap(originalViewPrepareFn, this.__viewPrepareWrapper);
      this.view.prepare = _.bind(wrappedPrepareFn, this);
    },

    /**
     * Wraps the view's prepare such that it returns the combination of the view and behavior's prepare results.
     * @method __viewPrepareWrapper
     * @private
     * @param viewPrepare {Function} the prepare method from the view.
     * @return {Object} the combined view and behavior prepare() results.
     * {
     *   <behavior alias>: behavior.prepare(),
     *   ... // view prepare properties.
     * }
     */
    __viewPrepareWrapper: function(viewPrepare) {
      var viewContext = viewPrepare() || {};
      var behaviorContext = _.omit(this.toJSON(), 'view');
      _.extend(behaviorContext, this.prepare());
      viewContext[this.alias] = behaviorContext;
      return viewContext;
    },

    /**
     * Registers defined lifecycle methods to be called at appropriate time in view's lifecycle
     *
     * @method __bindLifecycleMethods
     * @private
     */
    __bindLifecycleMethods: function() {
      this.listenTo(this.view, 'initialize:complete', this.__augmentViewPrepare);
      this.listenTo(this.view, 'before-dispose-callback', this.__dispose);
      _.each(eventMap, function(callback, event) {
        this.listenTo(this.view, event, this[callback]);
      }, this);
    },

    /**
     * Adds behavior's event handlers to view
     * Behavior's event handlers fire on view events but are run in the context of the behavior
     *
     * @method __bindEventCallbacks
     * @private
     */
    __bindEventCallbacks: function() {
      var behaviorEvents = _.result(this, 'events');
      var viewEvents = this.view.events;

      if (!viewEvents) {
        if (!behaviorEvents) {
          return;
        } else {
          viewEvents = {};
        }
      }

      var namespacedEvents = this.__namespaceEvents(behaviorEvents);
      var boundBehaviorEvents = this.__bindEventCallbacksToBehavior(namespacedEvents);

      if (_.isFunction(viewEvents)) {
        this.view.events = _.wrap(_.bind(viewEvents, this.view), function(viewEventFunction) {
          return _.extend(boundBehaviorEvents, viewEventFunction());
        });
      } else if (_.isObject(viewEvents)) {
        this.view.events = _.extend(boundBehaviorEvents, viewEvents);
      }
    },

    /**
     * Namespaces events in event hash
     *
     * @method __namespaceEvents
     * @param eventHash {Object} to namespace
     * @return {Object} with event namespaced with '.behavior' and the cid of the behavior
     * @private
     */
    __namespaceEvents: function(eventHash) {
      // coped from Backbone
      var delegateEventSplitter = /^(\S+)\s*(.*)$/;
      var namespacedEvents = {};
      var behaviorId = this.cid;
      _.each(eventHash, function(value, key) {
        var splitEventKey = key.match(delegateEventSplitter);
        var eventName = splitEventKey[1];
        var selector = splitEventKey[2];
        var namespacedEventName = eventName + '.behavior.' + behaviorId;
        namespacedEvents[[namespacedEventName, selector].join(' ')] = value;
      });
      return namespacedEvents;
    },

    /**
     * @method __bindEventCallbacksToBehavior
     * @param eventHash {Object} keys are event descriptors, values are String method names or functions
     * @return {Object} event hash with values as methods bound to view
     * @private
     */
    __bindEventCallbacksToBehavior: function(eventHash) {
      return _.mapObject(eventHash, function(method) {
        if (!_.isFunction(method)) {
          method = this[method];
        }
        return _.bind(method, this);
      }, this);
    },

    /**
     * Preforms basic cleanup of a behavior before specific cleanup by extensions.
     * @method __dispose
     * @private
     */
    __dispose: function() {
      this.stopListening();
      this.off();
    }

  });

  return Behavior;
}));


},{"./NestedCell":19,"underscore":37}],12:[function(require,module,exports){
(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['underscore', 'backbone', './mixins/cellMixin'], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory(require('underscore'), require('backbone'), require('./mixins/cellMixin'));
  } else {
    root.Torso = root.Torso || {};
    root.Torso.Cell = factory(root._, root.Backbone, root.Torso.Mixins.cell);
  }
}(this, function(_, Backbone, cellMixin) {
  'use strict';
  /**
   * An non-persistable object that can listen to and emit events like a models.
   * @module Torso
   * @class  Cell
   * @author ariel.wexler@vecna.com, kent.willis@vecna.com
   */
  var Cell = Backbone.Model.extend({});
  _.extend(Cell.prototype, cellMixin);

  return Cell;
}));

},{"./mixins/cellMixin":29,"backbone":39,"underscore":37}],13:[function(require,module,exports){
(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['underscore', 'backbone', './mixins/pollingMixin', './mixins/cacheMixin', './mixins/loadingMixin'], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory(require('underscore'), require('backbone'), require('./mixins/pollingMixin'), require('./mixins/cacheMixin'), require('./mixins/loadingMixin'));
  } else {
    root.Torso = root.Torso || {};
    root.Torso.Collection = factory(root._, root.Backbone, root.Torso.Mixins.polling, root.Torso.Mixins.cache, root.Torso.Mixins.loading);
  }
}(this, function(_, Backbone, pollingMixin, cacheMixin, loadingMixin) {
  'use strict';

  /**
   * Generic Collection
   * @module    Torso
   * @class     Collection
   * @constructor
   * @author kent.willis@vecna.com
   */
  var Collection = Backbone.Collection.extend({
      /**
       * The default filter.  Always returns itself.
       * @method filterDefault
       * @return {Collection} a new instance of this collection
       */
      filterDefault: function() {
        return this.constructor(this);
      },

      /**
       * Will abolish all listeners and events that are hooked
       * to this collection.
       * @method dispose
       */
      dispose: function() {
        this.unbind();
        this.off();
        this.stopListening();
        this.stopPolling();
        if (this.isRequester) {
          this.requesterDispose();
        }
      }
  });
  _.extend(Collection.prototype, pollingMixin);
  Collection = Collection.extend(loadingMixin(Collection));
  Collection = Collection.extend(cacheMixin(Collection));

  return Collection;
}));

},{"./mixins/cacheMixin":28,"./mixins/loadingMixin":30,"./mixins/pollingMixin":31,"backbone":39,"underscore":37}],14:[function(require,module,exports){
(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['underscore', 'backbone'], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory(require('underscore'), require('backbone'));
  } else {
    root.Torso = root.Torso || {};
    root.Torso.Events = factory(root._, root.Backbone);
  }
}(this, function(_, Backbone) {
  'use strict';

  /**
   * Generic Events.
   * @module    Torso
   * @class     Events
   * @constructor
   * @author ariel.wexler@vecna.com, kent.willis@vecna.com
   */
  var Events = _.extend({}, Backbone.Events);

  return Events;
}));

},{"backbone":39,"underscore":37}],15:[function(require,module,exports){
(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['underscore', 'jquery', './NestedModel', './validation'], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory(require('underscore'), require('backbone-torso/node_modules/jquery'), require('./NestedModel'), require('./validation'));
  } else {
    root.Torso = root.Torso || {};
    root.Torso.FormModel = factory(root._, (root.jQuery || root.Zepto || root.ender || root.$), root.Torso.NestedModel, root.Torso.validation);
  }
}(this, function(_, $, NestedModel, validation) {
  'use strict';

  /**
   * Generic Form Model
   * @module    Torso
   * @class     FormModel
   * @constructor
   * @author kent.willis@vecna.com
   */
  var FormModel = NestedModel.extend({
    /**
     * @private
     * @property __currentMappings
     * @type Object
     **/
    /**
     * @private
     * @property __cache
     * @type Object
     **/
    /**
     * @private
     * @property __currentObjectModels
     * @type Object
     **/
    /**
     * @private
     * @property __currentUpdateEvents
     * @type Array
     **/
    /**
     * @property validation
     * @type Object
     **/
    /**
     * @property labels
     * @type Object
     **/
    /**
     * Map from aliases (either model names or computed value names) to mappings.
     * Please refer to the documentation on the constructor about the form and options for this field.
     * @property mapping
     * @type Object
     **/
    mapping: undefined,

    /**
     * Map from model aliases to model instances.
     * Please refer to the documentation on the constructor about the form and options for this field.
     * @property models
     * @type Object
     **/
    models: undefined,

    /**
     * Constructor the form model. Can take in attributes to set initially. These will override any pulled values from object models
     * on initialization. On initialization the object model's values will be pulled once.
     * For the options, here are needed definitions:
     * mapping: {
     *   modelName: 'foo bar baz' // track a model by providing an alias for a name and a space seperated list of fields to track as a String
     *   modelName2: true          // to track all fields
     *   ...                      // can have many model mappings
     *   computedName: {
     *     modelName: 'taz raz',  // mappings for models that will be used for this computed mapping.
     *     ...                    // can have many model mappings for a computed
     *     pull: function(models) {}, // a callback that will be invoked when pulling data from the Object model. Passes in a map of model alias/name to shallow copies of fields being tracked on that model.
     *     push: function(models) {}  // a callback that will be invoked when pushing data to the Object model. Passes in a map of model alias/name to object model being tracked under that alias.
     *   }
     * },
     * models: {
     *   modelName: modelInstance,  // optionally, provide a set of model instance to model name (aliases) to start tracking
     *   modelName2: modelInstance2 // provide as many aliases to model instances as you'd like
     * }
     * @method constructor
     * @param [options] {Object}
     *   @param [options.mapping] {Object} map from aliases (either model names or computed value names) to mappings.
     *     A model mapping can bind an alias to a space seperated list of fields to track as a String  r the boolean true if it is mapping all the
     *     fields. A computed mapping can bind an alias to a set of model mappings required for this computed value and both a pull and/or push method
     *     that are used to compute different values to or from object model(s).
     *   @param [options.models] {Object} Because the options.mapping parameter only allows you to define the mappings to aliases, this options allows
     *     you to bind model instances to aliases. Setting model instances to aliases are required to actually begin pulling/pushing values.
     *   @param [options.startUpdating=false] {Boolean} set to true if you want to immediately set up listeners to update this form
     *     model as the object model updates. You can always toggle this state with startUpdating() and stopUpdating().
     *   @param [options.validation] {Object} A Backbone.Validation plugin hash to dictate the validation rules
     *   @param [options.labels] {Object} A Backbone.Validation plugin hash to dictate the attribute labels
     */
    constructor: function(attributes, options) {
      options = options || {};
      this.__cache = {};
      this.__currentUpdateEvents = [];
      this.__currentMappings = {};
      this.__currentObjectModels = {};

      // override + extend the validation and labels hashes
      this.validation = _.extend({}, this.validation, options.validation);
      this.labels = _.extend({}, this.labels, options.labels);

      NestedModel.apply(this, arguments);

      this.__initMappings(options);

      // Do an initial pull
      this.pull();

      // The pull may have overridden default attributes
      if (attributes) {
        this.set(attributes);
      }

      // Begin updating if requested
      if (options.startUpdating) {
        this.startUpdating();
      }
      this.trigger('initialization-complete');
    },

    /**
     * @method getMapping
     * @param alias {String} the alias of the mapping - either a model mapping or a computed mapping
     * @return the mapping config for that alias
     */
    getMapping: function(alias) {
      return this.__currentMappings[alias];
    },

    /**
     * @method getMappings
     * @return all the current mapping configs
     */
    getMappings: function() {
      return this.__currentMappings;
    },

    /**
     * Define or redefine how the form model pull/pushes or otherwise tracks properties between an object model(s).
     * Examples:
     * this.setMapping('modelAlias', true, optional model instance);
     * this.setMapping('modelAlias, 'foo bar baz', optional model instance);
     * this.setMapping('computedAlias', {
     *   model1: 'foo',
     *   model2: 'bar',
     *   push: function(models) {
     *     models.model1.set('foo', this.get('foobar')[0]);
     *     models.model2.set('bar', this.get('foobar')[1]);
     *   },
     *   pull: function(models) {
     *     this.set('foobar', [models.model1.foo, models.model2.bar]);
     *   },
     * }, optional model map)
     * @method setMapping
     * @param alias {String} the name for the mapping - either a model mapping or a computed mapping
     * @param mapping {String, Boolean or Object} Provides the mapping for this alias. If trying to map to a model, then either provide
     *  a space delimited list of fields to track as a String or the boolean true to track all the model's fields. If the mapping is for
     *  a computed value, then provide a map from model alias to model mapping for all the fields needed for the computed and a pull method
     *  if you want to change/combine/split object model properties before bringing them into the form model and a push method if you want to
     *  change/combine/split form model properties before pushing them to the object models.
     * @param [models] {Object or Backbone.Model instance} Provides instances to use for this mapping. If mapping is a computed,
     *   provide a map from alias to model instance. If mapping is for a single model, just provide the model instance for that alias.
     * @param [copy=false] if true, will pull values definined by this mapping after setting the mapping. Requires models to be passed in.
     */
    setMapping: function(alias, mapping, models, copy) {
      var computed, fields,
        config = {};
      if (_.isString(mapping)) {
        fields = mapping.split(' ');
      } else if (mapping === true) {
        fields = undefined;
      } else if (_.isObject(mapping)) {
        mapping = _.clone(mapping);
        computed = true;
      }
      config.computed = computed;
      if (computed) {
        config.mapping = mapping;
        _.each(this.__getModelAliases(config), function(modelAlias) {
          var configMappingForAlias = config.mapping[modelAlias];
          if (_.isString(configMappingForAlias)) {
            configMappingForAlias = configMappingForAlias.split(' ');
          } else if (configMappingForAlias === true) {
            configMappingForAlias = undefined;
          }
          config.mapping[modelAlias] = configMappingForAlias;
        });
      } else {
        config.mapping = fields;
      }
      this.__currentMappings[alias] = config;
      if (models) {
        if (computed) {
          this.trackModels(models, copy);
        } else {
          this.trackModel(alias, models, copy);
        }
      }
    },

    /**
     * Sets multiple mappings (both model mappings and computed value mappings) with one call.
     * Uses the same style of mapping syntax as the constructor. Please refer to the documentation on the constructor.
     * Here is an example:
     * this.setMappings({
     *   model1: 'foo bar',
     *   model2: 'baz',
     *   ssn: {
     *     model1: 'ssn',
     *     model2: 'lastssn'
     *     push: function(models) {},
     *     pull: function(models) {},
     *   }
     * }, optional model map)
     * @method setMappings
     * @param mappings {Object} Uses the same style of mapping syntax as the constructor. Please refer to the documentation on the constructor.
     * @param [models] {Object} this parameter allows you to immediately bind model instances to aliases. Keys are aliases and values are backbone model instances.
     * @param [copy=false] if true, will pull values definined by this mapping after setting the mapping. Requires models to be passed in.
     */
    setMappings: function(mappings, models, copy) {
      _.each(mappings, function(mapping, alias) {
        this.setMapping(alias, mapping);
      }, this);
      if (models) {
        this.trackModels(models, copy);
      }
    },

    /**
     * Remove a mapping (model or computed) by alias
     * @method unsetMapping
     * @param aliasOrModel {String or Backbone.Model instance} if a String is provided, it will unset the mapping with that alias.
     *   If a Backbone Model instance is provided, it will remove the model mapping that was bound to that model.
     * @param [removeModelIfUntracked=false] {Boolean} If true, after the mapping is removed, the model will also be unset but only if
     *   no other mappings reference it. Note, setting this to true will not remove any computed mappings that also use that model.
     */
    unsetMapping: function(aliasOrModel, removeModelIfUntracked) {
      var alias = this.__findAlias(aliasOrModel);
      if (alias) {
        delete this.__currentMappings[alias];
      }
      var model = this.getTrackedModel(alias);
      if (removeModelIfUntracked && model && _.isEmpty(this.__getTrackedModelFields(model))) {
        this.untrackModel(model);
      }
    },

    /**
     * Removes all current mappings
     * Does NOT remove current model being tracked. Call this.untrackModels afterwards if you wish this behavior.
     * @method unsetMappings
     */
    unsetMappings: function() {
      this.__currentMappings = {};
      this.resetUpdating();
    },

    /**
     * Returns the object model currently bound to the given name/alias.
     * @method getTrackedModel
     * @param alias {String} the name/alias used by the mappings.
     * @return {Backbone Model instance} the model currently bound to the alias
     */
    getTrackedModel: function(alias) {
      return this.__currentObjectModels[alias];
    },

    /**
     * Returns all the currently tracked object models
     * @method getTrackedModels
     * @return all the currently tracked object models
     */
    getTrackedModels: function() {
      return _.values(this.__currentObjectModels);
    },

    /**
     * See {{#crossLink "FormModel/trackModel:method"}}.trackModel(){{/crossLink}}
     * @method setTrackedModel
     * @deprecated use .trackModel() instead.
     */
    setTrackedModel: function() {
      this.trackModel.apply(this, arguments);
    },

    /**
     * Update or create a binding between an object model and an alias.
     * @method trackModel
     * @param alias {String} the alias/name to bind to.
     * @param model {Backbone Model instance} the model to be bound. Mappings referencing this alias will start applying to this model.
     * @param [copy=false] {Boolean} if true, the form model will perform a pull on any mappings using this alias.
     */
    trackModel: function(alias, model, copy) {
      this.__currentObjectModels[alias] = model;
      this.__updateCache(model);
      this.resetUpdating();
      if (copy) {
        _.each(this.getMappings(), function(config, mappingAlias) {
          var modelAliases;
          if (alias === mappingAlias) {
            this.__pull(mappingAlias);
          }
          if (config.computed) {
            modelAliases = this.__getModelAliases(mappingAlias);
            if (_.contains(modelAliases, alias)) {
              this.__pull(mappingAlias);
            }
          }
        }, this);
      }
    },

    /**
     * See {{#crossLink "FormModel/trackModels:method"}}.trackModels(){{/crossLink}}
     * @deprecated use .trackModels() instead.
     */
    setTrackedModels: function() {
      this.trackModels.apply(this, arguments);
    },

    /**
     * Binds multiple models to their aliases.
     * @method trackModels
     * @param models {Map from String to Backbone Model instances} A map from alias/name to model to be bound to that alias.
     * @param [copy=false] {Boolean} if true, the form model will perform a pull on any mapping using these models.
     */
    trackModels: function(models, copy) {
      _.each(models, function(instance, alias) {
        this.trackModel(alias, instance, copy);
      }, this);
    },

    /**
     * See {{#crossLink "FormModel/untrackModel:method"}}.untrackModel(){{/crossLink}}
     * @method unsetTrackedModel
     * @deprecated use .untrackModel() instead.
     */
    unsetTrackedModel: function() {
      this.untrackModel.apply(this, arguments);
    },

    /**
     * Removes the binding between a model alias and a model instance. Effectively stops tracking that model.
     * @method untrackModel
     * @param aliasOrModel {String or Backbone Model instance} If a string is given, it will unset the model using that alias. If a model instance
     *   is given, it will unbind whatever alias is currently bound to it.
     */
    untrackModel: function(aliasOrModel) {
      var model,
        alias = this.__findAlias(aliasOrModel);
      if (alias) {
        model = this.__currentObjectModels[alias];
        delete this.__currentObjectModels[alias];
        this.__updateCache(model);
      }
      this.resetUpdating();
    },

    /**
     * See {{#crossLink "FormModel/untrackModels:method"}}.untrackModels(){{/crossLink}}
     * @method unsetTrackedModels
     * @deprecated use .untrackModels() instead.
     */
    unsetTrackedModels: function() {
      this.untrackModels.apply(this, arguments);
    },

    /**
     * Removes all the bindings between model aliases and model instances. Effectively stops tracking the current models.
     * @method untrackModels
     */
    untrackModels: function() {
      this.__currentObjectModels = [];
      this.__updateCache();
      this.resetUpdating();
    },

    /**
     * Pushes values from this form model back to the object models it is tracking. This includes invoking the push callbacks from
     * computed values
     * @method push
     */
    push: function() {
      _.each(this.getMappings(), function(config, alias) {
        this.__push(alias);
      }, this);
    },

    /**
     * Pulls the most recent values of every object model that this form model tracks including computed values
     * NOTE: using this method can override user-submitted data from an HTML form. Use caution.
     * @method pull
     */
    pull: function() {
      _.each(this.getMappings(), function(config, alias) {
        this.__pull(alias);
      }, this);
      this.__updateCache();
    },

    /**
     * If FormModel has a "url" property defined, it will invoke a save on the form model, and after successfully
     * saving, will perform a push.
     * If no "url" property is defined then the following behavior is used:
     * Pushes the form model values to the object models it is tracking and invokes save on each one. Returns a promise.
     * NOTE: if no url is specified and no models are being tracked, it will instead trigger a 'save-fail' event and reject the returned promise
     * with a payload that mimics a server response: {none: { success: false, response: [{ responseJSON: { generalReasons: [{messageKey: 'no.models.were.bound.to.form'}] }}] }}
     * @param [options] {Object}
     *   @param [options.rollback=true] {Boolean} if true, when any object model fails to save, it will revert the object
     *     model attributes to the state they were before calling save. NOTE: if there are updates that happen
     *     to object models within the timing of this save method, the updates could be lost.
     *   @param [options.force=true] {Boolean} if false, the form model will check to see if an update has been made
     *     to any object models it is tracking since it's last pull. If any stale data is found, save with throw an exception
     *     with attributes: {name: 'Stale data', staleModels: [Array of model cid's]}
     * @return when using a "url", a promise is returned for the save on this form model.
         If not using a "url", a promise that will either resolve when all the models have successfully saved in which case the context returned
     *   is an array of the responses (order determined by first the array of models and then the array of models used by
     *   the computed values, normalized), or if any of the saves fail, the promise will be rejected with an array of responses.
     *   Note: the size of the failure array will always be one - the first model that failed. This is a side-effect of $.when
     * @method save
     */
    save: function(options) {
      var notTrackingResponse, url,
        deferred = new $.Deferred(),
        formModel = this;
      options = options || {};
      _.defaults(options, {
        rollback: true,
        force: true
      });
      try {
        url = _.result(formModel, 'url');
      } catch (e) {
        // no url attached to this form model. Continue by pushing to models.
      }
      if (url) {
        return NestedModel.prototype.save.apply(formModel, arguments).done(function() {
          formModel.push();
        });
      } else if (this.isTrackingAnyObjectModel()) {
        this.__saveToModels(deferred, options);
        return deferred.promise();
      } else {
        // Return a response that is generated when this form model is not tracking an object model
        notTrackingResponse = {
          'none': {
            success: false,
            response: [{
              responseJSON: {
                generalReasons: [{messageKey: 'no.models.were.bound.to.form'}]
              }
            }]
          }
        };
        this.trigger('save-fail', notTrackingResponse);
        return (new $.Deferred()).reject(notTrackingResponse).promise();
      }
    },

    /**
     * @method isTrackingAnyObjectModel
     * @return true if this form model is backed by an Object model. That means that at least one object model was bound to an mapping alias.
     */
    isTrackingAnyObjectModel: function() {
      return _.size(this.__currentObjectModels) > 0;
    },

    /**
     * @method isUpdating
     * @return true if any updates to an object model will immediately copy new values into this form model.
     */
    isUpdating: function() {
      return this.__currentUpdateEvents.length > 0;
    },

    /**
     * Will add listeners that will automatically pull new updates from this form's object models.
     * @param [pullFirst=false] {Boolean} if true, the form model will pull most recent values then start listening
     * @method startUpdating
     */
    startUpdating: function(pullFirst) {
      if (this.isTrackingAnyObjectModel() && !this.isUpdating()) {
        if (pullFirst) {
          this.pull();
        }
        this.__setupListeners();
      }
    },

    /**
     * This will stop the form model from listening to its object models.
     * @method stopUpdating
     */
    stopUpdating: function() {
      _.each(this.__currentUpdateEvents, function(eventConfig) {
        this.stopListening(eventConfig.model, eventConfig.eventName);
      }, this);
      this.__currentUpdateEvents = [];
    },

    /**
     * If updating, it will reset the updating events to match the current mappings.
     * @method resetUpdating
     */
    resetUpdating: function() {
      if (this.isUpdating()) {
        this.stopUpdating();
        this.startUpdating();
      }
    },

    /**
     * @param model {Backbone.Model} the backbone model that is being checked
     * @param [staleModels] {Object} a hash that will be updated to contain this model if it is stale in the form: cid -> model.
     * @param [currentHashValues] {Object} If passed an object, it will look in this cache for the current value of the object model
     *   instead of calculating it. It should be key'ed by the model's cid
     * @return {Boolean} true if the model passed in has been changed since the last pull from the object model.
     * @method isModelStale
     */
    isModelStale: function(model, staleModels, currentHashValues) {
      var hashValue;
      currentHashValues = currentHashValues || {};
      if (!currentHashValues[model.cid]) {
        currentHashValues[model.cid] = this.__generateHashValue(model);
      }
      hashValue = currentHashValues[model.cid];
      var isStaleModel = this.__cache[model.cid] !== hashValue;
      if (staleModels) {
        if (isStaleModel) {
          staleModels[model.cid] = model;
        } else if (staleModels[model.cid]) {
          delete staleModels[model.cid];
        }
      }
      return isStaleModel;
    },

    /**
     * @return {Array} an array of the object models that have been updated since the last pull from this form model
     * @method checkIfModelsAreStale
     */
    checkIfModelsAreStale: function() {
      var staleModels = {},
        currentHashValues = this.__generateAllHashValues();
      _.each(this.getTrackedModels(), function(model) {
        this.isModelStale(model, staleModels, currentHashValues);
      }, this);
      return _.values(staleModels);
    },

    //************** Private methods **************//

    /**
     * Sets up a listener to update the form model if the model's field (or any field) changes.
     * @param model {Backbone.Model} the object model from which this form model will start listen to changes
     * @param [field] {String} the field name that it will start listening to. If no field is given, it will listen to the general 'change' event.
     * @method __listenToModelField
     * @private
     */
    __listenToModelField: function(model, field) {
      var callback, eventName;
      if (field) {
        eventName = 'change:' + field;
        callback = _.bind(this.__updateFormField, {
          formModel: this,
          field: field
        });
      } else {
        eventName = 'change';
        callback = this.__updateFormModel;
      }
      this.listenTo(model, eventName, callback);
      this.__currentUpdateEvents.push({model: model, eventName: eventName});
    },

    /**
     * Sets up a listener on one (or all) of the fields that is needed to update a computed value
     * @param model {Backbone.Model} the object model from which this form model will start listen to changes
     * @param [field] {String} the field name that it will start listening to. If no field is given, it will listen to the general 'change' event.
     * @param computedAlias {String} the name/alias of the computed mapping being used.
     * @method __listenToComputedValuesDependency
     * @private
     */
    __listenToComputedValuesDependency: function(model, field, computedAlias) {
      var callback, eventName;
      if (field) {
        eventName = 'change:' + field;
      } else {
        eventName = 'change';
      }
      callback = _.bind(this.__invokeComputedPull, {
        formModel: this,
        alias: computedAlias
      });
      this.listenTo(model, eventName, callback);
      this.__currentUpdateEvents.push({model: model, eventName: eventName});
    },

    /**
     * Returns the models that a currently being tracked that are part of a computed mapping
     * If there is a missing model (a model alias is referenced but no model instance is bound to that alias), then it will return undefined.
     * @method __getComputedModels
     * @param computedAlias {String} the name/alias of the computed mapping
     * @return {Object} a map from model name/alias to model instance. If there is a missing model (an model alias is referenced but no model
     *   instance is bound to that alias), then it will return undefined.
     * @private
     */
    __getComputedModels: function(computedAlias) {
      var hasAllModels = !_.isUndefined(this.getMapping(computedAlias)),
        models = {};
      _.each(this.__getModelAliases(computedAlias), function(modelAlias) {
        var model = this.getTrackedModel(modelAlias);
        if (model) {
          models[modelAlias] = model;
        } else {
          hasAllModels = false;
        }
      }, this);
      return hasAllModels ? models : undefined;
    },

    /**
     * Returns the aliases/names of models referenced in the computed mapping with the given alias
     * @method __getModelAliases
     * @param computedAliasOrConfig {String or Object} the name/alias of the computed mapping or the computed mapping itself as
     *   an object if it hasn't been added as a mapping yet.
     * @return {Array of Strings} an array of the model names/aliases referenced inside the computed mapping
     * @private
     */
    __getModelAliases: function(computedAliasOrConfig) {
      var config,
        modelAliases = [];
      if (_.isString(computedAliasOrConfig)) {
        config = this.getMapping(computedAliasOrConfig);
      } else {
        config = computedAliasOrConfig;
      }
      return _.filter(_.keys(config.mapping), function(key) {
        return key != 'pull' && key != 'push';
      });
    },

    /**
     * Repackages a computed mapping to be easier consumed by methods wanting the model mappings tied to the model instances.
     * Returns a list of objects that contain the model instance and the mapping for that model.
     * @method __getComputedModelConfigs
     * @param computedAlias {String} the name/alias used for this computed
     * @return {Array of Objects} a list of objects that contain the model instance under "model" and the mapping for that model under "fields".
     */
    __getComputedModelConfigs: function(computedAlias) {
      var hasAllModels = true,
        config = this.getMapping(computedAlias),
        modelConfigs = [];
      _.each(this.__getModelAliases(computedAlias), function(modelAlias) {
        var modelConfig = this.__createModelConfig(modelAlias, config.mapping[modelAlias]);
        if (modelConfig) {
          modelConfigs.push(modelConfig);
        } else {
          hasAllModels = false;
        }
      }, this);
      return hasAllModels ? modelConfigs : undefined;
    },

    /**
     * Pushes the form model values to the object models it is tracking and invokes save on each one. Returns a promise.
     * @param [options] {Object}
     *   @param [options.rollback=true] {Boolean} if true, when any object model fails to save, it will revert the object
     *     model attributes to the state they were before calling save. NOTE: if there are updates that happen
     *     to object models within the timing of this save method, the updates could be lost.
     *   @param [options.force=true] {Boolean} if false, the form model will check to see if an update has been made
     *     to any object models it is tracking since it's last pull. If any stale data is found, save with throw an exception
     *     with attributes: {name: 'Stale data', staleModels: [Array of model cid's]}
     * @return a promise that will either resolve when all the models have successfully saved in which case the context returned
     *   is an array of the responses (order determined by first the array of models and then the array of models used by
     *   the computed values, normalized), or if any of the saves fail, the promise will be rejected with an array of responses.
     *   Note: the size of the failure array will always be one - the first model that failed. This is a side-effect of $.when
     * @private
     * @method __saveToModels
     */
    __saveToModels: function(deferred, options) {
      var staleModels,
        formModel = this,
        responsesSucceeded = 0,
        responsesFailed = 0,
        responses = {},
        oldValues = {},
        models = formModel.getTrackedModels(),
        numberOfSaves = models.length;
      // If we're not forcing a save, then throw an error if the models are stale
      if (!options.force) {
        staleModels = formModel.checkIfModelsAreStale();
        if (staleModels.length > 0) {
          throw {
            name: 'Stale data',
            staleModels: staleModels
          };
        }
      }
      // Callback for each response
      function responseCallback(response, model, success) {
        // Add response to a hash that will eventually be returned through the promise
        responses[model.cid] = {
            success: success,
            response: response
          };
        // If we have reached the total of number of expected responses, then resolve or reject the promise
        if (responsesFailed + responsesSucceeded === numberOfSaves) {
          if (responsesFailed > 0) {
            // Rollback if any responses have failed
            if (options.rollback) {
              _.each(formModel.getTrackedModels(), function(model) {
                model.set(oldValues[model.cid]);
                if (responses[model.cid].success) {
                  model.save();
                }
              });
            }
            formModel.trigger('save-fail', responses);
            deferred.reject(responses);
          } else {
            formModel.trigger('save-success', responses);
            deferred.resolve(responses);
          }
        }
      }
      // Grab the current values of the object models
      _.each(models, function(model) {
        oldValues[model.cid] = formModel.__getTrackedModelFields(model);
      });
      // Push the form model values to the object models
      formModel.push();
      // Call save on each object model
      _.each(models, function(model) {
        model.save().fail(function() {
          responsesFailed++;
          responseCallback(arguments, model, false);
        }).done(function() {
          responsesSucceeded++;
          responseCallback(arguments, model, true);
        });
      });
    },

    /**
     * Pulls in new information from tracked models using the mapping defined by the given alias.
     * This works for both model mappings and computed value mappings
     * @method __pull
     * @param alias {String} the name of the mapping that will be used during the pull
     * @private
     */
    __pull: function(alias) {
      var config = this.getMapping(alias);
      if (config.computed && config.mapping.pull) {
        this.__invokeComputedPull.call({formModel: this, alias: alias});
      } else if (config.computed) {
        var modelAliases = this.__getModelAliases(alias);
        _.each(modelAliases, function(modelAlias) {
          var model = this.getTrackedModel(modelAlias);
          if (model) {
            this.__copyFields(config.mapping[modelAlias], this, model);
          }
        }, this);
      } else {
        var model = this.getTrackedModel(alias);
        if (model) {
          this.__copyFields(config.mapping, this, model);
        }
      }
    },

    /**
     * Pushes form model information to tracked models using the mapping defined by the given alias.
     * This works for both model mappings and computed value mappings
     * @method __push
     * @param alias {String} the name of the mapping that will be used during the push
     * @private
     */
    __push: function(alias) {
      var config = this.getMapping(alias);
      if (config.computed && config.mapping.push) {
        var models = this.__getComputedModels(alias);
        if (models) {
          config.mapping.push.call(this, models);
        }
      } else if (config.computed) {
        var modelAliases = this.__getModelAliases(alias);
        _.each(modelAliases, function(modelAlias) {
          var model = this.getTrackedModel(modelAlias);
          if (model) {
            this.__copyFields(config.mapping[modelAlias], model, this);
          }
        }, this);
      } else {
        var model = this.getTrackedModel(alias);
        if (model) {
          this.__copyFields(config.mapping, model, this);
        }
      }
    },

    /**
     * Updates a single attribute in this form model.
     * NOTE: requires the context of this function to be:
     * {
     *  formModel: <this form model>,
     *  field: <the field being updated>
     * }
     * NOT the form model itself like if you called this.__updateFormField.
     * @private
     * @method __updateFormField
     */
    __updateFormField: function(model, value) {
      this.formModel.set(this.field, value);
      this.formModel.__updateCache(model);
    },

    /**
     * NOTE: When looking to update the form model manually, call this.pull().
     * Updates this form model with the changed attributes of a given object model
     * @param model {Backbone.Model instance} the object model that has been changed
     * @private
     * @method __updateFormModel
     */
    __updateFormModel: function(model) {
      _.each(model.changedAttributes(), function(value, fieldName) {
        this.set(fieldName, this.__cloneVal(value));
      }, this);
      this.__updateCache(model);
    },

    /**
     * Updates the form model's snapshot of the model's attributes to use later
     * @param model {Backbone.Model instance} the object model
     * @param [cache=this.__cache] {Object} if passed an object (can be empty), this method will fill
     *   this cache object instead of this form model's __cache field
     * @private
     * @method __updateCache
     */
    __updateCache: function(model) {
      if (!model) {
        this.__cache = {};
        _.each(this.getTrackedModels(), function(model) {
          if (model) {
            this.__updateCache(model);
          }
        }, this);
      } else {
        this.__cache[model.cid] = this.__generateHashValue(model);
      }
    },

    /**
     * Create a hash value of a simple object
     * @param obj {Object} simple object with no functions
     * @return a hash value of the object
     * @private
     * @method __hashValue
     */
    __hashValue: function(obj) {
      return JSON.stringify(obj);
    },

    /**
     * Returns the alias/name bound to the model passed in. If a string is passed in, it will just return this string.
     * @method __findAlias
     * @param aliasOrModel {String or Backbone.Model instance} If string, just returns this string. If a model instance, then the alias
     *   that is bound to the tracked model passed in will be found and returned.
     * @return {String} the alias
     * @private
     */
    __findAlias: function(aliasOrModel) {
      var alias, objectModel;
      if (_.isString(aliasOrModel)) {
        alias = aliasOrModel;
      } else {
        objectModel = aliasOrModel;
        alias = _.find(this.__currentObjectModels, function(model) {
          return model == objectModel;
        });
      }
      return alias;
    },

    /**
     * @param model {Backbone.Model instance} the model to create the hash value from
     * @return {String} the hash value of the model making sure to only use the tracked fields
     * @private
     * @method __generateHashValue
     */
    __generateHashValue: function(model) {
      var modelFields = this.__getTrackedModelFields(model);
      return this.__hashValue(modelFields);
    },

    /**
     * @return {Object} a map of model's cid to the hash value of the model making sure to only use the tracked fields
     * @private
     * @method __generateAllHashValues
     */
    __generateAllHashValues: function() {
      var currentHashValues = {};
      _.each(this.getTrackedModels(), function(model) {
        currentHashValues[model.cid] = this.__generateHashValue(model);
      }, this);
      return currentHashValues;
    },

    /**
     * Deep clones the attributes. There should be no functions in the attributes
     * @param val {Object|Array|Basic Data Type} a non-function value
     * @return the clone
     * @private
     * @method __cloneVal
     */
    __cloneVal: function(val) {
      var seed;
      if (_.isArray(val)) {
        seed = [];
      } else if (_.isObject(val)) {
        seed = {};
      } else {
        return val;
      }
      return $.extend(true, seed, val);
    },

    /**
     * Attaches listeners to the tracked object models with callbacks that will copy new properties into this form model.
     * @private
     * @method __setupListeners
     */
    __setupListeners: function() {
      var model, modelConfigs,
        formModel = this;
      _.each(formModel.getMappings(), function(config, alias) {
        if (config.computed) {
          modelConfigs = formModel.__getComputedModelConfigs(alias);
          _.each(modelConfigs, function(modelConfig) {
            var model = modelConfig.model;
            if (modelConfig.fields) {
              _.each(modelConfig.fields, function(field) {
                formModel.__listenToComputedValuesDependency(model, field, alias);
              });
            } else {
              formModel.__listenToComputedValuesDependency(model, '', alias);
            }
          });
        } else {
          model = formModel.getTrackedModel(alias);
          if (model) {
            if (config.mapping) {
              _.each(config.mapping, function(field) {
                formModel.__listenToModelField(model, field);
              });
            } else {
              formModel.__listenToModelField(model);
            }
          }
        }
      });
    },

    /**
     * Copies fields from one backbone model to another. Is useful during a pull or push to/from Object models. The values will
     * be deep cloned from the origin to the destination.
     * @param [fields] {Array} a string of attribute names on the origin model that will be copied. Leave null if all attributes
     *   are to be copied
     * @param destination {Backbone.Model} the backbone model that will have values copied into
     * @param origin {Backbone.Model} the backbone model that will be used to grab values.
     * @private
     * @method __copyFields
     */
    __copyFields: function(fields, destination, origin) {
      if ((!fields || fields === true) && this === origin && _.size(this.getTrackedModels()) > 1) {
        // only copy attributes that exist on object model when the form model is tracking all the properties
        // of that object model, but is also tracking other models as well.
        fields = _.keys(destination.attributes);
      }
      if (fields) {
        _.each(fields, function(field) {
          destination.set(field, this.__cloneVal(origin.get(field)));
        }, this);
      } else {
        destination.set(this.__cloneVal(origin.attributes));
      }
    },

    /**
     * Sets the mapping using the form model's default mapping or the options.mappings if available.
     * Also sets the tracked models if the form model's default models or the options.models is provided.
     * @method __initMappings
     * @param [options] {Object} See initialize options: 'mapping' and 'models'.
     * @private
     */
    __initMappings: function(options) {
      var mapping,
        models,
        defaultMapping = _.result(this, 'mapping'),
        defaultModels = _.result(this, 'models');
      mapping = options.mapping || defaultMapping;
      models = options.models || defaultModels;
      if (mapping) {
        this.setMappings(mapping, models);
      }
    },

    /**
     * Returns a map where the keys are the fields that are being tracked on tracked model and values are
     * the with current values of those fields.
     * @param model {Backbone.Model instance} the object model
     * @return {Object} aa map where the keys are the fields that are being tracked on tracked model and
     *   values are the with current values of those fields.
     * @private
     * @method __getTrackedModelFields
     */
    __getTrackedModelFields: function(model) {
      var allFields,
        fieldsUsed = {},
        modelFields = {},
        modelConfigs = [];
      _.each(this.__getAllModelConfigs(), function(modelConfig) {
        if (modelConfig.model && modelConfig.model.cid === model.cid) {
          modelConfigs.push(modelConfig);
        }
      });
      allFields = _.reduce(modelConfigs, function(result, modelConfig) {
        return result || !modelConfig.fields;
      }, false);
      if (allFields) {
        modelFields = this.__cloneVal(model.attributes);
      } else {
        _.each(modelConfigs, function(modelConfig) {
          _.each(modelConfig.fields, function(field) {
            if (!fieldsUsed[field]) {
              fieldsUsed[field] = true;
              modelFields[field] = this.__cloneVal(model.get(field));
            }
          }, this);
        }, this);
      }
      return modelFields;
    },

    /**
     * Returns a useful data structure that binds a tracked model to the fields being tracked on a mapping.
     * @method __createModelConfig
     * @param modelAlias
     * @param fields {Array of Strings or undefined} the fields that the model is tracking. Can be undefined if tracking all fields.
     *   When creating a model config for a computed mapping, the fields refers to the fields being tracked only for that computed value.
     * @return {Object} a binding between a tracked model and the fields its tracking for a mapping. If no tracked model is bound to the modelAlias,
     *   it will return undefined.
     * @private
     */
    __createModelConfig: function(modelAlias, fields) {
      var model = this.getTrackedModel(modelAlias);
      if (model) {
        return {
          fields: fields,
          model: model
        };
      }
    },

    /**
     * Returns an array of convenience data structures that bind tracked models to the fields they are tracking for each mapping,
     * including model mappings inside computed mappings. There will be a model config for each tracked model on a computed mapping
     * meaning there can be multiple model configs for the same tracked model.
     * @method __getAllModelConfigs
     * @return {Array} array of convenience data structures that bind tracked models to the fields they are tracking for each mapping,
     *   including model mappings inside computed mappings.
     * @private
     */
    __getAllModelConfigs: function() {
      var modelConfigs = [];
      _.each(this.getMappings(), function(config, alias) {
        if (config.computed) {
          var computedModelConfigs = this.__getComputedModelConfigs(alias);
          if (computedModelConfigs) {
            modelConfigs = modelConfigs.concat(computedModelConfigs);
          }
        } else {
          var modelConfig = this.__createModelConfig(alias, config.mapping);
          if (modelConfig) {
            modelConfigs.push(modelConfig);
          }
        }
      }, this);
      return modelConfigs;
    },

    /**
     * A wrapper function that can invoke the pull callback on a computed mapping during an event callback.
     * Because an event callback predetermines the argument list, this method assumes the necessary computed configuration is
     * bound as the part of the function context.
     * When invoking the pull callback, it will pass in a object map from model alias to shallow copy of the tracked fields the
     * computed value uses. It is NOT just the model, but a  copy of its attributes - feel free to change the properties.
     * Example:
     * fooBar: {
     *   myModel: 'foo bar',
     *   pull: function(models) {
     *     console.log(models.myModel.foo, models.myModel.bar)
     *   }
     * }
     * If any model mapping is tracking all fields by passing true as its config, a copy of all the attributes for that model will be provided.
     * @param [model] {Backbone.Model} the model that was updated. If provided, the cache will be updated
     * NOTE: requires the context of this function to be:
     * {
     *  formModel: <this form model>,
     *  alias: <the computed alias>,
     * }
     * @private
     * @method __invokeComputedPull
     */
    __invokeComputedPull: function(model) {
      if (model) {
        this.formModel.__updateCache(model);
      }
      (function(formModel, alias) {
        var hasAllModels = true,
          config = formModel.getMapping(alias),
          modelAliases = formModel.__getModelAliases(alias),
          models = {};
        if (!config.mapping.pull) {
          if (console && _.isFunction(console.log)) {
            console.log('Not pulling the computed: ' + alias + ', because no pull method was defined for this computed.');
          }
          return;
        }
        _.each(modelAliases, function(modelAlias) {
          var fields = config.mapping[modelAlias],
            model = formModel.getTrackedModel(modelAlias),
            modelCopy = {};
          if (!model) {
            hasAllModels = false;
          } else {
            if (fields) {
              _.each(fields, function(field) {
                modelCopy[field] = formModel.__cloneVal(model.get(field));
              });
            } else {
              modelCopy = formModel.__cloneVal(modelConfig.model.attributes);
            }
            models[modelAlias] = modelCopy;
          }
        });
        if (hasAllModels) {
          config.mapping.pull.call(formModel, models);
        }
      })(this.formModel, this.alias);
    }
  });

  _.extend(FormModel.prototype, validation.mixin);

  return FormModel;
}));

},{"./NestedModel":20,"./validation":35,"backbone-torso/node_modules/jquery":36,"underscore":37}],16:[function(require,module,exports){

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['underscore', 'jquery', './View', './FormModel', './Cell', 'backbone.stickit'], factory);
  } else if (typeof exports === 'object') {
    require('backbone.stickit');
    module.exports = factory(require('underscore'), require('backbone-torso/node_modules/jquery'), require('./View'), require('./FormModel'), require('./Cell'));
  } else {
    root.Torso = root.Torso || {};
    root.Torso.FormView = factory(root._, (root.jQuery || root.Zepto || root.ender || root.$), root.Torso.View, root.Torso.FormModel, root.Torso.Cell);
  }
}(this, function(_, $, View, FormModel, Cell) {
  'use strict';

  /**
   * Generic Form View
   * @module    Torso
   * @class     FormView
   * @constructor
   * @author ariel.wexler@vecna.com
   */
  var FormView = View.extend({
    /**
     * Validation error hash
     * @private
     * @property _errors
     * @type Object
     **/
    /**
     * Validation success
     * @private
     * @property _success
     * @type Boolean
     **/
    /**
     * Stickit bindings hash local backup
     * @private
     * @property _bindings
     * @type Object
     */
    /**
     * Handlebars template for form
     * @property template
     * @type HTMLtemplate
     **/
    /**
     * Backbone events hash
     * @property events
     * @type Object
     **/
    /**
     * Two-way binding field customization
     * @property fields
     * @type Object
     **/
    /**
     * Stickit bindings hash
     * @property bindings
     * @type Object
     **/
    /**
     * The class to be used when instantiating the form model
     * @property FormModelClass
     * @type Torso.FormModel class extension
     **/

    /**
     * Constructor the form view object.
     * @method constructor
     * @param args {Object} - options argument
     * @param [args.model=new FormModelClass()] {Torso.FormModel} - a form model for binding that defaults to class-level
                                                                    model or instantiates a FormModelClass
     * @param [args.FormModelClass=Torso.FormModel] - the class that will be used as the FormModel. Defaults to a class-level
                                                      definition or Torso.FormModel if none is provided
     * @param [args.template]  {HTML Template} - overrides the template used by this view
     * @param [args.events]    {Events Hash} - merge + override the events hash used by this view
     * @param [args.fields]    {Field Hash} - merge + override automated two-way binding field hash used by this view
     * @param [args.bindings]  {Binding Hash} - merge + override custom epoxy binding hash used by this view
     */
    constructor: function(args) {
      args = args || {};

      /* Listen to model validation callbacks */
      var FormModelClass = args.FormModelClass || this.FormModelClass || FormModel;
      this.model = args.model || this.model || (new FormModelClass());

      /* Override template */
      this.template = args.template || this.template;

      /* Merge events, fields, bindings, and computeds */
      this.events = _.extend({}, this.events || {}, args.events || {});
      this.fields = _.extend({}, this.fields || {}, args.fields || {});
      this._errors = [];
      this._success = false;
      // this._bindings is a snapshot of the original bindings
      this._bindings = _.extend({}, this.bindings || {}, args.bindings || {});

      View.apply(this, arguments);

      this.resetModelListeners(this.model);
    },

    /**
     * Prepare the formview's default render context
     * @method prepare
     * @return {Object}
     *         {Object.errors} A hash of field names mapped to error messages
     *         {Object.success} A boolean value of true if validation has succeeded
     */
    prepare: function() {
      var templateContext = View.prototype.prepare.apply(this);
      templateContext.formErrors = (_.size(this._errors) !== 0) ? this._errors : null;
      templateContext.formSuccess = this._success;
      return templateContext;
    },

    /**
     * Override the delegate events and wrap our custom additions
     * @method delegateEvents
     */
    delegateEvents: function() {
      /* DOM event bindings and plugins */
      this.__generateStickitBindings();
      this.stickit();
      View.prototype.delegateEvents.call(this);
    },

    /**
     * Resets the form model with the passed in model. Stops listening to current form model
     * and sets up listeners on the new one.
     * @method resetModelListeners
     * @param model {Torso.FormModel} the new form model
     * @param [stopListening=false] {Boolean} if true, it will stop listening to the previous form model
     */
    resetModelListeners: function(model, stopListening) {
      if (this.model && stopListening) {
        this.stopListening(this.model);
      }
      this.model = model;
      this.listenTo(this.model, 'validated:valid', this.valid);
      this.listenTo(this.model, 'validated:invalid', this.invalid);
    },

    /**
     * Default method called on validation success.
     * @method valid
     */
    valid: function() {
      this._success = true;
      this._errors = [];
    },

    /**
     * Default method called on validation failure.
     * @method valid
     */
    invalid: function(model, errors) {
      this._success = false;
      this._errors = errors;
    },

    /**
     * Deactivate callback that removes bindings and other resources
     * that shouldn't exist in a dactivated state
     * @method _deactivate
     */
    _deactivate: function() {
      View.prototype._deactivate.call(this);
      // No detach callback... Deactivate will have to do as it is called by detach
      this.unstickit();
    },

    /**
     * For use in a feedback's "then" callback
     * Checks to see if the form model's field is valid. If the field is invalid, it adds the class.
     * If the field is invalid, it removes the class. When an array is passed in for the fieldName,
     * it will validate all the fields together as if they were one (any failure counts as a total failure,
     * and all fields need to be valid for success).
     * @param fieldName {String or Array<String>} the name of the form model field or an array of field names
     * @param className {String} the class name to add or remove
     * @param [onValid] {Boolean} if true, will reverse the logic operator
     * @private
     * @method _thenAddClassIfInvalid
     */
    _thenAddClassIfInvalid: function(fieldName, className, onValid) {
      var isValid = this.model.isValid(fieldName);
      if ((onValid ? true : false) === (isValid ? true : false)) {
        return {
          addClass: className
        };
      } else {
        return {
          removeClass: className
        };
      }
    },

    /**
     * For use in a feedback's "then" callback
     * Checks to see if the form model's field is valid. If the field is invalid, it sets the text.
     * If the field is invalid, it removes the text. When an array is passed in for the fieldName,
     * it will validate all the fields together as if they were one (any failure counts as a total failure,
     * and all fields need to be valid for success).
     * @param fieldName {String or Array<String>} the name of the form model field or an array of field names
     * @param text {String} the text to set
     * @param [onValid] {Boolean} if true, will reverse the logic operator
     * @private
     * @method _thenAddTextIfInvalid
     */
    _thenSetTextIfInvalid: function(fieldName, text, onValid) {
      var isValid = this.model.isValid(fieldName);
      if ((onValid ? true : false) === (isValid ? true : false)) {
        return {
          text: text
        };
      } else {
        return {
          text: ''
        };
      }
    },

    //************** Private methods **************//

    /**
     * Selects all data-model references in this view's DOM, and creates stickit bindings
     * @method __generateStickitBindings
     * @private
     */
    __generateStickitBindings: function() {
      var self = this;
      // Start by removing all old bindings and falling back to the initialized binding contents
      this.bindings = _.extend({}, this._bindings);

      // Stickit model two-way bindings
      _.each(this.$('[data-model]'), function(element) {
        var attr = $(element).data('model'),
            options = self.__getFieldOptions(attr),
            fieldBinding = self.__generateModelFieldBinding(attr, options);

        //add select options
        if ($(element).is('select')) {
          fieldBinding.selectOptions = self.__generateSelectOptions(element, options);
        }

        self.bindings['[data-model="' + attr + '"]'] = fieldBinding;
      });
    },

    /**
     * @method __getFieldOptions
     * @param attr {String} An attribute of the model
     * @return {Object} Any settings that are associates with that attribute
     */
    __getFieldOptions: function(attr) {
      attr = this.__stripAllAttribute(attr);
      return this.fields[attr] || {};
    },

    /**
     * @method __generateModelFieldBinding
     * @param field {String} A specific model field
     * @param options {Object} Additional behavior options for the bindings
     * @param [options.modelFormat] {Object} The function called before setting model values
     * @param [options.viewFormat] {Object} The function called before setting view values
     * @private
     * @return {<Stickit Binding Hash>}
     */
    __generateModelFieldBinding: function(field, options) {
      var indices = this.__getAllIndexTokens(field);
      return {
        observe: field,
        onSet: function(value) {
          var params = [value];
          params.push(indices);
          params = _.flatten(params);
          return options.modelFormat ? options.modelFormat.apply(this, params) : value;
        },
        onGet: function(value) {
          var params = [value];
          params.push(indices);
          params = _.flatten(params);
          return options.viewFormat ? options.viewFormat.apply(this, params) : value;
        }
      };
    },

    /**
     * @method  __generateSelectOptions
     * @param element {Element} The select element to generate options for
     * @param opts {Object} Additional behavior options for the bindings
     * @param [opts.modelFormat] {Object} The function called before setting model values
     * @private
     * @return {<Stickit select options hash>}
     */
    __generateSelectOptions: function(element, opts) {
      var collection = [],
          options = $(element).children('option');

      _.each(options, function(option) {
        collection.push({'label': $(option).text(), 'value': opts.modelFormat ? opts.modelFormat.apply(this, [$(option).val()]) : $(option).val()});
      });

      return {
        collection: collection,
        labelPath: 'label',
        valuePath: 'value'
      };
    }
  });

  return FormView;
}));

},{"./Cell":12,"./FormModel":15,"./View":23,"backbone-torso/node_modules/jquery":36,"backbone.stickit":38,"underscore":37}],17:[function(require,module,exports){
(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['underscore', 'jquery', './View', './templateRenderer'], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory(require('underscore'), require('backbone-torso/node_modules/jquery'), require('./View'), require('./templateRenderer'));
  } else {
    root.Torso = root.Torso || {};
    root.Torso.ListView = factory(root._, root.$, root.Torso.View, root.Torso.Utils.templateRenderer);
  }
}(this, function(_, $, View, templateRenderer) {
  'use strict';

    var removeItemView, _removeItemView, addItemView, _addItemView, aggregateRenders, breakDelayedRender;

    /**
     * If one exists, this method will clear the delayed render timeout and invoke render
     * @param view {ListView} the list view
     * @private
     * @method breakDelayedRender
     */
    breakDelayedRender = function(view) {
      if (view.__delayedRenderTimeout) {
        clearTimeout(view.__delayedRenderTimeout);
        view.__delayedRenderTimeout = null;
        if (!view.isDisposed()) {
          view.render();
        }
      }
    };

    /**
     * Aggregates calls to render by waiting a certain amount of time and then rendering.
     * Calls that happen while it is waiting, will be swallowed. Useful for when you want to
     * batch render calls
     * @private
     * @method aggregateRenders
     * @param wait {Number} the number of milliseconds to wait before rendering
     * @param view {ListView} the list view
     */
    aggregateRenders = function(wait, view) {
      var postpone = function() {
        view.__delayedRenderTimeout = null;
        if (!view.isDisposed()) {
          view.render();
        }
      };
      return function() {
        if (!view.__delayedRenderTimeout && wait > 0) {
          view.__delayedRenderTimeout = setTimeout(postpone, wait);
        } else if (wait <= 0 && !view.isDisposed()) {
          view.render();
        }
      };
    };

    /**
     * Handles the removal of an item view if a model has been removed from the collection
     * @private
     * @method removeItemView
     * @param model {Backbone Model instance} the model that has been removed
     */
    removeItemView = function(model) {
      var itemView = this.getItemViewFromModel(model);
      if (itemView) {
        _removeItemView.call(this, itemView, model[this.__modelId], model);
        if (!this.hasItemViews()) {
          this.__delayedRender();
        }
      }
    };

    /**
     * Disposes of an item view, unregisters, stops tracking and triggers a 'item-view-removed' event
     * with the model and an item view as the payload.
     * @private
     * @method _removeItemView
     * @param itemView {Backbone View instance} the view being removed
     * @param modelId {String or Number} the id used for the model
     * @param [model] {Backbone Model instance} the model
     */
    _removeItemView = function(itemView, modelId, model) {
      itemView.dispose();
      this.unregisterTrackedView(itemView, { shared: false });
      delete this.__modelToViewMap[modelId];
      this.__updateOrderedModelIdList();
      this.trigger('item-view-removed', {model: model || itemView.model, view: itemView});
      this.trigger('child-view-removed', {model: model || itemView.model, view: itemView});
    };

    /**
     * Handles the addition of an item view if a model has been added to the collection.
     * When possible, it will append the view instead of causing a rerender
     * @private
     * @method addItemView
     * @param model the model being added
     */
    addItemView = function(model) {
      var itemView,
          models = this.modelsToRender(),
          indexOfModel = models.indexOf(model);
      if (indexOfModel > -1) {
        itemView = this.__createItemView(model);
        _addItemView.call(this, itemView, indexOfModel);
      }
    };

    /**
     * Adds the new item view before or after a sibling view. If no sibling view exists
     * or if this item view is the first, it will cause a re-render. This method will break
     * any delayed renders and force a re-render before continuing.
     * @private
     * @method _addItemView
     * @param itemView the view being added
     * @param indexOfModel - the index of the model into the array of models to render
     */
    _addItemView = function(itemView, indexOfModel) {
      var viewAfter, viewBefore, replaceMethod,
        models = this.modelsToRender();
      if (!this.hasItemViews()) {
        this.__delayedRender();
      } else {
        breakDelayedRender(this);
        viewAfter = this.getItemViewFromModel(models[indexOfModel + 1]);
        viewBefore = this.getItemViewFromModel(models[indexOfModel - 1]);
        if (viewAfter) {
          replaceMethod = _.bind(viewAfter.$el.before, viewAfter.$el);
        } else if (viewBefore) {
          replaceMethod = _.bind(viewBefore.$el.after, viewBefore.$el);
        } else {
          this.__delayedRender();
        }
        if (replaceMethod) {
          this.attachView(null, itemView, {
            replaceMethod: replaceMethod,
            discardInjectionSite: true
          });
        }
      }
    };

  /**
   * A view that is backed by a collection that managers views per model in the collection.
   * @module    Torso
   * @class     ListView
   * @constructor
   * @author ariel.wexler@vecna.com, kent.willis@vecna.com
   */
  var ListView = View.extend({
    /**
     * The collection that holds the models that this list view will track
     * @property collection
     * @type Collection
     */
    collection: null,
    /**
     * The item view class definition that will be instantiated for each model in the list.
     * itemView can also be a function that takes a model and returns a view class. This allows
     * for different view classes depending on the model.
     * @property itemView
     * @type View or Function
     */
    itemView: null,
    /**
     * The template that allows a list view to hold it's own HTML like filter buttons, etc.
     * @property template
     * @type HTML Template
     */
    template: null,
    /**
     * If provided, this template that will be shown if the modelsToRender() method returns
     * an empty list. If an itemContainer is provided, the empty template will be rendered there.
     * @property emptyTemplate
     * @type HTML Template
     */
    emptyTemplate: null,
    /**
     * (Required if 'template' is provided, ignored otherwise) name of injection site for list of item views
     * @property itemContainer
     * @type String
     */
    itemContainer: null,
    __modelName: '',
    __modelId: '',
    __modelToViewMap: null,
    __itemContext: null,
    __renderWait: 0,
    __delayedRender: null,
    /**
     * @property __delayedRenderTimeout
     * @private
     * @type {Number}
     */
    __delayedRenderTimeout: null,

    /**
     * Constructor for the list view object.
     * @method constructor
     * @param args {Object} - options argument
     *   @param args.itemView {Backbone.View definition or Function} - the class definition of the item view. This view will be instantiated for every model returned by modelsToRender(). If a function is passed in, then for each model, this function will be invoked to find the appropriate view class. It takes the model as the only parameter.
     *   @param args.collection {Backbone.Collection instance} - The collection that will back this list view. A subclass of list view might provide a default collection. Can be private or public collection
     *   @param [args.itemContext] {Object or Function} - object or function that's passed to the item view's during initialization under the name "context". Can be used by the item view during their prepare method.
     *   @param [args.template] {HTML Template} - allows a list view to hold it's own HTML like filter buttons, etc.
     *   @param [args.itemContainer] {String}  - (Required if 'template' is provided, ignored otherwise) name of injection site for list of item views
     *   @param [args.emptyTemplate] {HTML Template} - if provided, this template will be shown if the modelsToRender() method returns an empty list. If a itemContainer is provided, the empty template will be rendered there.
     *   @param [args.modelsToRender] {Function} - If provided, this function will override the modelsToRender() method with custom functionality.
     *   @param [args.renderWait=0] {Number} - If provided, will collect any internally invoked renders (typically through collection events like reset) for a duration specified by renderWait in milliseconds and then calls a single render instead. Helps to remove unnecessary render calls when modifying the collection often.
     *   @param [args.modelId='cid'] {'cid' or 'id'} - model property used as identifier for a given model. This property is saved and used to find the corresponding view.
     *   @param [args.modelName='model'] {String} - name of the model argument passed to the item view during initialization
     */
    constructor: function(args) {
      View.apply(this, arguments);
      args = args || {};

      var collection = args.collection || this.collection;

      this.template = args.template || this.template;
      this.emptyTemplate = args.emptyTemplate || this.emptyTemplate;
      this.itemView = args.itemView || this.itemView;
      this.itemContainer = args.itemContainer || this.itemContainer;
      if (this.template && !this.itemContainer) {
        throw 'Item container is required when using a template';
      }
      this.modelsToRender = args.modelsToRender || this.modelsToRender;
      this.__itemContext = args.itemContext || this.__itemContext;
      this.__modelToViewMap = {};
      this.__renderWait = args.renderWait || this.__renderWait;
      this.__modelId = args.modelId || this.modelId || 'cid';
      this.__modelName = args.modelName || this.modelName || 'model';
      this.__orderedModelIdList = [];
      this.__createItemViews();
      this.__delayedRender = aggregateRenders(this.__renderWait, this);

      if (collection) {
        this.setCollection(collection, true);
      }

      this.on('render:after-dom-update', this.__cleanupItemViewsAfterAttachedToParent);
    },

    /**
     * Sets the collection from which this view generates item views.
     * This method will attach all necessary event listeners to the new collection to auto-generate item views
     * and has the option of removing listeners on a previous collection. It will immediately update child
     * views and re-render if it is necessary - this behavior can be prevented with preventUpdate argument
     *
     * @method setCollection
     * @param collection {Backbone.Collection instance} the new collection that this list view should use.
     * @param preventUpdate {Boolean} if true, the list view will not update the child views nor rerender.
     */
    setCollection: function(collection, preventUpdate) {
      this.stopListening(this.collection, 'remove', removeItemView);
      this.stopListening(this.collection, 'add', addItemView);
      this.stopListening(this.collection, 'sort', this.reorder);
      this.stopListening(this.collection, 'reset', this.update);

      this.collection = collection;

      this.listenTo(this.collection, 'remove', removeItemView);
      this.listenTo(this.collection, 'add', addItemView);
      this.listenTo(this.collection, 'sort', this.reorder);
      this.listenTo(this.collection, 'reset', this.update);

      if (!preventUpdate) {
        this.update();
      }
    },

    /**
     * Override of View.__updateDOM
     * Builds a single DOM fragment from the item views and attaches it at once.
     * @method __updateDOM
     */
    updateDOM: function() {
      var injectionSite,
        newDOM = $(templateRenderer.copyTopElement(this.el));
      if (this.template) {
        newDOM.html(this.template(this.prepare()));
        injectionSite = newDOM.find('[inject=' + this.itemContainer + ']');
      } else {
        injectionSite = $('<span>');
        newDOM.append(injectionSite);
      }
      if (this.hasItemViews()) {
        injectionSite.replaceWith(this.__emptyAndRebuildItemViewsFragment());
      } else if (this.emptyTemplate) {
        injectionSite.replaceWith(this.emptyTemplate(this.prepareEmpty()));
      }
      this.$el.html(newDOM.contents());
    },

    /**
     * Completes each item view's lifecycle of being attached to a parent.
     * Because the item views are attached in a non-standard way, it's important to make sure
     * that the item views are in the appropriate state after being attached as one fragment.
     * @method __cleanupItemViewsAfterAttachedToParent
     * @private
     */
    __cleanupItemViewsAfterAttachedToParent: function() {
      _.each(this.modelsToRender(), function(model) {
        var itemView = this.getItemViewFromModel(model);
        if (itemView) {
          itemView.delegateEvents();
          if (!itemView.__attachedCallbackInvoked && itemView.isAttached()) {
            itemView.__invokeAttached();
          }
          itemView.activate();
        } else {
          // Shouldn't get here. Item view is missing...
        }
      }, this);
    },

    /**
     * Loops through children views and renders them
     * @method renderChildViews
     */
    renderChildViews: function() {
      _.each(this.getTrackedViews({child: true}), function(childView) {
        childView.render();
      });
    },

    /**
     * Takes existing item views and moves them into correct order defined by
     * this.modelsToRender(). NOTE: As this method doesn't generate or remove views,
     * this method takes advantage of jquery's ability to move elements already attached to the DOM.
     * @method reorder
     */
    reorder: function() {
      var firstItemView, sameOrder,
        elements = [],
        models = this.modelsToRender(),
        newOrderOfIds = _.pluck(models, this.__modelId),
        sizeOfNewModels = _.size(newOrderOfIds),
        sizeOfOldModels = _.size(this.__orderedModelIdList),
        sameSize = sizeOfNewModels === sizeOfOldModels;

      if (sameSize) {
        // is order the same?
        sameOrder = _.reduce(this.__orderedModelIdList, function(result, oldId, index) {
          return result && newOrderOfIds[index] == oldId;
        }, true);
      } else {
        throw 'Reorder should not be invoked if the number of models have changed';
      }
      if (!sizeOfNewModels || sameOrder) {
        // stop early if there are no models to reorder or the models are the same
        return;
      }
      _.each(models, function(model, index) {
        var itemView = this.getItemViewFromModel(model);
        if (itemView) {
          elements.push(itemView.$el);
        }
        if (index === 0) {
          firstItemView = itemView;
        }
      }, this);
      // elements that are already connected to the DOM will be moved instead of re-attached
      // meaning that detach, delegate events, and attach are not needed
      if (!this.itemContainer) {
        this.$el.append(elements);
      } else if (firstItemView) {
        var injectionSite = $("<span>");
        firstItemView.$el.before(injectionSite);
        injectionSite.after(elements);
        injectionSite.remove();
      }
      this.__updateOrderedModelIdList(newOrderOfIds);
      this.trigger('reorder-complete');
    },

    /**
     * Override if you want a different context for your empty template. Defaults to this.prepare()
     * @method prepareEmpty
     * @return a context that can be used by the empty list template
     */
    prepareEmpty: function() {
      return this.prepare();
    },

    /**
     * Returns an array of which models should be rendered.
     * By default, all models in the input collection will be
     * shown.  Extensions of this class may override this
     * method to apply collection filters.
     * @method modelsToRender
     */
    modelsToRender: function() {
      return this.collection ? this.collection.models : [];
    },

    /**
     * Builds any new views, removes stale ones, and re-renders
     * @method update
     */
    update: function() {
      var view = this,
        renderNeeded = false,
        oldViews = this.getItemViews(),
        newViews = this.__createItemViews(),
        staleViews = this.__getStaleItemViews(),
        sizeOfOldViews = _.size(oldViews),
        sizeOfNewViews = _.size(newViews),
        sizeOfStaleViews = _.size(staleViews),
        sizeOfFinalViews = sizeOfOldViews - sizeOfStaleViews + sizeOfNewViews,
        changes = sizeOfNewViews + sizeOfStaleViews,
        percentChange = changes / Math.max(sizeOfFinalViews, 1),
        fromEmptyToNotEmpty = !sizeOfOldViews && sizeOfNewViews,
        fromNotEmptyToEmpty = sizeOfOldViews && sizeOfOldViews === sizeOfStaleViews && !sizeOfNewViews,
        threshold = this.updateThreshold || 0.5,
        signficantChanges = percentChange >= threshold;
      if (changes <= 0) {
        return this.reorder();
      }
      // A switch from empty to not empty or vise versa, needs a new render
      renderNeeded = fromEmptyToNotEmpty || fromNotEmptyToEmpty || signficantChanges;
      if (renderNeeded) {
        this.__removeStaleItemViews(staleViews);
        this.__delayedRender();
      } else {
        this.__updateByAddingRemoving(oldViews, newViews, staleViews);
      }
    },

    /**
     * Returns the view that corresponds to the model if one exists
     * @param model {Model} the model
     * @return the item view corresponding to the model
     * @method getItemViewFromModel
     */
    getItemViewFromModel: function(model) {
      return model ? this.getTrackedView(this.__modelToViewMap[model[this.__modelId]]) : undefined;
    },

    /**
     * @return {Boolean} returns true if there exists any generated item views
     * @method hasItemViews
     */
    hasItemViews: function() {
      return !_.isEmpty(this.getItemViews());
    },

    /**
     * @return {Array of views} Returns unordered list of views generated by this list view
     * @method getItemViews
     */
    getItemViews: function() {
      var view = this;
      var orderedViewIds = _.map(this.__orderedModelIdList, this.__getViewIdFromModelId, this);
      return _.map(orderedViewIds, this.getTrackedView, this);
    },

    //************** Private methods **************//

    /**
     * Creates all needed item views that don't exist from modelsToRender()
     * @method __createItemViews
     * @private
     * @return {Array} each object in array contains a 'view' and 'indexOfModel' field
     */
    __createItemViews: function() {
      var newItemViews = [];
      _.each(this.modelsToRender(), function(model, indexOfModel) {
        var itemView = this.getItemViewFromModel(model);
        if (!itemView) {
          newItemViews.push({
            view: this.__createItemView(model, true),
            indexOfModel: indexOfModel
          });
        }
      }, this);
      this.__updateOrderedModelIdList();
      return newItemViews;
    },

    /**
     * Creates an item view and stores a reference to it
     * @method __createItemView
     * @private
     * @param model {Backbone Model} the model to create the view from
     * @param [noUpdateToIdList=false] if true, the internal order of model ids are not updated
     * @return {Backbone View} the new item view
     */
    __createItemView: function(model, noUpdateToIdList) {
      var itemView,
        ItemViewClass = this.itemView;
      if (!_.isFunction(this.itemView.extend)) {
        ItemViewClass = this.itemView(model);
      }
      itemView = new ItemViewClass(this.__generateItemViewArgs(model));
      this.registerTrackedView(itemView, { shared: false });
      this.__modelToViewMap[model[this.__modelId]] = itemView.cid;
      if (!noUpdateToIdList) {
        this.__updateOrderedModelIdList();
      }
      this.trigger('child-view-added', {model: model, view: itemView});
      this.trigger('item-view-added', {model: model, view: itemView});
      return itemView;
    },

    /**
     * Gets all item views that have models that are no longer tracked by modelsToRender
     * @method __getStaleItemViews
     * @return {Array} An array of information about stale items. Each object has a 'view' and 'modelId' field
     * @private
     */
    __getStaleItemViews: function() {
      var staleItemViews = [];
      var modelsWithViews = _.clone(this.__modelToViewMap);
      _.each(this.modelsToRender(), function(model) {
        var itemView = this.getItemViewFromModel(model);
        if (itemView) {
          delete modelsWithViews[model[this.__modelId]];
        }
      }, this);
      _.each(modelsWithViews, function(viewId, modelId) {
        var itemView = this.getTrackedView(viewId);
        if (itemView) {
          staleItemViews.push({ view: itemView, modelId: modelId });
        }
      }, this);
      return staleItemViews;
    },

    /**
     * Removes the item views that no longer have models returned by modelsToRender()
     * @method __removeStaleItemViews
     * @param [staleItemViewInfo] {Array of objects:
     *   [{
     *     view: stale item view,
     *     modelId: id of model item
     *   }]} If provided, stale items will not be found, but this array will be used instead.
     * @private
     */
    __removeStaleItemViews: function(staleItemViewInfo) {
      var view = this;
      staleItemViewInfo = staleItemViewInfo || this.__getStaleItemViews();
      _.each(staleItemViewInfo, function(staleViewInfo) {
        _removeItemView.call(view, staleViewInfo.view, staleViewInfo.modelId);
      });
    },

    /**
     * Creates a DOM fragment with each item view appended in the order defined by
     * modelsToRender(). This will clear the List View's DOM and invoke the necessary
     * detach, register and render logic on each item view.
     * @return a DOM fragment with item view elements appended
     * @method __emptyAndRebuildItemViewsFragment
     * @private
     */
    __emptyAndRebuildItemViewsFragment: function() {
      var injectionFragment = document.createDocumentFragment();
      // Clearing the DOM will reduce the repaints needed as we detach each item view.
      this.$el.empty();

     _.each(this.modelsToRender(), function(model) {
        var itemView = this.getItemViewFromModel(model);
        if (itemView) {
          // detach to be safe, but during a render, the item views will already be detached.
          itemView.detach();
          this.registerTrackedView(itemView);
          itemView.attachTo(null, {
            replaceMethod: function($el) {
              injectionFragment.appendChild($el[0]);
            },
            discardInjectionSite: true
          });
        }
      }, this);
      this.__updateOrderedModelIdList();
      return $(injectionFragment);
    },

    /**
     * Attempts to insert new views and remove stale views individually and correctly reorder all views in an
     * attempt to be faster then a full view re-render
     * @method __updateByAddingRemoving
     * @param oldViews {Array of Views} - correctly ordered list of views before making changes to models to render
     * @param newViews {Array of Views} - the new views created that will be inserted
     * @param staleViews {Array of Views} - the stale views that will be removed
     */
    __updateByAddingRemoving: function(oldViews, newViews, staleViews) {
      var firstItemViewLeft, injectionSite,
        view = this,
        sizeOfOldViews = _.size(oldViews),
        sizeOfNewViews = _.size(newViews),
        sizeOfStaleViews = _.size(staleViews);
      if (view.itemContainer && sizeOfOldViews && sizeOfOldViews == sizeOfStaleViews) {
        // we removed all the views!
        injectionSite = $('<span>');
        _.first(oldViews).$el.before(injectionSite);
      }
      view.__removeStaleItemViews(staleViews);
      _.each(newViews, function(createdViewInfo, indexOfView) {
        if (createdViewInfo.indexOfModel === 0) {
          // need to handle this case uniquely.
          var replaceMethod;
          if (!view.itemContainer) {
            replaceMethod = _.bind(view.$el.prepend, view.$el);
          } else {
            if (injectionSite) {
              replaceMethod = _.bind(injectionSite.replaceWith, injectionSite);
            } else {
              var staleModelIdMap = _.indexBy(staleViews, 'modelId');
              var firstModelIdLeft = _.find(view.__orderedModelIdList, function(modelId) {
                return !staleModelIdMap[modelId];
              });
              firstItemViewLeft = view.getTrackedView(view.__modelToViewMap[firstModelIdLeft]);
              replaceMethod = _.bind(firstItemViewLeft.$el.prepend, firstItemViewLeft.$el);
            }
          }
          view.attachView(null, createdViewInfo.view, {
            replaceMethod: replaceMethod,
            discardInjectionSite: true
          });
        } else {
          // There will always the view before this one because we are adding new views in order
          // and we took care of the initial case.
          _addItemView.call(view, createdViewInfo.view, createdViewInfo.indexOfModel);
        }
      });
      this.reorder();
    },

    /**
     * Updates the internal list of model ids that correspond to the models used for the current
     * list of item views. The order is the same order of the item views.
     * @method __updateOrderedModelIdList
     * @param [newIdsList] {Array of ids} - if passed the array, it will use that instead of finding the list.
     * @private
     */
    __updateOrderedModelIdList: function(newIdsList) {
      this.__orderedModelIdList = newIdsList || _.pluck(this.modelsToRender(), this.__modelId);
    },

    /**
     * Method to generate arguments when creating an item view. Override this method
     * to change the arguments for a given item view.
     * The format of the subview's arguments is:
     * {
     *   context: {
     *     ... inherited from parent ...
     *   },
     *   <modelName>: <modelObject>,
     *   listView: the parent list view
     * }
     * @method __generateItemViewArgs
     * @private
     * @param model the model for an item view
     * @return a context to be used by an item view
     */
    __generateItemViewArgs: function(model) {
      var args = {
        'context': _.extend({}, _.result(this, '__itemContext')),
        'listView': this
      };
      args[this.__modelName] = model;
      return args;
    },

    /**
     * Alias method for __generateItemViewArgs()
     * @method __generateChildArgs
     */
    __generateChildArgs: function() {
      return this.__generateItemViewArgs.apply(this, arguments);
    },

    /**
     * @method __getViewIdFromModelId
     * @private
     * @param modelId {String or Number} id of model
     * @return {String or Number} view cid that was built from corresponding model
     */
    __getViewIdFromModelId: function(modelId) {
      return this.__modelToViewMap[modelId];
    }
  });

  return ListView;
}));

},{"./View":23,"./templateRenderer":33,"backbone-torso/node_modules/jquery":36,"underscore":37}],18:[function(require,module,exports){
(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['underscore', 'backbone', './mixins/pollingMixin'], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory(require('underscore'), require('backbone'), require('./mixins/pollingMixin'));
  } else {
    root.Torso = root.Torso || {};
    root.Torso.Model = factory(root._, root.Backbone, root.Torso.Mixins.polling);
  }
}(this, function(_, Backbone, pollingMixin) {
  'use strict';

  /**
   * Generic Model
   * @module    Torso
   * @class     Model
   * @constructor
   * @author kent.willis@vecna.com
   */
  var Model = Backbone.Model.extend({});
  _.extend(Model.prototype, pollingMixin);

  return Model;
}));

},{"./mixins/pollingMixin":31,"backbone":39,"underscore":37}],19:[function(require,module,exports){
(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['underscore', 'backbone', './mixins/cellMixin', 'backbone-nested'], factory);
  } else if (typeof exports === 'object') {
    require('backbone-nested');
    module.exports = factory(require('underscore'), require('backbone'), require('./mixins/cellMixin'));
  } else {
    root.Torso = root.Torso || {};
    root.Torso.NestedCell = factory(root._, root.Backbone, root.Torso.Mixins.cell);
  }
}(this, function(_, Backbone, cellMixin) {
  'use strict';

  /**
   * Generic Nested Model
   * @module    Torso
   * @class     NestedModel
   * @constructor
   * @author kent.willis@vecna.com
   */
  var NestedCell = Backbone.NestedModel.extend({});
  _.extend(NestedCell.prototype, cellMixin);

  return NestedCell;
}));

},{"./mixins/cellMixin":29,"backbone":39,"backbone-nested":10,"underscore":37}],20:[function(require,module,exports){
(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['underscore', 'backbone', './mixins/pollingMixin', 'backbone-nested'], factory);
  } else if (typeof exports === 'object') {
    require('backbone-nested');
    module.exports = factory(require('underscore'), require('backbone'), require('./mixins/pollingMixin'));
  } else {
    root.Torso = root.Torso || {};
    root.Torso.NestedModel = factory(root._, root.Backbone, root.Torso.Mixins.polling);
  }
}(this, function(_, Backbone, pollingMixin) {
  'use strict';

  /**
   * Generic Nested Model
   * @module    Torso
   * @class     NestedModel
   * @constructor
   * @author kent.willis@vecna.com
   */
  var NestedModel = Backbone.NestedModel.extend({});
  _.extend(NestedModel.prototype, pollingMixin);

  return NestedModel;
}));

},{"./mixins/pollingMixin":31,"backbone":39,"backbone-nested":10,"underscore":37}],21:[function(require,module,exports){
(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['backbone'], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory(require('backbone'));
  } else {
    root.Torso = root.Torso || {};
    root.Torso.Router = factory(root.Backbone);
  }
}(this, function(Backbone) {
  'use strict';
  /**
   * Backbone's router.
   * @module Torso
   * @class  Router
   * @author kent.willis@vecna.com
   */
  return Backbone.Router.extend({});
}));

},{"backbone":39}],22:[function(require,module,exports){
(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['./Cell'], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory(require('./Cell'));
  } else {
    root.Torso = root.Torso || {};
    root.Torso.ServiceCell = factory(root.Torso.Cell);
  }
}(this, function(Cell) {
  'use strict';
  /**
   * A service cell is a event listening and event emitting object that is independent of any model or view.
   * @module    Torso
   * @class  ServiceCell
   * @author kent.willis@vecna.com
   */
  var ServiceCell = Cell.extend({ });

  return ServiceCell;
}));

},{"./Cell":12}],23:[function(require,module,exports){
(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['underscore', 'jquery', 'backbone', './templateRenderer', './Cell', './NestedCell'], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory(require('underscore'), require('backbone-torso/node_modules/jquery'), require('backbone'), require('./templateRenderer'), require('./Cell'), require('./NestedCell'));
  } else {
    root.Torso = root.Torso || {};
    root.Torso.View = factory(root._, root.$, root.Backbone, root.Torso.Utils.templateRenderer, root.Torso.Cell, root.Torso.NestedCell);
  }
}(this, function(_, $, Backbone, templateRenderer, Cell, NestedCell) {
  'use strict';

  /**
   * ViewStateCell is a NestedCell that holds view state data and can trigger
   * change events. These changes events will propogate up and trigger on the view
   * as well.
   */
  var ViewStateCell = NestedCell.extend({

    initialize: function(attrs, opts) {
      opts = opts || {};
      this.view = opts.view;
    },

    /**
     * Retrigger view state change events on the view as well.
     * @method trigger
     * @override
     */
    trigger: function(name) {
      if (name === 'change' || name.indexOf('change:') === 0) {
        View.prototype.trigger.apply(this.view, arguments);
      }
      NestedCell.prototype.trigger.apply(this, arguments);
    }
  });

  /**
   * Generic View that deals with:
   * - Creation of private collections
   * - Lifecycle of a view
   * @module    Torso
   * @class     View
   * @constructor
   * @author ariel.wexler@vecna.com, kent.willis@vecna.com
   */
  var View = Backbone.View.extend({
    viewState: null,
    template: undefined,
    feedback: null,
    feedbackCell: null,
    behaviors: null,
    templateRendererOptions: undefined,
    prepareFields: null,
    __behaviorInstances: null,
    __childViews: null,
    __sharedViews: null,
    __isActive: false,
    __isAttachedToParent: false,
    __isDisposed: false,
    __attachedCallbackInvoked: false,
    __feedbackOnEvents: null,
    __feedbackListenToEvents: null,
    /**
     * Array of feedback when-then-to's. Example:
     * [{
     *   when: {'@fullName': ['change']},
     *   then: function(event) { return {text: this.feedbackCell.get('fullName')};},
     *   to: 'fullName-feedback'
     * }]
     * @private
     * @property feedback
     * @type Array
     */

    /**
     * Overrides constructor to create needed fields and invoke activate/render after initialization
     * @method constructor
     */
    constructor: function(options) {
      options = options || {};
      this.viewState = new ViewStateCell({}, { view: this });
      this.feedbackCell = new Cell();
      this.__childViews = {};
      this.__sharedViews = {};
      this.__injectionSiteMap = {};
      this.__feedbackOnEvents = [];
      this.__feedbackListenToEvents = [];
      this.template = options.template || this.template;
      this.templateRendererOptions = options.templateRendererOptions || this.templateRendererOptions;
      this.__initializeBehaviors(options);
      this.trigger('initialize:begin');
      Backbone.View.apply(this, arguments);
      this.trigger('initialize:complete');
      if (!options.noActivate) {
        this.activate();
      }
    },

    /**
     * Alias to this.viewState.get()
     * @method get
     */
    get: function() {
      return this.viewState.get.apply(this.viewState, arguments);
    },

    /**
     * Alias to this.viewState.set()
     * @method set
     */
    set: function() {
      return this.viewState.set.apply(this.viewState, arguments);
    },

    /**
     * Alias to this.viewState.has()
     * @method has
     */
    has: function() {
      return this.viewState.has.apply(this.viewState, arguments);
    },

    /**
     * Alias to this.viewState.unset()
     * @method unset
     */
    unset: function() {
      return this.viewState.unset.apply(this.viewState, arguments);
    },

    /**
     * Alias to this.viewState.toJSON()
     * @method toJSON
     */
    toJSON: function() {
      return this.viewState.toJSON();
    },

    /**
     * @param alias {String} the name/alias of the behavior
     * @return {Torso.Behavior} the behavior instance if one exists with that alias
     * @method getBehavior
     */
    getBehavior: function(alias) {
      if (this.__behaviorInstances) {
        return this.__behaviorInstances[alias];
      }
    },

    /**
     * prepareFields can be used to augment the default render method contents.
     * See __getPrepareFieldsContext() for more details on how to configure them.
     *
     * @return {Object} context for a render method. Defaults to:
     *    {view: this.viewState.toJSON(), model: this.model.toJSON()}
     * @method prepare
     */
    prepare: function() {
      return this.__getPrepareFieldsContext();
    },

    /**
     * Augments the context with custom content.
     * @param context {Object} the context you can modify
     * @return {Object} [Optional] If you return an object, it will be merged with the context
     * @method _prepare
     */
    _prepare: function(context) {
      // no changes by default
    },

    /**
     * Rebuilds the html for this view's element. Should be able to be called at any time.
     * Defaults to using this.templateRender. Assumes that this.template is a javascript
     * function that accepted a single JSON context.
     * The render method returns a promise that resolves when rendering is complete. Typically render
     * is synchronous and the rendering is complete upon completion of the method. However, when utilizing
     * transitions/animations, the render process can be asynchronous and the promise is useful to know when it has finished.
     * @method render
     * @return {Promise} a promise that when resolved signifies that the rendering process is complete.
     */
    render: function() {
      if (this.isDisposed()) {
        throw new Error('Render called on a view that has already been disposed.');
      }
      var view = this;
      this.trigger('render:begin');
      if (this.prerender() === false) {
        this.trigger('render:aborted');
        return $.Deferred().resolve().promise();
      }
      this.__updateInjectionSiteMap();
      this.trigger('render:before-dom-update');
      this.detachTrackedViews();
      this.updateDOM();
      if (this.__pendingAttachInfo) {
        this.__performPendingAttach();
      }
      this.trigger('render:after-dom-update');
      this.delegateEvents();
      this.trigger('render:after-delegate-events');
      this.trigger('render:before-attach-tracked-views');
      var promises = this.attachTrackedViews();
      return $.when.apply($, _.flatten([promises])).done(function() {
        view.postrender();
        view.trigger('render:complete');
      });
    },

    /**
     * Hook during render that is invoked before any DOM rendering is performed.
     * This method can be overwritten as usual OR extended using <baseClass>.prototype.prerender.apply(this, arguments);
     * NOTE: if you require the view to be detached from the DOM, consider using _detach callback
     * @method prerender
     * @return {Promise or List of Promises} you can optionally return one or more promises that when all are resolved, prerender is finished. Note: render logic will not wait until promises are resolved.
     */
    prerender: _.noop,

    /**
     * Produces and sets this view's elements DOM. Used during the rendering process. Override if you have custom DOM update logic.
     * Defaults to using the stanrdard: this.templateRender(this.$el, this.template, this.prepare(), templateRendererOptions);
     * this.templateRendererOptions is an object or function defined on the view that is passed into the renderer.
     * Examples include: views with no template or multiple templates, or if you wish to use a different rendering engine than the templateRenderer or wish to pass options to it.
     * @method updateDOM
     */
    updateDOM: function() {
      if (this.template) {
        var templateRendererOptions = _.result(this, 'templateRendererOptions');
        this.templateRender(this.$el, this.template, this.prepare(), templateRendererOptions);
      }
    },

    /**
     * Hook during render that is invoked after all DOM rendering is done and tracked views attached.
     * This method can be overwritten as usual OR extended using <baseClass>.prototype.postrender.apply(this, arguments);
     * NOTE: if you require the view to be attached to the DOM, consider using _attach callback
     * @method postrender
     * @return {Promise or List of Promises} you can optionally return one or more promises that when all are resolved, postrender is finished. Note: render logic will not wait until promises are resolved.
     */
    postrender: _.noop,

    /**
     * Hotswap rendering system reroute method.
     * @method templateRender
     * See Torso.templateRenderer#render for params
     */
    templateRender: function(el, template, context, opts) {
      opts = opts || {};
      if (_.isString(template)) {
        opts.newHTML = template;
      }
      templateRenderer.render(el, template, context, opts);
    },

    /**
     * Overrides the base delegateEvents
     * Binds DOM events with the view using events hash while also adding feedback event bindings
     * @method delegateEvents
     */
    delegateEvents: function() {
      this.undelegateEvents(); // always undelegate events - backbone sometimes doesn't.
      Backbone.View.prototype.delegateEvents.call(this);
      this.__generateFeedbackBindings();
      this.__generateFeedbackCellCallbacks();
      _.each(this.getTrackedViews(), function(view) {
        if (view.isAttachedToParent()) {
          view.delegateEvents();
        }
      });
    },

    /**
     * Overrides undelegateEvents
     * Unbinds DOM events from the view.
     * @method undelegateEvents
     */
    undelegateEvents: function() {
      Backbone.View.prototype.undelegateEvents.call(this);
      _.each(this.getTrackedViews(), function(view) {
        view.undelegateEvents();
      });
    },

    /**
     * If detached, will replace the element passed in with this view's element and activate the view.
     * @param [$el] {jQuery element} the element to attach to. This element will be replaced with this view.
     *                               If options.replaceMethod is provided, then this parameter is ignored.
     * @param [options] {Object} optional options
     * @param   [options.replaceMethod] {Fucntion} if given, this view will invoke replaceMethod function
     *                                             in order to attach the view's DOM to the parent instead of calling $el.replaceWith
     * @param   [options.discardInjectionSite=false] {Booleon} if set to true, the injection site is not saved.
     * @return {Promise} promise that when resolved, the attach process is complete. Normally this method is synchronous. Transition effects can
     *                   make it asynchronous.
     * @method attachTo
     */
    attachTo: function($el, options) {
      options = options || {};
      var view = this;
      if (!this.isAttachedToParent()) {
        this.__pendingAttachInfo = {
          $el: $el,
          options: options
        };
        return this.render().done(function() {
          if (!view.__attachedCallbackInvoked && view.isAttached()) {
            view.__invokeAttached();
          }
          view.__isAttachedToParent = true;
        });
      }
      return $.Deferred().resolve().promise();
    },

    /**
     * Registers the view as a tracked view (defaulting as a child view), then calls view.attachTo with the element argument
     * The element argument can be a String that references an element with the corresponding "inject" attribute.
     * When using attachView with options.useTransition:
     *   Will inject a new view into an injection site by using the new view's transitionIn method. If the parent view
     *   previously had another view at this injections site, this previous view will be removed with that view's transitionOut.
     *   If this method is used within a render, the current views' injection sites will be cached so they can be transitioned out even
     *   though they are detached in the process of re-rendering. If no previous view is given and none can be found, the new view is transitioned in regardless.
     *   If the previous view is the same as the new view, it is injected normally without transitioning in.
     *   The previous view must has used an injection site with the standard "inject=<name of injection site>" attribute to be found.
     *   When the transitionIn and transitionOut methods are invoked on the new and previous views, the options parameter will be passed on to them. Other fields
     *   will be added to the options parameter to allow better handling of the transitions. These include:
     *   {
     *     newView: the new view
     *     previousView: the previous view (can be undefined)
     *     parentView: the parent view transitioning in or out the tracked view
     *   }
     * @param $el {jQuery element or String} the element to attach to OR the name of the injection site. The element with the attribute "inject=<name of injection site>" will be used.
     * @param view   {View}   The instantiated view object to be attached
     * @param [options] {Object} optionals options object. If using transitions, this options object will be passed on to the transitionIn and transitionOut methods as well.
     * @param   [options.noActivate=false] {Boolean} if set to true, the view will not be activated upon attaching.
     * @param   [options.shared=false] {Boolean} if set to true, the view will be treated as a shared view and not disposed during parent view disposing.
     * @param   [options.useTransition=false] {Boolean} if set to true, this method will delegate attach logic to this.__transitionNewViewIntoSite
     * @param   [options.addBefore=false] {Boolean} if true, and options.useTransition is true, the new view's element will be added before the previous view's element. Defaults to after.
     * @param   [options.previousView] {View} if using options.useTransition, then you can explicitly define the view that should be transitioned out.
     *                                        If using transitions and no previousView is provided, it will look to see if a view already is at this injection site and uses that by default.
     * @return {Promise} resolved when all transitions are complete. No payload is provided upon resolution. If no transitions, then returns a resolved promise.
     * @method attachView
     */
    attachView: function($el, view, options) {
      options = options || {};
      var injectionSite, injectionSiteName,
        usesInjectionSiteName = _.isString($el);
      if (usesInjectionSiteName) {
        injectionSiteName = $el;
        injectionSite = this.$('[inject=' + injectionSiteName + ']');
        if (!injectionSite) {
          throw 'View.attachView: No injection site found with which to attach this view. View.cid=' + this.cid;
        }
      } else {
        injectionSite = $el;
      }
      if (options.useTransition) {
        return this.__transitionNewViewIntoSite(injectionSiteName, view, options);
      }
      view.detach();
      this.registerTrackedView(view, options);
      view.attachTo(injectionSite, options);
      if (!options.noActivate) {
        view.activate();
      }
      return $.Deferred().resolve().promise();
    },

    /**
     * Hook to attach all your tracked views. This hook will be called after all DOM rendering is done so injection sites should be available.
     * This method can be overwritten as usual OR extended using <baseClass>.prototype.attachTrackedViews.apply(this, arguments);
     * @method attachTrackedViews
     * @return {Promise or List of Promises} you can optionally return one or more promises that when all are resolved, all tracked views are attached. Useful when using this.attachView with useTransition=true.
     */
    attachTrackedViews: _.noop,

    /**
     * Method to be invoked when the view is fully attached to the DOM (NOT just the parent). Use this method to manipulate the view
     * after the DOM has been attached to the document. The default implementation is a no-op.
     * @method _attached
     */
    _attached: _.noop,

    /**
     * @return {Boolean} true if the view is attached to a parent
     * @method isAttachedToParent
     */
    isAttachedToParent: function() {
      return this.__isAttachedToParent;
    },

    /**
     * NOTE: depends on a global variable "document"
     * @return {Boolean} true if the view is attached to the DOM
     * @method isAttached
     */
    isAttached: function() {
      return $.contains(document, this.$el[0]);
    },

    /**
     * If attached, will detach the view from the DOM.
     * This method will only separate this view from the DOM it was attached to, but it WILL invoke the _detach
     * callback on each tracked view recursively.
     * @method detach
     */
    detach: function() {
      var wasAttached;
      if (this.isAttachedToParent()) {
         wasAttached = this.isAttached();
        // Detach view from DOM
        this.trigger('before-dom-detach');
        if (this.injectionSite) {
          this.$el.replaceWith(this.injectionSite);
          this.injectionSite = undefined;
        } else {
          this.$el.detach();
        }
        if (wasAttached) {
          this.__invokeDetached();
        }
        this.undelegateEvents();
        this.__isAttachedToParent = false;
      }
    },

    /**
     * Detach all tracked views or a subset of them based on the options parameter.
     * NOTE: this is not recursive - it will not separate the entire view tree.
     * @param [options={}] {Object}  Optional options.
     *   @param [options.shared=false] {Boolean} If true, detach only the shared views. These are views not owned by this parent. As compared to a child view
     *                                           which are disposed when the parent is disposed.
     *   @param [options.child=false] {Boolean} If true, detach only child views. These are views that are owned by the parent and dispose of them if the parent is disposed.
     * @method detachTrackedViews
     */
    detachTrackedViews: function(options) {
      var trackedViewsHash = this.getTrackedViews(options);
      _.each(trackedViewsHash, function(view) {
        view.detach();
      });
    },

    /**
     * Method to be invoked when the view is detached from the DOM (NOT just the parent). Use this method to clean up state
     * after the view has been removed from the document. The default implementation is a no-op.
     * @method _detached
     */
    _detached: _.noop,

    /**
     * Resets listeners and events in order for the view to be reattached to the visible DOM
     * @method activate
     */
    activate: function() {
      this.__activateTrackedViews();
      if (!this.isActive()) {
        this.trigger('before-activate-callback');
        this._activate();
        this.__isActive = true;
      }
    },

    /**
     * Method to be invoked when activate is called. Use this method to turn on any
     * custom timers, listenTo's or on's that should be activatable. The default implementation is a no-op.
     * @method _activate
     */
    _activate: _.noop,

    /**
     * @return {Boolean} true if the view is active
     * @method isActive
     */
    isActive: function() {
      return this.__isActive;
    },

    /**
     * Maintains view state and DOM but prevents view from becoming a zombie by removing listeners
     * and events that may affect user experience. Recursively invokes deactivate on child views
     * @method deactivate
     */
    deactivate: function() {
      this.__deactivateTrackedViews();
      if (this.isActive()) {
        this.trigger('before-deactivate-callback');
        this._deactivate();
        this.__isActive = false;
      }
    },

    /**
     * Method to be invoked when deactivate is called. Use this method to turn off any
     * custom timers, listenTo's or on's that should be deactivatable. The default implementation is a no-op.
     * @method _deactivate
     */
    _deactivate: _.noop,

    /**
     * Removes all listeners, disposes children views, stops listening to events, removes DOM.
     * After dispose is called, the view can be safely garbage collected. Called while
     * recursively removing views from the hierarchy.
     * @method dispose
     */
    dispose: function() {
      this.trigger('before-dispose-callback');
      this._dispose();

      // Detach DOM and deactivate the view
      this.detach();
      this.deactivate();

      // Clean up child views first
      this.__disposeChildViews();

      // Remove view from DOM
      this.remove();

      // Unbind all local event bindings
      this.off();
      this.stopListening();
      if (this.viewState) {
        this.viewState.off();
        this.viewState.stopListening();
      }
      // Delete the dom references
      delete this.$el;
      delete this.el;

      this.__isDisposed = true;
    },

    /**
     * Method to be invoked when dispose is called. By default calling dispose will remove the
     * view's element, its on's, listenTo's, and any registered children.
     * Override this method to destruct any extra
     * @method _dispose
     */
    _dispose: _.noop,

    /**
     * @return {Boolean} true if the view was disposed
     * @method isDisposed
     */
    isDisposed: function() {
      return this.__isDisposed;
    },

    /**
     * @return {Boolean} true if this view has tracked views (limited by the options parameter)
     * @param [options={}] {Object}  Optional options.
     *   @param [options.shared=false] {Boolean} If true, only check the shared views. These are views not owned by this parent. As compared to a child view
     *                                           which are disposed when the parent is disposed.
     *   @param [options.child=false] {Boolean} If true, only check the child views. These are views that are owned by the parent and dispose of them if the parent is disposed.
     * @method hasTrackedViews
     */
    hasTrackedViews: function(options) {
      return !_.isEmpty(this.getTrackedViews(options));
    },

    /**
     * Returns all tracked views, both child views and shared views.
     * @method getTrackedViews
     * @param [options={}] {Object}  Optional options.
     *   @param [options.shared=false] {Boolean} If true, get only the shared views. These are views not owned by this parent. As compared to a child view
     *                                           which are disposed when the parent is disposed.
     *   @param [options.child=false] {Boolean} If true, get only child views. These are views that are owned by the parent and dispose of them if the parent is disposed.
     * @return {List<View>} all tracked views (filtered by options parameter)
     */
    getTrackedViews: function(options) {
      return _.values(this.__getTrackedViewsHash(options));
    },

    /**
     * @return the view with the given cid.  Will look in both shared and child views.
     * @param viewCID {String} the cid of the view
     * @method getTrackedView
     */
    getTrackedView: function(viewCID) {
      var childView = this.__childViews[viewCID],
          sharedView = this.__sharedViews[viewCID];
      return childView || sharedView;
    },

    /**
     * Binds the view as a tracked view - any recursive calls like activate, deactivate, or dispose will
     * be done to the tracked view as well.  Except dispose for shared views. This method defaults to register the
     * view as a child view unless specified by options.shared.
     * @param view {View} the tracked view
     * @param [options={}] {Object}  Optional options.
     *   @param [options.shared=false] {Boolean} If true, registers view as a shared view. These are views not owned by this parent. As compared to a child view
     *                                           which are disposed when the parent is disposed. If false, registers view as a child view which are disposed when the parent is disposed.
     * @return {View} the tracked view
     * @method registerTrackedView
     */
    registerTrackedView: function(view, options) {
      options = options || {};
      this.unregisterTrackedView(view);
      if (options.child || !options.shared) {
        this.__childViews[view.cid] = view;
      } else {
        this.__sharedViews[view.cid] = view;
      }
      return view;
    },

    /**
     * Unbinds the tracked view - no recursive calls will be made to this shared view
     * @param view {View} the shared view
     * @return {View} the tracked view
     * @method unregisterTrackedView
     */
    unregisterTrackedView: function(view) {
      delete this.__childViews[view.cid];
      delete this.__sharedViews[view.cid];
      return view;
    },

    /**
     * Unbinds all tracked view - no recursive calls will be made to this shared view
     * You can limit the types of views that will be unregistered by using the options parameter.
     * @param view {View} the shared view
     * @param [options={}] {Object}  Optional options.
     *   @param [options.shared=false] {Boolean} If true, unregister only the shared views. These are views not owned by this parent. As compared to a child view
     *                                           which are disposed when the parent is disposed.
     *   @param [options.child=false] {Boolean} If true, unregister only child views. These are views that are owned by the parent and dispose of them if the parent is disposed.
     * @return {View} the tracked view
     * @method unregisterTrackedView
     */
    unregisterTrackedViews: function(options) {
      var trackedViewsHash = this.getTrackedViews(options);
      _.each(trackedViewsHash, function(view) {
        this.unregisterTrackedView(view, options);
      }, this);
    },

    /**
     * Override to provide your own transition out logic. Default logic is to just detach from the page.
     * The method is passed a callback that should be invoked when the transition out has fully completed.
     * @method transitionOut
     * @param done {Function} callback that MUST be invoked when the transition is complete.
     * @param options {Object} optionals options object
     * @param   options.currentView {View} the view that is being transitioned in.
     * @param   options.previousView {View} the view that is being transitioned out. Typically this view.
     * @param   options.parentView {View} the view that is invoking the transition.
     */
    transitionOut: function(done, options) {
      this.detach();
      done();
    },

    /**
     * Override to provide your own transition in logic. Default logic is to just attach to the page.
     * The method is passed a callback that should be invoked when the transition in has fully completed.
     * @method transitionIn
     * @param attach {Function} callback to be invoked when you want this view to be attached to the dom.
                                If you are trying to transition in a tracked view, consider using this.transitionInView()
     * @param done {Function} callback that MUST be invoked when the transition is complete.
     * @param options {Object} optionals options object
     * @param   options.currentView {View} the view that is being transitioned in.
     * @param   options.previousView {View} the view that is being transitioned out. Typically this view.
     * @param   options.parentView {View} the view that is invoking the transition.
     */
    transitionIn: function(attach, done, options) {
      attach();
      done();
    },

    /**
     * Invokes a feedback entry's "then" method
     * @param to {String} the "to" field corresponding to the feedback entry to be invoked.
     * @param [evt] {Event} the event to be passed to the "then" method
     * @param [indexMap] {Object} a map from index variable name to index value. Needed for "to" fields with array notation.
     * @method invokeFeedback
     */
    invokeFeedback: function(to, evt, indexMap) {
      var result,
        feedbackToInvoke = _.find(this.feedback, function(feedback) {
          var toToCheck = feedback.to;
          if (_.isArray(toToCheck)) {
            return _.contains(toToCheck, to);
          } else {
            return to === toToCheck;
          }
        }),
        feedbackCellField = to;
      if (feedbackToInvoke) {
        if (indexMap) {
          feedbackCellField = this.__substituteIndicesUsingMap(to, indexMap);
        }
        result = feedbackToInvoke.then.call(this, evt, indexMap);
        this.__processFeedbackThenResult(result, feedbackCellField);
      }
    },

    //************** Private methods **************//

    /**
     * Parses the combined arrays from the defaultPrepareFields array and the prepareFields array (or function
     * returning an array).
     *
     * The default prepared fields are: [ { name: 'view', value: 'viewState' }, 'model' ]
     *
     * Prepared fields can be defined in a couple of ways:
     *   preparedFields = [
     *     'model',
     *     { name: 'app', value: someGlobalCell },
     *     'a value that does not exist on the view',
     *     { name: 'view', value: 'viewState' },
     *     { name: 'patientId', value: '_patientId' },
     *     'objectWithoutToJSON'
     *   ]
     *
     * Will result in the following context (where this === this view and it assumes all the properties on the view
     * that are referenced are defined):
     *   {
     *     model: this.model.toJSON(),
     *     app: someGlobalCell.toJSON(),
     *     view: this.viewState.toJSON(),
     *     patientId: this._patientId,
     *     objectWithoutToJSON: this.objectWithoutToJSON
     *   }
     *
     * Note: alternatively, you can define your prepareFields as an object that will be mapped to an array of { name: key, value: value }
     *
     * Things to be careful of:
     *   * If the view already has a field named 'someGlobalCell' then the property on the view will be used instead of the global value.
     *   * if the prepared field item is not a string or object containing 'name' and 'value' properties, then an exception
     *     will be thrown.
     *   * 'model' and 'view' are reserved field names and cannot be reused.
     *
     * @method __getPrepareFieldsContext
     * @return {Object} context composed of { modelName: model.toJSON() } for every model identified.
     * @private
     */
    __getPrepareFieldsContext: function() {
      var prepareFieldsContext = {};
      var prepareFields = _.result(this, 'prepareFields');
      if (prepareFields && _.isObject(prepareFields) && !_.isArray(prepareFields)) {
        var keys = _.keys(prepareFields);
        prepareFields = _.map(keys, function(key) {
          return { name: key, value: prepareFields[key] };
        });
      }
      var defaultPrepareFields = [ { name: 'view', value: 'viewState' }, 'model' ];
      prepareFields = _.union(prepareFields, defaultPrepareFields);
      if (prepareFields && prepareFields.length > 0) {
        for (var fieldIndex = 0; fieldIndex < prepareFields.length; fieldIndex++) {
          var prepareField = prepareFields[fieldIndex];
          var prepareFieldIsSimpleString = _.isString(prepareField);

          var prepareFieldName = prepareField;
          var prepareFieldValue = prepareField;

          if (!prepareFieldIsSimpleString) {
            if (!_.isString(prepareField.name)) {
              throw "prepareFields items need to either be a string or define a .name property that is a simple string to use for the key in the template context.";
            }

            if (_.isUndefined(prepareField.value)) {
              throw "prepareFields items need a value property if it is not a string.";
            }

            prepareFieldName = prepareField.name;
            prepareFieldValue = prepareField.value;
          }
          if (!_.isUndefined(prepareFieldsContext[prepareFieldName])) {
            throw "duplicate prepareFields name (" + prepareFieldName + ").  Note 'view' and 'model' are reserved names.";
          }

          // Note _.result() also returns undefined if the 2nd argument is not a string.
          var prepareFieldValueFromView = _.result(this, prepareFieldValue);
          var prepareFieldValueIsDefinedOnView = !_.isUndefined(prepareFieldValueFromView);
          if (prepareFieldValueIsDefinedOnView) {
            prepareFieldValue = prepareFieldValueFromView;
          }

          if (prepareFieldValue && _.isFunction(prepareFieldValue.toJSON)) {
            prepareFieldsContext[prepareFieldName] = prepareFieldValue.toJSON();
          } else if (!prepareFieldIsSimpleString || prepareFieldValueIsDefinedOnView) {
            prepareFieldsContext[prepareFieldName] = prepareFieldValue;
          }
        }
      }
      var context = this._prepare(prepareFieldsContext);
      if (_.isUndefined(context)) {
        context = prepareFieldsContext;
      } else {
        context = _.extend(prepareFieldsContext, context);
      }
      return context;
    },

    /**
     * Initializes the behaviors
     * @method __initializeBehaviors
     */
    __initializeBehaviors: function(viewOptions) {
      var view = this;
      if (!_.isEmpty(this.behaviors)) {
        view.__behaviorInstances = {};
        _.each(this.behaviors, function(behaviorDefinition, alias) {
          if (!_.has(behaviorDefinition, 'behavior')) {
            behaviorDefinition = {behavior: behaviorDefinition};
          }
          var BehaviorClass = behaviorDefinition.behavior;
          if (!(BehaviorClass && _.isFunction(BehaviorClass))) {
            throw new Error('Incorrect behavior definition. Expected key "behavior" to be a class but instead got ' +
              String(BehaviorClass));
          }

          var behaviorOptions = _.pick(behaviorDefinition, function(value, key) {
            return key !== 'behavior';
          });
          behaviorOptions.view = view;
          behaviorOptions.alias = alias;
          var behaviorAttributes = behaviorDefinition.attributes || {};
          var behaviorInstance = view.__behaviorInstances[alias] = new BehaviorClass(behaviorAttributes, behaviorOptions, viewOptions);
          // Add the behavior's mixin fields to the view's public API
          if (behaviorInstance.mixin) {
            var mixin = _.result(behaviorInstance, 'mixin');
            _.each(mixin, function(field, fieldName) {
              // Default to a view's field over a behavior mixin
              if (_.isUndefined(view[fieldName])) {
                if (_.isFunction(field)) {
                  // Behavior mixin functions will be behavior-scoped - the context will be the behavior.
                  view[fieldName] = _.bind(field, behaviorInstance);
                } else {
                  view[fieldName] = field;
                }
              }
            });
          }
        });
      }
    },

    /**
     * If the view is attaching during the render process, then it replaces the injection site
     * with the view's element after the view has generated its DOM.
     * @method __performPendingAttach
     * @private
     */
    __performPendingAttach: function() {
      this.trigger('before-dom-attach');
      this.__replaceInjectionSite(this.__pendingAttachInfo.$el, this.__pendingAttachInfo.options);
      delete this.__pendingAttachInfo;
    },

    /**
     * Deactivates all tracked views or a subset of them based on the options parameter.
     * @param [options={}] {Object}  Optional options.
     *   @param [options.shared=false] {Boolean} If true, deactivate only the shared views. These are views not owned by this parent. As compared to a child view
     *                                           which are disposed when the parent is disposed.
     *   @param [options.child=false] {Boolean} If true, deactivate only child views. These are views that are owned by the parent and dispose of them if the parent is disposed.
     * @method __deactivateTrackedViews
     * @private
     */
    __deactivateTrackedViews: function(options) {
      _.each(this.getTrackedViews(options), function(view) {
        view.deactivate();
      });
    },

    /**
     * Activates all tracked views or a subset of them based on the options parameter.
     * @param [options={}] {Object}  Optional options.
     *   @param [options.shared=false] {Boolean} If true, activate only the shared views. These are views not owned by this parent. As compared to a child view
     *                                           which are disposed when the parent is disposed.
     *   @param [options.child=false] {Boolean} If true, activate only child views. These are views that are owned by the parent and dispose of them if the parent is disposed.
     * @method __activateTrackedViews
     * @private
     */
    __activateTrackedViews: function(options) {
      _.each(this.getTrackedViews(options), function(view) {
        view.activate();
      });
    },

    /**
     * Disposes all child views recursively
     * @method disposeChildViews
     * @private
     */
    __disposeChildViews: function() {
      _.each(this.__childViews, function(view) {
        view.dispose();
      });
    },

    /**
     * Will inject a new view into an injection site by using the new view's transitionIn method. If the parent view
     * previously had another view at this injections site, this previous view will be removed with that view's transitionOut.
     * If this method is used within a render, the current views' injection sites will be cached so they can be transitioned out even
     * though they are detached in the process of re-rendering. If no previous view is given and none can be found, the new view is transitioned in regardless.
     * If the previous view is the same as the new view, it is injected normally without transitioning in.
     * The previous view must has used an injection site with the standard "inject=<name of injection site>" attribute to be found.
     * @method transitionNewViewIntoSite
     * @private
     * @param injectionSiteName {String} The name of the injection site in the template. This is the value corresponding to the attribute "inject".
     * @param newView {View} The instantiated view object to be transitioned into the injection site
     * @param [options] {Object} optional options object. This options object will be passed on to the transitionIn and transitionOut methods as well.
     * @param   [options.previousView] {View} the view that should be transitioned out. If none is provided, it will look to see if a view already
     *                                 is at this injection site and uses that by default.
     * @param   [options.addBefore=false] {Boolean} if true, the new view's element will be added before the previous view's element. Defaults to after.
     * @param   [options.shared=false] {Boolean} if set to true, the view will be treated as a shared view and not disposed during parent view disposing.
     * @return {Promise} resolved when all transitions are complete. No payload is provided upon resolution.
     * When the transitionIn and transitionOut methods are invoked on the new and previous views, the options parameter will be passed on to them. Other fields
     * will be added to the options parameter to allow better handling of the transitions. These include:
     * {
     *   newView: the new view
     *   previousView: the previous view (can be undefined)
     *   parentView: the parent view transitioning in or out the tracked view
     * }
     */
    __transitionNewViewIntoSite: function(injectionSiteName, newView, options) {
      var previousView, injectionSite;
      options = options || {};
      // find previous view that used this injection site.
      previousView = options.previousView;
      if (!previousView) {
        previousView = this.__getLastTrackedViewAtInjectionSite(injectionSiteName);
      }
      _.defaults(options, {
        parentView: this,
        newView: newView,
        previousView: previousView
      });
      options.useTransition = false;
      if (previousView == newView) {
        // Inject this view like normal if it's already the last one there
        return this.attachView(injectionSiteName, newView, options);
      }
      if (!previousView) {
        // Only transition in the new current view and find the injection site.
        injectionSite = this.$('[inject=' + injectionSiteName + ']');
        return this.__transitionInView(injectionSite, newView, options);
      }
      return this.__performTwoWayTransition(injectionSiteName, previousView, newView, options);
    },

    /**
     * Will transition out previousView at the same time as transitioning in newView.
     * @method __performTwoWayTransition
     * @param injectionSiteName {String} The name of the injection site in the template. This is the value corresponding to the attribute "inject".
     * @param previousView {View} the view that should be transitioned out.
     * @param newView {View} The view that should be transitioned into the injection site
     * @param [options] {Object} optional options object. This options object will be passed on to the transitionIn and transitionOut methods as well.
     * @param   [options.addBefore=false] {Boolean} if true, the new view's element will be added before the previous view's element. Defaults to after.
     * @return {Promise} resolved when all transitions are complete. No payload is provided upon resolution.
     * @private
     */
    __performTwoWayTransition: function(injectionSiteName, previousView, newView, options) {
      var newInjectionSite, currentPromise,
        previousDeferred = $.Deferred();
      this.attachView(injectionSiteName, previousView, options);
      options.cachedInjectionSite = previousView.injectionSite;
      newInjectionSite = options.newInjectionSite = $('<span inject="' + injectionSiteName + '">');
      if (options.addBefore) {
        previousView.$el.before(newInjectionSite);
      } else {
        previousView.$el.after(newInjectionSite);
      }

      // clear the injections site so it isn't replaced back into the dom.
      previousView.injectionSite = undefined;

      // transition previous view out
      previousView.transitionOut(previousDeferred.resolve, options);
      // transition new current view in
      currentPromise = this.__transitionInView(newInjectionSite, newView, options);

      // return a combined promise
      return $.when(previousDeferred.promise(), currentPromise);
    },

    /**
     * Simliar to this.attachView except it utilizes the new view's transitionIn method instead of just attaching the view.
     * This method is invoked on the parent view to attach a tracked view where the transitionIn method defines how a tracked view is brought onto the page.
     * @param $el {jQuery element} the element to attach to.
     * @param newView {View} the view to be transitioned in.
     * @param [options] {Object} optional options object
     * @param   [options.noActivate=false] {Boolean} if set to true, the view will not be activated upon attaching.
     * @param   [options.shared=false] {Boolean} if set to true, the view will be treated as a shared view and not disposed during parent view disposing.
     * @return {Promise} resolved when transition is complete. No payload is provided upon resolution.
     * @method transitionInView
     * @private
     */
    __transitionInView: function($el, newView, options) {
      var currentDeferred = $.Deferred(),
        parentView = this;
      options = _.extend({}, options);
      _.defaults(options, {
        parentView: this,
        newView: newView
      });
      newView.transitionIn(function() {
        parentView.attachView($el, newView, options);
      }, currentDeferred.resolve, options);
      return currentDeferred.promise();
    },

    /**
     * Gets the hash from id to tracked views. You can limit the subset of views returned based on the options passed in.
     * NOTE: returns READ-ONLY snapshots. Updates to the returned cid->view map will not be saved nor will updates to the underlying maps be reflected later in returned objects.
     * This means that you can add "add" or "remove" tracked view using this method, however you can interact with the views inside the map completely.
     * @param [options={}] {Object}  Optional options.
     *   @param [options.shared=false] {Boolean} If true, will add the shared views. These are views not owned by this parent. As compared to a child view
     *                                           which are disposed when the parent is disposed.
     *   @param [options.child=false] {Boolean} If true, will add child views. These are views that are owned by the parent and dispose of them if the parent is disposed.
     * @method __getTrackedViewsHash
     * @return READ-ONLY snapshot of the object maps cotaining tracked views keyed by their cid (filtered by optional options parameter).
     * @private
     */
    __getTrackedViewsHash: function(options) {
      var views = {};
      options = options || {};
      if (options.shared) {
        views = _.extend(views, this.__sharedViews);
      }
      if (options.child) {
        views = _.extend(views, this.__childViews);
      }
      if (!options.child && !options.shared) {
        views = _.extend(views, this.__sharedViews, this.__childViews);
      }
      return views;
    },

    /**
     * Used internally by Torso.View to keep a cache of tracked views and their current injection sites before detaching during render logic.
     * @private
     * @method __updateInjectionSiteMap
     */
    __updateInjectionSiteMap: function() {
      var parentView = this;
      this.__injectionSiteMap = {};
      _.each(this.getTrackedViews(), function(view) {
        if (view.isAttachedToParent() && view.injectionSite) {
          parentView.__injectionSiteMap[view.injectionSite.attr('inject')] = view;
        }
      });
    },

    /**
     * Finds the last view at a given injection site. The view returned must be currently tracked by this view (the parent view).
     * When used with the render method, it will return the view at a injections site before the render logic detaches all tracked views.
     * @private
     * @method __getLastTrackedViewAtInjectionSite
     * @param injectionSiteName {String} the injection site name - the value of the "inject" attribute on the element used as an injection target for tracked views.
     * @return {View} the previous view at that site. Undefined if no view was at that injection site before.
     */
    __getLastTrackedViewAtInjectionSite: function(injectionSiteName) {
      // check to see if a view was cached before a render
      var previousView = this.__injectionSiteMap[injectionSiteName];
      if (previousView) {
        // make sure previous view is still tracked
        previousView = _.contains(this.getTrackedViews(), previousView) ? previousView : undefined;
      } else {
        // if not, see if a view is currently in the injection site.
        var matchingViews = this.getTrackedViews().filter(function(view) {
          return view.injectionSite && view.injectionSite.attr('inject') == injectionSiteName;
        });
        previousView = _.first(matchingViews);
      }
      return previousView;
    },

    /**
     * Replaces the injection site element passed in using $el.replaceWith OR you can use your own replace method
     * @method __replaceInjectionSite
     * @param $el {jQuery Element} the injection site element to be replaced
     * @param [options] {Object} Optional options
     * @param   [options.replaceMethod] {Function} use an alternative replace method. Invoked with the view's element as the argument.
     * @param   [options.discardInjectionSite=false] {Boolean} if true, the view will not save a reference to the injection site after replacement.
     * @private
     */
    __replaceInjectionSite: function($el, options) {
      options = options || {};
      this.injectionSite = options.replaceMethod ? options.replaceMethod(this.$el) : $el.replaceWith(this.$el);
      if (options.discardInjectionSite) {
        this.injectionSite = undefined;
      }
    },

    /**
     * Call this method when a view is attached to the DOM. It is recursive to child views, but checks whether each child view is attached.
     * @method __invokeAttached
     * @private
     */
    __invokeAttached: function() {
      // Need to check if each view is attached because there is no guarentee that if parent is attached, child is attached.
      if (!this.__attachedCallbackInvoked) {
        this.trigger('before-attached-callback');
        this._attached();
        this.__attachedCallbackInvoked = true;
        _.each(this.getTrackedViews(), function(view) {
          if (view.isAttachedToParent()) {
            view.__invokeAttached();
          }
        });
      }
    },

    /**
     * Call this method when a view is detached from the DOM. It is recursive to child views.
     * @method __invokeDetached
     */
    __invokeDetached: function() {
      if (this.__attachedCallbackInvoked) {
        this.trigger('before-detached-callback');
        this._detached();
        this.__attachedCallbackInvoked = false;
      }
      _.each(this.getTrackedViews(), function(view) {
        // If the tracked view is currently attached to the parent, then invoke detatched on it.
        if (view.isAttachedToParent()) {
          view.__invokeDetached();
        }
      });
    },

    /**
     * Generates callbacks for changes in feedback cell fields
     * 'change fullName' -> invokes all the jQuery (or $) methods on the element as stored by the feedback cell
     * If feedbackCell.get('fullName') returns:
     * { text: 'my text',
     *   attr: {class: 'newClass'}
     *   hide: [100, function() {...}]
     * ...}
     * Then it will invoke $element.text('my text'), $element.attr({class: 'newClass'}), etc.
     * @private
     * @method __generateFeedbackCellCallbacks
     */
    __generateFeedbackCellCallbacks: function() {
      var self = this;
      // Feedback one-way bindings
      self.feedbackCell.off();
      _.each(this.$('[data-feedback]'), function(element) {
        var attr = $(element).data('feedback');
        self.feedbackCell.on('change:' + attr, (function(field) {
          return function() {
            var $element,
              state = self.feedbackCell.get(field);
            if (!state) {
              return;
            }
            $element = self.$el.find('[data-feedback="' + field + '"]');
            _.each(state, function(value, key) {
              var target;
              if (_.first(key) === '_') {
                target = self[key.slice(1)];
              } else {
                target = $element[key];
              }
              if (_.isArray(value)) {
                target.apply($element, value);
              } else if (value !== undefined) {
                target.call($element, value);
              }
            });
          };
        })(attr));
      });
      _.each(self.feedbackCell.attributes, function(value, attr) {
        self.feedbackCell.trigger('change:' + attr);
      });
    },

    /**
     * Processes the result of the then method. Adds to the feedback cell.
     * @param result {Object} the result of the then method
     * @param feedbackCellField {Object} the name of the feedbackCellField, typically the "to" value.
     * @private
     * @method __processFeedbackThenResult
     */
    __processFeedbackThenResult: function(result, feedbackCellField) {
      var newState = $.extend({}, result);
      this.feedbackCell.set(feedbackCellField, newState, {silent: true});
      this.feedbackCell.trigger('change:' + feedbackCellField);
    },

    /**
     * Creates the "when" bindings, and collates and invokes the "then" methods for all feedbacks
     * Finds all feedback zones that match the "to" field, and binds the "when" events to invoke the "then" method
     * @private
     * @method __generateFeedbackBindings
     */
    __generateFeedbackBindings: function() {
      var i,
          self = this;

      // Cleanup previous "on" and "listenTo" events
      for (i = 0; i < this.__feedbackOnEvents.length; i++) {
        this.off(null, this.__feedbackOnEvents[i]);
      }
      for (i = 0; i < this.__feedbackListenToEvents.length; i++) {
        var feedbackListenToConfig = this.__feedbackListenToEvents[i];
        this.stopListening(feedbackListenToConfig.obj, feedbackListenToConfig.name, feedbackListenToConfig.callback);
      }
      this.__feedbackOnEvents = [];
      this.__feedbackListenToEvents = [];

      // For each feedback configuration
      _.each(this.feedback, function(declaration) {
        var toEntries = [declaration.to];
        if (_.isArray(declaration.to)) {
          toEntries = declaration.to;
        }
        _.each(toEntries, function(to) {
          var destinations = self.__getFeedbackDestinations(to),
            destIndexTokens = self.__getAllIndexTokens(to);

          // Iterate over all destinations
          _.each(destinations, function(dest) {
            var fieldName, indices, indexMap, then, args, method, whenEvents, bindInfo;
            dest = $(dest);
            fieldName = dest.data('feedback');
            indices = self.__getAllIndexTokens(fieldName);
            indexMap = {};
            // Generates a mapping from variable name to value:
            // If the destination "to" mapping is: my-feedback-element[x][y] and this particular destination is: my-feedback-element[1][4]
            // then the map would look like: {x: 1, y: 4}
            _.each(destIndexTokens, function(indexToken, i) {
              indexMap[indexToken] = indices[i];
            });
            then = declaration.then;

            // If the "then" clause is a string, assume it's a view method
            if (_.isString(then)) {
              then = self[then];
            } else if (_.isArray(then)) {
              // If the "then" clause is an array, assume it's [viewMethod, arg[0], arg[1], ...]
              args = then.slice();
              method = args[0];
              args.shift();
              then = self[method].apply(self, args);
            }

            // track the indices for binding
            bindInfo = {
              feedbackCellField: fieldName,
              fn: then,
              indices: indexMap
            };
            // Iterate over all "when" clauses
            whenEvents = self.__generateWhenEvents(declaration.when, indexMap);
            _.each(whenEvents, function(eventKey) {
              var match, delegateEventSplitter,
                invokeThen = function(evt) {
                  var i, args, result, newState;
                  args = [evt];
                  newState = {};
                  args.push(bindInfo.indices);
                  result = bindInfo.fn.apply(self, args);
                  self.__processFeedbackThenResult(result, bindInfo.feedbackCellField);
                };
              delegateEventSplitter = /^(\S+)\s*(.*)$/;
              match = eventKey.match(delegateEventSplitter);
              self.$el.on(match[1] + '.delegateEvents' + self.cid, match[2], _.bind(invokeThen, self));
            });
            // Special "on" listeners
            _.each(declaration.when.on, function(eventKey) {
              var invokeThen = self.__generateThenCallback(bindInfo, eventKey);
              self.on(eventKey, invokeThen, self);
              self.__feedbackOnEvents.push(invokeThen);
            });
            // Special "listenTo" listeners
            _.each(declaration.when.listenTo, function(listenToConfig) {
              var obj = listenToConfig.object;
              if (_.isFunction(obj)) {
                obj = _.bind(listenToConfig.object, self)();
              } else if (_.isString(obj)) {
                obj = _.result(self, listenToConfig.object);
              }
              if (obj) {
                var invokeThen = _.bind(self.__generateThenCallback(bindInfo, listenToConfig.events), self);
                self.listenTo(obj, listenToConfig.events, invokeThen);
                self.__feedbackListenToEvents.push({
                  object: obj,
                  name: listenToConfig.events,
                  callback: invokeThen
                });
              }
            });
          });
        });
      });
    },


    /**
     * Returns a properly wrapped "then" using a configuration object "bindInfo" and an "eventKey" that will be passed as the type
     * @param bindInfo {Object}
     * @param   bindInfo.feedbackCellField the property name of the feedback cell to store the "then" instructions
     * @param   bindInfo.fn the original "then" function
     * @param   [bindInfo.indices] the index map
     * @return {Function} the properly wrapped "then" function
     * @private
     * @method __generateThenCallback
     */
    __generateThenCallback: function(bindInfo, eventKey) {
      return function() {
        var result,
            args = [{
              args: arguments,
              type: eventKey
            }];
        args.push(bindInfo.indices);
        result = bindInfo.fn.apply(this, args);
        this.__processFeedbackThenResult(result, bindInfo.feedbackCellField);
      };
    },

    /**
     * Returns all elements on the page that match the feedback mapping
     * If dest is: my-feedback-foo[x][y] then it will find all elements that match: data-feedback="my-feedback-foo[*][*]"
     * @param dest {String} the string of the data-feedback
     * @return {jQuery array} all elements on the page that match the feedback mapping
     * @private
     * @method __getFeedbackDestinations
     */
    __getFeedbackDestinations: function(dest) {
      var self = this,
          strippedField = this.__stripAllAttribute(dest),
          destPrefix = dest,
          firstArrayIndex = dest.indexOf('[');
      if (firstArrayIndex > 0) {
        destPrefix = dest.substring(0, firstArrayIndex);
      }
      // Tries to match as much as possible by using a prefix (the string before the array notation)
      return this.$('[data-feedback^="' + destPrefix + '"]').filter(function() {
        // Only take the elements that actually match after the array notation is converted to open notation ([x] -> [])
        return self.__stripAllAttribute($(this).data('feedback')) === strippedField;
      });
    },

    /**
     * Generates the events needed to listen to the feedback's when methods. A when event is only created
     * if the appropriate element exist on the page
     * @param whenMap the collection of "when"'s for a given feedback
     * @param indexMap map from variable names to values when substituting array notation
     * @return the events that were generated
     * @private
     * @method __generateWhenEvents
     */
    __generateWhenEvents: function(whenMap, indexMap) {
      var self = this,
          events = [];
      _.each(whenMap, function(whenEvents, whenField) {
        var substitutedWhenField,
            qualifiedFields = [whenField],
            useAtNotation = (whenField.charAt(0) === '@');

        if (whenField !== 'on' || whenField !== 'listenTo') {
          if (useAtNotation) {
            whenField = whenField.substring(1);
            // substitute indices in to "when" placeholders
            // [] -> to all, [0] -> to specific, [x] -> [x's value]
            substitutedWhenField = self.__substituteIndicesUsingMap(whenField, indexMap);
            qualifiedFields = _.flatten(self.__generateSubAttributes(substitutedWhenField, self.model));
          }
          // For each qualified field
          _.each(qualifiedFields, function(qualifiedField) {
            _.each(whenEvents, function(eventType) {
              var backboneEvent = eventType + ' ' + qualifiedField;
              if (useAtNotation) {
                backboneEvent = eventType + ' [data-model="' + qualifiedField + '"]';
              }
              events.push(backboneEvent);
            });
          });
        }
      });
      return events;
    },

    /**
     * Returns an array of all the values and variables used within the array notations in a string
     * Example: foo.bar[x].baz[0][1].taz[y] will return ['x', 0, 1, 'y']. It will parse integers if they are numbers
     * This does not handle or return any "open" array notations: []
     * @private
     * @method __getAllIndexTokens
     */
    __getAllIndexTokens: function(attr) {
      return _.reduce(attr.match(/\[.+?\]/g), function(result, arrayNotation) {
        var token = arrayNotation.substring(1, arrayNotation.length - 1);
        if (!isNaN(token)) {
          result.push(parseInt(token, 10));
        } else {
          result.push(token);
        }
        return result;
      }, []);
    },

    /**
     * Replaces all array notations with open array notations.
     * Example: foo.bar[x].baz[0][1].taz[y] will return as foo.bar[].baz[][].taz[]
     * @private
     * @method __stripAllAttribute
     */
    __stripAllAttribute: function(attr) {
      attr = attr.replace(/\[.+?\]/g, function() {
        return '[]';
      });
      return attr;
    },

    /**
     * Takes a map from variable name to value to be replaced and processes a string with them.
     * Example: foo.bar[x].baz[0][1].taz[y] and {x: 5, y: 9} will return as foo.bar[5].baz[0][1].taz[9]
     * @private
     * @method __substituteIndicesUsingMap
     */
    __substituteIndicesUsingMap : function(dest, indexMap) {
      var newIndex;
      return dest.replace(/\[.?\]/g, function(arrayNotation) {
        if (arrayNotation.match(/\[\d+\]/g) || arrayNotation.match(/\[\]/g)) {
          return arrayNotation;
        } else {
          newIndex = indexMap[arrayNotation.substring(1, arrayNotation.length - 1)];
          return '[' + (newIndex === undefined ? '' : newIndex) + ']';
        }
      });
    },

    /**
     * Generates an array of all the possible field accessors and their indices when using
     * the "open" array notation:
     *    foo[] -> ['foo[0]', 'foo[1]'].
     * Will also perform nested arrays:
     *    foo[][] -> ['foo[0][0]', foo[1][0]']
     * @method __generateSubAttributes
     * @private
     * @param {String} attr The name of the attribute to expand according to the bound model
     * @return {Array<String>} The fully expanded subattribute names
     */
    __generateSubAttributes: function(attr, model) {
      var i, attrName, remainder, subAttrs, values,
        firstBracket = attr.indexOf('[]');
      if (firstBracket === -1) {
        return [attr];
      } else {
        attrName = attr.substring(0, firstBracket);
        remainder = attr.substring(firstBracket + 2);
        subAttrs = [];
        values = model.get(attrName);
        if (!values) {
          return [attr];
        }
        for (i = 0 ; i < values.length; i++) {
          subAttrs.push(this.__generateSubAttributes(attrName + '[' + i + ']' + remainder, model));
        }
        return subAttrs;
      }
    }

    //************** End Private methods **************//
  });

  return View;
}));

},{"./Cell":12,"./NestedCell":19,"./templateRenderer":33,"backbone":39,"backbone-torso/node_modules/jquery":36,"underscore":37}],24:[function(require,module,exports){
(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['underscore', 'jquery', '../Behavior', '../Collection', '../Events'], factory);
  } else if (typeof exports === 'object') {
    var _ = require('underscore');
    var $ = require('backbone-torso/node_modules/jquery');
    var Behavior = require('../Behavior');
    var Collection = require('../Collection');
    var Events = require('../Events');
    module.exports = factory(_, $, Behavior, Collection, Events);
  } else {
    root.Torso = root.Torso || {};
    root.Torso.behaviors = root.Torso.behaviors || {};
    root.Torso.behaviors.DataBehavior = factory(root._, root.$, root.Torso.Behavior, root.Torso.Collection, root.Torso.Events);
  }
}(this, function(_, $, Behavior, Collection, Events) {
  'use strict';

  var PROPERTY_SEPARATOR = '.';
  var CONTAINER_SEPARATOR = ':';

  var FETCHED_STATUSES = {
    SUCCESS: 'success',
    FAILURE: 'failed'
  };

  /**
   * Converts string or number values into an array with a single string or number item.
   * If the input is not a string, number, array, or info about the ids then undefined is returned.
   * This is a private helper method used internally by this behavior and is not exposed in any way.
   * @param ids {String|Number|String[]|Number[]|Object} the ids to convert.
   *   @param [ids.skipObjectRetrieval] {Boolean} set if this is a meta-info object about the ids.
   * @return {String[]|Number[]|Object} an array of strings or numbers.
   * @private
   */
  function normalizeIds(ids) {
    if (_.isArray(ids)) {
      // remove any nesting of arrays - it is assumed that the resulting ids will be simple string or number values.
      ids = _.flatten(ids);
      // remove any duplicate ids.
      return _.uniq(ids);
    } else if (_.isString(ids) || _.isNumber(ids)) {
      // individual id - convert to array for consistency.
      return [ids];
    } else if (ids && ids.skipObjectRetrieval) {
      return ids;
    }
  }

  /**
   * Converts any undefined or null values to an empty array.  All other values are left unchanged.
   * @param valueToConvert the value to check for null or undefined.
   * @return {Array|*} either the original value or [] if the valueToConvert is null or undefined.
   */
  function undefinedOrNullToEmptyArray(valueToConvert) {
    if (_.isUndefined(valueToConvert) || _.isNull(valueToConvert)) {
      valueToConvert = [];
    }
    return valueToConvert;
  }

  /**
   * Gets a nested property from an object, returning undefined if it doesn't exist on any level.
   * @param rootObject {Object} object containing the property to get.
   * @param propertyString {String} string identifying the nested object to retrieve.
   * @return {*} either undefined or the property referenced from the rootObject.
   */
  function getNestedProperty(rootObject, propertyString) {
    propertyString = propertyString.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
    propertyString = propertyString.replace(/^\./, '');           // strip a leading dot
    var propertyStringParts = propertyString.split(PROPERTY_SEPARATOR);
    return _.reduce(propertyStringParts, function(currentBaseObject, currentPropertyName) {
      return _.isUndefined(currentBaseObject) ? undefined : currentBaseObject[currentPropertyName];
    }, rootObject);
  }

  /**
   * Determines if the stringDefinition contains a container definition (i.e. has a ':' in it).
   * @param stringDefinition to test.
   * @return {boolean} true if the string definition contains a container definition, false otherwise.
   */
  function containsContainerDefinition(stringDefinition) {
    return !!stringDefinition && stringDefinition.indexOf(CONTAINER_SEPARATOR) > -1;
  }

  /**
   * Behaviors defined in Torso.
   * @module Torso.behaviors
   * @namespace Torso.behaviors
   */

  /**
   * This behavior implements simplified interaction with data sources (i.e. TorsoCollection).
   * This behavior manages re-rendering when data changes and automatically adding the returned data to the view's context.
   * This behavior also manages dependencies between data and other objects to allow intelligent re-fetching when data changes.
   *
   * See https://tonicdev.com/torso/databehavior for more in-depth documentation and details.
   *
   * @class DataBehavior
   * @method constructor
   * @author  jyoung@vecna.com
   */
  var DataBehavior = Behavior.extend({
    /**
     * The torso collection that is acting as a cache used to create the private collections.
     * This property/option is required.  Instantiation will fail if it is not set.
     * @property cache {Collection}
     */
    cache: undefined,

    /**
     * Adds a listener on the Behavior for the `fetched` event that triggers a render on the view.
     * true - A listener is added to the behavior that re-renders the view when a 'fetched' event is triggered.
     * false (default) - no listeners are added.
     * @property renderOnFetch {Boolean}
     * @default false
     */
    renderOnFetch: false,

    /**
     * Skip triggering a load of this data behavior when the view completes initializing.
     * true - no load after the view is initialized.
     * false (default) - trigger a .retrieve() on this data behavior when the view completes initialization.
     * @property skipInitialLoad {Boolean}
     * @default false
     */
    skipInitialLoad: false,

    /**
     * Determines the result of `view.getBehavior('thisBehaviorAlias').toJSON()`.
     * true - a single model result is returned.
     * false (default) - an array of model results are returned.
     * @property returnSingleResult {Boolean}
     * @default false
     */
    returnSingleResult: false,

    /**
     * Determines whether `pull()` or `fetch()` is called when using `retrieve()`.
     * true - Use fetch() by default on the private collection.
     * false (default) - Use pull() by default on the private collection.
     * True will query the server more often, but will provide more up-to-date data.
     * False will only query the server if the model hasn't already been retrieved.
     * This property will be ignored if `fetch()` or `pull()` is called directly.
     * @property alwaysFetch {Boolean}
     * @default false
     */
    alwaysFetch: false,

    /**
     * Duck-typed property that identifies the ids to use. id or ids is required (either by behavior options or as properties).
     *   - {String|Number} - the id to use directly (equivalent to an array of a single id).
     *   - {String[]|Number[]} - the ids to use directly.
     *   - {Object} - more complex configuration that identifies a model-like object that fires a change event and the
     *                property on that object to use. The object can fire the change event for the given property
     *                and have a .get('propertyName') method, or it can define the property directly on the idContainer.
     *                Only one property can be identified as supplying the id for this data model.
     *                If the identified object does not fire a change event then the id(s) will never be refreshed for this behavior.
     *                The idContainer can also fire a 'fetched:ids' event on itself to signal to this data behavior that the ids
     *                have been fetched for the first time.  Then a 'change:<propertyName>' event can be used to notify this
     *                data behavior that the property has been modified.
     *     - property {String} - the name of the property that defines the ids. The root object is assumed to be the view unless
     *                           idContainer is defined. The idContainer is the object that fires a change event for the given property name.
     *                           Uses the view or the idContainer as the root to get the identified property (i.e. 'viewState.', 'model.', etc).
     *                           Will get the property before the first '.' from the view and if it is an object will try to use a
     *                           .get('<propertyName>') on it and set a 'change:<propertyName>' listener on it.
     *                           If it is a string/number or array of string/number, then it will use that as the ids.
     *                           Triggering a 'id-container-updated' event on the behavior will cause it to stop listing to the
     *                           old idContainer and start listening to the new one defined by this property.
     *     - idContainer {Cell|Backbone.Model|Function} - object (or a function that returns an object) that fires change
     *                           events and has a .get('propertyName') function. It isn't required to fire events -
     *                           the change event is only required if it needs to re-fetch when the id property value changes.
     *     Examples:
     *       - { property: '_patientId' }
     *       - { property: 'viewState.appointmentId' }
     *       - { property: 'model.type' }
     *       - { property: 'behaviors.demographics.data.appointments' }
     *       - { property: 'id', idContainer: userService }
     *       - { property: 'username', idContainer: function() { application.getCurrentUser() } }
     *   - {Function(cache)} - expected to return the ids (either array, jquery deferred that resolves to the ids or single primitive)
     *                         to track with the private collection. Cache is passed in as the first argument so that the behavior
     *                         can be defined and the cache can be overridden later.
     *                         'this' is the behavior (from which you can get the view if needed).
     *                         What was criteria should use this instead:
     *
     *         function(cache) {
     *           var thisBehaviorInstance = this;
     *           var view = this.view;
     *           var criteria = { ... some criteria ... };
     *           return cache.fetchIdsByCriteria(criteria);
     *         }
     * @property ids {String|Number|String[]|Number[]|Object|Function}
     */
    ids: undefined,

    /**
     * cause this behavior to re-calculate its ids and refetch them from the server if the given events are triggered
     * (space separated if string, single item is equivalent to array of single item).
     *   - 'view:eventName' - arbitrary event triggered on the view (eventName can be a change:propertyName event).
     *   - 'viewState:eventName' - arbitrary event triggered on the viewState (eventName can be a change:propertyName event).
     *   - 'model:eventName' - arbitrary even triggered on the view's model (eventName can be a change:propertyName event).
     *   - 'this:eventName' - arbitrary event triggered by this behavior (eventName can be a change:propertyName event).
     *   - 'behaviorAlias:eventName' - arbitrary event triggered by another data behavior on this view (eventName can be a change:propertyName event).
     *   - 'behaviorAlias.data:eventName' - arbitrary event triggered by the data of another DataBehavior on this view (eventName can be a change:propertyName event).
     *   - { '<eventName>': < object (or function returning an object) that the event is triggered on > } - arbitrary ('<eventName>') triggered on the supplied object.
     * @property updateEvents {String|String[]|Object|Object[]}
     */
    updateEvents: undefined,

    /**
     * Object that manages interaction with the data.  Contains the privateCollection, proxies all events from the privateCollection,
     * and has get('...') and .toJSON() methods that access the private collection data.
     * @property data {Torso.behaviors.DataBehavior.Data}
     */
    data: undefined,

    /**
     * The possible fetched statuses.  This is the status value of the fetched event payload.
     * @property FETCHED_STATUSES {Object} { SUCCESS: 'SUCCESS', FAILURE: 'FAILURE' }
     */
    FETCHED_STATUSES: FETCHED_STATUSES,

    /**
     * @method constructor
     * @override
     * @param [behaviorState] {Object} the initial state of the behavior.
     * @param behaviorOptions {Object}
     *   @param behaviorOptions.cache {Collection} see cache property.
     *   @param [behaviorOptions.renderOnFetch=false] {Boolean} see renderOnFetch property.
     *   @param [behaviorOptions.skipInitialLoad=false] {Boolean} see skipInitialLoad property.
     *   @param [behaviorOptions.returnSingleResult=false] {Boolean} see returnSingleResult property.
     *   @param [behaviorOptions.alwaysFetch=false] {Boolean} see alwaysFetch property.
     *   @param [behaviorOptions.id=behaviorOptions.ids] {String|Number|String[]|Number[]|{property: String, idContainer: Object}|Function} see id property.
     *   @param [behaviorOptions.ids=behaviorOptions.id] {String|Number|String[]|Number[]|{property: String, idContainer: Object}|Function} see ids property.
     *   @param [behaviorOptions.updateEvents] {String|String[]|Object|Object[]} see updateEvents property.
     * @param [viewOptions] {Object} options passed to View's initialize
     */
    constructor: function(behaviorState, behaviorOptions, viewOptions) {
      _.bindAll(this, '__skipRetrieveOnEmptyTrackedIdsAndNewIds', '__completeLoadingIds', '__fetchSuccess', '__fetchFailed');
      behaviorOptions = behaviorOptions || {};
      behaviorOptions = _.defaults(behaviorOptions, {
        alwaysFetch: false
      });
      _.extend(this, _.pick(behaviorOptions, 'cache', 'id', 'ids', 'renderOnFetch', 'skipInitialLoad', 'returnSingleResult', 'alwaysFetch', 'updateEvents'));

      this.__validateCache();
      this.__normalizeAndValidateIds();
      this.__normalizeAndValidateUpdateEvents();

      this.cid = this.cid || _.uniqueId(this.cidPrefix);
      this.data = new this.Data({
        parentBehavior: this,
        privateCollection: this.cache.createPrivateCollection(this.cid)
      });

      Behavior.apply(this, arguments);

      this.set('loadingIds', 0);

      this.on('id-container-updated', this.listenToIdsPropertyChangeEvent);
      this.on('id-container-updated', this.retrieve);
      this.listenTo(this.view, 'initialize:complete', this.listenToIdsPropertyChangeEvent);
      this.listenTo(this.view, 'initialize:complete', this._delegateUpdateEvents);
      if (!this.skipInitialLoad) {
        this.listenTo(this.view, 'initialize:complete', this.retrieve);
      }

      // This allows 'renderOnFetch' to be changed at runtime after the constructor is executed.
      this.on('fetched', function() {
        // If a view isn't active then it shouldn't be rendering.
        // When a view is attached it is rendered anyway.
        if (this.renderOnFetch && this.view.isActive() && this.view.isAttached()) {
          this.view.render();
        }
      });
    },

    /**
     * Retrieves the ids for this data object and passes them off to the private collection to track and then does a
     * pull or a fetch based on the alwaysFetch property.  (pull is default if always fetch is true then it fetches instead).
     * @method retrieve
     * @return {$.Deferred.Promise} a jquery deferred promise that resolves to the retrieved models.
     */
    retrieve: function() {
      if (this.alwaysFetch) {
        return this.fetch();
      } else {
        return this.pull();
      }
    },

    /**
     * Retrieves the ids for this data object and passes them off to the private collection's trackAndPull() method.
     * @method pull
     * @return {$.Deferred.Promise} a jquery deferred promise that resolves to the retrieved models.
     */
    pull: function() {
      var thisDataBehavior = this;
      return this.__getIds()
        .then(this.__skipRetrieveOnEmptyTrackedIdsAndNewIds)
        .then(function(idsResult) {
          if (idsResult && !idsResult.skipObjectRetrieval) {
            return thisDataBehavior.data.privateCollection.trackAndPull(idsResult);
          }
          return idsResult;
        }, function(errorResponse) {
          errorResponse.failedOnIds = true;
          return errorResponse;
        })
        .then(this.__fetchSuccess, this.__fetchFailed);
    },

    /**
     * Retrieves the ids for this data object and passes them off to the private collection's trackAndFetch() method.
     * @method fetch
     * @return {$.Deferred.Promise} a jquery deferred promise that resolves to the retrieved models.
     */
    fetch: function() {
      var thisDataBehavior = this;
      return this.__getIds()
        .then(this.__skipRetrieveOnEmptyTrackedIdsAndNewIds)
        .then(function(idsResult) {
          if (idsResult && !idsResult.skipObjectRetrieval) {
            return thisDataBehavior.data.privateCollection.trackAndFetch(idsResult);
          }
          return idsResult;
        }, function(errorResponse) {
          errorResponse.failedOnIds = true;
          return errorResponse;
        })
        .then(this.__fetchSuccess, this.__fetchFailed);
    },

    /**
     * Adds the toJSON of the data represented by this behavior to the context.
     * @method prepare
     * @override
     */
    prepare: function() {
      var behaviorContext = Behavior.prototype.prepare.apply(this) || {};
      behaviorContext.data = this.data.toJSON();
      behaviorContext.loading = this.isLoading();
      behaviorContext.loadingIds = this.isLoadingIds();
      behaviorContext.loadingObjects = this.isLoadingObjects();
      return behaviorContext;
    },

    /**
     * Determine if the behavior is loading objects or ids.
     * @method isLoading
     * @return {Boolean} true - the behavior is currently loading objects or ids.
     *                   false - the behavior is not currently loading objects or ids.
     */
    isLoading: function() {
      return this.isLoadingIds() || this.isLoadingObjects();
    },

    /**
     * Determine if the behavior is loading ids.
     * @method isLoadingIds
     * @return {Boolean} true - the behavior is currently loading ids.
     *                   false - the behavior is not currently loading ids.
     */
    isLoadingIds: function() {
      return this.get('loadingIds') > 0;
    },

    /**
     * Determine if the behavior is loading objects.
     * @method isLoadingObjects
     * @return {Boolean} true - the behavior is currently loading objects.
     *                   false - the behavior is not currently loading objects.
     */
    isLoadingObjects: function() {
      return this.data.privateCollection.isLoading();
    },

    /**
     * Listens for the change event on the ids property and, if triggered, re-fetches the data based on the new ids.
     * @method listenToIdsPropertyChangeEvent
     */
    listenToIdsPropertyChangeEvent: function() {
      if (!_.isUndefined(this.ids.property)) {
        this.stopListeningToIdsPropertyChangeEvent();
        var idsPropertyNameAndContext = this.__parseIdsPropertyNameAndIdContainer();
        var idContainer = idsPropertyNameAndContext.idContainer;
        var canListenToEvents = idContainer && _.isFunction(idContainer.on);
        if (canListenToEvents) {
          this.__currentContextWithListener = idContainer;
          this.__currentContextEventName = 'change:' + idsPropertyNameAndContext.idsPropertyName;
          this.listenTo(this.__currentContextWithListener, this.__currentContextEventName, this.retrieve);
          this.listenTo(this.__currentContextWithListener, 'fetched:ids', this.retrieve);
        }
      }
    },

    /**
     * Removes the listener added by listenToIdsPropertyChangeEvent().
     * @method stopListeningToIdsPropertyChangeEvent
     */
    stopListeningToIdsPropertyChangeEvent: function() {
      if (this.__currentContextWithListener) {
        this.stopListening(this.__currentContextWithListener, this.__currentContextEventName, this.retrieve);
        this.stopListening(this.__currentContextWithListener, 'fetched:ids', this.retrieve);
        delete this.__currentContextWithListener;
        delete this.__currentContextEventName;
      }
    },

    /**
     * Removes existing listeners and adds new ones for all of the updateEvents configured.
     * @method _delegateUpdateEvents
     * @private
     */
    _delegateUpdateEvents: function() {
      this._undelegateUpdateEvents();
      var updateEvents = this.__parseUpdateEvents();
      _.each(updateEvents, function(parsedUpdateEvent) {
        this.listenTo(parsedUpdateEvent.idContainer, parsedUpdateEvent.eventName, this.retrieve);
      }, this);
    },

    /**
     * Removes existing event listeners.
     * @method _undelegateEvents
     * @private
     */
    _undelegateUpdateEvents: function() {
      var updateEvents = this.__parseUpdateEvents();
      _.each(updateEvents, function(parsedUpdateEvent) {
        this.stopListening(parsedUpdateEvent.idContainer, parsedUpdateEvent.eventName, this.retrieve);
      }, this);
    },

    /**
     * Parses this.updateEvents configuration.
     * @return {[{ eventName: String, idContainer: Object }]} an array of objects with the event name and idContainer included.
     * @private
     */
    __parseUpdateEvents: function() {
      this.__normalizeAndValidateUpdateEvents();
      var updateEvents = _.flatten(_.map(this.updateEvents, this.__parseUpdateEvent, this));
      return _.compact(updateEvents);
    },

    /**
     * Parses an individual event configuration.
     * Note: events defined using objects can have more than one event defined w/in the object.
     * @param updateEventConfiguration {String | Object} the configuration for an individual event configuration.
     * @return {[{ eventName: String, idContainer: Object }] | undefined} an array of objects with the event name and idContainer included.
     *                                                                If the event could not be parsed, undefined is returned.
     * @private
     */
    __parseUpdateEvent: function(updateEventConfiguration) {
      if (_.isUndefined(updateEventConfiguration)) {
        return undefined;
      }
      var parsedUpdateEvents = [];
      if (_.isString(updateEventConfiguration)) {
        var updateEvent = this.__parseStringUpdateEvent(updateEventConfiguration);
        if (!_.isUndefined(updateEvent)) {
          parsedUpdateEvents.push(updateEvent);
        }
      } else if (_.isObject(updateEventConfiguration)) {
        parsedUpdateEvents = _.map(updateEventConfiguration, function(idContainer, eventName) {
          return {
            idContainer: idContainer,
            eventName: eventName
          };
        });
      }
      return parsedUpdateEvents;
    },

    /**
     * Validates that the cache property is valid and if not throws an error describing why its not valid.
     * @method __validateCache
     * @private
     */
    __validateCache: function() {
      if (!this.cache) {
        throw new Error('Torso Data Behavior constructed without a cache');
      }
      if (!(this.cache instanceof Collection)) {
        throw new Error('Torso Data Behavior\'s cache is not of type Torso.Collection');
      }
    },

    /**
     * Validates that the ids property is valid and if not throws an error describing why its not valid.
     * A side effect of this method is copying id into the ids location (if id is set).  Ids is what is used by the rest of the code.
     * This is done as part of validation because we first validate that both are not set.
     * @method __normalizeAndValidateIds
     * @private
     */
    __normalizeAndValidateIds: function() {
      if (!_.isUndefined(this.ids) && !_.isUndefined(this.id)) {
        throw new Error('Torso Data Behavior constructed with both id and ids.  Please define only one.');
      }
      this.ids = this.id || this.ids;
      this.__validateIds();
    },

    /**
     * Validates that the ids property is valid and if not throws an error describing why its not valid.
     * A side effect of this method is copying id into the ids location (if id is set).  Ids is what is used by the rest of the code.
     * This is done as part of validation because we first validate that both are not set.
     * @method __normalizeAndValidateIds
     * @private
     */
    __validateIds: function() {
      if (_.isUndefined(this.ids)) {
        throw new Error('Torso Data Behavior constructed without a way to identify the ids for this data.  Please define either id, ids.');
      }

      var idsIsArray = _.isArray(this.ids);
      var idsIsSingleId = _.isString(this.ids) || _.isNumber(this.ids);
      var idsIsFunction = _.isFunction(this.ids);
      var idsIsObjectWithStringProperty = _.isString(this.ids.property);
      var idsIsObject = _.isObject(this.ids);
      var idsIsValid = idsIsArray || idsIsSingleId || idsIsFunction || idsIsObjectWithStringProperty;
      if (!idsIsValid && idsIsObject) {
        throw new Error('Data Behavior ids invalid definition.  It is an object, but the property field is not defined or is not a string: ' + JSON.stringify(this.ids));
      } else if (!idsIsValid) {
        throw new Error('Data Behavior ids invalid definition.  Not a string, number, object, array or function: ' + JSON.stringify(this.ids));
      }

      if (idsIsObjectWithStringProperty) {
        var propertyNameContainsIdContainer = containsContainerDefinition(this.ids.property);
        var hasIdContainerProperty = !_.isUndefined(this.ids.idContainer);

        if (hasIdContainerProperty && propertyNameContainsIdContainer) {
          throw new Error('Data Behavior ids invalid definition.  Id container defined on both ids.property and ids.idContainer: ', JSON.stringify(this.ids));
        }
      }
    },

    /**
     * Validates that the updateEvents property is valid and if not throws an error describing why its not valid.
     * @method __normalizeAndValidateUpdateEvents
     * @private
     */
    __normalizeAndValidateUpdateEvents: function() {
      var updateEventsIsArray = _.isArray(this.updateEvents);
      var updateEventsIsSingleValue = !updateEventsIsArray && (_.isObject(this.updateEvents) || _.isString(this.updateEvents));
      var updateEventsIsUndefined = _.isUndefined(this.updateEvents);
      var updateEventsIsValidType = updateEventsIsArray || updateEventsIsSingleValue || updateEventsIsUndefined;

      if (updateEventsIsSingleValue) {
        this.updateEvents = [this.updateEvents];
      }

      if (!updateEventsIsValidType) {
        throw new Error('Update events are not an array, string or object.  Please see parameters for examples of how to define updateEvents.  Configured UpdateEvents: ', this.updateEvents);
      }

      // Remove any random falsey values (mostly to get rid of undefined events).
      this.updateEvents = _.compact(this.updateEvents);
      _.each(this.updateEvents, this.__validUpdateEvent);
    },

    /**
     * Validates that the updateEventConfiguration is valid and if not throws an error describing why its not valid.
     * @method __normalizeAndValidateIds
     * @private
     */
    __validUpdateEvent: function(updateEventConfiguration) {
      var validStringConfig = _.isString(updateEventConfiguration);
      var validObjectConfig = _.isObject(updateEventConfiguration) && _.keys(updateEventConfiguration).length > 0;
      if (!validStringConfig && !validObjectConfig) {
        throw new Error('Not a valid updateEvent configuration.  Update events need to either be strings or objects with a single property: ' + JSON.stringify(updateEventConfiguration));
      }
    },

    /**
     * @method __getIds
     * @return {$.Deferred.Promise} A jquery deferred promise that resolves to the ids to track in the private collection
     *                              or rejects with the error message.
     *                              It can also return an object that prevents object retrieval ({ skipObjectRetrieval: true }).
     * @private
     */
    __getIds: function() {
      this.set('loadingIds', this.get('loadingIds') + 1);
      this.__validateIds(); // validate ids enforces a fast-fail that guarantees that one of the if statements below will work.

      var idsDeferred = $.Deferred();
      var ids = this.ids;
      var normalizedIds = normalizeIds(ids);
      if (!_.isUndefined(normalizedIds)) {
        idsDeferred.resolve(normalizedIds);
      } else if (_.isFunction(this.ids)) {
        ids = this.ids(this.cache);
        normalizedIds = normalizeIds(ids);
        if (!_.isUndefined(normalizedIds)) {
          idsDeferred.resolve(normalizedIds);
        } else if (ids && _.isFunction(ids.then)) {
          idsDeferred = ids.then(normalizeIds);
        } else {
          idsDeferred.resolve([]);
        }
      } else if (!_.isUndefined(this.ids.property)) {
        var parsedContextDefinition = this.__parseIdsPropertyNameAndIdContainer();
        var propertyName = parsedContextDefinition.idsPropertyName;
        var idContainer = parsedContextDefinition.idContainer;

        ids = getNestedProperty(idContainer, propertyName);
        var propertyOnContextIsUndefined = idContainer && _.isUndefined(ids);
        var idContainerHasGetMethod = idContainer && _.isFunction(idContainer.get);

        if (propertyOnContextIsUndefined && idContainerHasGetMethod) {
          ids = idContainer.get(propertyName);
        }
        normalizedIds = normalizeIds(ids);

        idsDeferred.resolve(normalizedIds);
      }
      return idsDeferred.promise()
        .then(undefinedOrNullToEmptyArray)
        .always(this.__completeLoadingIds);
    },

    /**
     * Sets the loading ids property to false (loading completed).
     * @method __completeLoadingIds
     * @private
     */
    __completeLoadingIds: function() {
      this.set('loadingIds', this.get('loadingIds') - 1);
    },

    /**
     * Converts the definition into the actual idContainer object and property name to retrieve off of that idContainer.
     * @method __parseIdsPropertyNameAndIdContainer
     * @return {{idsPropertyName: String, idContainer: Object}} the name of the ids property and the actual object to use as the idContainer.
     * @private
     */
    __parseIdsPropertyNameAndIdContainer: function() {
      var propertyName = this.ids.property;
      var propertyNameContainsIdContainer = containsContainerDefinition(propertyName);
      var hasIdContainerProperty = !_.isUndefined(this.ids.idContainer);

      var idContainer;
      if (hasIdContainerProperty) {
        idContainer = this.__parseIdContainer();
      }

      if (propertyNameContainsIdContainer) {
        var containerAndDetail = this.__parseContainerDetailString(propertyName);
        propertyName = containerAndDetail.detail;
        idContainer = containerAndDetail.idContainer;
      }

      if (_.isUndefined(idContainer)) {
        idContainer = this.view;
      }

      return {
        idsPropertyName: propertyName,
        idContainer: idContainer
      };
    },

    /**
     * Parses the idContainer property of ids.
     * @return {Object} the idContainer object to apply the properties value to (may not be the final idContainer depending on the property definition).
     * @private
     */
    __parseIdContainer: function() {
      var idContainerDefinition = this.ids.idContainer;
      var idContainer;
      if (_.isUndefined(idContainerDefinition)) {
        idContainer = undefined;
      } else if (_.isFunction(idContainerDefinition)) {
        var idContainerFxn = _.bind(idContainerDefinition, this);
        idContainer = idContainerFxn();
      } else if (_.isObject(idContainerDefinition)) {
        idContainer = idContainerDefinition;
      } else {
        throw new Error('Invalid idContainer.  Not an object or function: ' + JSON.stringify(this.ids));
      }
      return idContainer;
    },

    /**
     * Parses a string that contains a container and details for that container (event name or property name).
     * Strings are expected to be of the form '<some container path>:<detail>'.
     * @param fullContainerAndDetail
     * @return {{detail: String, idContainer: *}} the idContainer is the actual object containing the ids.
     *         details is the rest of the idContainer string without the idContainer definition.
     * @private
     */
    __parseContainerDetailString: function(fullContainerAndDetail) {
      var containerString = '';
      if (containsContainerDefinition(fullContainerAndDetail)) {
        containerString = fullContainerAndDetail.split(CONTAINER_SEPARATOR, 1)[0];
      }
      var containerStringParts = containerString.split(PROPERTY_SEPARATOR);

      var rootContainerString = containerStringParts[0];
      var rootContainer;
      if (rootContainerString === 'this') {
        rootContainer = this;
      } else if (rootContainerString === 'behaviors' || rootContainerString === 'behavior') {
        var behaviorAlias = containerStringParts[1];
        rootContainerString += PROPERTY_SEPARATOR + behaviorAlias; // property track what part of the string has been consumed.
        rootContainer = this.view.getBehavior(behaviorAlias);
      } else {
        if (rootContainerString !== 'view') {
          rootContainerString = ''; // property track what part of the string has been consumed.
        }
        rootContainer = this.view;
      }

      var container = rootContainer;
      var rootContainerPropertyString = containerString.replace(rootContainerString, '');
      if (rootContainerPropertyString) {
        // remove leading .
        if (rootContainerPropertyString[0] === PROPERTY_SEPARATOR) {
          rootContainerPropertyString = rootContainerPropertyString.slice(1);
        }
        container = getNestedProperty(rootContainer, rootContainerPropertyString);
      }

      var detail = fullContainerAndDetail.replace(containerString + CONTAINER_SEPARATOR, '');
      return {
        detail: detail,
        idContainer: container
      };
    },

    /**
     * Parse a string type update event.
     * Context Key (first part of the string up to the first ':') can be one of the following:
     *   this (maps to the behavior),
     *   view or empty (maps to the behavior's view),
     *   viewState (maps to the behavior's view's viewState),
     *   model (maps to the behavior's view's model),
     *   <*> any others are assumed to be the names of behaviors on this behavior's view.
     * @param updateEventConfiguration {String} a string representation of the event.
     * @return {{eventName: String, idContainer: Backbone.Events}} the parsed configuration with the event name and idContainer object.
     * @private
     */
    __parseStringUpdateEvent: function(updateEventConfiguration) {
      var parsedIdContainerDetails = this.__parseContainerDetailString(updateEventConfiguration);
      if (parsedIdContainerDetails) {
        return {
          idContainer: parsedIdContainerDetails.idContainer,
          eventName: parsedIdContainerDetails.detail
        };
      }
    },

    /**
     * Triggers a 'fetched' event with the payload { status: 'success' } when the fetch completes successfully.
     * @method __fetchSuccess
     * @param response {Object} the response from the server.
     *   @param [response.skipObjectRetrieval=false] {Boolean} if we retrieved objects, then trigger fetch event.
     *   @param [response.forceFetchedEvent=false] {Boolean} if true then trigger fetch no matter what.
     * @private
     */
    __fetchSuccess: function(response) {
      this.set('fetchSuccess', true);
      if (this.__shouldTriggerFetchedEvent(response)) {
        this.trigger('fetched', {
          status: FETCHED_STATUSES.SUCCESS,
          response: response
        });
        this.data.trigger('fetched', {
          status: FETCHED_STATUSES.SUCCESS,
          response: response
        });
      }
      this.trigger('fetched:ids');
      this.data.trigger('fetched:ids');
      return response;
    },

    /**
     * Triggers a 'fetched' event with the payload { status: 'failed' } when the fetch fails.
     * @method __fetchFailed
     * @param response {Object} the response from the server.
     *   @param [response.skipObjectRetrieval=false] {Boolean} if we retrieved objects, then trigger fetch event.
     *   @param [response.forceFetchedEvent=false] {Boolean} if true then trigger fetch no matter what.
     * @private
     */
    __fetchFailed: function(response) {
      this.set('fetchSuccess', false);
      if (this.__shouldTriggerFetchedEvent(response)) {
        this.trigger('fetched', {
          status: FETCHED_STATUSES.FAILURE,
          response: response
        });
        this.data.trigger('fetched', {
          status: FETCHED_STATUSES.FAILURE,
          response: response
        });
        if (response.emptyIds) {
          this.__firstEmptyFetchedTriggered = true;
        }
      }
      this.trigger('fetched:ids');
      this.data.trigger('fetched:ids');
      return response;
    },

    /**
     * Determines if the 'fetched' event should be triggered in the __fetchFailed or __fetchSuccess methods.
     * @param response {Object} to use to determine if the fetched event should be triggered.
     *   @param [response.skipObjectRetrieval=false] {Boolean} if we retrieved objects, then trigger fetch event.
     *   @param [response.forceFetchedEvent=false] {Boolean} if true then trigger fetch no matter what.
     * @return {Boolean} true if the fetched event should be triggered, false otherwise.
     * @private
     */
    __shouldTriggerFetchedEvent: function(response) {
      return !response || !response.skipObjectRetrieval || response.forceFetchedEvent;
    },

    /**
     * Skip retrieving objects if new ids list is empty and existing ids list is empty.
     * @method __skipRetrieveOnEmptyTrackedIdsAndNewIds
     * @param idsResult {Array|Object}
     * @return {Array|Object} either the original idsResult
     *                        or { skipObjectRetrieval: true, forceFetchedEvent: true } if both the ids retrieved
     *                        and the current ids are empty.
     * @private
     */
    __skipRetrieveOnEmptyTrackedIdsAndNewIds: function(idsResult) {
      if (_.isEmpty(idsResult) && _.isEmpty(this.data.privateCollection.getTrackedIds())) {
        return { skipObjectRetrieval: true, forceFetchedEvent: true };
      } else {
        return idsResult;
      }
    },

    /**
     * Adds listeners when the view is activated.
     * @method _activate
     * @private
     */
    _activate: function() {
      this.listenToIdsPropertyChangeEvent();
      this._delegateUpdateEvents();
      this.data.activate();
    },

    /**
     * Stops listening when the view is deactivated.
     * @method _deactivate
     * @private
     */
    _deactivate: function() {
      this.stopListeningToIdsPropertyChangeEvent();
      this._undelegateUpdateEvents();
      this.data.deactivate();
    },

    /**
     * Default dispose stuff because its not already on behavior.  See https://github.com/vecnatechnologies/backbone-torso/issues/295
     * @method _dispose
     * @private
     */
    _dispose: function() {
      this.data.dispose();

      this.off();
      this.stopListening();
    }
  });

  /**
   * @module Torso.behaviors.DataBehavior
   * @namespace Torso.behaviors.DataBehavior
   */

  /**
   * Data object used to create the .data property of the DataBehavior.
   * @class Data
   * @constructor
   */
  var Data = function(options) {
    this.initialize(options);
  };

  _.extend(Data.prototype, Events, {
    /**
     * Instantiates the data objects and binds it to this behavior instance.
     * @param options {Object} to pass to the initialize methods.
     *   @param options.parentBehavior {DataBehavior} the data behavior instance that this Data object should be bound to.
     *   @param options.privateCollection {Collection} the private collection that this data represents.
     */
    initialize: function(options) {
      /**
       * The dataBehavior instance that owns this data object.
       * @property parentBehavior {DataBehavior}
       */
      this.parentBehavior = options.parentBehavior;
      /**
       * The private collection that this data object manages.
       * @property privateCollection {Collection}
       */
      this.privateCollection = options.privateCollection;
    },

    /**
     * Determine if behavior is loading ids or objects.
     * @method isLoading
     * @return {Boolean} true - the behavior is loading objects or ids.
     *                   false - the behavior is not loading objects or ids.
     */
    isLoading: function() {
      return this.parentBehavior.isLoading();
    },

    /**
     * Determine if the behavior is loading ids.
     * @method isLoadingIds
     * @return {Boolean} true - the behavior is currently loading ids.
     *                   false - the behavior is not currently loading ids.
     */
    isLoadingIds: function() {
      return this.parentBehavior.isLoadingIds();
    },

    /**
     * Determine if the behavior is loading objects.
     * @method isLoadingObjects
     * @return {Boolean} true - the behavior is currently loading objects.
     *                   false - the behavior is not currently loading objects.
     */
    isLoadingObjects: function() {
      return this.parentBehavior.isLoadingObjects();
    },

    /**
     * Get the full data object contents.  Either an array if returnSingleResult is false or a single object if it is true.
     * @method toJSON
     * @return {Object|Object[]} containing the full contents of either the collection or model.
     */
    toJSON: function() {
      var privateCollection = this.privateCollection;
      if (!this.parentBehavior.returnSingleResult) {
        return privateCollection.toJSON();
      }

      if (privateCollection.length === 0) {
        return undefined;
      } else if (privateCollection.length === 1) {
        var singleResultModel = privateCollection.at(0);
        return singleResultModel.toJSON();
      } else {
        throw new Error('Multiple results found, but single result expected: ' + JSON.stringify(privateCollection.toJSON()));
      }
    },

    /**
     * Get the full data object contents (either an array of model attributes or a single model attribute based on the
     * value of propertyName) or the value of a specific property if a single result is expected.
     *
     * If returnSingleResult is true then this will return the given property from the model (if that model exists).
     * If returnSingleResult is false then this will return an array containing that property from all of the retrieved models.
     * @method get
     * @param [propertyName] {String} the property to get from the model(s).
     * @return {Object|Object[]} containing the full contents of either the collection or model.
     */
    get: function(propertyName) {
      var privateCollection = this.privateCollection;
      if (!this.parentBehavior.returnSingleResult) {
        if (_.isString(propertyName)) {
          return privateCollection.pluck(propertyName);
        } else {
          return privateCollection.toJSON();
        }
      }

      var singleResultModel = this.getModel();
      if (singleResultModel) {
        if (_.isString(propertyName)) {
          return singleResultModel.get(propertyName);
        }
        return singleResultModel.toJSON();
      }
    },

    /**
     * @method getModel
     * @param modelId {Number|String} The id of the model to get from the collection.
     * @return {Backbone.Model} either the model with the given id or the only model on this behavior (if model id is undefined).
     * @throws an error if there are more than 1 result or the configuration of the behavior specifies returnSingleResult === false.
     */
    getModel: function(modelId) {
      var privateCollection = this.privateCollection;
      if (!this.parentBehavior.returnSingleResult && _.isUndefined(modelId)) {
        throw new Error('data.getModel() of a DataBehavior is only valid if the behavior is set to returnSingleResult === true');
      }

      if (!_.isUndefined(modelId)) {
        return privateCollection.get(modelId);
      }

      if (privateCollection.length === 0) {
        return undefined;
      } else if (privateCollection.length === 1) {
        return privateCollection.at(0);
      } else {
        throw new Error('Multiple results found, but single result expected: ' + JSON.stringify(privateCollection.toJSON()));
      }
    },

    /**
     * @method getModels
     * @return {Backbone.Model[]} new array containing all the models in the data's private collection.
     */
    getModels: function() {
      return this.privateCollection.models.slice(0);
    },

    /**
     * Adds the listeners to the private collection.
     * @method activate
     */
    activate: function() {
      this.listenTo(this.privateCollection, 'all', this.trigger);
    },

    /**
     * Removes the listeners on the private collection.
     * @method deactivate
     */
    deactivate: function() {
      this.stopListening(this.privateCollection, 'all', this.trigger);
    },

    /**
     * Dispose of the data events.
     */
    dispose: function() {
      this.off();
      this.stopListening();
    }
  });

  DataBehavior.prototype.Data = Data;
  DataBehavior.FETCHED_STATUSES = FETCHED_STATUSES;

  return DataBehavior;
}));

},{"../Behavior":11,"../Collection":13,"../Events":14,"backbone-torso/node_modules/jquery":36,"underscore":37}],25:[function(require,module,exports){
(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['backbone', 'jquery'], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory(require('backbone'), require('backbone-torso/node_modules/jquery'));
  } else {
    factory(root.Backbone, root.$);
  }
}(this, function(Backbone, $) {
  'use strict';
  Backbone.$ = $;
  return true;
}));
},{"backbone":39,"backbone-torso/node_modules/jquery":36}],26:[function(require,module,exports){
(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    root.Torso = root.Torso || {};
    root.Torso.Utils = root.Torso.Utils || {};
    root.Torso.Utils.handlebarsUtils = factory();
  }
}(this, function() {
  'use strict';

  return function(Handlebars) {

    /**
     * Extensions to handlebars helpers.
     *
     * @module    Torso
     * @namespace Torso.Utils
     * @class     handlebarsUtils
     * @static
     * @author ariel.wexler@vecna.com, kent.willis@vecna.com
     */
    var FEEDBACK_KEY = 'feedback',
        MODEL_KEY = 'model';

    /**
     * Usage: {{labelFor 'fieldName' value="suffix"}}
     * Generates: for="field-name-suffix"
     * @method Handlebars.helpers.labelFor
     * @param field {String} The field name to convert to a compliant "for" attribute
     * @param options {<Handlebars context>} Always passed in as final argument
     * @param [option.hash.value] {String} The value tacked on to the end of the field string (useful for radio and checkbox)
     * @return {String} Compliant HTML generating the "for" attribute
     */
    Handlebars.registerHelper('labelFor', function(field, options) {
      return Handlebars.helpers.formAttr(field, 'for', options);
    });

    /**
     * Usage: {{bindModel 'fieldName' value='suffix'}}
     * Generates: id="field-name-suffix" name="field-name-suffix" data-model="fieldName" data-feedback="firstName"
     * @method Handlebars.helpers.bindModel
     * @param field {String} The field name to convert to compliant id, name, data-model, and data-feedback attributes
     * @param options {<Handlebars context>} Always passed in as final argument
     * @param [options.hash.value] {String} The value tacked on to the end of the field string (useful for radio and checkbox)
     * @return {String} Compliant HTML generating the id, name, data-model, and data-feedback attributes
     */
    Handlebars.registerHelper('bindModel', function(field, options) {
      return Handlebars.helpers.formAttr(field, MODEL_KEY + ', ' + FEEDBACK_KEY + ', name, id', options);
    });

    /**
     * Usage: {{feedback 'fieldName'}}
     * Generates: data-feedback="firstName"
     * @method Handlebars.helpers.feedback
     * @param field {String} The field name to convert to a compliant data-feedback attribute
     * @param options {<Handlebars context>} Always passed in as final argument
     * @return {String} Compliant HTML generating the data-feedback attribute
     */
    Handlebars.registerHelper('feedback', function(field, options) {
      return Handlebars.helpers.formAttr(field, FEEDBACK_KEY, options);
    });

    /**
     * Usage: {{formAttr 'fieldName[x].sub' 'id, for' value='demo' x=123}}
     * Generates: id="first-name-123_sub-demo" for="first-name-123_sub" value="demo"
     * @method Handlebars.helpers.formAttr
     * @param field {String} The field name to convert to a compliant data-feedback attribute
     * @param options {<Handlebars context>} Always passed in as final argument
     * @param [options.hash.value] {String} The value tacked on to the end of the field string (useful for radio and checkbox)
     * @return {String} Compliant HTML generating the data-feedback attribute
     */
    Handlebars.registerHelper('formAttr', function(field, attrs, options) {
      var i, attrName,
        value = (options.hash ? options.hash.value : undefined),
        res = Handlebars.helpers.injectFieldIndices(field, options.hash),
        attributes = '';
      attrs = attrs.split(',');
      for (i = 0; i < attrs.length; i++) {
        attrName = attrs[i].trim();
        if (attrName === FEEDBACK_KEY) {
          attributes += 'data-feedback="' + res + '" ';
        } else if (attrName === MODEL_KEY) {
          attributes += 'data-model="' + res + '" ';
        } else if (attrName === 'name') {
          attributes += 'name="' + Handlebars.helpers.dasherize(res) + '" ';
        } else if (attrName === 'id') {
          attributes += 'id="' + Handlebars.helpers.dasherize(res);
          if (value !== undefined) {
            attributes += '-' + value;
          }
          attributes += '" ';
        } else if (attrName === 'for') {
          attributes += 'for="' + Handlebars.helpers.dasherize(res);
          if (value !== undefined) {
            attributes += '-' + value;
          }
          attributes += '" ';
        }
      }
      if (value !== undefined) {
        attributes += 'value="' + value +'"';
      }
      return new Handlebars.SafeString(attributes);
    });

    /**
     * @method Handlebars.helpers.dasherize
     * @param str {String} The input string to make HTML compliant (convert to dashes)
     * @return {String} HTML complicant / dasherized string
     */
    Handlebars.registerHelper('dasherize', function(str) {
      var camelCaseRemoved, dotsRemoved, bracesRemoved;
      camelCaseRemoved = str.replace(/([A-Z])/g, function(rep) {
        return '-' + rep.toLowerCase();
      });
      dotsRemoved = camelCaseRemoved.replace(/\./g, function() {
        return '_';
      });
      bracesRemoved = dotsRemoved.replace(/\[[0-9]+\]/g, function(rep) {
        return '-' + rep.substring(1, rep.length - 1);
      });
      return bracesRemoved;
    });

    /**
     * Usage: injectFieldIndices('test[x]-thisIsRegular-y', {x: 123, y: 456});
     * Generates: 'test[123]-thisIsRegular-y'
     * @method injectFieldIndices
     * @param field {String} The field name
     * @param indexMap {Object} A map of variables
     * @return {String} the field string with array variables substituted
     */
    Handlebars.registerHelper('injectFieldIndices', function(field, indexMap) {
      if (indexMap) {
        return field.replace(/\[.+?\]/g, function(m) {
          var newIndex = indexMap[m.substring(1, m.length - 1)];
          return '[' + (newIndex === undefined ? '' : newIndex) + ']';
        });
      } else {
        return field;
      }
    });
  };
}));

},{}],27:[function(require,module,exports){
(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['backbone'], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory(require('backbone'));
  } else {
    root.Torso = root.Torso || {};
    root.Torso.history = factory(root.Backbone);
  }
}(this, function(Backbone) {
  'use strict';

  /**
   * Backbone's history object.
   * @module    Torso
   * @class     history
   * @constructor
   * @author kent.willis@vecna.com
   */
  return Backbone.history;
}));

},{"backbone":39}],28:[function(require,module,exports){
(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['underscore', 'jquery'], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory(require('underscore'), require('backbone-torso/node_modules/jquery'));
  } else {
    root.Torso = root.Torso || {};
    root.Torso.Mixins = root.Torso.Mixins || {};
    root.Torso.Mixins.cache = factory(root._, (root.jQuery || root.Zepto || root.ender || root.$));
  }
}(this, function(_, $) {
  /**
   * Custom additions to the Backbone Collection object.
   * - safe disposal methods for memory + event management
   * - special functional overrides to support ID registration for different views
   *
   * @module    Torso
   * @namespace Torso.Mixins
   * @class  cacheMixin
   * @author ariel.wexler@vecna.com, kent.willis@vecna.com
   */
  var mixin = function(base) {

    var cacheMixin, createRequesterCollectionClass;

    /**
     * Returns a new class of collection that inherits from the parent but not the cacheMixin
     * and adds a requesterMixin that connects this cache to it's parent
     *
     * @method createRequesterCollectionClass
     * @param parent {Backbone Collection instance} the parent of the private collection
     * @param guid {String} the unique code of the owner of this private collection
     */
    createRequesterCollectionClass = function(parent, guid) {
      return parent.constructor.extend((function(parentClass, parentInstance, ownerKey) {

        /**
         * A mixin that overrides base collection methods meant for cache's and tailors them
         * to a requester.
         * @method requesterMixin
         */
        var requesterMixin = {

          /**
           * @method requesterMixin.getTrackedIds
           * @return {Array} array of ids that this collection is tracking
           */
          getTrackedIds: function() {
            return this.trackedIds;
          },

          /**
           * Will force the cache to fetch just the registered ids of this collection
           * @method requesterMixin.fetch
           * @param [options] - argument options
           * @param [options.idsToFetch=collectionTrackedIds] {Array} - A list of request Ids, will default to current tracked ids
           * @param [options.setOptions] {Object} - if a set is made, then the setOptions will be passed into the set method
           * @return {Promise} promise that will resolve when the fetch is complete
           */
          fetch: function(options) {
            options = options || {};
            options.idsToFetch = options.idsToFetch || this.trackedIds;
            options.setOptions = options.setOptions || {remove: false};
            return this.__loadWrapper(function() {
              if (options.idsToFetch && options.idsToFetch.length) {
                return parentInstance.fetchByIds(options);
              } else {
                return $.Deferred().resolve().promise();
              }
            });
          },

          /**
           * Will force the cache to fetch a subset of this collection's tracked ids
           * @method requesterMixin.fetchByIds
           * @param ids {Array} array of model ids
           * @param [options] {Object} if given, will pass the options argument to this.fetch. Note, will not affect options.idsToFetch
           * @return {Promise} promise that will resolve when the fetch is complete
           */
          fetchByIds: function(ids, options) {
            options = options || {};
            options.idsToFetch = _.intersection(ids, this.getTrackedIds());
            return this.fetch(options);
          },

          /**
           * Pass a list of ids to begin tracking. This will reset any previous list of ids being tracked.
           * Overrides the Id registration system to route via the parent collection
           * @method requesterMixin.trackIds
           * @param ids The list of ids that this collection wants to track
           */
          trackIds: function(ids) {
            this.remove(_.difference(this.trackedIds, ids));
            parentInstance.registerIds(ids, ownerKey);
            this.trackedIds = ids;
          },

          /**
           * Adds a new model to the requester collection and tracks the model.id
           * @method requesterMixin.addModelAndTrack
           * @param model {Backbone Model} the model to be added
           */
          addModelAndTrack: function(model) {
            this.add(model);
            parentInstance.add(model);
            this.trackNewId(model.id);
          },

          /**
           * Tracks a new id
           * @method requesterMixin.trackNewId
           * @param id {String or Number} the id attribute of the model
           */
          trackNewId: function(id) {
            this.trackIds(this.getTrackedIds().concat(id));
          },

          /**
           * Will begin tracking the new ids and then ask the cache to fetch them
           * This will reset any previous list of ids being tracked.
           * @method requesterMixin.trackAndFetch
           * @return the promise of the fetch by ids
           */
          trackAndFetch: function(newIds) {
            this.trackIds(newIds);
            return this.fetch();
          },

          /**
           * Will force the cache to fetch any of this collection's tracked models that are not in the cache
           * while not fetching models that are already in the cache. Useful when you want the effeciency of
           * pulling models from the cache and don't need all the models to be up-to-date.
           *
           * If the ids being fetched are already being fetched by the cache, then they will not be re-fetched.
           *
           * The resulting promise is resolved when ALL items in the process of being fetched have completed.
           * The promise will resolve to a unified data property that is a combination of the completion of all of the fetches.
           *
           * @method requesterMixin.pull
           * @param [options] {Object} if given, will pass the options argument to this.fetch. Note, will not affect options.idsToFetch
           * @return {Promise} promise that will resolve when the fetch is complete with all of the data that was fetched from the server.
           *                   Will only resolve once all ids have attempted to be fetched from the server.
           */
          pull: function(options) {
            options = options || {};

            //find ids that we don't have in cache and aren't already in the process of being fetched.
            var idsNotInCache = _.difference(this.getTrackedIds(), _.pluck(parentInstance.models, 'id'));
            var idsWithPromises = _.pick(parentInstance.idPromises, idsNotInCache);

            // Determine which ids are already being fetched and the associated promises for those ids.
            options.idsToFetch = _.difference(idsNotInCache, _.uniq(_.flatten(_.keys(idsWithPromises))));
            var thisFetchPromise = this.fetch(options);

            // Return a promise that resolves when all ids are fetched (including pending ids).
            var allPromisesToWaitFor = _.flatten(_.values(idsWithPromises));
            allPromisesToWaitFor.push(thisFetchPromise);
            var allUniquePromisesToWaitFor = _.uniq(allPromisesToWaitFor);
            return $.when.apply($, allUniquePromisesToWaitFor)
              // Make it look like the multiple promises was performed by a single request.
              .then(function() {
                // collects the parts of each ajax call into arrays: result = { [data1, data2, ...], [textStatus1, textStatus2, ...], [jqXHR1, jqXHR2, ...] };
                var result = _.zip(arguments);
                // Flatten the data so it looks like the result of a single request.
                var resultData = result[0];
                var flattenedResultData = _.flatten(resultData);
                return flattenedResultData;
              });
          },

          /**
           * Will register the new ids and then pull in any models not stored in the cache. See this.pull() for
           * the difference between pull and fetch.
           * @method requesterMixin.trackAndPull
           * @return the promise of the fetch by ids
           */
          trackAndPull: function(newIds) {
            this.trackIds(newIds);
            return this.pull();
          },

          /**
           * Handles the disposing of this collection as it relates to a requester collection.
           * @method requesterMixin.requesterDispose
           */
          requesterDispose: function() {
            parentInstance.removeRequester(ownerKey);
          }
        };

        return requesterMixin;
      })(parent.constructor.__super__, parent, guid));
    };

    /**
     * Adds functions to manage state of requesters
     * @method cacheMixin
     * @param collection {Collection} the collection to add this mixin
     */
    cacheMixin = function(collection) {

      //************* PRIVATE METHODS ************//

      /**
       * @private
       * @method cacheMixin.setRequestedIds
       * @param guid {String} the global unique identifier for the requester
       * @param array {Array} the array of ids the requester wants
       */
      var setRequestedIds = function(guid, array) {
        collection.requestMap[guid] = {
          array: array,
          dict: _.object(_.map(array, function(id) { return [id, id]; }))
        };
      };

      //*********** PUBLIC METHODS ************//

      /**
       * @method cacheMixin.getRequesterIds
       * @param {String} the global unique id of the requester
       * @return {Array} an array of the ids the requester with the guid has requested
       */
      collection.getRequesterIds = function(guid) {
        return this.requestMap[guid] && this.requestMap[guid].array;
      };

      /**
       * @method cacheMixin.getRequesterIdsAsDictionary
       * This method is used for quick look up of a certain id within the list of requested ids
       * @param guid {String} the global unique id of the requester
       * @return {Object} an dictionary of id -> id of the requester ids for a given requester.
       */
      collection.getRequesterIdsAsDictionary = function(guid) {
        return this.requestMap[guid] && this.requestMap[guid].dict;
      };

      /**
       * @method cacheMixin.removeRequester
       * Removes a requester from this cache. No longer receives updates
       * @param guid {String} the global unique id of the requester
       */
      collection.removeRequester = function(guid) {
        delete this.requestMap[guid];
        delete this.knownPrivateCollections[guid];
      };

      /**
       * NOTE: this methods returns only the guids for requester collections that are currently tracking ids
       * TODO: should this return just the knownPrivateCollections
       * @method cacheMixin.getRequesters
       * @return {Array} an array of the all requesters in the form of their GUID's
       */
      collection.getRequesters = function()  {
        return _.keys(this.requestMap);
      };

      /**
       * Return the list of Ids requested by this collection
       * @method cacheMixin.getAllRequestedIds
       * @return {Array} the corresponding requested Ids
       */
      collection.getAllRequestedIds = function() {
        return this.collectionTrackedIds;
      };

      /**
       * Used to return a collection of desired models given the requester object.
       * Binds a custom "resized" event to the private collections.
       * Overrides the fetch method to call the parent collection's fetchByIds method.
       * Overrides the registerIds method to redirect to its parent collection.
       * @method cacheMixin.createPrivateCollection
       * @param guid {String} Identifier for the requesting view
       * @return {Collection} an new empty collection of the same type as "this"
       */
      collection.createPrivateCollection = function(guid, args) {
        args = args || {};
        args.isRequester = true;
        args.parentInstance = collection;
        var RequesterClass = createRequesterCollectionClass(collection, guid);
        this.knownPrivateCollections[guid] = new RequesterClass(null, args);
        return this.knownPrivateCollections[guid];
      };

      /**
       * Registers a list of Ids that a particular object cares about and pushes
       * any cached models its way.
       *
       * This method intelligently updates the "_requestedIds" field to contain all unique
       * requests for Ids to be fetched.  Furthermore, the "polledFetch" method
       * is overriden such that it no longer routes through Backbone's fetch all,
       * but rather a custom "fetchByIds" method.
       * @method cacheMixin.registerIds
       * @param newIds {Array}  - New ids to register under the requester
       * @param guid {String}   - The GUID of the object that wants the ids
       */
      collection.registerIds = function(newIds, guid) {
        var i, newIdx, model, requesterIdx, storedIds,
            requesters, requesterLength, privateCollection,
            models = [],
            distinctIds = {},
            result = [];

        // Save the new requests in the map
        setRequestedIds(guid, newIds);
        requesters = collection.getRequesters();
        requesterLength = requesters.length;

        // Collect all cached models
        for (newIdx = 0; newIdx < newIds.length; newIdx++) {
          model = collection.get(newIds[newIdx]);
          if (model) {
            models.push(model);
          }
        }

        // Push cached models to the respective requester
        privateCollection = collection.knownPrivateCollections[guid];
        privateCollection.set(models, {remove: false});

        // Create a new request list
        for (requesterIdx = 0; requesterIdx < requesterLength; requesterIdx++) {
          storedIds = this.getRequesterIds(requesters[requesterIdx]);
          if (!_.isUndefined(storedIds)) {
            for (i = 0; i < storedIds.length; i++) {
              distinctIds[storedIds[i]] = true;
            }
          }
        }

        // Convert the hash table of unique Ids to a list
        for (i in distinctIds) {
          result.push(i);
        }
        this.collectionTrackedIds = result;

        // Overrides the polling mixin's fetch method
        this.polledFetch = function() {
          collection.fetchByIds({
            setOptions: {remove: true}
          });
        };
      };

      /**
       * Overrides the base fetch call if this.fetchUsingTrackedIds is true
       * Calling fetch from the cache will fetch the tracked ids if fetchUsingTrackedIds is set to true, otherwise
       * it will pass through to the default fetch.
       * @method fetch
       */
      collection.fetch = function(options) {
        options = options || {};
        if (this.fetchUsingTrackedIds) {
          return this.fetchByIds({
            setOptions: _.extend({remove: true}, options)
          });
        } else {
          return base.prototype.fetch.call(this, options);
        }
      };

      /**
       * A custom fetch operation to only fetch the requested Ids.
       * @method cacheMixin.fetchByIds
       * @param [options] - argument options
       * @param [options.idsToFetch=collection.collectionTrackedIds] {Array} - A list of request Ids, will default to current tracked ids
       * @param [options.setOptions] {Object} - if a set is made, then the setOptions will be passed into the set method
       * @return {Promise} the promise of the fetch
       */
      collection.fetchByIds = function(options) {
        options = options || {};
        // Fires a method from the loadingMixin that wraps the fetch with events that happen before and after
        var requestedIds = options.idsToFetch || collection.collectionTrackedIds;
        var fetchComplete = false;
        var fetchPromise = this.__loadWrapper(function(options) {
          var contentType = options.fetchContentType || collection.fetchContentType;
          var ajaxOpts = {
              type: collection.fetchHttpAction,
              url: _.result(collection, 'url') + collection.getByIdsUrl,
              data: {ids: requestedIds.join(',')}
            };
          if (contentType || (ajaxOpts.type && ajaxOpts.type.toUpperCase() != 'GET')) {
            ajaxOpts.contentType = contentType || 'application/json; charset=utf-8';
            ajaxOpts.data = JSON.stringify(requestedIds);
          }
          return $.ajax(ajaxOpts)
            .done(function(data) {
              var i, requesterIdx, requesterIdsAsDict, models, privateCollection,
                  requesterLength, requesters, model,
                  requestedIdsLength = requestedIds.length,
                  setOptions = options.setOptions;
              collection.set(collection.parse(data), setOptions);
              // Set respective collection's models for requested ids only.
              requesters = collection.getRequesters();
              requesterLength = requesters.length;
              // For each requester...
              for (requesterIdx = 0; requesterIdx < requesterLength; requesterIdx++) {
                requesterIdsAsDict = collection.getRequesterIdsAsDictionary(requesters[requesterIdx]);
                models = [];
                // ... now let's iterate over the ids that were fetched ...
                for (i = 0; i < requestedIdsLength; i++) {
                  //if the id that the requester cares about matches that model whose id was just fetched...
                  if (requesterIdsAsDict[requestedIds[i]]) {
                    model = collection.get(requestedIds[i]);
                    // if the model was removed, no worries, the parent won't attempt to update the child on that one.
                    if (model) {
                      models.push(model);
                    }
                  }
                }
                privateCollection = collection.knownPrivateCollections[requesters[requesterIdx]];
                // a fetch by the parent will not remove a model in a requester collection that wasn't fetched with this call
                privateCollection.set(models, {remove: false});
              }
            });
        }, options)
          .always(function() {
            // This happens once the promise is resolved, and removes the pending promise for that id.

            // Track that the fetch was completed so we don't add a dead promise (since this is what cleans up completed promises).
            fetchComplete = true;

            // Note that an id may have multiple promises (if fetch was called multiple times and then a pull with the same id).
            // We want to wait for all of them to complete, this tracks them separately and removes the in-flight promises once they are done.
            _.each(requestedIds, function(requestedId) {
              if (collection.idPromises) {
                var existingPromisesForId = collection.idPromises[requestedId];
                var remainingPromisesForId = _.without(existingPromisesForId, fetchPromise);
                if (_.isEmpty(remainingPromisesForId)) {
                  delete collection.idPromises[requestedId];
                } else {
                  collection.idPromises[requestedId] = remainingPromisesForId;
                }
              }
            });
          });

        // Track the promises associated with each id so we know when that id has completed fetching.
        // Multiple simultaneous pulls will generate multiple promises for a shared id.
        // Pulls will not generate new promises for the given ids (if there are ids being fetched
        if (!fetchComplete) { // fixes the sync case (mainly during tests when mockjax is used).
          _.each(requestedIds, function(requestedId) {
            var existingPromises = collection.idPromises[requestedId];
            if (!existingPromises) {
              existingPromises = [];
              collection.idPromises[requestedId] = existingPromises;
            }

            existingPromises.push(fetchPromise);
          });
        }

        return fetchPromise;
      };
    };

    return {
      /**
       * The constructor constructor / initialize method for collections.
       * Allocate new memory for the local references if they
       * were null when this method was called.
       * @param [options] {Object} - optional options object
       * @param   [options.fetchHttpAction='POST'] {String} http action used to get objects by ids
       * @param   [options.getByIdsUrl='/ids'] {String} path appended to collection.url to get objects by a list of ids
       * @param   [options.fetchUsingTrackedIds=true] {Boolean} if set to false, cache.fetch() will not pass to fetchByIds with current tracked ids
                                                               but will rather call the default fetch method.
       * @method constructor
       */
      constructor: function(models, options) {
        options = options || {};
        base.call(this, models, options);
        this.isRequester = options.isRequester;
        this.parentInstance = options.parentInstance;
        if (!this.isRequester) {
          this.requestMap = {};
          this.collectionTrackedIds = [];
          this.knownPrivateCollections = {};
          this.idPromises = {};
          var cacheDefaults = _.defaults(
            _.pick(options, 'getByIdsUrl', 'fetchHttpAction', 'fetchUsingTrackedIds'),
            _.pick(this, 'getByIdsUrl', 'fetchHttpAction', 'fetchUsingTrackedIds'),
            {
              getByIdsUrl: '/ids',
              fetchHttpAction: 'GET',
              fetchUsingTrackedIds: true
            }
          );
          _.extend(this, cacheDefaults);
          cacheMixin(this);
        } else {
          this.trackedIds = [];
          this.listenTo(this.parentInstance, 'load-begin', function() {
            this.trigger('cache-load-begin');
          });
          this.listenTo(this.parentInstance, 'load-complete', function() {
            this.trigger('cache-load-complete');
          });
        }
      },
    };
  };

  return mixin;
}));

},{"backbone-torso/node_modules/jquery":36,"underscore":37}],29:[function(require,module,exports){
(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    root.Torso = root.Torso || {};
    root.Torso.Mixins = root.Torso.Mixins || {};
    root.Torso.Mixins.cell = factory();
  }
}(this, function() {
  'use strict';
  /**
   * An non-persistable object that can listen to and emit events like a models.
   * @module Torso
   * @namespace Torso.Mixins
   * @class  cellMixin
   * @author kent.willis@vecna.com
   */
  return {
    /**
     * Whether a cell can pass as a model or not.
     * If true, the cell will not fail is persisted functions are invoked
     * If false, the cell will throw exceptions if persisted function are invoked
     * @property {Boolean} isModelCompatible
     * @default false
     */
    isModelCompatible: false,

    save: function() {
      if (!this.isModelCompatible) {
        throw 'Cell does not have save';
      }
    },

    fetch: function() {
      if (!this.isModelCompatible) {
        throw 'Cell does not have fetch';
      }
    },

    sync: function() {
      if (!this.isModelCompatible) {
        throw 'Cell does not have sync';
      }
    },

    url: function() {
      if (!this.isModelCompatible) {
        throw 'Cell does not have url';
      }
    }
  };
}));

},{}],30:[function(require,module,exports){
(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['jquery'], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory(require('backbone-torso/node_modules/jquery'));
  } else {
    root.Torso = root.Torso || {};
    root.Torso.Mixins = root.Torso.Mixins || {};
    root.Torso.Mixins.loading = factory((root.jQuery || root.Zepto || root.ender || root.$));
  }
}(this, function($) {
  /**
   * Loading logic.
   *
   * @module    Torso
   * @namespace Torso.Mixins
   * @class  loadingMixin
   * @author kent.willis@vecna.com
   */
  var loadingMixin = function(base) {

    return {
      /**
       * Adds the loading mixin
       * @method constructor
       * @param args {Object} the arguments to the base constructor method
       */
      constructor: function(args) {
        base.call(this, args);
        this.loadedOnceDeferred = new $.Deferred();
        this.loadedOnce = false;
        this.loadingCount = 0;
        // Loading is a convenience flag that is the equivalent of loadingCount > 0
        this.loading = false;
      },

      /**
       * @method hasLoadedOnce
       * @return {Boolean} true if this model/collection has ever loaded from a fetch call
       */
      hasLoadedOnce: function() {
        return this.loadedOnce;
      },

      /**
       * @method isLoading
       * @return {Boolean} true if this model/collection is currently loading new values from the server
       */
      isLoading: function() {
        return this.loading;
      },

      /**
       * @method getLoadedOncePromise
       * @return {Promise} a promise that will resolve when the model/collection has loaded for the first time
       */
      getLoadedOncePromise: function() {
        return this.loadedOnceDeferred.promise();
      },

      /**
       * Wraps the base fetch in a wrapper that manages loaded states
       * @method fetch
       * @param options {Object} - the object to hold the options needed by the base fetch method
       * @return {Promise} The loadWrapper promise
       */
      fetch: function(options) {
        return this.__loadWrapper(base.prototype.fetch, options);
      },

      /**
       * Base load function that will trigger a "load-begin" and a "load-complete" as
       * the fetch happens. Use this method to wrap any method that returns a promise in loading events
       * @method __loadWrapper
       * @param fetchMethod {Function} - the method to invoke a fetch
       * @param options {Object} - the object to hold the options needed by the fetchMethod
       * @return {Promise} a promise when the fetch method has completed and the events have been triggered
       */
      __loadWrapper: function(fetchMethod, options) {
        var object = this;
        this.loadingCount++;
        this.loading = true;
        this.trigger('load-begin');
        return $.when(fetchMethod.call(object, options)).always(function() {
          if (!object.loadedOnce) {
            object.loadedOnce = true;
            object.loadedOnceDeferred.resolve();
          }
          object.loadingCount--;
          if (object.loadingCount <= 0) {
            object.loadingCount = 0; // prevent going negative.
            object.loading = false;
          }
        }).done(function(data, textStatus, jqXHR) {
          object.trigger('load-complete', {success: true, data: data, textStatus: textStatus, jqXHR: jqXHR});
        }).fail(function(jqXHR, textStatus, errorThrown) {
          object.trigger('load-complete', {success: false, jqXHR: jqXHR, textStatus: textStatus, errorThrown: errorThrown});
        });
      }
    };
  };

  return loadingMixin;
}));

},{"backbone-torso/node_modules/jquery":36}],31:[function(require,module,exports){
(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    root.Torso = root.Torso || {};
    root.Torso.Mixins = root.Torso.Mixins || {};
    root.Torso.Mixins.polling = factory();
  }
}(this, function() {
  /**
   * Periodic Polling Object to be mixed into Backbone Collections and Models.
   *
   * The polling functionality should only be used for collections and for models that are not
   * part of any collections. It should not be used for a model that is a part of a collection.
   * @module    Torso
   * @namespace Torso.Mixins
   * @class  pollingMixin
   * @author ariel.wexler@vecna.com
   */
  var pollingMixin = {
    /**
     * @property pollTimeoutId {Number} The id from when setTimeout was called to start polling.
     */
    pollTimeoutId: undefined,
    __pollStarted: false,
    __pollInterval: 5000,

    /**
     * Returns true if the poll is active
     * @method isPolling
     */
    isPolling: function() {
      return this.__pollStarted;
    },

    /**
     * Starts polling Model/Collection by calling fetch every pollInterval.
     * Note: Each Model/Collection will only allow a singleton of polling to occur so
     * as not to have duplicate threads updating Model/Collection.
     * @method startPolling
     * @param  pollInterval {Integer} interval between each poll in ms.
     */
    startPolling: function(pollInterval) {
      var self = this;
      if (pollInterval) {
        this.__pollInterval = pollInterval;
      }
      // have only 1 poll going at a time
      if (this.__pollStarted) {
        return;
      } else {
        this.__pollStarted = true;
        this.pollTimeoutId = window.setInterval(function() {
          self.__poll();
        }, this.__pollInterval);
        this.__poll();
      }
    },

    /**
     * Stops polling Model and clears all Timeouts.
     * @method  stopPolling
     */
    stopPolling: function() {
      window.clearInterval(this.pollTimeoutId);
      this.__pollStarted = false;
    },

    /**
     * By default, the polled fetching operation is routed directly
     * to backbone's fetch all.
     * @method polledFetch
     */
    polledFetch: function() {
      this.fetch();
    },

    //************** Private methods **************//

    /**
     * Private function to recursively call itself and poll for db updates.
     * @private
     * @method __poll
     */
    __poll: function() {
      this.polledFetch();
    }
  };

  return pollingMixin;
}));
},{}],32:[function(require,module,exports){
(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['backbone', 'backbone.stickit'], factory);
  } else if (typeof exports === 'object') {
    require('backbone.stickit');
    factory(require('backbone'));
  } else {
    factory(root.Backbone);
  }
}(this, function(Backbone) {
  'use strict';

  /**
   * Extensions to stickit handlers.
   *
   * @module    Torso
   * @namespace Torso.Utils
   * @class     stickitUtils
   * @static
   * @author ariel.wexler@vecna.com, kent.willis@vecna.com
   */
  Backbone.Stickit.addHandler({
    selector: 'input[type="radio"]',
    events: ['change'],
    update: function($el, val) {
      $el.prop('checked', false);
      $el.filter('[value="' + val + '"]').prop('checked', true);
    },
    getVal: function($el) {
      return $el.filter(':checked').val();
    }
  });
}));

},{"backbone":39,"backbone.stickit":38}],33:[function(require,module,exports){
(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['underscore', 'jquery'], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory(require('underscore'), require('backbone-torso/node_modules/jquery'));
  } else {
    root.Torso = root.Torso || {};
    root.Torso.Utils = root.Torso.Utils || {};
    root.Torso.Utils.templateRenderer = factory(root._, (root.jQuery || root.Zepto || root.ender || root.$));
  }
}(this, function(_, $) {
  'use strict';

  /**
   * Changes DOM Nodes that are different, and leaves others untouched.
   *
   * Algorithm:
   * Delegates to a particular swapMethod, depending on the Node type.
   * Recurses for nested Element Nodes only.
   * There is always room for optimizing this method.
   *
   * @method hotswap
   * @param currentNode {Node} The DOM Node corresponding to the existing page content to update
   * @param newNode {Node} The detached DOM Node representing the desired DOM subtree
   * @param ignoreElements {Array} Array of jQuery selectors for DOM Elements to ignore during render. Can be an expensive check.
   */
  function hotswap(currentNode, newNode, ignoreElements) {
    var newNodeType = newNode.nodeType,
      currentNodeType = currentNode.nodeType,
      swapMethod;

    if(newNodeType !== currentNodeType) {
      $(currentNode).replaceWith(newNode);
    } else {
      swapMethod = swapMethods[newNodeType] || swapMethods['default'];
      swapMethod(currentNode, newNode, ignoreElements);
    }
  }

  /**
   * Stickit will rely on the 'stickit-bind-val' jQuery data attribute to determine the value to use for a given option.
   * If the value DOM attribute is not the same as the stickit-bind-val, then this will clear the jquery data attribute
   * so that stickit will use the value DOM attribute of the option.  This happens when templateRenderer merges
   * the attributes of the newNode into a current node of the same type when the current node has the stickit-bind-val
   * jQuery data attribute set.
   *
   * If the node value is not set, then the stickit-bind-val might be how the view is communicating the value for stickit to use
   * (possibly in the case of non-string values).  In this case trust the stickit-bind-val.
   *
   * @param node {Node} the DoM element to test and fix the stickit data on.
   */
  function cleanupStickitData(node) {
    var $node = $(node);
    var stickitValue = $node.data('stickit-bind-val');
    if (node.tagName === 'OPTION' && node.value !== undefined && stickitValue !== node.value) {
      $node.removeData('stickit-bind-val');
    }
  }

  /*
   * Swap method for Element Nodes
   * @param currentNode {Element} The pre-existing DOM Element to update
   * @param newNode {Element} The detached DOM Element representing the desired DOM Element subtree
   * @param ignoreElements {Array} Array of jQuery selectors for DOM Elements to ignore during render. Can be an expensive check.
   */
  function swapElementNodes(currentNode, newNode, ignoreElements) {
    var currentAttr, shouldIgnore, $currChildNodes, $newChildNodes, currentAttributes,
      $currentNode = $(currentNode),
      $newNode = $(newNode),
      idx = 0;

    shouldIgnore = _.some(ignoreElements, function(selector) {
      return $currentNode.is(selector);
    });

    if (shouldIgnore) {
      return;
    }

    // Handle tagname changes with full replacement
    if (newNode.tagName !== currentNode.tagName) {
      $currentNode.replaceWith(newNode);
      return;
    }

    // Remove current attributes that have changed
    // This is necessary, because some types of attributes cannot be removed
    // without causing a browser error.
    currentAttributes = currentNode.attributes;
    while (idx < currentAttributes.length) {
      currentAttr = currentAttributes[idx].name;
      if (newNode.getAttribute(currentAttr)) {
        idx++;
      } else {
        currentNode.removeAttribute(currentAttr);
      }
    }

    // Set new attributes
    _.each(newNode.attributes, function(attrib) {
      currentNode.setAttribute(attrib.name, attrib.value);
    });

    cleanupStickitData(currentNode);

    // Quick check to see if we need to bother comparing sub-levels
    if ($currentNode.html() === $newNode.html()) {
      return;
    }

    // Include all child nodes, including text and comment nodes
    $newChildNodes = $newNode.contents();
    $currChildNodes = $currentNode.contents();

    // If the DOM lists are different sizes, perform a hard refresh
    if ($newChildNodes.length !== $currChildNodes.length) {
      $currentNode.html($newNode.html());
      return;
    }

    // Perform a recursive hotswap for all children nodes
    $currChildNodes.each(function(index, currChildNode) {
      hotswap(currChildNode, $newChildNodes.get(index), ignoreElements);
    });
  }

  /*
   * Swap method for Text, Comment, and CDATA Section Nodes
   * @param currentNode {Node} The pre-existing DOM Node to update
   * @param newNode {Node} The detached DOM Node representing the desired DOM Node subtree
   */
  function updateIfNodeValueChanged(currentNode, newNode){
    var nodeValueChanged = newNode.nodeValue !== currentNode.nodeValue;
    if (nodeValueChanged) {
      $(currentNode).replaceWith(newNode);
    }
  }

  /*
   * Map of nodeType to hot swap implementations.
   * NodeTypes are hard-coded integers per the DOM Level 2 specification instead of
   * references to constants defined on the window.Node object for IE8 compatibility
   */
  var swapMethods = {
    1: swapElementNodes, // ELEMENT_NODE
    3: updateIfNodeValueChanged, // TEXT_NODE
    4: updateIfNodeValueChanged, // CDATA_SECTION_NODE
    8: updateIfNodeValueChanged, // COMMENT_NODE
    default: function(currentNode, newNode) {
      $(currentNode).replaceWith(newNode);
    }
  };

  /**
   * Static Template Engine.
   * All template renders should be piped through this method.
   *
   * @module    Torso
   * @namespace Torso.Utils
   * @class     templateRenderer
   * @static
   * @author    ariel.wexler@vecna.com
   */
  var templateRenderer = {
    /**
     * Performs efficient re-rendering of a template.
     * @method render
     * @param  $el {jQueryObject} The Element to render into
     * @param  template {Handlebars Template} The HBS template to apply
     * @param  context {Object} The context object to pass to the template
     * @param  [opts] {Object} Other options
     * @param  [opts.force=false] {Boolean} Will forcefully do a fresh render and not a diff-render
     * @param  [opts.newHTML] {String} If you pass in newHTML, it will not use the template or context, but use this instead.
     * @param  [opts.ignoreElements] {Array} jQuery selectors of DOM elements to ignore during render. Can be an expensive check
     */
    render: function($el, template, context, opts) {
      var newDOM, newHTML,
          el = $el.get(0);
      opts = opts || {};

      newHTML = opts.newHTML || template(context);
      if (opts.force) {
        $el.html(newHTML);
      } else {
        newDOM = this.copyTopElement(el);
        $(newDOM).html(newHTML);
        this.hotswapKeepCaret(el, newDOM, opts.ignoreElements);
      }
    },

    /**
     * Call this.hotswap but also keeps the caret position the same
     * @param currentNode {Node} The DOM Node corresponding to the existing page content to update
     * @param newNode {Node} The detached DOM Node representing the desired DOM subtree
     * @param ignoreElements {Array} Array of jQuery selectors for DOM Elements to ignore during render. Can be an expensive check.
     * @method hotswapKeepCaret
     */

    hotswapKeepCaret: function(currentNode, newNode, ignoreElements) {
      var currentCaret, activeElement,
          currentNodeContainsActiveElement = false;
      try {
        activeElement = document.activeElement;
      } catch (error) {
        activeElement = null;
      }
      if (activeElement && currentNode && $.contains(activeElement, currentNode)) {
        currentNodeContainsActiveElement = true;
      }
      if (currentNodeContainsActiveElement && this.supportsSelection(activeElement)) {
        currentCaret = this.getCaretPosition(activeElement);
      }
      this.hotswap(currentNode, newNode, ignoreElements);
      if (currentNodeContainsActiveElement && this.supportsSelection(activeElement)) {
        this.setCaretPosition(activeElement, currentCaret);
      }
    },

    // See above function declaration for method-level documentation
    hotswap: hotswap,

    /**
     * Produces a copy of the element tag with attributes but with no contents
     * @param el {Element} the DOM element to be copied
     * @return {Element} a shallow copy of the element with no children but with attributes
     * @method copyTopElement
     */
    copyTopElement: function(el) {
      var newDOM = document.createElement(el.tagName);
      _.each(el.attributes, function(attrib) {
        newDOM.setAttribute(attrib.name, attrib.value);
      });
      return newDOM;
    },

    /**
     * Determines if the element supports selection. As per spec, https://html.spec.whatwg.org/multipage/forms.html#do-not-apply
     * selection is only allowed for text, search, tel, url, password. Other input types will throw an exception in chrome
     * @param el {Element} the DOM element to check
     * @return {Boolean} boolean indicating whether or not the selection is allowed for {Element} el
     * @method supportsSelection
     */
    supportsSelection : function (el) {
      return (/text|password|search|tel|url/).test(el.type);
    },

    /**
     * Method that returns the current caret (cursor) position of a given element.
     * Source: http://stackoverflow.com/questions/2897155/get-cursor-position-in-characters-within-a-text-input-field
     * @method getCaretPosition
     * @param elem {element} the DOM element to check caret position
     * @return {Integer} the cursor index of the given element.
     */
    getCaretPosition: function(elem) {
      // range {IE selection object}
      // iCaretPos {Integer} will store the final caret position
      var range,
          iCaretPos = 0;
      // IE Support
      if (document.selection) {
        // Set focus on the element
        elem.focus();
        // To get cursor position, get empty selection range
        range = document.selection.createRange();
        // Move selection start to 0 position
        range.moveStart('character', -elem.value.length);
        // The caret position is selection length
        iCaretPos = range.text.length;
      } else if (elem.selectionStart || elem.selectionStart === 0) {
        // Firefox support
        iCaretPos = elem.selectionStart;
      }
      // Return results
      return iCaretPos;
    },

    /**
     * Method that returns sets the current caret (cursor) position of a given element and puts it in focus.
     * Source: http://stackoverflow.com/questions/512528/set-cursor-position-in-html-textbox
     * @method setCaretPosition
     * @param elem {element}
     * @param caretPos {Integer} The caret index to set
     * @return {Integer} the cursor index of the given element.
     */
    setCaretPosition: function(elem, caretPos) {
      var range;
      if (elem) {
        if (elem.createTextRange) {
          // IE support
          range = elem.createTextRange();
          range.move('character', caretPos);
          range.select();
        } else if (elem.selectionStart || elem.selectionStart === 0) {
          // Firefox support
          elem.focus();
          elem.setSelectionRange(caretPos, caretPos);
        } else {
          // At least focus the element if nothing else
          elem.focus();
        }
      }
    }
  };

  return templateRenderer;
}));

},{"backbone-torso/node_modules/jquery":36,"underscore":37}],34:[function(require,module,exports){
(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['./behaviors/DataBehavior',
            './Behavior',
            './Cell',
            './Collection',
            './Events',
            './mixins/loadingMixin', './mixins/cacheMixin', './mixins/cellMixin', './mixins/pollingMixin',
            './validation',
            './Model', './NestedCell', './NestedModel', './FormModel',
            './ServiceCell',
            './Router',
            './history',
            './View', './ListView', './FormView',
            './templateRenderer',
            './handlebarsUtils',
            './configure',
            './stickitUtils'],
           factory);
  } else if (typeof exports === 'object') {
    require('./stickitUtils');
    require('./configure');
    module.exports = factory(require('./behaviors/DataBehavior'),
                             require('./Behavior'),
                             require('./Cell'),
                             require('./Collection'),
                             require('./Events'),
                             require('./mixins/loadingMixin'), require('./mixins/cacheMixin'), require('./mixins/cellMixin'), require('./mixins/pollingMixin'),
                             require('./validation'),
                             require('./Model'), require('./NestedCell'), require('./NestedModel'), require('./FormModel'),
                             require('./ServiceCell'),
                             require('./Router'),
                             require('./history'),
                             require('./View'), require('./ListView'), require('./FormView'),
                             require('./templateRenderer'), require('./handlebarsUtils'));
  } else {
    root.Torso = root.Torso || {};
  }
}(this, function(DataBehavior,
                 Behavior,
                 Cell,
                 Collection,
                 Events,
                 loadingMixin, cacheMixin, cellMixin, pollingMixin,
                 validation,
                 Model, NestedCell, NestedModel, FormModel,
                 ServiceCell,
                 Router,
                 history,
                 View, ListView, FormView,
                 templateRenderer,
                 handlebarsUtils) {

  /**
   * File containing all dependencies that exports a single object with everything attached (same format as the global).
   *
   * @module    Torso
   * @class     Torso
   * @static
   * @author    jyoung@vecna.com
   */
  return {
    behaviors: {
      DataBehavior: DataBehavior
    },
    Behavior: Behavior,
    Cell: Cell,
    Collection: Collection,
    Events: Events,
    Mixins: {
      loading: loadingMixin,
      cache: cacheMixin,
      polling: pollingMixin,
      validation: validation.mixin,
      cell: cellMixin
    },
    Model: Model,
    NestedCell: NestedCell,
    NestedModel: NestedModel,
    FormModel: FormModel,
    ServiceCell: ServiceCell,
    Router: Router,
    history: history,
    Utils: {
      templateRenderer: templateRenderer,
      handlebarsUtils: handlebarsUtils
    },
    validation: validation,
    View: View,
    ListView: ListView,
    FormView: FormView
  };
}));

},{"./Behavior":11,"./Cell":12,"./Collection":13,"./Events":14,"./FormModel":15,"./FormView":16,"./ListView":17,"./Model":18,"./NestedCell":19,"./NestedModel":20,"./Router":21,"./ServiceCell":22,"./View":23,"./behaviors/DataBehavior":24,"./configure":25,"./handlebarsUtils":26,"./history":27,"./mixins/cacheMixin":28,"./mixins/cellMixin":29,"./mixins/loadingMixin":30,"./mixins/pollingMixin":31,"./stickitUtils":32,"./templateRenderer":33,"./validation":35}],35:[function(require,module,exports){
(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['underscore', './NestedModel'], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory(require('underscore'), require('./NestedModel'));
  } else {
    root.Torso = root.Torso || {};
    root.Torso.Mixins = root.Torso.Mixins || {};
    root.Torso.validation = factory(root._, root.Torso.NestedModel);
    root.Torso.Mixins.validation = root.Torso.validation.mixin;
  }
}(this, function(_, NestedModel) {
  'use strict';

  // Default options
  // ---------------

  var defaultOptions = {
    forceUpdate: false,
    selector: 'name',
    labelFormatter: 'sentenceCase',
    messageFormatter: 'none',
    valid: Function.prototype,
    invalid: Function.prototype
  };


  // Helper functions
  // ----------------

  // Formatting functions used for formatting error messages
  var formatFunctions = {
    // Uses the configured label formatter to format the attribute name
    // to make it more readable for the user
    formatLabel: function(attrName, model) {
      return defaultLabelFormatters[defaultOptions.labelFormatter](attrName, model);
    },

    // Replaces nummeric placeholders like {0} in a string with arguments
    // passed to the function
    format: function() {
      return defaultMessageFormatters[defaultOptions.messageFormatter].apply(defaultMessageFormatters, arguments);
    }
  };

  // Flattens an object
  // eg:
  //
  //     var o = {
  //       owner: {
  //         name: 'Backbone',
  //         address: {
  //           street: 'Street',
  //           zip: 1234
  //         }
  //       }
  //     };
  //
  // becomes:
  //
  //     var o = {
  //       'owner': {
  //         name: 'Backbone',
  //         address: {
  //           street: 'Street',
  //           zip: 1234
  //         }
  //       },
  //       'owner.name': 'Backbone',
  //       'owner.address': {
  //         street: 'Street',
  //         zip: 1234
  //       },
  //       'owner.address.street': 'Street',
  //       'owner.address.zip': 1234
  //     };
  // This may seem redundant, but it allows for maximum flexibility
  // in validation rules.
  var flatten = function (obj, into, prefix) {
    into = into || {};
    prefix = prefix || '';

    _.each(obj, function(val, key) {
      if(obj.hasOwnProperty(key)) {
        if (!!val && typeof val === 'object' && val.constructor === Object) {
          flatten(val, into, prefix + key + '.');
        }

        // Register the current level object as well
        into[prefix + key] = val;
      }
    });

    return into;
  };

  // Validation
  // ----------

  /**
   * Validation object containing validation mixin.
   *
   * @module    Torso
   * @namespace Torso
   * @class  validation
   * @author ariel.wexler@vecna.com, kent.willis@mostlyepic.com
   */
  var Validation = (function(){

    // Returns an object with undefined properties for all
    // attributes on the model that has defined one or more
    // validation rules.
    var getValidatedAttrs = function(model, attrs) {
      attrs = attrs || _.keys(_.result(model, 'validation') || {});
      return _.reduce(attrs, function(memo, key) {
        memo[key] = void 0;
        return memo;
      }, {});
    };

    // Returns an array with attributes passed through options
    var getOptionsAttrs = function(options) {
      var attrs = options.attributes;
      if (_.isFunction(attrs)) {
        attrs = attrs();
      }
      if (_.isArray(attrs)) {
        return attrs;
      }
    };


    // Looks on the model for validations for a specified
    // attribute. Returns an array of any validators defined,
    // or an empty array if none is defined.
    var getValidators = function(model, attr) {
      var attrValidationSet = model.validation ? _.result(model, 'validation')[attr] || {} : {};

      // If the validator is a function or a string, wrap it in a function validator
      if (_.isFunction(attrValidationSet) || _.isString(attrValidationSet)) {
        attrValidationSet = {
          fn: attrValidationSet
        };
      }

      // Stick the validator object into an array
      if(!_.isArray(attrValidationSet)) {
        attrValidationSet = [attrValidationSet];
      }

      // Reduces the array of validators into a new array with objects
      // with a validation method to call, the value to validate against
      // and the specified error message, if any
      return _.reduce(attrValidationSet, function(memo, attrValidation) {
        _.each(_.without(_.keys(attrValidation), 'msg', 'msgKey'), function(validator) {
          memo.push({
            fn: defaultValidators[validator],
            val: attrValidation[validator],
            msg: attrValidation.msg,
            msgKey: attrValidation.msgKey
          });
        });
        return memo;
      }, []);
    };

    // Gets the indices out of an attr name: foo[0][1] -> [0, 1] and foo[2] -> [2]
    var extractIndices = function(attr) {
      var startIndex, endIndex,
        i = 0,
        hasEndBracket = true,
        indices = [];
      startIndex = attr.indexOf('[', i);
      while (startIndex > 0 && hasEndBracket) {
         endIndex = attr.indexOf(']', i);
         indices.push(parseInt(attr.substring(startIndex + 1, endIndex), 10));
         i = endIndex + 1;
         hasEndBracket = i > 0;
         startIndex = attr.indexOf('[', i);
      }
      return indices;
    };

    // Generates an array of all the possible field accessors and their indices when using the "open" array notation
    // foo[] -> [{attr: 'foo[0]', index: [0]}, {attr: 'foo[1]', index: [1]}].  Will also perform nested arrays:
    // foo[][] -> [[{attr: 'foo[0][0]', index: [0][0]}], [{attr: 'foo[1][0]', index: [1][0]}]]
    var generateSubAttributes = function(attr, model, subIndices) {
      var i, attrName, remainder, subAttrs, newIndices,
        firstBracket = attr.indexOf('[]');
      if (_.isEmpty(subIndices)) {
        subIndices = [];
      }
      if (firstBracket === -1) {
        return {attr: attr, index: subIndices};
      } else {
        attrName = attr.substring(0, firstBracket);
        remainder = attr.substring(firstBracket + 2);
        subAttrs = [];
        var valueArray = model.get(attrName);
        _.each(valueArray, function(value, i) {
          newIndices = subIndices.slice();
          newIndices.push(i);
          subAttrs.push(generateSubAttributes(attrName + '[' + i + ']' + remainder, model, newIndices));
        });
        return subAttrs;
      }
    };

    // Is this model a nested torso model
    var isNestedModel = function(model) {
      return NestedModel && model instanceof NestedModel;
    };

    // Is the attribute using dot notation or array notation: foo.bar or foo[] or foo[1]
    var isNestedAttr = function(attr) {
      return attr.indexOf('.') > 0 || attr.indexOf(']') > 0;
    };

    // Remove the indices for a field name: foo[1][2] -> foo[][]
    var stripIndices = function(attr) {
      var startIndex, newAttr,
        i = 0,
        hasEndBracket = true;
      startIndex = attr.indexOf('[', i);
      if (startIndex < 0) {
        return attr;
      }
      newAttr = attr.substring(0, startIndex + 1);
      while (startIndex > 0 && hasEndBracket) {
         i = attr.indexOf(']', i) + 1;
         hasEndBracket = i > 0;
         startIndex = attr.indexOf('[', i);
         if (startIndex > 0) {
           newAttr = newAttr + attr.substring(i - 1, startIndex + 1);
         }
      }
      newAttr = newAttr + attr.substring(i - 1);
      return newAttr;
    };

    // Validates safely for a nested attribute. If the attr is an array, it will construct
    // validation errors with the same array structure ['foo[0]', 'foo[1]'] -> [false, 'Error Example']
    // Also handles nested array structure
    var validateWithOpenArrayHelper = function(model, attrConfig, value, computed, validators, depth) {
      var attr, indices;

      if (_.isArray(attrConfig)) {
        return _.reduce(attrConfig, function(memo, nestedAttrConfig) {
          memo.push(validateWithOpenArrayHelper(model, nestedAttrConfig, value, computed, validators, depth + 1));
          return memo;
        }, []);
      } else {
        indices = attrConfig.index;
        attr = attrConfig.attr;
        // if the value wasn't passed in and the attribute is nested, get the value
        if (_.isUndefined(value) && isNestedAttr(attr)) {
          value = model.get(attr);
        }
        return invokeValidator(validators, model, value, attr, computed, indices);
      }
    };

    // Invokes the validator set for an attr
    var invokeValidator = function(validators, model, value, attr, computed, indices) {
      return _.reduce(validators, function(memo, validator) {
          // Pass the format functions plus the default
          // validators as the context to the validator
          var context = _.extend({msgKey: validator.msgKey}, formatFunctions, defaultValidators),
              result = validator.fn.call(context, value, attr, validator.val, model, computed, indices);

          if (result === false || memo === false) {
            return false;
          }
          if (result && !memo) {
            return _.result(_.extend({}, validator, formatFunctions, defaultValidators), 'msg') || result;
          }
          return memo;
        }, '');
    };

    // Validates an attribute against all validators defined
    // for that attribute. If one or more errors are found,
    // the first error message is returned.
    // If the attribute is valid, an empty string is returned.
    var validateAttrWithOpenArray = function(model, attr, value, computed) {
      // Reduces the array of validators to an error message by
      // applying all the validators and returning the first error
      // message, if any.
      var hasErrors, subAttr, result,
        validators = getValidators(model, attr);
      subAttr = generateSubAttributes(attr, model);
      result = validateWithOpenArrayHelper(model, subAttr, value, computed, validators, 0);
      if (_.isArray(result)) {
        hasErrors = _.reduce(_.flatten(result), function(memo, val) {
          return memo || val;
        }, false);
        if (!hasErrors) {
          return '';
        }
      }
      return result;
    };

    // Loops through the model's attributes and validates the specified attrs.
    // Returns and object containing names of invalid attributes
    // as well as error messages.
    var validateModel = function(model, attrs, validatedAttrs) {
      var error,
          invalidAttrs = {},
          isValid = true,
          computed = _.clone(attrs);

      _.each(validatedAttrs, function(val, attr) {
        error = validateAttrWithOpenArray(model, attr, val, computed);
        if (error) {
          invalidAttrs[attr] = error;
          isValid = false;
        }
      });

      return {
        invalidAttrs: invalidAttrs,
        isValid: isValid
      };
    };

    // Validates attribute without open array notation.
    var validateAttr = function(model, value, attr) {
      var indices, validators,
        validations = model.validation ? _.result(model, 'validation') || {} : {};
      // If the validations hash contains an entry for the attr
      if (_.contains(_.keys(validations), attr)) {
        return validateAttrWithOpenArray(model, attr, value, _.extend({}, model.attributes));
      } else {
        indices = extractIndices(attr);
        attr = stripIndices(attr);
        validators = getValidators(model, attr);
        return invokeValidator(validators, model, value, attr, _.extend({}, model.attributes), indices);
      }
    };

    // Contains the methods that are mixed in on the model when binding
    var mixin = function(options) {
      return {

        /**
         * Check whether an attribute or a set of attributes are valid. It will default to use the model's current values but
         * you can pass in different values to use in the validation process instead.
         * @param attr {String or Object or Array} Either the name of the attribute, an array containing many attribute names, or
         * on object with attribute name to values
         * @param [value] {Any} a value to use for the attribute value instead of using the model's value.
         * @return undefined if no errors, a validation exception if a single attribute, or an object with attribute name as key
         * and the error as the value
         * @method preValidate
         */
        preValidate: function(attr, value) {
          var self = this,
              result = {},
              error;
          if (_.isArray(attr)) {
            _.each(attr, function(attr) {
              error = self.preValidate(attr);
              if (error) {
                result[attr] = error;
              }
            });
            return _.isEmpty(result) ? undefined : result;
          } else if (_.isObject(attr)) {
            _.each(attr, function(value, key) {
              error = self.preValidate(key, value);
              if (error) {
                result[key] = error;
              }
            });
            return _.isEmpty(result) ? undefined : result;
          } else {
            if (_.isUndefined(value) && isNestedModel(this)) {
              value = this.get(attr);
            }
            return validateAttr(this, value, attr);
          }
        },

        // Check to see if an attribute, an array of attributes or the
        // entire model is valid. Passing true will force a validation
        // of the model.
        isValid: function(option) {
          var flattened, attrs, error, invalidAttrs;

          option = option || getOptionsAttrs(options);

          if(_.isString(option)){
            attrs = [option];
          } else if(_.isArray(option)) {
            attrs = option;
          }
          if (attrs) {
            // Loop through all attributes
            _.each(attrs, function (attr) {
              var value;
              if (isNestedModel(this)) {
                value = this.get(attr);
              } else {
                value = flatten(this.attributes)[attr];
              }
              error = validateAttr(this, value, attr);
              if (error) {
                invalidAttrs = invalidAttrs || {};
                invalidAttrs[attr] = error;
              }
            }, this);
          }

          if (option === true) {
            invalidAttrs = this.validate();
          }
          if (invalidAttrs) {
            this.trigger('invalid', this, invalidAttrs, {validationError: invalidAttrs});
          }
          return attrs ? !invalidAttrs : this.validation ? this._isValid : true;
        },

        // This is called by Backbone when it needs to perform validation.
        // You can call it manually without any parameters to validate the
        // entire model.
        validate: function(attrs, setOptions){
          var model = this;
          var opt = _.extend({}, options, setOptions);
          var validatedAttrs = getValidatedAttrs(model, getOptionsAttrs(options));
          var allAttrs = _.extend({}, validatedAttrs, model.attributes, attrs);
          var flattened = _.extend(flatten(allAttrs), attrs); // allow people to pass in nested attributes
          var changedAttrs = attrs ? flatten(attrs) : flattened;
          var result = validateModel(model, allAttrs, _.pick(flattened, _.keys(validatedAttrs)));
          model._isValid = result.isValid;

          // Trigger validated events.
          // Need to defer this so the model is actually updated before
          // the event is triggered.
          _.defer(function() {
            model.trigger('validated', model._isValid, model, result.invalidAttrs);
            model.trigger('validated:' + (model._isValid ? 'valid' : 'invalid'), model, result.invalidAttrs);
          });

          // Return any error messages to Backbone, unless the forceUpdate flag is set.
          // Then we do not return anything and fools Backbone to believe the validation was
          // a success. That way Backbone will update the model regardless.
          if (!opt.forceUpdate && _.intersection(_.keys(result.invalidAttrs), _.keys(changedAttrs)).length > 0) {
            return result.invalidAttrs;
          }
        }
      };
    };

    // Returns the public methods on Backbone.Validation
    return {

      // Current version of the library
      version: '0.11.3',

      // Called to configure the default options
      configure: function(options) {
        _.extend(defaultOptions, options);
      },

      // Used to extend the Backbone.Model.prototype
      // with validation
      mixin: mixin(defaultOptions)
    };
  }());


  // Patterns
  // --------

  var defaultPatterns = Validation.patterns = {
    // Matches any digit(s) (i.e. 0-9)
    digits: /^\d+$/,

    // Matches any number (e.g. 100.000)
    number: /^-?(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d+)?$/,

    // Matches a valid email address (e.g. mail@example.com)
    email: /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i,

    // Mathes any valid url (e.g. http://www.xample.com)
    url: /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i
  };


  // Error messages
  // --------------

  // Error message for the build in validators.
  // {x} gets swapped out with arguments form the validator.
  var defaultMessages = Validation.messages = {
    required: '{0} is required',
    acceptance: '{0} must be accepted',
    min: '{0} must be greater than or equal to {1}',
    max: '{0} must be less than or equal to {1}',
    range: '{0} must be between {1} and {2}',
    length: '{0} must be {1} characters',
    minLength: '{0} must be at least {1} characters',
    maxLength: '{0} must be at most {1} characters',
    rangeLength: '{0} must be between {1} and {2} characters',
    oneOf: '{0} must be one of: {1}',
    equalTo: '{0} must be the same as {1}',
    digits: '{0} must only contain digits',
    number: '{0} must be a number',
    email: '{0} must be a valid email',
    url: '{0} must be a valid url',
    inlinePattern: '{0} is invalid'
  };

  // Label formatters
  // ----------------

  // Label formatters are used to convert the attribute name
  // to a more human friendly label when using the built in
  // error messages.
  // Configure which one to use with a call to
  //
  //     Backbone.Validation.configure({
  //       labelFormatter: 'label'
  //     });
  var defaultLabelFormatters = Validation.labelFormatters = {

    // Returns the attribute name with applying any formatting
    none: function(attrName) {
      return attrName;
    },

    // Converts attributeName or attribute_name to Attribute name
    sentenceCase: function(attrName) {
      return attrName.replace(/(?:^\w|[A-Z]|\b\w)/g, function(match, index) {
        return index === 0 ? match.toUpperCase() : ' ' + match.toLowerCase();
      }).replace(/_/g, ' ');
    },

    // Looks for a label configured on the model and returns it
    //
    //      var Model = Backbone.Model.extend({
    //        validation: {
    //          someAttribute: {
    //            required: true
    //          }
    //        },
    //
    //        labels: {
    //          someAttribute: 'Custom label'
    //        }
    //      });
    label: function(attrName, model) {
      return (model.labels && model.labels[attrName]) || defaultLabelFormatters.sentenceCase(attrName, model);
    }
  };

  // Message Formatters
  // ------------------

  var defaultMessageFormatters = Validation.messageFormatters = {
    none: function() {
      var args = Array.prototype.slice.call(arguments),
        text = args.shift();
      return text.replace(/\{(\d+)\}/g, function(match, number) {
        return typeof args[number] !== 'undefined' ? args[number] : match;
      });
    }
  };

  // Built in validators
  // -------------------

  var defaultValidators = Validation.validators = (function(){
    // Use native trim when defined
    var trim = String.prototype.trim ?
      function(text) {
        return text === null ? '' : String.prototype.trim.call(text);
      } :
      function(text) {
        var trimLeft = /^\s+/,
            trimRight = /\s+$/;

        return text === null ? '' : text.toString().replace(trimLeft, '').replace(trimRight, '');
      };

    // Determines whether or not a value is a number
    var isNumber = function(value){
      return _.isNumber(value) || (_.isString(value) && value.match(defaultPatterns.number));
    };

    // Determines whether or not a value is empty
    var hasValue = function(value) {
      return !(_.isNull(value) || _.isUndefined(value) || (_.isString(value) && trim(value) === '') || (_.isArray(value) && _.isEmpty(value)));
    };

    var getMessageKey = function(msgKey, defaultKey) {
      return msgKey ? msgKey : defaultKey;
    };

    return {
      format: formatFunctions.format,
      formatLabel: formatFunctions.formatLabel,

      // Function validator
      // Lets you implement a custom function used for validation
      fn: function(value, attr, fn, model, computed) {
        if(_.isString(fn)){
          fn = model[fn];
        }
        return fn.call(model, value, attr, computed);
      },

      // Allows the creation of an inline function that uses the validators context
      // instead of the model context.
      inlineFn: function(value, attr, fn, model, computed, indices) {
        return fn.call(this, value, attr, model, computed, indices);
      },

      // Required validator
      // Validates if the attribute is required or not
      // This can be specified as either a boolean value or a function that returns a boolean value
      required: function(value, attr, required, model, computed) {
        var isRequired = _.isFunction(required) ? required.call(model, value, attr, computed) : required;
        if(!isRequired && !hasValue(value)) {
          return false; // overrides all other validators
        }
        if (isRequired && !hasValue(value)) {
          return this.format(getMessageKey(this.msgKey, defaultMessages.required), this.formatLabel(attr, model));
        }
      },

      // Acceptance validator
      // Validates that something has to be accepted, e.g. terms of use
      // `true` or 'true' are valid
      acceptance: function(value, attr, accept, model) {
        if(value !== 'true' && (!_.isBoolean(value) || value === false)) {
          return this.format(getMessageKey(this.msgKey, defaultMessages.acceptance), this.formatLabel(attr, model));
        }
      },

      // Min validator
      // Validates that the value has to be a number and equal to or greater than
      // the min value specified
      min: function(value, attr, minValue, model) {
        if (!isNumber(value) || value < minValue) {
          return this.format(getMessageKey(this.msgKey, defaultMessages.min), this.formatLabel(attr, model), minValue);
        }
      },

      // Max validator
      // Validates that the value has to be a number and equal to or less than
      // the max value specified
      max: function(value, attr, maxValue, model) {
        if (!isNumber(value) || value > maxValue) {
          return this.format(getMessageKey(this.msgKey, defaultMessages.max), this.formatLabel(attr, model), maxValue);
        }
      },

      // Range validator
      // Validates that the value has to be a number and equal to or between
      // the two numbers specified
      range: function(value, attr, range, model) {
        if(!isNumber(value) || value < range[0] || value > range[1]) {
          return this.format(getMessageKey(this.msgKey, defaultMessages.range), this.formatLabel(attr, model), range[0], range[1]);
        }
      },

      // Length validator
      // Validates that the value has to be a string with length equal to
      // the length value specified
      length: function(value, attr, length, model) {
        if (!_.isString(value) || value.length !== length) {
          return this.format(getMessageKey(this.msgKey, defaultMessages.length), this.formatLabel(attr, model), length);
        }
      },

      // Min length validator
      // Validates that the value has to be a string with length equal to or greater than
      // the min length value specified
      minLength: function(value, attr, minLength, model) {
        if (!_.isString(value) || value.length < minLength) {
          return this.format(getMessageKey(this.msgKey, defaultMessages.minLength), this.formatLabel(attr, model), minLength);
        }
      },

      // Max length validator
      // Validates that the value has to be a string with length equal to or less than
      // the max length value specified
      maxLength: function(value, attr, maxLength, model) {
        if (!_.isString(value) || value.length > maxLength) {
          return this.format(getMessageKey(this.msgKey, defaultMessages.maxLength), this.formatLabel(attr, model), maxLength);
        }
      },

      // Range length validator
      // Validates that the value has to be a string and equal to or between
      // the two numbers specified
      rangeLength: function(value, attr, range, model) {
        if (!_.isString(value) || value.length < range[0] || value.length > range[1]) {
          return this.format(getMessageKey(this.msgKey, defaultMessages.rangeLength), this.formatLabel(attr, model), range[0], range[1]);
        }
      },

      // One of validator
      // Validates that the value has to be equal to one of the elements in
      // the specified array. Case sensitive matching
      oneOf: function(value, attr, values, model) {
        if(!_.include(values, value)){
          return this.format(getMessageKey(this.msgKey, defaultMessages.oneOf), this.formatLabel(attr, model), values.join(', '));
        }
      },

      // Equal to validator
      // Validates that the value has to be equal to the value of the attribute
      // with the name specified
      equalTo: function(value, attr, equalTo, model, computed) {
        if(value !== computed[equalTo]) {
          return this.format(getMessageKey(this.msgKey, defaultMessages.equalTo), this.formatLabel(attr, model), this.formatLabel(equalTo, model));
        }
      },

      // Pattern validator
      // Validates that the value has to match the pattern specified.
      // Can be a regular expression or the name of one of the built in patterns
      pattern: function(value, attr, pattern, model) {
        if (!hasValue(value) || !value.toString().match(defaultPatterns[pattern] || pattern)) {
          return this.format(getMessageKey(this.msgKey, defaultMessages[pattern]) || defaultMessages.inlinePattern, this.formatLabel(attr, model), pattern);
        }
      }
    };
  }());

  return Validation;
}));

},{"./NestedModel":20,"underscore":37}],36:[function(require,module,exports){
/*!
 * jQuery JavaScript Library v2.1.3
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright 2005, 2014 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2014-12-18T15:11Z
 */

(function( global, factory ) {

	if ( typeof module === "object" && typeof module.exports === "object" ) {
		// For CommonJS and CommonJS-like environments where a proper `window`
		// is present, execute the factory and get jQuery.
		// For environments that do not have a `window` with a `document`
		// (such as Node.js), expose a factory as module.exports.
		// This accentuates the need for the creation of a real `window`.
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info.
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
}(typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Support: Firefox 18+
// Can't be in strict mode, several libs including ASP.NET trace
// the stack via arguments.caller.callee and Firefox dies if
// you try to trace through "use strict" call chains. (#13335)
//

var arr = [];

var slice = arr.slice;

var concat = arr.concat;

var push = arr.push;

var indexOf = arr.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var support = {};



var
	// Use the correct document accordingly with window argument (sandbox)
	document = window.document,

	version = "2.1.3",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {
		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android<4.1
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([\da-z])/gi,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	};

jQuery.fn = jQuery.prototype = {
	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// Start with an empty selector
	selector: "",

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {
		return num != null ?

			// Return just the one element from the set
			( num < 0 ? this[ num + this.length ] : this[ num ] ) :

			// Return all the elements in a clean array
			slice.call( this );
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;
		ret.context = this.context;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	// (You can seed the arguments with an array of args, but this is
	// only used internally.)
	each: function( callback, args ) {
		return jQuery.each( this, callback, args );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map(this, function( elem, i ) {
			return callback.call( elem, i, elem );
		}));
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[j] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor(null);
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: arr.sort,
	splice: arr.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var options, name, src, copy, copyIsArray, clone,
		target = arguments[0] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// Skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction(target) ) {
		target = {};
	}

	// Extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {
		// Only deal with non-null/undefined values
		if ( (options = arguments[ i ]) != null ) {
			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)) ) ) {
					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray(src) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject(src) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend({
	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	isFunction: function( obj ) {
		return jQuery.type(obj) === "function";
	},

	isArray: Array.isArray,

	isWindow: function( obj ) {
		return obj != null && obj === obj.window;
	},

	isNumeric: function( obj ) {
		// parseFloat NaNs numeric-cast false positives (null|true|false|"")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		// adding 1 corrects loss of precision from parseFloat (#15100)
		return !jQuery.isArray( obj ) && (obj - parseFloat( obj ) + 1) >= 0;
	},

	isPlainObject: function( obj ) {
		// Not plain objects:
		// - Any object or value whose internal [[Class]] property is not "[object Object]"
		// - DOM nodes
		// - window
		if ( jQuery.type( obj ) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
			return false;
		}

		if ( obj.constructor &&
				!hasOwn.call( obj.constructor.prototype, "isPrototypeOf" ) ) {
			return false;
		}

		// If the function hasn't returned already, we're confident that
		// |obj| is a plain object, created by {} or constructed with new Object
		return true;
	},

	isEmptyObject: function( obj ) {
		var name;
		for ( name in obj ) {
			return false;
		}
		return true;
	},

	type: function( obj ) {
		if ( obj == null ) {
			return obj + "";
		}
		// Support: Android<4.0, iOS<6 (functionish RegExp)
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ toString.call(obj) ] || "object" :
			typeof obj;
	},

	// Evaluates a script in a global context
	globalEval: function( code ) {
		var script,
			indirect = eval;

		code = jQuery.trim( code );

		if ( code ) {
			// If the code includes a valid, prologue position
			// strict mode pragma, execute code by injecting a
			// script tag into the document.
			if ( code.indexOf("use strict") === 1 ) {
				script = document.createElement("script");
				script.text = code;
				document.head.appendChild( script ).parentNode.removeChild( script );
			} else {
			// Otherwise, avoid the DOM node creation, insertion
			// and removal by using an indirect global eval
				indirect( code );
			}
		}
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Support: IE9-11+
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
	},

	// args is for internal usage only
	each: function( obj, callback, args ) {
		var value,
			i = 0,
			length = obj.length,
			isArray = isArraylike( obj );

		if ( args ) {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			}

		// A special, fast, case for the most common use of each
		} else {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			}
		}

		return obj;
	},

	// Support: Android<4.1
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArraylike( Object(arr) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		return arr == null ? -1 : indexOf.call( arr, elem, i );
	},

	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		for ( ; j < len; j++ ) {
			first[ i++ ] = second[ j ];
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var value,
			i = 0,
			length = elems.length,
			isArray = isArraylike( elems ),
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArray ) {
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var tmp, args, proxy;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	now: Date.now,

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
});

// Populate the class2type map
jQuery.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
});

function isArraylike( obj ) {
	var length = obj.length,
		type = jQuery.type( obj );

	if ( type === "function" || jQuery.isWindow( obj ) ) {
		return false;
	}

	if ( obj.nodeType === 1 && length ) {
		return true;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v2.2.0-pre
 * http://sizzlejs.com/
 *
 * Copyright 2008, 2014 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2014-12-16
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + 1 * new Date(),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// General-purpose constants
	MAX_NEGATIVE = 1 << 31,

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf as it's faster than native
	// http://jsperf.com/thor-indexof-vs-for/5
	indexOf = function( list, elem ) {
		var i = 0,
			len = list.length;
		for ( ; i < len; i++ ) {
			if ( list[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// Whitespace characters http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",
	// http://www.w3.org/TR/css3-syntax/#characters
	characterEncoding = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

	// Loosely modeled on CSS identifier characters
	// An unquoted value should be a CSS identifier http://www.w3.org/TR/css3-selectors/#attribute-selectors
	// Proper syntax: http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = characterEncoding.replace( "w", "w#" ),

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + characterEncoding + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + characterEncoding + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rwhitespace = new RegExp( whitespace + "+", "g" ),
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + characterEncoding + ")" ),
		"CLASS": new RegExp( "^\\.(" + characterEncoding + ")" ),
		"TAG": new RegExp( "^(" + characterEncoding.replace( "w", "w*" ) + ")" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,
	rescape = /'|\\/g,

	// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	},

	// Used for iframes
	// See setDocument()
	// Removing the function wrapper causes a "Permission Denied"
	// error in IE
	unloadHandler = function() {
		setDocument();
	};

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var match, elem, m, nodeType,
		// QSA vars
		i, groups, old, nid, newContext, newSelector;

	if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
		setDocument( context );
	}

	context = context || document;
	results = results || [];
	nodeType = context.nodeType;

	if ( typeof selector !== "string" || !selector ||
		nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

		return results;
	}

	if ( !seed && documentIsHTML ) {

		// Try to shortcut find operations when possible (e.g., not under DocumentFragment)
		if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {
			// Speed-up: Sizzle("#ID")
			if ( (m = match[1]) ) {
				if ( nodeType === 9 ) {
					elem = context.getElementById( m );
					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document (jQuery #6963)
					if ( elem && elem.parentNode ) {
						// Handle the case where IE, Opera, and Webkit return items
						// by name instead of ID
						if ( elem.id === m ) {
							results.push( elem );
							return results;
						}
					} else {
						return results;
					}
				} else {
					// Context is not a document
					if ( context.ownerDocument && (elem = context.ownerDocument.getElementById( m )) &&
						contains( context, elem ) && elem.id === m ) {
						results.push( elem );
						return results;
					}
				}

			// Speed-up: Sizzle("TAG")
			} else if ( match[2] ) {
				push.apply( results, context.getElementsByTagName( selector ) );
				return results;

			// Speed-up: Sizzle(".CLASS")
			} else if ( (m = match[3]) && support.getElementsByClassName ) {
				push.apply( results, context.getElementsByClassName( m ) );
				return results;
			}
		}

		// QSA path
		if ( support.qsa && (!rbuggyQSA || !rbuggyQSA.test( selector )) ) {
			nid = old = expando;
			newContext = context;
			newSelector = nodeType !== 1 && selector;

			// qSA works strangely on Element-rooted queries
			// We can work around this by specifying an extra ID on the root
			// and working up from there (Thanks to Andrew Dupont for the technique)
			// IE 8 doesn't work on object elements
			if ( nodeType === 1 && context.nodeName.toLowerCase() !== "object" ) {
				groups = tokenize( selector );

				if ( (old = context.getAttribute("id")) ) {
					nid = old.replace( rescape, "\\$&" );
				} else {
					context.setAttribute( "id", nid );
				}
				nid = "[id='" + nid + "'] ";

				i = groups.length;
				while ( i-- ) {
					groups[i] = nid + toSelector( groups[i] );
				}
				newContext = rsibling.test( selector ) && testContext( context.parentNode ) || context;
				newSelector = groups.join(",");
			}

			if ( newSelector ) {
				try {
					push.apply( results,
						newContext.querySelectorAll( newSelector )
					);
					return results;
				} catch(qsaError) {
				} finally {
					if ( !old ) {
						context.removeAttribute("id");
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {Function(string, Object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created div and expects a boolean result
 */
function assert( fn ) {
	var div = document.createElement("div");

	try {
		return !!fn( div );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( div.parentNode ) {
			div.parentNode.removeChild( div );
		}
		// release memory in IE
		div = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = attrs.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			( ~b.sourceIndex || MAX_NEGATIVE ) -
			( ~a.sourceIndex || MAX_NEGATIVE );

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== "undefined" && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare, parent,
		doc = node ? node.ownerDocument || node : preferredDoc;

	// If no document and documentElement is available, return
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Set our document
	document = doc;
	docElem = doc.documentElement;
	parent = doc.defaultView;

	// Support: IE>8
	// If iframe document is assigned to "document" variable and if iframe has been reloaded,
	// IE will throw "permission denied" error when accessing "document" variable, see jQuery #13936
	// IE6-8 do not support the defaultView property so parent will be undefined
	if ( parent && parent !== parent.top ) {
		// IE11 does not have attachEvent, so all must suffer
		if ( parent.addEventListener ) {
			parent.addEventListener( "unload", unloadHandler, false );
		} else if ( parent.attachEvent ) {
			parent.attachEvent( "onunload", unloadHandler );
		}
	}

	/* Support tests
	---------------------------------------------------------------------- */
	documentIsHTML = !isXML( doc );

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties
	// (excepting IE8 booleans)
	support.attributes = assert(function( div ) {
		div.className = "i";
		return !div.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( div ) {
		div.appendChild( doc.createComment("") );
		return !div.getElementsByTagName("*").length;
	});

	// Support: IE<9
	support.getElementsByClassName = rnative.test( doc.getElementsByClassName );

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( div ) {
		docElem.appendChild( div ).id = expando;
		return !doc.getElementsByName || !doc.getElementsByName( expando ).length;
	});

	// ID find and filter
	if ( support.getById ) {
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var m = context.getElementById( id );
				// Check parentNode to catch when Blackberry 4.6 returns
				// nodes that are no longer in the document #6963
				return m && m.parentNode ? [ m ] : [];
			}
		};
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
	} else {
		// Support: IE6/7
		// getElementById is not reliable as a find shortcut
		delete Expr.find["ID"];

		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== "undefined" && elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== "undefined" ) {
				return context.getElementsByTagName( tag );

			// DocumentFragment nodes don't have gEBTN
			} else if ( support.qsa ) {
				return context.querySelectorAll( tag );
			}
		} :

		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See http://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( doc.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( div ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// http://bugs.jquery.com/ticket/12359
			docElem.appendChild( div ).innerHTML = "<a id='" + expando + "'></a>" +
				"<select id='" + expando + "-\f]' msallowcapture=''>" +
				"<option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// http://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( div.querySelectorAll("[msallowcapture^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !div.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Support: Chrome<29, Android<4.2+, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.7+
			if ( !div.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
				rbuggyQSA.push("~=");
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}

			// Support: Safari 8+, iOS 8+
			// https://bugs.webkit.org/show_bug.cgi?id=136851
			// In-page `selector#id sibing-combinator selector` fails
			if ( !div.querySelectorAll( "a#" + expando + "+*" ).length ) {
				rbuggyQSA.push(".#.+[+~]");
			}
		});

		assert(function( div ) {
			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = doc.createElement("input");
			input.setAttribute( "type", "hidden" );
			div.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( div.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":enabled").length ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			div.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( div ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( div, "div" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( div, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully does not implement inclusive descendent
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === doc || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === doc || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === doc ? -1 :
				b === doc ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return doc;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch (e) {}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, outerCache, node, diff, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) {
										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {
							// Seek `elem` from a previously-cached index
							outerCache = parent[ expando ] || (parent[ expando ] = {});
							cache = outerCache[ type ] || [];
							nodeIndex = cache[0] === dirruns && cache[1];
							diff = cache[0] === dirruns && cache[2];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									outerCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						// Use previously-cached element index if available
						} else if ( useCache && (cache = (elem[ expando ] || (elem[ expando ] = {}))[ type ]) && cache[0] === dirruns ) {
							diff = cache[1];

						// xml :nth-child(...) or :nth-last-child(...) or :nth(-last)?-of-type(...)
						} else {
							// Use the same loop as above to seek `elem` from the start
							while ( (node = ++nodeIndex && node && node[ dir ] ||
								(diff = nodeIndex = 0) || start.pop()) ) {

								if ( ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) && ++diff ) {
									// Cache the index of each encountered element
									if ( useCache ) {
										(node[ expando ] || (node[ expando ] = {}))[ type ] = [ dirruns, diff ];
									}

									if ( node === elem ) {
										break;
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					// Don't keep the element (issue #299)
					input[0] = null;
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			text = text.replace( runescape, funescape );
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": function( elem ) {
			return elem.disabled === false;
		},

		"disabled": function( elem ) {
			return elem.disabled === true;
		},

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		checkNonElements = base && dir === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from dir caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});
						if ( (oldCache = outerCache[ dir ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							outerCache[ dir ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
			// Avoid hanging onto element (issue #299)
			checkContext = null;
			return ret;
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context !== document && context;
			}

			// Add elements passing elementMatchers directly to results
			// Keep `i` a string if there are no elements so `matchedCount` will be "00" below
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context, xml ) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// Apply set filters to unmatched elements
			matchedCount += i;
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	// Try to minimize operations if there is no seed and only one group
	if ( match.length === 1 ) {

		// Take a shortcut and set the context if the root selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				support.getById && context.nodeType === 9 && documentIsHTML &&
				Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[i];

			// Abort if we hit a combinator
			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {
				// Search, expanding context for leading sibling combinators
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome 14-35+
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( div1 ) {
	// Should return 1, but returns 4 (following)
	return div1.compareDocumentPosition( document.createElement("div") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( div ) {
	div.innerHTML = "<a href='#'></a>";
	return div.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( div ) {
	div.innerHTML = "<input/>";
	div.firstChild.setAttribute( "value", "" );
	return div.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( div ) {
	return div.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;
jQuery.expr[":"] = jQuery.expr.pseudos;
jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;



var rneedsContext = jQuery.expr.match.needsContext;

var rsingleTag = (/^<(\w+)\s*\/?>(?:<\/\1>|)$/);



var risSimple = /^.[^:#\[\.,]*$/;

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			/* jshint -W018 */
			return !!qualifier.call( elem, i, elem ) !== not;
		});

	}

	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		});

	}

	if ( typeof qualifier === "string" ) {
		if ( risSimple.test( qualifier ) ) {
			return jQuery.filter( qualifier, elements, not );
		}

		qualifier = jQuery.filter( qualifier, elements );
	}

	return jQuery.grep( elements, function( elem ) {
		return ( indexOf.call( qualifier, elem ) >= 0 ) !== not;
	});
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	return elems.length === 1 && elem.nodeType === 1 ?
		jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [] :
		jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
			return elem.nodeType === 1;
		}));
};

jQuery.fn.extend({
	find: function( selector ) {
		var i,
			len = this.length,
			ret = [],
			self = this;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter(function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			}) );
		}

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		// Needed because $( selector, context ) becomes $( context ).find( selector )
		ret = this.pushStack( len > 1 ? jQuery.unique( ret ) : ret );
		ret.selector = this.selector ? this.selector + " " + selector : selector;
		return ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow(this, selector || [], false) );
	},
	not: function( selector ) {
		return this.pushStack( winnow(this, selector || [], true) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
});


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,

	init = jQuery.fn.init = function( selector, context ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector[0] === "<" && selector[ selector.length - 1 ] === ">" && selector.length >= 3 ) {
				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && (match[1] || !context) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[1] ) {
					context = context instanceof jQuery ? context[0] : context;

					// Option to run scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[1],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[1] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {
							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[2] );

					// Support: Blackberry 4.6
					// gEBID returns nodes no longer in the document (#6963)
					if ( elem && elem.parentNode ) {
						// Inject the element directly into the jQuery object
						this.length = 1;
						this[0] = elem;
					}

					this.context = document;
					this.selector = selector;
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || rootjQuery ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this.context = this[0] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return typeof rootjQuery.ready !== "undefined" ?
				rootjQuery.ready( selector ) :
				// Execute immediately if ready is not present
				selector( jQuery );
		}

		if ( selector.selector !== undefined ) {
			this.selector = selector.selector;
			this.context = selector.context;
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,
	// Methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.extend({
	dir: function( elem, dir, until ) {
		var matched = [],
			truncate = until !== undefined;

		while ( (elem = elem[ dir ]) && elem.nodeType !== 9 ) {
			if ( elem.nodeType === 1 ) {
				if ( truncate && jQuery( elem ).is( until ) ) {
					break;
				}
				matched.push( elem );
			}
		}
		return matched;
	},

	sibling: function( n, elem ) {
		var matched = [];

		for ( ; n; n = n.nextSibling ) {
			if ( n.nodeType === 1 && n !== elem ) {
				matched.push( n );
			}
		}

		return matched;
	}
});

jQuery.fn.extend({
	has: function( target ) {
		var targets = jQuery( target, this ),
			l = targets.length;

		return this.filter(function() {
			var i = 0;
			for ( ; i < l; i++ ) {
				if ( jQuery.contains( this, targets[i] ) ) {
					return true;
				}
			}
		});
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			pos = rneedsContext.test( selectors ) || typeof selectors !== "string" ?
				jQuery( selectors, context || this.context ) :
				0;

		for ( ; i < l; i++ ) {
			for ( cur = this[i]; cur && cur !== context; cur = cur.parentNode ) {
				// Always skip document fragments
				if ( cur.nodeType < 11 && (pos ?
					pos.index(cur) > -1 :

					// Don't pass non-elements to Sizzle
					cur.nodeType === 1 &&
						jQuery.find.matchesSelector(cur, selectors)) ) {

					matched.push( cur );
					break;
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.unique( matched ) : matched );
	},

	// Determine the position of an element within the set
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
		}

		// Index in selector
		if ( typeof elem === "string" ) {
			return indexOf.call( jQuery( elem ), this[ 0 ] );
		}

		// Locate the position of the desired element
		return indexOf.call( this,

			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[ 0 ] : elem
		);
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.unique(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter(selector)
		);
	}
});

function sibling( cur, dir ) {
	while ( (cur = cur[dir]) && cur.nodeType !== 1 ) {}
	return cur;
}

jQuery.each({
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return jQuery.dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return jQuery.dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return jQuery.dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return jQuery.sibling( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return jQuery.sibling( elem.firstChild );
	},
	contents: function( elem ) {
		return elem.contentDocument || jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var matched = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			matched = jQuery.filter( selector, matched );
		}

		if ( this.length > 1 ) {
			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				jQuery.unique( matched );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				matched.reverse();
			}
		}

		return this.pushStack( matched );
	};
});
var rnotwhite = (/\S+/g);



// String to Object options format cache
var optionsCache = {};

// Convert String-formatted options into Object-formatted ones and store in cache
function createOptions( options ) {
	var object = optionsCache[ options ] = {};
	jQuery.each( options.match( rnotwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	});
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		( optionsCache[ options ] || createOptions( options ) ) :
		jQuery.extend( {}, options );

	var // Last fire value (for non-forgettable lists)
		memory,
		// Flag to know if list was already fired
		fired,
		// Flag to know if list is currently firing
		firing,
		// First callback to fire (used internally by add and fireWith)
		firingStart,
		// End of the loop when firing
		firingLength,
		// Index of currently firing callback (modified by remove if needed)
		firingIndex,
		// Actual callback list
		list = [],
		// Stack of fire calls for repeatable lists
		stack = !options.once && [],
		// Fire callbacks
		fire = function( data ) {
			memory = options.memory && data;
			fired = true;
			firingIndex = firingStart || 0;
			firingStart = 0;
			firingLength = list.length;
			firing = true;
			for ( ; list && firingIndex < firingLength; firingIndex++ ) {
				if ( list[ firingIndex ].apply( data[ 0 ], data[ 1 ] ) === false && options.stopOnFalse ) {
					memory = false; // To prevent further calls using add
					break;
				}
			}
			firing = false;
			if ( list ) {
				if ( stack ) {
					if ( stack.length ) {
						fire( stack.shift() );
					}
				} else if ( memory ) {
					list = [];
				} else {
					self.disable();
				}
			}
		},
		// Actual Callbacks object
		self = {
			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {
					// First, we save the current length
					var start = list.length;
					(function add( args ) {
						jQuery.each( args, function( _, arg ) {
							var type = jQuery.type( arg );
							if ( type === "function" ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && type !== "string" ) {
								// Inspect recursively
								add( arg );
							}
						});
					})( arguments );
					// Do we need to add the callbacks to the
					// current firing batch?
					if ( firing ) {
						firingLength = list.length;
					// With memory, if we're not firing then
					// we should call right away
					} else if ( memory ) {
						firingStart = start;
						fire( memory );
					}
				}
				return this;
			},
			// Remove a callback from the list
			remove: function() {
				if ( list ) {
					jQuery.each( arguments, function( _, arg ) {
						var index;
						while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
							list.splice( index, 1 );
							// Handle firing indexes
							if ( firing ) {
								if ( index <= firingLength ) {
									firingLength--;
								}
								if ( index <= firingIndex ) {
									firingIndex--;
								}
							}
						}
					});
				}
				return this;
			},
			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ? jQuery.inArray( fn, list ) > -1 : !!( list && list.length );
			},
			// Remove all callbacks from the list
			empty: function() {
				list = [];
				firingLength = 0;
				return this;
			},
			// Have the list do nothing anymore
			disable: function() {
				list = stack = memory = undefined;
				return this;
			},
			// Is it disabled?
			disabled: function() {
				return !list;
			},
			// Lock the list in its current state
			lock: function() {
				stack = undefined;
				if ( !memory ) {
					self.disable();
				}
				return this;
			},
			// Is it locked?
			locked: function() {
				return !stack;
			},
			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( list && ( !fired || stack ) ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					if ( firing ) {
						stack.push( args );
					} else {
						fire( args );
					}
				}
				return this;
			},
			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},
			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


jQuery.extend({

	Deferred: function( func ) {
		var tuples = [
				// action, add listener, listener list, final state
				[ "resolve", "done", jQuery.Callbacks("once memory"), "resolved" ],
				[ "reject", "fail", jQuery.Callbacks("once memory"), "rejected" ],
				[ "notify", "progress", jQuery.Callbacks("memory") ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				then: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;
					return jQuery.Deferred(function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {
							var fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];
							// deferred[ done | fail | progress ] for forwarding actions to newDefer
							deferred[ tuple[1] ](function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.done( newDefer.resolve )
										.fail( newDefer.reject )
										.progress( newDefer.notify );
								} else {
									newDefer[ tuple[ 0 ] + "With" ]( this === promise ? newDefer.promise() : this, fn ? [ returned ] : arguments );
								}
							});
						});
						fns = null;
					}).promise();
				},
				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Keep pipe for back-compat
		promise.pipe = promise.then;

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 3 ];

			// promise[ done | fail | progress ] = list.add
			promise[ tuple[1] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add(function() {
					// state = [ resolved | rejected ]
					state = stateString;

				// [ reject_list | resolve_list ].disable; progress_list.lock
				}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
			}

			// deferred[ resolve | reject | notify ]
			deferred[ tuple[0] ] = function() {
				deferred[ tuple[0] + "With" ]( this === deferred ? promise : this, arguments );
				return this;
			};
			deferred[ tuple[0] + "With" ] = list.fireWith;
		});

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( subordinate /* , ..., subordinateN */ ) {
		var i = 0,
			resolveValues = slice.call( arguments ),
			length = resolveValues.length,

			// the count of uncompleted subordinates
			remaining = length !== 1 || ( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

			// the master Deferred. If resolveValues consist of only a single Deferred, just use that.
			deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

			// Update function for both resolve and progress values
			updateFunc = function( i, contexts, values ) {
				return function( value ) {
					contexts[ i ] = this;
					values[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( values === progressValues ) {
						deferred.notifyWith( contexts, values );
					} else if ( !( --remaining ) ) {
						deferred.resolveWith( contexts, values );
					}
				};
			},

			progressValues, progressContexts, resolveContexts;

		// Add listeners to Deferred subordinates; treat others as resolved
		if ( length > 1 ) {
			progressValues = new Array( length );
			progressContexts = new Array( length );
			resolveContexts = new Array( length );
			for ( ; i < length; i++ ) {
				if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
					resolveValues[ i ].promise()
						.done( updateFunc( i, resolveContexts, resolveValues ) )
						.fail( deferred.reject )
						.progress( updateFunc( i, progressContexts, progressValues ) );
				} else {
					--remaining;
				}
			}
		}

		// If we're not waiting on anything, resolve the master
		if ( !remaining ) {
			deferred.resolveWith( resolveContexts, resolveValues );
		}

		return deferred.promise();
	}
});


// The deferred used on DOM ready
var readyList;

jQuery.fn.ready = function( fn ) {
	// Add the callback
	jQuery.ready.promise().done( fn );

	return this;
};

jQuery.extend({
	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Hold (or release) the ready event
	holdReady: function( hold ) {
		if ( hold ) {
			jQuery.readyWait++;
		} else {
			jQuery.ready( true );
		}
	},

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );

		// Trigger any bound ready events
		if ( jQuery.fn.triggerHandler ) {
			jQuery( document ).triggerHandler( "ready" );
			jQuery( document ).off( "ready" );
		}
	}
});

/**
 * The ready event handler and self cleanup method
 */
function completed() {
	document.removeEventListener( "DOMContentLoaded", completed, false );
	window.removeEventListener( "load", completed, false );
	jQuery.ready();
}

jQuery.ready.promise = function( obj ) {
	if ( !readyList ) {

		readyList = jQuery.Deferred();

		// Catch cases where $(document).ready() is called after the browser event has already occurred.
		// We once tried to use readyState "interactive" here, but it caused issues like the one
		// discovered by ChrisS here: http://bugs.jquery.com/ticket/12282#comment:15
		if ( document.readyState === "complete" ) {
			// Handle it asynchronously to allow scripts the opportunity to delay ready
			setTimeout( jQuery.ready );

		} else {

			// Use the handy event callback
			document.addEventListener( "DOMContentLoaded", completed, false );

			// A fallback to window.onload, that will always work
			window.addEventListener( "load", completed, false );
		}
	}
	return readyList.promise( obj );
};

// Kick off the DOM ready check even if the user does not
jQuery.ready.promise();




// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = jQuery.access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		len = elems.length,
		bulk = key == null;

	// Sets many values
	if ( jQuery.type( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			jQuery.access( elems, fn, i, key[i], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !jQuery.isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {
			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < len; i++ ) {
				fn( elems[i], key, raw ? value : value.call( elems[i], i, fn( elems[i], key ) ) );
			}
		}
	}

	return chainable ?
		elems :

		// Gets
		bulk ?
			fn.call( elems ) :
			len ? fn( elems[0], key ) : emptyGet;
};


/**
 * Determines whether an object can have data
 */
jQuery.acceptData = function( owner ) {
	// Accepts only:
	//  - Node
	//    - Node.ELEMENT_NODE
	//    - Node.DOCUMENT_NODE
	//  - Object
	//    - Any
	/* jshint -W018 */
	return owner.nodeType === 1 || owner.nodeType === 9 || !( +owner.nodeType );
};


function Data() {
	// Support: Android<4,
	// Old WebKit does not have Object.preventExtensions/freeze method,
	// return new empty object instead with no [[set]] accessor
	Object.defineProperty( this.cache = {}, 0, {
		get: function() {
			return {};
		}
	});

	this.expando = jQuery.expando + Data.uid++;
}

Data.uid = 1;
Data.accepts = jQuery.acceptData;

Data.prototype = {
	key: function( owner ) {
		// We can accept data for non-element nodes in modern browsers,
		// but we should not, see #8335.
		// Always return the key for a frozen object.
		if ( !Data.accepts( owner ) ) {
			return 0;
		}

		var descriptor = {},
			// Check if the owner object already has a cache key
			unlock = owner[ this.expando ];

		// If not, create one
		if ( !unlock ) {
			unlock = Data.uid++;

			// Secure it in a non-enumerable, non-writable property
			try {
				descriptor[ this.expando ] = { value: unlock };
				Object.defineProperties( owner, descriptor );

			// Support: Android<4
			// Fallback to a less secure definition
			} catch ( e ) {
				descriptor[ this.expando ] = unlock;
				jQuery.extend( owner, descriptor );
			}
		}

		// Ensure the cache object
		if ( !this.cache[ unlock ] ) {
			this.cache[ unlock ] = {};
		}

		return unlock;
	},
	set: function( owner, data, value ) {
		var prop,
			// There may be an unlock assigned to this node,
			// if there is no entry for this "owner", create one inline
			// and set the unlock as though an owner entry had always existed
			unlock = this.key( owner ),
			cache = this.cache[ unlock ];

		// Handle: [ owner, key, value ] args
		if ( typeof data === "string" ) {
			cache[ data ] = value;

		// Handle: [ owner, { properties } ] args
		} else {
			// Fresh assignments by object are shallow copied
			if ( jQuery.isEmptyObject( cache ) ) {
				jQuery.extend( this.cache[ unlock ], data );
			// Otherwise, copy the properties one-by-one to the cache object
			} else {
				for ( prop in data ) {
					cache[ prop ] = data[ prop ];
				}
			}
		}
		return cache;
	},
	get: function( owner, key ) {
		// Either a valid cache is found, or will be created.
		// New caches will be created and the unlock returned,
		// allowing direct access to the newly created
		// empty data object. A valid owner object must be provided.
		var cache = this.cache[ this.key( owner ) ];

		return key === undefined ?
			cache : cache[ key ];
	},
	access: function( owner, key, value ) {
		var stored;
		// In cases where either:
		//
		//   1. No key was specified
		//   2. A string key was specified, but no value provided
		//
		// Take the "read" path and allow the get method to determine
		// which value to return, respectively either:
		//
		//   1. The entire cache object
		//   2. The data stored at the key
		//
		if ( key === undefined ||
				((key && typeof key === "string") && value === undefined) ) {

			stored = this.get( owner, key );

			return stored !== undefined ?
				stored : this.get( owner, jQuery.camelCase(key) );
		}

		// [*]When the key is not a string, or both a key and value
		// are specified, set or extend (existing objects) with either:
		//
		//   1. An object of properties
		//   2. A key and value
		//
		this.set( owner, key, value );

		// Since the "set" path can have two possible entry points
		// return the expected data based on which path was taken[*]
		return value !== undefined ? value : key;
	},
	remove: function( owner, key ) {
		var i, name, camel,
			unlock = this.key( owner ),
			cache = this.cache[ unlock ];

		if ( key === undefined ) {
			this.cache[ unlock ] = {};

		} else {
			// Support array or space separated string of keys
			if ( jQuery.isArray( key ) ) {
				// If "name" is an array of keys...
				// When data is initially created, via ("key", "val") signature,
				// keys will be converted to camelCase.
				// Since there is no way to tell _how_ a key was added, remove
				// both plain key and camelCase key. #12786
				// This will only penalize the array argument path.
				name = key.concat( key.map( jQuery.camelCase ) );
			} else {
				camel = jQuery.camelCase( key );
				// Try the string as a key before any manipulation
				if ( key in cache ) {
					name = [ key, camel ];
				} else {
					// If a key with the spaces exists, use it.
					// Otherwise, create an array by matching non-whitespace
					name = camel;
					name = name in cache ?
						[ name ] : ( name.match( rnotwhite ) || [] );
				}
			}

			i = name.length;
			while ( i-- ) {
				delete cache[ name[ i ] ];
			}
		}
	},
	hasData: function( owner ) {
		return !jQuery.isEmptyObject(
			this.cache[ owner[ this.expando ] ] || {}
		);
	},
	discard: function( owner ) {
		if ( owner[ this.expando ] ) {
			delete this.cache[ owner[ this.expando ] ];
		}
	}
};
var data_priv = new Data();

var data_user = new Data();



//	Implementation Summary
//
//	1. Enforce API surface and semantic compatibility with 1.9.x branch
//	2. Improve the module's maintainability by reducing the storage
//		paths to a single mechanism.
//	3. Use the same single mechanism to support "private" and "user" data.
//	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
//	5. Avoid exposing implementation details on user objects (eg. expando properties)
//	6. Provide a clear path for implementation upgrade to WeakMap in 2014

var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /([A-Z])/g;

function dataAttr( elem, key, data ) {
	var name;

	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {
		name = "data-" + key.replace( rmultiDash, "-$1" ).toLowerCase();
		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = data === "true" ? true :
					data === "false" ? false :
					data === "null" ? null :
					// Only convert to a number if it doesn't change the string
					+data + "" === data ? +data :
					rbrace.test( data ) ? jQuery.parseJSON( data ) :
					data;
			} catch( e ) {}

			// Make sure we set the data so it isn't changed later
			data_user.set( elem, key, data );
		} else {
			data = undefined;
		}
	}
	return data;
}

jQuery.extend({
	hasData: function( elem ) {
		return data_user.hasData( elem ) || data_priv.hasData( elem );
	},

	data: function( elem, name, data ) {
		return data_user.access( elem, name, data );
	},

	removeData: function( elem, name ) {
		data_user.remove( elem, name );
	},

	// TODO: Now that all calls to _data and _removeData have been replaced
	// with direct calls to data_priv methods, these can be deprecated.
	_data: function( elem, name, data ) {
		return data_priv.access( elem, name, data );
	},

	_removeData: function( elem, name ) {
		data_priv.remove( elem, name );
	}
});

jQuery.fn.extend({
	data: function( key, value ) {
		var i, name, data,
			elem = this[ 0 ],
			attrs = elem && elem.attributes;

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = data_user.get( elem );

				if ( elem.nodeType === 1 && !data_priv.get( elem, "hasDataAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE11+
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = jQuery.camelCase( name.slice(5) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					data_priv.set( elem, "hasDataAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each(function() {
				data_user.set( this, key );
			});
		}

		return access( this, function( value ) {
			var data,
				camelKey = jQuery.camelCase( key );

			// The calling jQuery object (element matches) is not empty
			// (and therefore has an element appears at this[ 0 ]) and the
			// `value` parameter was not undefined. An empty jQuery object
			// will result in `undefined` for elem = this[ 0 ] which will
			// throw an exception if an attempt to read a data cache is made.
			if ( elem && value === undefined ) {
				// Attempt to get data from the cache
				// with the key as-is
				data = data_user.get( elem, key );
				if ( data !== undefined ) {
					return data;
				}

				// Attempt to get data from the cache
				// with the key camelized
				data = data_user.get( elem, camelKey );
				if ( data !== undefined ) {
					return data;
				}

				// Attempt to "discover" the data in
				// HTML5 custom data-* attrs
				data = dataAttr( elem, camelKey, undefined );
				if ( data !== undefined ) {
					return data;
				}

				// We tried really hard, but the data doesn't exist.
				return;
			}

			// Set the data...
			this.each(function() {
				// First, attempt to store a copy or reference of any
				// data that might've been store with a camelCased key.
				var data = data_user.get( this, camelKey );

				// For HTML5 data-* attribute interop, we have to
				// store property names with dashes in a camelCase form.
				// This might not apply to all properties...*
				data_user.set( this, camelKey, value );

				// *... In the case of properties that might _actually_
				// have dashes, we need to also store a copy of that
				// unchanged property.
				if ( key.indexOf("-") !== -1 && data !== undefined ) {
					data_user.set( this, key, value );
				}
			});
		}, null, value, arguments.length > 1, null, true );
	},

	removeData: function( key ) {
		return this.each(function() {
			data_user.remove( this, key );
		});
	}
});


jQuery.extend({
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = data_priv.get( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || jQuery.isArray( data ) ) {
					queue = data_priv.access( elem, type, jQuery.makeArray(data) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// Clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// Not public - generate a queueHooks object, or return the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return data_priv.get( elem, key ) || data_priv.access( elem, key, {
			empty: jQuery.Callbacks("once memory").add(function() {
				data_priv.remove( elem, [ type + "queue", key ] );
			})
		});
	}
});

jQuery.fn.extend({
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[0], type );
		}

		return data === undefined ?
			this :
			this.each(function() {
				var queue = jQuery.queue( this, type, data );

				// Ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[0] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			});
	},
	dequeue: function( type ) {
		return this.each(function() {
			jQuery.dequeue( this, type );
		});
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},
	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = data_priv.get( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
});
var pnum = (/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/).source;

var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHidden = function( elem, el ) {
		// isHidden might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;
		return jQuery.css( elem, "display" ) === "none" || !jQuery.contains( elem.ownerDocument, elem );
	};

var rcheckableType = (/^(?:checkbox|radio)$/i);



(function() {
	var fragment = document.createDocumentFragment(),
		div = fragment.appendChild( document.createElement( "div" ) ),
		input = document.createElement( "input" );

	// Support: Safari<=5.1
	// Check state lost if the name is set (#11217)
	// Support: Windows Web Apps (WWA)
	// `name` and `type` must use .setAttribute for WWA (#14901)
	input.setAttribute( "type", "radio" );
	input.setAttribute( "checked", "checked" );
	input.setAttribute( "name", "t" );

	div.appendChild( input );

	// Support: Safari<=5.1, Android<4.2
	// Older WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE<=11+
	// Make sure textarea (and checkbox) defaultValue is properly cloned
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;
})();
var strundefined = typeof undefined;



support.focusinBubbles = "onfocusin" in window;


var
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu)|click/,
	rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)$/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {

		var handleObjIn, eventHandle, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = data_priv.get( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !(events = elemData.events) ) {
			events = elemData.events = {};
		}
		if ( !(eventHandle = elemData.handle) ) {
			eventHandle = elemData.handle = function( e ) {
				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== strundefined && jQuery.event.triggered !== e.type ?
					jQuery.event.dispatch.apply( elem, arguments ) : undefined;
			};
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend({
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join(".")
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !(handlers = events[ type ]) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener if the special events handler returns false
				if ( !special.setup || special.setup.call( elem, data, namespaces, eventHandle ) === false ) {
					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle, false );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {

		var j, origCount, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = data_priv.hasData( elem ) && data_priv.get( elem );

		if ( !elemData || !(events = elemData.events) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[2] && new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector || selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown || special.teardown.call( elem, namespaces, elemData.handle ) === false ) {
					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			delete elemData.handle;
			data_priv.remove( elem, "events" );
		}
	},

	trigger: function( event, data, elem, onlyHandlers ) {

		var i, cur, tmp, bubbleType, ontype, handle, special,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split(".") : [];

		cur = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf(".") >= 0 ) {
			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split(".");
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf(":") < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join(".");
		event.namespace_re = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === (elem.ownerDocument || document) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( (cur = eventPath[i++]) && !event.isPropagationStopped() ) {

			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( data_priv.get( cur, "events" ) || {} )[ event.type ] && data_priv.get( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && jQuery.acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( (!special._default || special._default.apply( eventPath.pop(), data ) === false) &&
				jQuery.acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name name as the event.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && jQuery.isFunction( elem[ type ] ) && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					elem[ type ]();
					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	dispatch: function( event ) {

		// Make a writable jQuery.Event from the native event object
		event = jQuery.event.fix( event );

		var i, j, ret, matched, handleObj,
			handlerQueue = [],
			args = slice.call( arguments ),
			handlers = ( data_priv.get( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[0] = event;
		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( (matched = handlerQueue[ i++ ]) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( (handleObj = matched.handlers[ j++ ]) && !event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or 2) have namespace(s)
				// a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.namespace_re || event.namespace_re.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( (jQuery.event.special[ handleObj.origType ] || {}).handle || handleObj.handler )
							.apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( (event.result = ret) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var i, matches, sel, handleObj,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Find delegate handlers
		// Black-hole SVG <use> instance trees (#13180)
		// Avoid non-left-click bubbling in Firefox (#3861)
		if ( delegateCount && cur.nodeType && (!event.button || event.type !== "click") ) {

			for ( ; cur !== this; cur = cur.parentNode || this ) {

				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.disabled !== true || event.type !== "click" ) {
					matches = [];
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matches[ sel ] === undefined ) {
							matches[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) >= 0 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matches[ sel ] ) {
							matches.push( handleObj );
						}
					}
					if ( matches.length ) {
						handlerQueue.push({ elem: cur, handlers: matches });
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		if ( delegateCount < handlers.length ) {
			handlerQueue.push({ elem: this, handlers: handlers.slice( delegateCount ) });
		}

		return handlerQueue;
	},

	// Includes some event props shared by KeyEvent and MouseEvent
	props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),

	fixHooks: {},

	keyHooks: {
		props: "char charCode key keyCode".split(" "),
		filter: function( event, original ) {

			// Add which for key events
			if ( event.which == null ) {
				event.which = original.charCode != null ? original.charCode : original.keyCode;
			}

			return event;
		}
	},

	mouseHooks: {
		props: "button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
		filter: function( event, original ) {
			var eventDoc, doc, body,
				button = original.button;

			// Calculate pageX/Y if missing and clientX/Y available
			if ( event.pageX == null && original.clientX != null ) {
				eventDoc = event.target.ownerDocument || document;
				doc = eventDoc.documentElement;
				body = eventDoc.body;

				event.pageX = original.clientX + ( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) - ( doc && doc.clientLeft || body && body.clientLeft || 0 );
				event.pageY = original.clientY + ( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) - ( doc && doc.clientTop  || body && body.clientTop  || 0 );
			}

			// Add which for click: 1 === left; 2 === middle; 3 === right
			// Note: button is not normalized, so don't use it
			if ( !event.which && button !== undefined ) {
				event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
			}

			return event;
		}
	},

	fix: function( event ) {
		if ( event[ jQuery.expando ] ) {
			return event;
		}

		// Create a writable copy of the event object and normalize some properties
		var i, prop, copy,
			type = event.type,
			originalEvent = event,
			fixHook = this.fixHooks[ type ];

		if ( !fixHook ) {
			this.fixHooks[ type ] = fixHook =
				rmouseEvent.test( type ) ? this.mouseHooks :
				rkeyEvent.test( type ) ? this.keyHooks :
				{};
		}
		copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

		event = new jQuery.Event( originalEvent );

		i = copy.length;
		while ( i-- ) {
			prop = copy[ i ];
			event[ prop ] = originalEvent[ prop ];
		}

		// Support: Cordova 2.5 (WebKit) (#13255)
		// All events should have a target; Cordova deviceready doesn't
		if ( !event.target ) {
			event.target = document;
		}

		// Support: Safari 6.0+, Chrome<28
		// Target should not be a text node (#504, #13143)
		if ( event.target.nodeType === 3 ) {
			event.target = event.target.parentNode;
		}

		return fixHook.filter ? fixHook.filter( event, originalEvent ) : event;
	},

	special: {
		load: {
			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {
			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					this.focus();
					return false;
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {
			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( this.type === "checkbox" && this.click && jQuery.nodeName( this, "input" ) ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return jQuery.nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	},

	simulate: function( type, elem, event, bubble ) {
		// Piggyback on a donor event to simulate a different one.
		// Fake originalEvent to avoid donor's stopPropagation, but if the
		// simulated event prevents default then we do the same on the donor.
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true,
				originalEvent: {}
			}
		);
		if ( bubble ) {
			jQuery.event.trigger( e, null, elem );
		} else {
			jQuery.event.dispatch.call( elem, e );
		}
		if ( e.isDefaultPrevented() ) {
			event.preventDefault();
		}
	}
};

jQuery.removeEvent = function( elem, type, handle ) {
	if ( elem.removeEventListener ) {
		elem.removeEventListener( type, handle, false );
	}
};

jQuery.Event = function( src, props ) {
	// Allow instantiation without the 'new' keyword
	if ( !(this instanceof jQuery.Event) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&
				// Support: Android<4.0
				src.returnValue === false ?
			returnTrue :
			returnFalse;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;

		if ( e && e.preventDefault ) {
			e.preventDefault();
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;

		if ( e && e.stopPropagation ) {
			e.stopPropagation();
		}
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && e.stopImmediatePropagation ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Create mouseenter/leave events using mouseover/out and event-time checks
// Support: Chrome 15+
jQuery.each({
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mousenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || (related !== target && !jQuery.contains( target, related )) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
});

// Support: Firefox, Chrome, Safari
// Create "bubbling" focus and blur events
if ( !support.focusinBubbles ) {
	jQuery.each({ focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
				jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ), true );
			};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = data_priv.access( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				data_priv.access( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = data_priv.access( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					data_priv.remove( doc, fix );

				} else {
					data_priv.access( doc, fix, attaches );
				}
			}
		};
	});
}

jQuery.fn.extend({

	on: function( types, selector, data, fn, /*INTERNAL*/ one ) {
		var origFn, type;

		// Types can be a map of types/handlers
		if ( typeof types === "object" ) {
			// ( types-Object, selector, data )
			if ( typeof selector !== "string" ) {
				// ( types-Object, data )
				data = data || selector;
				selector = undefined;
			}
			for ( type in types ) {
				this.on( type, selector, data, types[ type ], one );
			}
			return this;
		}

		if ( data == null && fn == null ) {
			// ( types, fn )
			fn = selector;
			data = selector = undefined;
		} else if ( fn == null ) {
			if ( typeof selector === "string" ) {
				// ( types, selector, fn )
				fn = data;
				data = undefined;
			} else {
				// ( types, data, fn )
				fn = data;
				data = selector;
				selector = undefined;
			}
		}
		if ( fn === false ) {
			fn = returnFalse;
		} else if ( !fn ) {
			return this;
		}

		if ( one === 1 ) {
			origFn = fn;
			fn = function( event ) {
				// Can use an empty set, since event contains the info
				jQuery().off( event );
				return origFn.apply( this, arguments );
			};
			// Use same guid so caller can remove using origFn
			fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
		}
		return this.each( function() {
			jQuery.event.add( this, types, fn, data, selector );
		});
	},
	one: function( types, selector, data, fn ) {
		return this.on( types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {
			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {
			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {
			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each(function() {
			jQuery.event.remove( this, types, fn, selector );
		});
	},

	trigger: function( type, data ) {
		return this.each(function() {
			jQuery.event.trigger( type, data, this );
		});
	},
	triggerHandler: function( type, data ) {
		var elem = this[0];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
});


var
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
	rtagName = /<([\w:]+)/,
	rhtml = /<|&#?\w+;/,
	rnoInnerhtml = /<(?:script|style|link)/i,
	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptType = /^$|\/(?:java|ecma)script/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,

	// We have to close these tags to support XHTML (#13200)
	wrapMap = {

		// Support: IE9
		option: [ 1, "<select multiple='multiple'>", "</select>" ],

		thead: [ 1, "<table>", "</table>" ],
		col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
		tr: [ 2, "<table><tbody>", "</tbody></table>" ],
		td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

		_default: [ 0, "", "" ]
	};

// Support: IE9
wrapMap.optgroup = wrapMap.option;

wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;

// Support: 1.x compatibility
// Manipulating tables requires a tbody
function manipulationTarget( elem, content ) {
	return jQuery.nodeName( elem, "table" ) &&
		jQuery.nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ?

		elem.getElementsByTagName("tbody")[0] ||
			elem.appendChild( elem.ownerDocument.createElement("tbody") ) :
		elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = (elem.getAttribute("type") !== null) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	var match = rscriptTypeMasked.exec( elem.type );

	if ( match ) {
		elem.type = match[ 1 ];
	} else {
		elem.removeAttribute("type");
	}

	return elem;
}

// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		data_priv.set(
			elems[ i ], "globalEval", !refElements || data_priv.get( refElements[ i ], "globalEval" )
		);
	}
}

function cloneCopyEvent( src, dest ) {
	var i, l, type, pdataOld, pdataCur, udataOld, udataCur, events;

	if ( dest.nodeType !== 1 ) {
		return;
	}

	// 1. Copy private data: events, handlers, etc.
	if ( data_priv.hasData( src ) ) {
		pdataOld = data_priv.access( src );
		pdataCur = data_priv.set( dest, pdataOld );
		events = pdataOld.events;

		if ( events ) {
			delete pdataCur.handle;
			pdataCur.events = {};

			for ( type in events ) {
				for ( i = 0, l = events[ type ].length; i < l; i++ ) {
					jQuery.event.add( dest, type, events[ type ][ i ] );
				}
			}
		}
	}

	// 2. Copy user data
	if ( data_user.hasData( src ) ) {
		udataOld = data_user.access( src );
		udataCur = jQuery.extend( {}, udataOld );

		data_user.set( dest, udataCur );
	}
}

function getAll( context, tag ) {
	var ret = context.getElementsByTagName ? context.getElementsByTagName( tag || "*" ) :
			context.querySelectorAll ? context.querySelectorAll( tag || "*" ) :
			[];

	return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
		jQuery.merge( [ context ], ret ) :
		ret;
}

// Fix IE bugs, see support tests
function fixInput( src, dest ) {
	var nodeName = dest.nodeName.toLowerCase();

	// Fails to persist the checked state of a cloned checkbox or radio button.
	if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
		dest.checked = src.checked;

	// Fails to return the selected option to the default selected state when cloning options
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

jQuery.extend({
	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var i, l, srcElements, destElements,
			clone = elem.cloneNode( true ),
			inPage = jQuery.contains( elem.ownerDocument, elem );

		// Fix IE cloning issues
		if ( !support.noCloneChecked && ( elem.nodeType === 1 || elem.nodeType === 11 ) &&
				!jQuery.isXMLDoc( elem ) ) {

			// We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			for ( i = 0, l = srcElements.length; i < l; i++ ) {
				fixInput( srcElements[ i ], destElements[ i ] );
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0, l = srcElements.length; i < l; i++ ) {
					cloneCopyEvent( srcElements[ i ], destElements[ i ] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		// Return the cloned set
		return clone;
	},

	buildFragment: function( elems, context, scripts, selection ) {
		var elem, tmp, tag, wrap, contains, j,
			fragment = context.createDocumentFragment(),
			nodes = [],
			i = 0,
			l = elems.length;

		for ( ; i < l; i++ ) {
			elem = elems[ i ];

			if ( elem || elem === 0 ) {

				// Add nodes directly
				if ( jQuery.type( elem ) === "object" ) {
					// Support: QtWebKit, PhantomJS
					// push.apply(_, arraylike) throws on ancient WebKit
					jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

				// Convert non-html into a text node
				} else if ( !rhtml.test( elem ) ) {
					nodes.push( context.createTextNode( elem ) );

				// Convert html into DOM nodes
				} else {
					tmp = tmp || fragment.appendChild( context.createElement("div") );

					// Deserialize a standard representation
					tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
					wrap = wrapMap[ tag ] || wrapMap._default;
					tmp.innerHTML = wrap[ 1 ] + elem.replace( rxhtmlTag, "<$1></$2>" ) + wrap[ 2 ];

					// Descend through wrappers to the right content
					j = wrap[ 0 ];
					while ( j-- ) {
						tmp = tmp.lastChild;
					}

					// Support: QtWebKit, PhantomJS
					// push.apply(_, arraylike) throws on ancient WebKit
					jQuery.merge( nodes, tmp.childNodes );

					// Remember the top-level container
					tmp = fragment.firstChild;

					// Ensure the created nodes are orphaned (#12392)
					tmp.textContent = "";
				}
			}
		}

		// Remove wrapper from fragment
		fragment.textContent = "";

		i = 0;
		while ( (elem = nodes[ i++ ]) ) {

			// #4087 - If origin and destination elements are the same, and this is
			// that element, do not do anything
			if ( selection && jQuery.inArray( elem, selection ) !== -1 ) {
				continue;
			}

			contains = jQuery.contains( elem.ownerDocument, elem );

			// Append to fragment
			tmp = getAll( fragment.appendChild( elem ), "script" );

			// Preserve script evaluation history
			if ( contains ) {
				setGlobalEval( tmp );
			}

			// Capture executables
			if ( scripts ) {
				j = 0;
				while ( (elem = tmp[ j++ ]) ) {
					if ( rscriptType.test( elem.type || "" ) ) {
						scripts.push( elem );
					}
				}
			}
		}

		return fragment;
	},

	cleanData: function( elems ) {
		var data, elem, type, key,
			special = jQuery.event.special,
			i = 0;

		for ( ; (elem = elems[ i ]) !== undefined; i++ ) {
			if ( jQuery.acceptData( elem ) ) {
				key = elem[ data_priv.expando ];

				if ( key && (data = data_priv.cache[ key ]) ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}
					if ( data_priv.cache[ key ] ) {
						// Discard any remaining `private` data
						delete data_priv.cache[ key ];
					}
				}
			}
			// Discard any remaining `user` data
			delete data_user.cache[ elem[ data_user.expando ] ];
		}
	}
});

jQuery.fn.extend({
	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().each(function() {
					if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
						this.textContent = value;
					}
				});
		}, null, value, arguments.length );
	},

	append: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		});
	},

	prepend: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		});
	},

	before: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		});
	},

	after: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		});
	},

	remove: function( selector, keepData /* Internal Use Only */ ) {
		var elem,
			elems = selector ? jQuery.filter( selector, this ) : this,
			i = 0;

		for ( ; (elem = elems[i]) != null; i++ ) {
			if ( !keepData && elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem ) );
			}

			if ( elem.parentNode ) {
				if ( keepData && jQuery.contains( elem.ownerDocument, elem ) ) {
					setGlobalEval( getAll( elem, "script" ) );
				}
				elem.parentNode.removeChild( elem );
			}
		}

		return this;
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; (elem = this[i]) != null; i++ ) {
			if ( elem.nodeType === 1 ) {

				// Prevent memory leaks
				jQuery.cleanData( getAll( elem, false ) );

				// Remove any remaining nodes
				elem.textContent = "";
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map(function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		});
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined && elem.nodeType === 1 ) {
				return elem.innerHTML;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

				value = value.replace( rxhtmlTag, "<$1></$2>" );

				try {
					for ( ; i < l; i++ ) {
						elem = this[ i ] || {};

						// Remove element nodes and prevent memory leaks
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch( e ) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var arg = arguments[ 0 ];

		// Make the changes, replacing each context element with the new content
		this.domManip( arguments, function( elem ) {
			arg = this.parentNode;

			jQuery.cleanData( getAll( this ) );

			if ( arg ) {
				arg.replaceChild( elem, this );
			}
		});

		// Force removal if there was no new content (e.g., from empty arguments)
		return arg && (arg.length || arg.nodeType) ? this : this.remove();
	},

	detach: function( selector ) {
		return this.remove( selector, true );
	},

	domManip: function( args, callback ) {

		// Flatten any nested arrays
		args = concat.apply( [], args );

		var fragment, first, scripts, hasScripts, node, doc,
			i = 0,
			l = this.length,
			set = this,
			iNoClone = l - 1,
			value = args[ 0 ],
			isFunction = jQuery.isFunction( value );

		// We can't cloneNode fragments that contain checked, in WebKit
		if ( isFunction ||
				( l > 1 && typeof value === "string" &&
					!support.checkClone && rchecked.test( value ) ) ) {
			return this.each(function( index ) {
				var self = set.eq( index );
				if ( isFunction ) {
					args[ 0 ] = value.call( this, index, self.html() );
				}
				self.domManip( args, callback );
			});
		}

		if ( l ) {
			fragment = jQuery.buildFragment( args, this[ 0 ].ownerDocument, false, this );
			first = fragment.firstChild;

			if ( fragment.childNodes.length === 1 ) {
				fragment = first;
			}

			if ( first ) {
				scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
				hasScripts = scripts.length;

				// Use the original fragment for the last item instead of the first because it can end up
				// being emptied incorrectly in certain situations (#8070).
				for ( ; i < l; i++ ) {
					node = fragment;

					if ( i !== iNoClone ) {
						node = jQuery.clone( node, true, true );

						// Keep references to cloned scripts for later restoration
						if ( hasScripts ) {
							// Support: QtWebKit
							// jQuery.merge because push.apply(_, arraylike) throws
							jQuery.merge( scripts, getAll( node, "script" ) );
						}
					}

					callback.call( this[ i ], node, i );
				}

				if ( hasScripts ) {
					doc = scripts[ scripts.length - 1 ].ownerDocument;

					// Reenable scripts
					jQuery.map( scripts, restoreScript );

					// Evaluate executable scripts on first document insertion
					for ( i = 0; i < hasScripts; i++ ) {
						node = scripts[ i ];
						if ( rscriptType.test( node.type || "" ) &&
							!data_priv.access( node, "globalEval" ) && jQuery.contains( doc, node ) ) {

							if ( node.src ) {
								// Optional AJAX dependency, but won't run scripts if not present
								if ( jQuery._evalUrl ) {
									jQuery._evalUrl( node.src );
								}
							} else {
								jQuery.globalEval( node.textContent.replace( rcleanScript, "" ) );
							}
						}
					}
				}
			}
		}

		return this;
	}
});

jQuery.each({
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1,
			i = 0;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone( true );
			jQuery( insert[ i ] )[ original ]( elems );

			// Support: QtWebKit
			// .get() because push.apply(_, arraylike) throws
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
});


var iframe,
	elemdisplay = {};

/**
 * Retrieve the actual display of a element
 * @param {String} name nodeName of the element
 * @param {Object} doc Document object
 */
// Called only from within defaultDisplay
function actualDisplay( name, doc ) {
	var style,
		elem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),

		// getDefaultComputedStyle might be reliably used only on attached element
		display = window.getDefaultComputedStyle && ( style = window.getDefaultComputedStyle( elem[ 0 ] ) ) ?

			// Use of this method is a temporary fix (more like optimization) until something better comes along,
			// since it was removed from specification and supported only in FF
			style.display : jQuery.css( elem[ 0 ], "display" );

	// We don't have any data stored on the element,
	// so use "detach" method as fast way to get rid of the element
	elem.detach();

	return display;
}

/**
 * Try to determine the default display value of an element
 * @param {String} nodeName
 */
function defaultDisplay( nodeName ) {
	var doc = document,
		display = elemdisplay[ nodeName ];

	if ( !display ) {
		display = actualDisplay( nodeName, doc );

		// If the simple way fails, read from inside an iframe
		if ( display === "none" || !display ) {

			// Use the already-created iframe if possible
			iframe = (iframe || jQuery( "<iframe frameborder='0' width='0' height='0'/>" )).appendTo( doc.documentElement );

			// Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
			doc = iframe[ 0 ].contentDocument;

			// Support: IE
			doc.write();
			doc.close();

			display = actualDisplay( nodeName, doc );
			iframe.detach();
		}

		// Store the correct default display
		elemdisplay[ nodeName ] = display;
	}

	return display;
}
var rmargin = (/^margin/);

var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

var getStyles = function( elem ) {
		// Support: IE<=11+, Firefox<=30+ (#15098, #14150)
		// IE throws on elements created in popups
		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
		if ( elem.ownerDocument.defaultView.opener ) {
			return elem.ownerDocument.defaultView.getComputedStyle( elem, null );
		}

		return window.getComputedStyle( elem, null );
	};



function curCSS( elem, name, computed ) {
	var width, minWidth, maxWidth, ret,
		style = elem.style;

	computed = computed || getStyles( elem );

	// Support: IE9
	// getPropertyValue is only needed for .css('filter') (#12537)
	if ( computed ) {
		ret = computed.getPropertyValue( name ) || computed[ name ];
	}

	if ( computed ) {

		if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) {
			ret = jQuery.style( elem, name );
		}

		// Support: iOS < 6
		// A tribute to the "awesome hack by Dean Edwards"
		// iOS < 6 (at least) returns percentage for a larger set of values, but width seems to be reliably pixels
		// this is against the CSSOM draft spec: http://dev.w3.org/csswg/cssom/#resolved-values
		if ( rnumnonpx.test( ret ) && rmargin.test( name ) ) {

			// Remember the original values
			width = style.width;
			minWidth = style.minWidth;
			maxWidth = style.maxWidth;

			// Put in the new values to get a computed value out
			style.minWidth = style.maxWidth = style.width = ret;
			ret = computed.width;

			// Revert the changed values
			style.width = width;
			style.minWidth = minWidth;
			style.maxWidth = maxWidth;
		}
	}

	return ret !== undefined ?
		// Support: IE
		// IE returns zIndex value as an integer.
		ret + "" :
		ret;
}


function addGetHookIf( conditionFn, hookFn ) {
	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			if ( conditionFn() ) {
				// Hook not needed (or it's not possible to use it due
				// to missing dependency), remove it.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.
			return (this.get = hookFn).apply( this, arguments );
		}
	};
}


(function() {
	var pixelPositionVal, boxSizingReliableVal,
		docElem = document.documentElement,
		container = document.createElement( "div" ),
		div = document.createElement( "div" );

	if ( !div.style ) {
		return;
	}

	// Support: IE9-11+
	// Style of cloned element affects source element cloned (#8908)
	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	container.style.cssText = "border:0;width:0;height:0;top:0;left:-9999px;margin-top:1px;" +
		"position:absolute";
	container.appendChild( div );

	// Executing both pixelPosition & boxSizingReliable tests require only one layout
	// so they're executed at the same time to save the second computation.
	function computePixelPositionAndBoxSizingReliable() {
		div.style.cssText =
			// Support: Firefox<29, Android 2.3
			// Vendor-prefix box-sizing
			"-webkit-box-sizing:border-box;-moz-box-sizing:border-box;" +
			"box-sizing:border-box;display:block;margin-top:1%;top:1%;" +
			"border:1px;padding:1px;width:4px;position:absolute";
		div.innerHTML = "";
		docElem.appendChild( container );

		var divStyle = window.getComputedStyle( div, null );
		pixelPositionVal = divStyle.top !== "1%";
		boxSizingReliableVal = divStyle.width === "4px";

		docElem.removeChild( container );
	}

	// Support: node.js jsdom
	// Don't assume that getComputedStyle is a property of the global object
	if ( window.getComputedStyle ) {
		jQuery.extend( support, {
			pixelPosition: function() {

				// This test is executed only once but we still do memoizing
				// since we can use the boxSizingReliable pre-computing.
				// No need to check if the test was already performed, though.
				computePixelPositionAndBoxSizingReliable();
				return pixelPositionVal;
			},
			boxSizingReliable: function() {
				if ( boxSizingReliableVal == null ) {
					computePixelPositionAndBoxSizingReliable();
				}
				return boxSizingReliableVal;
			},
			reliableMarginRight: function() {

				// Support: Android 2.3
				// Check if div with explicit width and no margin-right incorrectly
				// gets computed margin-right based on width of container. (#3333)
				// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
				// This support function is only executed once so no memoizing is needed.
				var ret,
					marginDiv = div.appendChild( document.createElement( "div" ) );

				// Reset CSS: box-sizing; display; margin; border; padding
				marginDiv.style.cssText = div.style.cssText =
					// Support: Firefox<29, Android 2.3
					// Vendor-prefix box-sizing
					"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
					"box-sizing:content-box;display:block;margin:0;border:0;padding:0";
				marginDiv.style.marginRight = marginDiv.style.width = "0";
				div.style.width = "1px";
				docElem.appendChild( container );

				ret = !parseFloat( window.getComputedStyle( marginDiv, null ).marginRight );

				docElem.removeChild( container );
				div.removeChild( marginDiv );

				return ret;
			}
		});
	}
})();


// A method for quickly swapping in/out CSS properties to get correct calculations.
jQuery.swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};


var
	// Swappable if display is none or starts with table except "table", "table-cell", or "table-caption"
	// See here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rnumsplit = new RegExp( "^(" + pnum + ")(.*)$", "i" ),
	rrelNum = new RegExp( "^([+-])=(" + pnum + ")", "i" ),

	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},

	cssPrefixes = [ "Webkit", "O", "Moz", "ms" ];

// Return a css property mapped to a potentially vendor prefixed property
function vendorPropName( style, name ) {

	// Shortcut for names that are not vendor prefixed
	if ( name in style ) {
		return name;
	}

	// Check for vendor prefixed names
	var capName = name[0].toUpperCase() + name.slice(1),
		origName = name,
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in style ) {
			return name;
		}
	}

	return origName;
}

function setPositiveNumber( elem, value, subtract ) {
	var matches = rnumsplit.exec( value );
	return matches ?
		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 1 ] - ( subtract || 0 ) ) + ( matches[ 2 ] || "px" ) :
		value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
	var i = extra === ( isBorderBox ? "border" : "content" ) ?
		// If we already have the right measurement, avoid augmentation
		4 :
		// Otherwise initialize for horizontal or vertical properties
		name === "width" ? 1 : 0,

		val = 0;

	for ( ; i < 4; i += 2 ) {
		// Both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
		}

		if ( isBorderBox ) {
			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// At this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		} else {
			// At this point, extra isn't content, so add padding
			val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// At this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with offset property, which is equivalent to the border-box value
	var valueIsBorderBox = true,
		val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
		styles = getStyles( elem ),
		isBorderBox = jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

	// Some non-html elements return undefined for offsetWidth, so check for null/undefined
	// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
	// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
	if ( val <= 0 || val == null ) {
		// Fall back to computed then uncomputed css if necessary
		val = curCSS( elem, name, styles );
		if ( val < 0 || val == null ) {
			val = elem.style[ name ];
		}

		// Computed unit is not pixels. Stop here and return.
		if ( rnumnonpx.test(val) ) {
			return val;
		}

		// Check for style in case a browser which returns unreliable values
		// for getComputedStyle silently falls back to the reliable elem.style
		valueIsBorderBox = isBorderBox &&
			( support.boxSizingReliable() || val === elem.style[ name ] );

		// Normalize "", auto, and prepare for extra
		val = parseFloat( val ) || 0;
	}

	// Use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles
		)
	) + "px";
}

function showHide( elements, show ) {
	var display, elem, hidden,
		values = [],
		index = 0,
		length = elements.length;

	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		values[ index ] = data_priv.get( elem, "olddisplay" );
		display = elem.style.display;
		if ( show ) {
			// Reset the inline display of this element to learn if it is
			// being hidden by cascaded rules or not
			if ( !values[ index ] && display === "none" ) {
				elem.style.display = "";
			}

			// Set elements which have been overridden with display: none
			// in a stylesheet to whatever the default browser style is
			// for such an element
			if ( elem.style.display === "" && isHidden( elem ) ) {
				values[ index ] = data_priv.access( elem, "olddisplay", defaultDisplay(elem.nodeName) );
			}
		} else {
			hidden = isHidden( elem );

			if ( display !== "none" || !hidden ) {
				data_priv.set( elem, "olddisplay", hidden ? display : jQuery.css( elem, "display" ) );
			}
		}
	}

	// Set the display of most of the elements in a second loop
	// to avoid the constant reflow
	for ( index = 0; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}
		if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
			elem.style.display = show ? values[ index ] || "" : "none";
		}
	}

	return elements;
}

jQuery.extend({

	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {

					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {
		"float": "cssFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {

		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			style = elem.style;

		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( style, origName ) );

		// Gets hook for the prefixed version, then unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// Convert "+=" or "-=" to relative numbers (#7345)
			if ( type === "string" && (ret = rrelNum.exec( value )) ) {
				value = ( ret[1] + 1 ) * ret[2] + parseFloat( jQuery.css( elem, name ) );
				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set (#7116)
			if ( value == null || value !== value ) {
				return;
			}

			// If a number, add 'px' to the (except for certain CSS properties)
			if ( type === "number" && !jQuery.cssNumber[ origName ] ) {
				value += "px";
			}

			// Support: IE9-11+
			// background-* props affect original clone's values
			if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !("set" in hooks) || (value = hooks.set( elem, value, extra )) !== undefined ) {
				style[ name ] = value;
			}

		} else {
			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks && (ret = hooks.get( elem, false, extra )) !== undefined ) {
				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var val, num, hooks,
			origName = jQuery.camelCase( name );

		// Make sure that we're working with the right name
		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( elem.style, origName ) );

		// Try prefixed name followed by the unprefixed name
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		// Convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Make numeric if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || jQuery.isNumeric( num ) ? num || 0 : val;
		}
		return val;
	}
});

jQuery.each([ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {

				// Certain elements can have dimension info if we invisibly show them
				// but it must have a current display style that would benefit
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) && elem.offsetWidth === 0 ?
					jQuery.swap( elem, cssShow, function() {
						return getWidthOrHeight( elem, name, extra );
					}) :
					getWidthOrHeight( elem, name, extra );
			}
		},

		set: function( elem, value, extra ) {
			var styles = extra && getStyles( elem );
			return setPositiveNumber( elem, value, extra ?
				augmentWidthOrHeight(
					elem,
					name,
					extra,
					jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				) : 0
			);
		}
	};
});

// Support: Android 2.3
jQuery.cssHooks.marginRight = addGetHookIf( support.reliableMarginRight,
	function( elem, computed ) {
		if ( computed ) {
			return jQuery.swap( elem, { "display": "inline-block" },
				curCSS, [ elem, "marginRight" ] );
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each({
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// Assumes a single number if not a string
				parts = typeof value === "string" ? value.split(" ") : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
});

jQuery.fn.extend({
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( jQuery.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	},
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each(function() {
			if ( isHidden( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		});
	}
});


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || "swing";
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			if ( tween.elem[ tween.prop ] != null &&
				(!tween.elem.style || tween.elem.style[ tween.prop ] == null) ) {
				return tween.elem[ tween.prop ];
			}

			// Passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails.
			// Simple values such as "10px" are parsed to Float;
			// complex values such as "rotate(1rad)" are returned as-is.
			result = jQuery.css( tween.elem, tween.prop, "" );
			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {
			// Use step hook for back compat.
			// Use cssHook if its there.
			// Use .style if available and use plain properties where available.
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.style && ( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null || jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE9
// Panic based approach to setting things on disconnected nodes
Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	}
};

jQuery.fx = Tween.prototype.init;

// Back Compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, timerId,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rfxnum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" ),
	rrun = /queueHooks$/,
	animationPrefilters = [ defaultPrefilter ],
	tweeners = {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value ),
				target = tween.cur(),
				parts = rfxnum.exec( value ),
				unit = parts && parts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

				// Starting value computation is required for potential unit mismatches
				start = ( jQuery.cssNumber[ prop ] || unit !== "px" && +target ) &&
					rfxnum.exec( jQuery.css( tween.elem, prop ) ),
				scale = 1,
				maxIterations = 20;

			if ( start && start[ 3 ] !== unit ) {
				// Trust units reported by jQuery.css
				unit = unit || start[ 3 ];

				// Make sure we update the tween properties later on
				parts = parts || [];

				// Iteratively approximate from a nonzero starting point
				start = +target || 1;

				do {
					// If previous iteration zeroed out, double until we get *something*.
					// Use string for doubling so we don't accidentally see scale as unchanged below
					scale = scale || ".5";

					// Adjust and apply
					start = start / scale;
					jQuery.style( tween.elem, prop, start + unit );

				// Update scale, tolerating zero or NaN from tween.cur(),
				// break the loop if scale is unchanged or perfect, or if we've just had enough
				} while ( scale !== (scale = tween.cur() / target) && scale !== 1 && --maxIterations );
			}

			// Update tween properties
			if ( parts ) {
				start = tween.start = +start || +target || 0;
				tween.unit = unit;
				// If a +=/-= token was provided, we're doing a relative animation
				tween.end = parts[ 1 ] ?
					start + ( parts[ 1 ] + 1 ) * parts[ 2 ] :
					+parts[ 2 ];
			}

			return tween;
		} ]
	};

// Animations created synchronously will run synchronously
function createFxNow() {
	setTimeout(function() {
		fxNow = undefined;
	});
	return ( fxNow = jQuery.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		i = 0,
		attrs = { height: type };

	// If we include width, step value is 1 to do all cssExpand values,
	// otherwise step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4 ; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( tweeners[ prop ] || [] ).concat( tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( (tween = collection[ index ].call( animation, prop, value )) ) {

			// We're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	/* jshint validthis: true */
	var prop, value, toggle, tween, hooks, oldfire, display, checkDisplay,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHidden( elem ),
		dataShow = data_priv.get( elem, "fxshow" );

	// Handle queue: false promises
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always(function() {
			// Ensure the complete handler is called before this completes
			anim.always(function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			});
		});
	}

	// Height/width overflow pass
	if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {
		// Make sure that nothing sneaks out
		// Record all 3 overflow attributes because IE9-10 do not
		// change the overflow attribute when overflowX and
		// overflowY are set to the same value
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Set display property to inline-block for height/width
		// animations on inline elements that are having width/height animated
		display = jQuery.css( elem, "display" );

		// Test default display if display is currently "none"
		checkDisplay = display === "none" ?
			data_priv.get( elem, "olddisplay" ) || defaultDisplay( elem.nodeName ) : display;

		if ( checkDisplay === "inline" && jQuery.css( elem, "float" ) === "none" ) {
			style.display = "inline-block";
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		anim.always(function() {
			style.overflow = opts.overflow[ 0 ];
			style.overflowX = opts.overflow[ 1 ];
			style.overflowY = opts.overflow[ 2 ];
		});
	}

	// show/hide pass
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.exec( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// If there is dataShow left over from a stopped hide or show and we are going to proceed with show, we should pretend to be hidden
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );

		// Any non-fx value stops us from restoring the original display value
		} else {
			display = undefined;
		}
	}

	if ( !jQuery.isEmptyObject( orig ) ) {
		if ( dataShow ) {
			if ( "hidden" in dataShow ) {
				hidden = dataShow.hidden;
			}
		} else {
			dataShow = data_priv.access( elem, "fxshow", {} );
		}

		// Store state if its toggle - enables .stop().toggle() to "reverse"
		if ( toggle ) {
			dataShow.hidden = !hidden;
		}
		if ( hidden ) {
			jQuery( elem ).show();
		} else {
			anim.done(function() {
				jQuery( elem ).hide();
			});
		}
		anim.done(function() {
			var prop;

			data_priv.remove( elem, "fxshow" );
			for ( prop in orig ) {
				jQuery.style( elem, prop, orig[ prop ] );
			}
		});
		for ( prop in orig ) {
			tween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );

			if ( !( prop in dataShow ) ) {
				dataShow[ prop ] = tween.start;
				if ( hidden ) {
					tween.end = tween.start;
					tween.start = prop === "width" || prop === "height" ? 1 : 0;
				}
			}
		}

	// If this is a noop like .hide().hide(), restore an overwritten display value
	} else if ( (display === "none" ? defaultDisplay( elem.nodeName ) : display) === "inline" ) {
		style.display = display;
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( jQuery.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// Not quite $.extend, this won't overwrite existing keys.
			// Reusing 'index' because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = animationPrefilters.length,
		deferred = jQuery.Deferred().always( function() {
			// Don't match elem in the :animated selector
			delete tick.elem;
		}),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),
				// Support: Android 2.3
				// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length ; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ]);

			if ( percent < 1 && length ) {
				return remaining;
			} else {
				deferred.resolveWith( elem, [ animation ] );
				return false;
			}
		},
		animation = deferred.promise({
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, { specialEasing: {} }, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,
					// If we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length ; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// Resolve when we played the last frame; otherwise, reject
				if ( gotoEnd ) {
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		}),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length ; index++ ) {
		result = animationPrefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		})
	);

	// attach callbacks from options
	return animation.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );
}

jQuery.Animation = jQuery.extend( Animation, {

	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.split(" ");
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length ; index++ ) {
			prop = props[ index ];
			tweeners[ prop ] = tweeners[ prop ] || [];
			tweeners[ prop ].unshift( callback );
		}
	},

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			animationPrefilters.unshift( callback );
		} else {
			animationPrefilters.push( callback );
		}
	}
});

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
		opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

	// Normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend({
	fadeTo: function( speed, to, easing, callback ) {

		// Show any hidden elements after setting opacity to 0
		return this.filter( isHidden ).css( "opacity", 0 ).show()

			// Animate to the value specified
			.end().animate({ opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {
				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || data_priv.get( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each(function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = data_priv.get( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && (type == null || timers[ index ].queue === type) ) {
					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// Start the next in the queue if the last step wasn't forced.
			// Timers currently will call their complete callbacks, which
			// will dequeue but only if they were gotoEnd.
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		});
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each(function() {
			var index,
				data = data_priv.get( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// Enable finishing flag on private data
			data.finish = true;

			// Empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// Look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// Look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// Turn off finishing flag
			delete data.finish;
		});
	}
});

jQuery.each([ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
});

// Generate shortcuts for custom animations
jQuery.each({
	slideDown: genFx("show"),
	slideUp: genFx("hide"),
	slideToggle: genFx("toggle"),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
});

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		i = 0,
		timers = jQuery.timers;

	fxNow = jQuery.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];
		// Checks the timer has not already been removed
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	if ( timer() ) {
		jQuery.fx.start();
	} else {
		jQuery.timers.pop();
	}
};

jQuery.fx.interval = 13;

jQuery.fx.start = function() {
	if ( !timerId ) {
		timerId = setInterval( jQuery.fx.tick, jQuery.fx.interval );
	}
};

jQuery.fx.stop = function() {
	clearInterval( timerId );
	timerId = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,
	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = setTimeout( next, time );
		hooks.stop = function() {
			clearTimeout( timeout );
		};
	});
};


(function() {
	var input = document.createElement( "input" ),
		select = document.createElement( "select" ),
		opt = select.appendChild( document.createElement( "option" ) );

	input.type = "checkbox";

	// Support: iOS<=5.1, Android<=4.2+
	// Default value for a checkbox should be "on"
	support.checkOn = input.value !== "";

	// Support: IE<=11+
	// Must access selectedIndex to make default options select
	support.optSelected = opt.selected;

	// Support: Android<=2.3
	// Options inside disabled selects are incorrectly marked as disabled
	select.disabled = true;
	support.optDisabled = !opt.disabled;

	// Support: IE<=11+
	// An input loses its value after becoming a radio
	input = document.createElement( "input" );
	input.value = "t";
	input.type = "radio";
	support.radioValue = input.value === "t";
})();


var nodeHook, boolHook,
	attrHandle = jQuery.expr.attrHandle;

jQuery.fn.extend({
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each(function() {
			jQuery.removeAttr( this, name );
		});
	}
});

jQuery.extend({
	attr: function( elem, name, value ) {
		var hooks, ret,
			nType = elem.nodeType;

		// don't get/set attributes on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === strundefined ) {
			return jQuery.prop( elem, name, value );
		}

		// All attributes are lowercase
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			name = name.toLowerCase();
			hooks = jQuery.attrHooks[ name ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : nodeHook );
		}

		if ( value !== undefined ) {

			if ( value === null ) {
				jQuery.removeAttr( elem, name );

			} else if ( hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ) {
				return ret;

			} else {
				elem.setAttribute( name, value + "" );
				return value;
			}

		} else if ( hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ) {
			return ret;

		} else {
			ret = jQuery.find.attr( elem, name );

			// Non-existent attributes return null, we normalize to undefined
			return ret == null ?
				undefined :
				ret;
		}
	},

	removeAttr: function( elem, value ) {
		var name, propName,
			i = 0,
			attrNames = value && value.match( rnotwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( (name = attrNames[i++]) ) {
				propName = jQuery.propFix[ name ] || name;

				// Boolean attributes get special treatment (#10870)
				if ( jQuery.expr.match.bool.test( name ) ) {
					// Set corresponding property to false
					elem[ propName ] = false;
				}

				elem.removeAttribute( name );
			}
		}
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" &&
					jQuery.nodeName( elem, "input" ) ) {
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	}
});

// Hooks for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {
			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else {
			elem.setAttribute( name, name );
		}
		return name;
	}
};
jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
	var getter = attrHandle[ name ] || jQuery.find.attr;

	attrHandle[ name ] = function( elem, name, isXML ) {
		var ret, handle;
		if ( !isXML ) {
			// Avoid an infinite loop by temporarily removing this function from the getter
			handle = attrHandle[ name ];
			attrHandle[ name ] = ret;
			ret = getter( elem, name, isXML ) != null ?
				name.toLowerCase() :
				null;
			attrHandle[ name ] = handle;
		}
		return ret;
	};
});




var rfocusable = /^(?:input|select|textarea|button)$/i;

jQuery.fn.extend({
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		return this.each(function() {
			delete this[ jQuery.propFix[ name ] || name ];
		});
	}
});

jQuery.extend({
	propFix: {
		"for": "htmlFor",
		"class": "className"
	},

	prop: function( elem, name, value ) {
		var ret, hooks, notxml,
			nType = elem.nodeType;

		// Don't get/set properties on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		notxml = nType !== 1 || !jQuery.isXMLDoc( elem );

		if ( notxml ) {
			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			return hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ?
				ret :
				( elem[ name ] = value );

		} else {
			return hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ?
				ret :
				elem[ name ];
		}
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {
				return elem.hasAttribute( "tabindex" ) || rfocusable.test( elem.nodeName ) || elem.href ?
					elem.tabIndex :
					-1;
			}
		}
	}
});

if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {
			var parent = elem.parentNode;
			if ( parent && parent.parentNode ) {
				parent.parentNode.selectedIndex;
			}
			return null;
		}
	};
}

jQuery.each([
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
});




var rclass = /[\t\r\n\f]/g;

jQuery.fn.extend({
	addClass: function( value ) {
		var classes, elem, cur, clazz, j, finalValue,
			proceed = typeof value === "string" && value,
			i = 0,
			len = this.length;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).addClass( value.call( this, j, this.className ) );
			});
		}

		if ( proceed ) {
			// The disjunction here is for better compressibility (see removeClass)
			classes = ( value || "" ).match( rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					" "
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( elem.className !== finalValue ) {
						elem.className = finalValue;
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, clazz, j, finalValue,
			proceed = arguments.length === 0 || typeof value === "string" && value,
			i = 0,
			len = this.length;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).removeClass( value.call( this, j, this.className ) );
			});
		}
		if ( proceed ) {
			classes = ( value || "" ).match( rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					""
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) >= 0 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = value ? jQuery.trim( cur ) : "";
					if ( elem.className !== finalValue ) {
						elem.className = finalValue;
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value;

		if ( typeof stateVal === "boolean" && type === "string" ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( i ) {
				jQuery( this ).toggleClass( value.call(this, i, this.className, stateVal), stateVal );
			});
		}

		return this.each(function() {
			if ( type === "string" ) {
				// Toggle individual class names
				var className,
					i = 0,
					self = jQuery( this ),
					classNames = value.match( rnotwhite ) || [];

				while ( (className = classNames[ i++ ]) ) {
					// Check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( type === strundefined || type === "boolean" ) {
				if ( this.className ) {
					// store className if set
					data_priv.set( this, "__className__", this.className );
				}

				// If the element has a class name or if we're passed `false`,
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				this.className = this.className || value === false ? "" : data_priv.get( this, "__className__" ) || "";
			}
		});
	},

	hasClass: function( selector ) {
		var className = " " + selector + " ",
			i = 0,
			l = this.length;
		for ( ; i < l; i++ ) {
			if ( this[i].nodeType === 1 && (" " + this[i].className + " ").replace(rclass, " ").indexOf( className ) >= 0 ) {
				return true;
			}
		}

		return false;
	}
});




var rreturn = /\r/g;

jQuery.fn.extend({
	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[0];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] || jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks && "get" in hooks && (ret = hooks.get( elem, "value" )) !== undefined ) {
					return ret;
				}

				ret = elem.value;

				return typeof ret === "string" ?
					// Handle most common string cases
					ret.replace(rreturn, "") :
					// Handle cases where value is null/undef or number
					ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each(function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";

			} else if ( typeof val === "number" ) {
				val += "";

			} else if ( jQuery.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				});
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !("set" in hooks) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		});
	}
});

jQuery.extend({
	valHooks: {
		option: {
			get: function( elem ) {
				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :
					// Support: IE10-11+
					// option.text throws exceptions (#14686, #14858)
					jQuery.trim( jQuery.text( elem ) );
			}
		},
		select: {
			get: function( elem ) {
				var value, option,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one" || index < 0,
					values = one ? null : [],
					max = one ? index + 1 : options.length,
					i = index < 0 ?
						max :
						one ? index : 0;

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// IE6-9 doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&
							// Don't return options that are disabled or in a disabled optgroup
							( support.optDisabled ? !option.disabled : option.getAttribute( "disabled" ) === null ) &&
							( !option.parentNode.disabled || !jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];
					if ( (option.selected = jQuery.inArray( option.value, values ) >= 0) ) {
						optionSet = true;
					}
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}
				return values;
			}
		}
	}
});

// Radios and checkboxes getter/setter
jQuery.each([ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( jQuery.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery(elem).val(), value ) >= 0 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			return elem.getAttribute("value") === null ? "on" : elem.value;
		};
	}
});




// Return jQuery for attributes-only inclusion


jQuery.each( ("blur focus focusin focusout load resize scroll unload click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup error contextmenu").split(" "), function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
});

jQuery.fn.extend({
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	},

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {
		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ? this.off( selector, "**" ) : this.off( types, selector || "**", fn );
	}
});


var nonce = jQuery.now();

var rquery = (/\?/);



// Support: Android 2.3
// Workaround failure to string-cast null input
jQuery.parseJSON = function( data ) {
	return JSON.parse( data + "" );
};


// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml, tmp;
	if ( !data || typeof data !== "string" ) {
		return null;
	}

	// Support: IE9
	try {
		tmp = new DOMParser();
		xml = tmp.parseFromString( data, "text/xml" );
	} catch ( e ) {
		xml = undefined;
	}

	if ( !xml || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	rhash = /#.*$/,
	rts = /([?&])_=[^&]*/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,
	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,
	rurl = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat( "*" ),

	// Document location
	ajaxLocation = window.location.href,

	// Segment location into parts
	ajaxLocParts = rurl.exec( ajaxLocation.toLowerCase() ) || [];

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnotwhite ) || [];

		if ( jQuery.isFunction( func ) ) {
			// For each dataType in the dataTypeExpression
			while ( (dataType = dataTypes[i++]) ) {
				// Prepend if requested
				if ( dataType[0] === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					(structure[ dataType ] = structure[ dataType ] || []).unshift( func );

				// Otherwise append
				} else {
					(structure[ dataType ] = structure[ dataType ] || []).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" && !seekingTransport && !inspected[ dataTypeOrTransport ] ) {
				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		});
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var key, deep,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || (deep = {}) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {

	var ct, type, finalDataType, firstDataType,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader("Content-Type");
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {
		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[0] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}
		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},
		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

		// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {
								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s[ "throws" ] ) {
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return { state: "parsererror", error: conv ? e : "No conversion from " + prev + " to " + current };
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend({

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: ajaxLocation,
		type: "GET",
		isLocal: rlocalProtocol.test( ajaxLocParts[ 1 ] ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /xml/,
			html: /html/,
			json: /json/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": jQuery.parseJSON,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var transport,
			// URL without anti-cache param
			cacheURL,
			// Response headers
			responseHeadersString,
			responseHeaders,
			// timeout handle
			timeoutTimer,
			// Cross-domain detection vars
			parts,
			// To know if global events are to be dispatched
			fireGlobals,
			// Loop variable
			i,
			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),
			// Callbacks context
			callbackContext = s.context || s,
			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context && ( callbackContext.nodeType || callbackContext.jquery ) ?
				jQuery( callbackContext ) :
				jQuery.event,
			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks("once memory"),
			// Status-dependent callbacks
			statusCode = s.statusCode || {},
			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},
			// The jqXHR state
			state = 0,
			// Default abort message
			strAbort = "canceled",
			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( state === 2 ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( (match = rheaders.exec( responseHeadersString )) ) {
								responseHeaders[ match[1].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return state === 2 ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					var lname = name.toLowerCase();
					if ( !state ) {
						name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( !state ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( state < 2 ) {
							for ( code in map ) {
								// Lazy-add the new callback in a way that preserves old ones
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						} else {
							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR ).complete = completeDeferred.add;
		jqXHR.success = jqXHR.done;
		jqXHR.error = jqXHR.fail;

		// Remove hash character (#7531: and string promotion)
		// Add protocol if not provided (prefilters might expect it)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || ajaxLocation ) + "" ).replace( rhash, "" )
			.replace( rprotocol, ajaxLocParts[ 1 ] + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().match( rnotwhite ) || [ "" ];

		// A cross-domain request is in order when we have a protocol:host:port mismatch
		if ( s.crossDomain == null ) {
			parts = rurl.exec( s.url.toLowerCase() );
			s.crossDomain = !!( parts &&
				( parts[ 1 ] !== ajaxLocParts[ 1 ] || parts[ 2 ] !== ajaxLocParts[ 2 ] ||
					( parts[ 3 ] || ( parts[ 1 ] === "http:" ? "80" : "443" ) ) !==
						( ajaxLocParts[ 3 ] || ( ajaxLocParts[ 1 ] === "http:" ? "80" : "443" ) ) )
			);
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( state === 2 ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
		fireGlobals = jQuery.event && s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger("ajaxStart");
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		cacheURL = s.url;

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// If data is available, append data to url
			if ( s.data ) {
				cacheURL = ( s.url += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data );
				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add anti-cache in url if needed
			if ( s.cache === false ) {
				s.url = rts.test( cacheURL ) ?

					// If there is already a '_' parameter, set its value
					cacheURL.replace( rts, "$1_=" + nonce++ ) :

					// Otherwise add one to the end
					cacheURL + ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + nonce++;
			}
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[0] ] ?
				s.accepts[ s.dataTypes[0] ] + ( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend && ( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {
			// Abort if not done already and return
			return jqXHR.abort();
		}

		// Aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		for ( i in { success: 1, error: 1, complete: 1 } ) {
			jqXHR[ i ]( s[ i ] );
		}

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}
			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = setTimeout(function() {
					jqXHR.abort("timeout");
				}, s.timeout );
			}

			try {
				state = 1;
				transport.send( requestHeaders, done );
			} catch ( e ) {
				// Propagate exception as error if not done
				if ( state < 2 ) {
					done( -1, e );
				// Simply rethrow otherwise
				} else {
					throw e;
				}
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Called once
			if ( state === 2 ) {
				return;
			}

			// State is "done" now
			state = 2;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader("Last-Modified");
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader("etag");
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {
				// Extract error from statusText and normalize for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );
				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger("ajaxStop");
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
});

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {
		// Shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		return jQuery.ajax({
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		});
	};
});


jQuery._evalUrl = function( url ) {
	return jQuery.ajax({
		url: url,
		type: "GET",
		dataType: "script",
		async: false,
		global: false,
		"throws": true
	});
};


jQuery.fn.extend({
	wrapAll: function( html ) {
		var wrap;

		if ( jQuery.isFunction( html ) ) {
			return this.each(function( i ) {
				jQuery( this ).wrapAll( html.call(this, i) );
			});
		}

		if ( this[ 0 ] ) {

			// The elements to wrap the target around
			wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

			if ( this[ 0 ].parentNode ) {
				wrap.insertBefore( this[ 0 ] );
			}

			wrap.map(function() {
				var elem = this;

				while ( elem.firstElementChild ) {
					elem = elem.firstElementChild;
				}

				return elem;
			}).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function( i ) {
				jQuery( this ).wrapInner( html.call(this, i) );
			});
		}

		return this.each(function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		});
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each(function( i ) {
			jQuery( this ).wrapAll( isFunction ? html.call(this, i) : html );
		});
	},

	unwrap: function() {
		return this.parent().each(function() {
			if ( !jQuery.nodeName( this, "body" ) ) {
				jQuery( this ).replaceWith( this.childNodes );
			}
		}).end();
	}
});


jQuery.expr.filters.hidden = function( elem ) {
	// Support: Opera <= 12.12
	// Opera reports offsetWidths and offsetHeights less than zero on some elements
	return elem.offsetWidth <= 0 && elem.offsetHeight <= 0;
};
jQuery.expr.filters.visible = function( elem ) {
	return !jQuery.expr.filters.hidden( elem );
};




var r20 = /%20/g,
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( jQuery.isArray( obj ) ) {
		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {
				// Treat each array item as a scalar.
				add( prefix, v );

			} else {
				// Item is non-scalar (array or object), encode its numeric index.
				buildParams( prefix + "[" + ( typeof v === "object" ? i : "" ) + "]", v, traditional, add );
			}
		});

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {
		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {
		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, value ) {
			// If value is a function, invoke it and return its value
			value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
			s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
		};

	// Set traditional to true for jQuery <= 1.3.2 behavior.
	if ( traditional === undefined ) {
		traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
	}

	// If an array was passed in, assume that it is an array of form elements.
	if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {
		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		});

	} else {
		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" ).replace( r20, "+" );
};

jQuery.fn.extend({
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map(function() {
			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		})
		.filter(function() {
			var type = this.type;

			// Use .is( ":disabled" ) so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		})
		.map(function( i, elem ) {
			var val = jQuery( this ).val();

			return val == null ?
				null :
				jQuery.isArray( val ) ?
					jQuery.map( val, function( val ) {
						return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
					}) :
					{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		}).get();
	}
});


jQuery.ajaxSettings.xhr = function() {
	try {
		return new XMLHttpRequest();
	} catch( e ) {}
};

var xhrId = 0,
	xhrCallbacks = {},
	xhrSuccessStatus = {
		// file protocol always yields status code 0, assume 200
		0: 200,
		// Support: IE9
		// #1450: sometimes IE returns 1223 when it should be 204
		1223: 204
	},
	xhrSupported = jQuery.ajaxSettings.xhr();

// Support: IE9
// Open requests must be manually aborted on unload (#5280)
// See https://support.microsoft.com/kb/2856746 for more info
if ( window.attachEvent ) {
	window.attachEvent( "onunload", function() {
		for ( var key in xhrCallbacks ) {
			xhrCallbacks[ key ]();
		}
	});
}

support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
support.ajax = xhrSupported = !!xhrSupported;

jQuery.ajaxTransport(function( options ) {
	var callback;

	// Cross domain only allowed if supported through XMLHttpRequest
	if ( support.cors || xhrSupported && !options.crossDomain ) {
		return {
			send: function( headers, complete ) {
				var i,
					xhr = options.xhr(),
					id = ++xhrId;

				xhr.open( options.type, options.url, options.async, options.username, options.password );

				// Apply custom fields if provided
				if ( options.xhrFields ) {
					for ( i in options.xhrFields ) {
						xhr[ i ] = options.xhrFields[ i ];
					}
				}

				// Override mime type if needed
				if ( options.mimeType && xhr.overrideMimeType ) {
					xhr.overrideMimeType( options.mimeType );
				}

				// X-Requested-With header
				// For cross-domain requests, seeing as conditions for a preflight are
				// akin to a jigsaw puzzle, we simply never set it to be sure.
				// (it can always be set on a per-request basis or even using ajaxSetup)
				// For same-domain requests, won't change header if already provided.
				if ( !options.crossDomain && !headers["X-Requested-With"] ) {
					headers["X-Requested-With"] = "XMLHttpRequest";
				}

				// Set headers
				for ( i in headers ) {
					xhr.setRequestHeader( i, headers[ i ] );
				}

				// Callback
				callback = function( type ) {
					return function() {
						if ( callback ) {
							delete xhrCallbacks[ id ];
							callback = xhr.onload = xhr.onerror = null;

							if ( type === "abort" ) {
								xhr.abort();
							} else if ( type === "error" ) {
								complete(
									// file: protocol always yields status 0; see #8605, #14207
									xhr.status,
									xhr.statusText
								);
							} else {
								complete(
									xhrSuccessStatus[ xhr.status ] || xhr.status,
									xhr.statusText,
									// Support: IE9
									// Accessing binary-data responseText throws an exception
									// (#11426)
									typeof xhr.responseText === "string" ? {
										text: xhr.responseText
									} : undefined,
									xhr.getAllResponseHeaders()
								);
							}
						}
					};
				};

				// Listen to events
				xhr.onload = callback();
				xhr.onerror = callback("error");

				// Create the abort callback
				callback = xhrCallbacks[ id ] = callback("abort");

				try {
					// Do send the request (this may raise an exception)
					xhr.send( options.hasContent && options.data || null );
				} catch ( e ) {
					// #14683: Only rethrow if this hasn't been notified as an error yet
					if ( callback ) {
						throw e;
					}
				}
			},

			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
});




// Install script dataType
jQuery.ajaxSetup({
	accepts: {
		script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /(?:java|ecma)script/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
});

// Handle cache's special case and crossDomain
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
	}
});

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function( s ) {
	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {
		var script, callback;
		return {
			send: function( _, complete ) {
				script = jQuery("<script>").prop({
					async: true,
					charset: s.scriptCharset,
					src: s.url
				}).on(
					"load error",
					callback = function( evt ) {
						script.remove();
						callback = null;
						if ( evt ) {
							complete( evt.type === "error" ? 404 : 200, evt.type );
						}
					}
				);
				document.head.appendChild( script[ 0 ] );
			},
			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
});




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup({
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
});

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" && !( s.contentType || "" ).indexOf("application/x-www-form-urlencoded") && rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters["script json"] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always(function() {
			// Restore preexisting value
			window[ callbackName ] = overwritten;

			// Save back as free
			if ( s[ callbackName ] ) {
				// make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		});

		// Delegate to script
		return "script";
	}
});




// data: string of html
// context (optional): If specified, the fragment will be created in this context, defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}
	context = context || document;

	var parsed = rsingleTag.exec( data ),
		scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[1] ) ];
	}

	parsed = jQuery.buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


// Keep a copy of the old load method
var _load = jQuery.fn.load;

/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	if ( typeof url !== "string" && _load ) {
		return _load.apply( this, arguments );
	}

	var selector, type, response,
		self = this,
		off = url.indexOf(" ");

	if ( off >= 0 ) {
		selector = jQuery.trim( url.slice( off ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax({
			url: url,

			// if "type" variable is undefined, then "GET" method will be used
			type: type,
			dataType: "html",
			data: params
		}).done(function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery("<div>").append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		}).complete( callback && function( jqXHR, status ) {
			self.each( callback, response || [ jqXHR.responseText, status, jqXHR ] );
		});
	}

	return this;
};




// Attach a bunch of functions for handling common AJAX events
jQuery.each( [ "ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend" ], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
});




jQuery.expr.filters.animated = function( elem ) {
	return jQuery.grep(jQuery.timers, function( fn ) {
		return elem === fn.elem;
	}).length;
};




var docElem = window.document.documentElement;

/**
 * Gets a window from an element
 */
function getWindow( elem ) {
	return jQuery.isWindow( elem ) ? elem : elem.nodeType === 9 && elem.defaultView;
}

jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// Set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			( curCSSTop + curCSSLeft ).indexOf("auto") > -1;

		// Need to be able to calculate position if either
		// top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;

		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {
			options = options.call( elem, i, curOffset );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );

		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend({
	offset: function( options ) {
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each(function( i ) {
					jQuery.offset.setOffset( this, options, i );
				});
		}

		var docElem, win,
			elem = this[ 0 ],
			box = { top: 0, left: 0 },
			doc = elem && elem.ownerDocument;

		if ( !doc ) {
			return;
		}

		docElem = doc.documentElement;

		// Make sure it's not a disconnected DOM node
		if ( !jQuery.contains( docElem, elem ) ) {
			return box;
		}

		// Support: BlackBerry 5, iOS 3 (original iPhone)
		// If we don't have gBCR, just use 0,0 rather than error
		if ( typeof elem.getBoundingClientRect !== strundefined ) {
			box = elem.getBoundingClientRect();
		}
		win = getWindow( doc );
		return {
			top: box.top + win.pageYOffset - docElem.clientTop,
			left: box.left + win.pageXOffset - docElem.clientLeft
		};
	},

	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset,
			elem = this[ 0 ],
			parentOffset = { top: 0, left: 0 };

		// Fixed elements are offset from window (parentOffset = {top:0, left: 0}, because it is its only offset parent
		if ( jQuery.css( elem, "position" ) === "fixed" ) {
			// Assume getBoundingClientRect is there when computed position is fixed
			offset = elem.getBoundingClientRect();

		} else {
			// Get *real* offsetParent
			offsetParent = this.offsetParent();

			// Get correct offsets
			offset = this.offset();
			if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
				parentOffset = offsetParent.offset();
			}

			// Add offsetParent borders
			parentOffset.top += jQuery.css( offsetParent[ 0 ], "borderTopWidth", true );
			parentOffset.left += jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true );
		}

		// Subtract parent offsets and element margins
		return {
			top: offset.top - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
		};
	},

	offsetParent: function() {
		return this.map(function() {
			var offsetParent = this.offsetParent || docElem;

			while ( offsetParent && ( !jQuery.nodeName( offsetParent, "html" ) && jQuery.css( offsetParent, "position" ) === "static" ) ) {
				offsetParent = offsetParent.offsetParent;
			}

			return offsetParent || docElem;
		});
	}
});

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = "pageYOffset" === prop;

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {
			var win = getWindow( elem );

			if ( val === undefined ) {
				return win ? win[ prop ] : elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : window.pageXOffset,
					top ? val : window.pageYOffset
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length, null );
	};
});

// Support: Safari<7+, Chrome<37+
// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// Blink bug: https://code.google.com/p/chromium/issues/detail?id=229280
// getComputedStyle returns percent when specified for top/left/bottom/right;
// rather than make the css module depend on the offset module, just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );
				// If curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
});


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name }, function( defaultExtra, funcName ) {
		// Margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {
					// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
					// isn't a whole lot we can do. See pull request at this URL for discussion:
					// https://github.com/jquery/jquery/pull/764
					return elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
					// whichever is greatest
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?
					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable, null );
		};
	});
});


// The number of elements contained in the matched element set
jQuery.fn.size = function() {
	return this.length;
};

jQuery.fn.andSelf = jQuery.fn.addBack;




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	});
}




var
	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in AMD
// (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( typeof noGlobal === strundefined ) {
	window.jQuery = window.$ = jQuery;
}




return jQuery;

}));

},{}],37:[function(require,module,exports){
//     Underscore.js 1.8.3
//     http://underscorejs.org
//     (c) 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
//     Underscore may be freely distributed under the MIT license.

(function() {

  // Baseline setup
  // --------------

  // Establish the root object, `window` in the browser, or `exports` on the server.
  var root = this;

  // Save the previous value of the `_` variable.
  var previousUnderscore = root._;

  // Save bytes in the minified (but not gzipped) version:
  var ArrayProto = Array.prototype, ObjProto = Object.prototype, FuncProto = Function.prototype;

  // Create quick reference variables for speed access to core prototypes.
  var
    push             = ArrayProto.push,
    slice            = ArrayProto.slice,
    toString         = ObjProto.toString,
    hasOwnProperty   = ObjProto.hasOwnProperty;

  // All **ECMAScript 5** native function implementations that we hope to use
  // are declared here.
  var
    nativeIsArray      = Array.isArray,
    nativeKeys         = Object.keys,
    nativeBind         = FuncProto.bind,
    nativeCreate       = Object.create;

  // Naked function reference for surrogate-prototype-swapping.
  var Ctor = function(){};

  // Create a safe reference to the Underscore object for use below.
  var _ = function(obj) {
    if (obj instanceof _) return obj;
    if (!(this instanceof _)) return new _(obj);
    this._wrapped = obj;
  };

  // Export the Underscore object for **Node.js**, with
  // backwards-compatibility for the old `require()` API. If we're in
  // the browser, add `_` as a global object.
  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = _;
    }
    exports._ = _;
  } else {
    root._ = _;
  }

  // Current version.
  _.VERSION = '1.8.3';

  // Internal function that returns an efficient (for current engines) version
  // of the passed-in callback, to be repeatedly applied in other Underscore
  // functions.
  var optimizeCb = function(func, context, argCount) {
    if (context === void 0) return func;
    switch (argCount == null ? 3 : argCount) {
      case 1: return function(value) {
        return func.call(context, value);
      };
      case 2: return function(value, other) {
        return func.call(context, value, other);
      };
      case 3: return function(value, index, collection) {
        return func.call(context, value, index, collection);
      };
      case 4: return function(accumulator, value, index, collection) {
        return func.call(context, accumulator, value, index, collection);
      };
    }
    return function() {
      return func.apply(context, arguments);
    };
  };

  // A mostly-internal function to generate callbacks that can be applied
  // to each element in a collection, returning the desired result — either
  // identity, an arbitrary callback, a property matcher, or a property accessor.
  var cb = function(value, context, argCount) {
    if (value == null) return _.identity;
    if (_.isFunction(value)) return optimizeCb(value, context, argCount);
    if (_.isObject(value)) return _.matcher(value);
    return _.property(value);
  };
  _.iteratee = function(value, context) {
    return cb(value, context, Infinity);
  };

  // An internal function for creating assigner functions.
  var createAssigner = function(keysFunc, undefinedOnly) {
    return function(obj) {
      var length = arguments.length;
      if (length < 2 || obj == null) return obj;
      for (var index = 1; index < length; index++) {
        var source = arguments[index],
            keys = keysFunc(source),
            l = keys.length;
        for (var i = 0; i < l; i++) {
          var key = keys[i];
          if (!undefinedOnly || obj[key] === void 0) obj[key] = source[key];
        }
      }
      return obj;
    };
  };

  // An internal function for creating a new object that inherits from another.
  var baseCreate = function(prototype) {
    if (!_.isObject(prototype)) return {};
    if (nativeCreate) return nativeCreate(prototype);
    Ctor.prototype = prototype;
    var result = new Ctor;
    Ctor.prototype = null;
    return result;
  };

  var property = function(key) {
    return function(obj) {
      return obj == null ? void 0 : obj[key];
    };
  };

  // Helper for collection methods to determine whether a collection
  // should be iterated as an array or as an object
  // Related: http://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength
  // Avoids a very nasty iOS 8 JIT bug on ARM-64. #2094
  var MAX_ARRAY_INDEX = Math.pow(2, 53) - 1;
  var getLength = property('length');
  var isArrayLike = function(collection) {
    var length = getLength(collection);
    return typeof length == 'number' && length >= 0 && length <= MAX_ARRAY_INDEX;
  };

  // Collection Functions
  // --------------------

  // The cornerstone, an `each` implementation, aka `forEach`.
  // Handles raw objects in addition to array-likes. Treats all
  // sparse array-likes as if they were dense.
  _.each = _.forEach = function(obj, iteratee, context) {
    iteratee = optimizeCb(iteratee, context);
    var i, length;
    if (isArrayLike(obj)) {
      for (i = 0, length = obj.length; i < length; i++) {
        iteratee(obj[i], i, obj);
      }
    } else {
      var keys = _.keys(obj);
      for (i = 0, length = keys.length; i < length; i++) {
        iteratee(obj[keys[i]], keys[i], obj);
      }
    }
    return obj;
  };

  // Return the results of applying the iteratee to each element.
  _.map = _.collect = function(obj, iteratee, context) {
    iteratee = cb(iteratee, context);
    var keys = !isArrayLike(obj) && _.keys(obj),
        length = (keys || obj).length,
        results = Array(length);
    for (var index = 0; index < length; index++) {
      var currentKey = keys ? keys[index] : index;
      results[index] = iteratee(obj[currentKey], currentKey, obj);
    }
    return results;
  };

  // Create a reducing function iterating left or right.
  function createReduce(dir) {
    // Optimized iterator function as using arguments.length
    // in the main function will deoptimize the, see #1991.
    function iterator(obj, iteratee, memo, keys, index, length) {
      for (; index >= 0 && index < length; index += dir) {
        var currentKey = keys ? keys[index] : index;
        memo = iteratee(memo, obj[currentKey], currentKey, obj);
      }
      return memo;
    }

    return function(obj, iteratee, memo, context) {
      iteratee = optimizeCb(iteratee, context, 4);
      var keys = !isArrayLike(obj) && _.keys(obj),
          length = (keys || obj).length,
          index = dir > 0 ? 0 : length - 1;
      // Determine the initial value if none is provided.
      if (arguments.length < 3) {
        memo = obj[keys ? keys[index] : index];
        index += dir;
      }
      return iterator(obj, iteratee, memo, keys, index, length);
    };
  }

  // **Reduce** builds up a single result from a list of values, aka `inject`,
  // or `foldl`.
  _.reduce = _.foldl = _.inject = createReduce(1);

  // The right-associative version of reduce, also known as `foldr`.
  _.reduceRight = _.foldr = createReduce(-1);

  // Return the first value which passes a truth test. Aliased as `detect`.
  _.find = _.detect = function(obj, predicate, context) {
    var key;
    if (isArrayLike(obj)) {
      key = _.findIndex(obj, predicate, context);
    } else {
      key = _.findKey(obj, predicate, context);
    }
    if (key !== void 0 && key !== -1) return obj[key];
  };

  // Return all the elements that pass a truth test.
  // Aliased as `select`.
  _.filter = _.select = function(obj, predicate, context) {
    var results = [];
    predicate = cb(predicate, context);
    _.each(obj, function(value, index, list) {
      if (predicate(value, index, list)) results.push(value);
    });
    return results;
  };

  // Return all the elements for which a truth test fails.
  _.reject = function(obj, predicate, context) {
    return _.filter(obj, _.negate(cb(predicate)), context);
  };

  // Determine whether all of the elements match a truth test.
  // Aliased as `all`.
  _.every = _.all = function(obj, predicate, context) {
    predicate = cb(predicate, context);
    var keys = !isArrayLike(obj) && _.keys(obj),
        length = (keys || obj).length;
    for (var index = 0; index < length; index++) {
      var currentKey = keys ? keys[index] : index;
      if (!predicate(obj[currentKey], currentKey, obj)) return false;
    }
    return true;
  };

  // Determine if at least one element in the object matches a truth test.
  // Aliased as `any`.
  _.some = _.any = function(obj, predicate, context) {
    predicate = cb(predicate, context);
    var keys = !isArrayLike(obj) && _.keys(obj),
        length = (keys || obj).length;
    for (var index = 0; index < length; index++) {
      var currentKey = keys ? keys[index] : index;
      if (predicate(obj[currentKey], currentKey, obj)) return true;
    }
    return false;
  };

  // Determine if the array or object contains a given item (using `===`).
  // Aliased as `includes` and `include`.
  _.contains = _.includes = _.include = function(obj, item, fromIndex, guard) {
    if (!isArrayLike(obj)) obj = _.values(obj);
    if (typeof fromIndex != 'number' || guard) fromIndex = 0;
    return _.indexOf(obj, item, fromIndex) >= 0;
  };

  // Invoke a method (with arguments) on every item in a collection.
  _.invoke = function(obj, method) {
    var args = slice.call(arguments, 2);
    var isFunc = _.isFunction(method);
    return _.map(obj, function(value) {
      var func = isFunc ? method : value[method];
      return func == null ? func : func.apply(value, args);
    });
  };

  // Convenience version of a common use case of `map`: fetching a property.
  _.pluck = function(obj, key) {
    return _.map(obj, _.property(key));
  };

  // Convenience version of a common use case of `filter`: selecting only objects
  // containing specific `key:value` pairs.
  _.where = function(obj, attrs) {
    return _.filter(obj, _.matcher(attrs));
  };

  // Convenience version of a common use case of `find`: getting the first object
  // containing specific `key:value` pairs.
  _.findWhere = function(obj, attrs) {
    return _.find(obj, _.matcher(attrs));
  };

  // Return the maximum element (or element-based computation).
  _.max = function(obj, iteratee, context) {
    var result = -Infinity, lastComputed = -Infinity,
        value, computed;
    if (iteratee == null && obj != null) {
      obj = isArrayLike(obj) ? obj : _.values(obj);
      for (var i = 0, length = obj.length; i < length; i++) {
        value = obj[i];
        if (value > result) {
          result = value;
        }
      }
    } else {
      iteratee = cb(iteratee, context);
      _.each(obj, function(value, index, list) {
        computed = iteratee(value, index, list);
        if (computed > lastComputed || computed === -Infinity && result === -Infinity) {
          result = value;
          lastComputed = computed;
        }
      });
    }
    return result;
  };

  // Return the minimum element (or element-based computation).
  _.min = function(obj, iteratee, context) {
    var result = Infinity, lastComputed = Infinity,
        value, computed;
    if (iteratee == null && obj != null) {
      obj = isArrayLike(obj) ? obj : _.values(obj);
      for (var i = 0, length = obj.length; i < length; i++) {
        value = obj[i];
        if (value < result) {
          result = value;
        }
      }
    } else {
      iteratee = cb(iteratee, context);
      _.each(obj, function(value, index, list) {
        computed = iteratee(value, index, list);
        if (computed < lastComputed || computed === Infinity && result === Infinity) {
          result = value;
          lastComputed = computed;
        }
      });
    }
    return result;
  };

  // Shuffle a collection, using the modern version of the
  // [Fisher-Yates shuffle](http://en.wikipedia.org/wiki/Fisher–Yates_shuffle).
  _.shuffle = function(obj) {
    var set = isArrayLike(obj) ? obj : _.values(obj);
    var length = set.length;
    var shuffled = Array(length);
    for (var index = 0, rand; index < length; index++) {
      rand = _.random(0, index);
      if (rand !== index) shuffled[index] = shuffled[rand];
      shuffled[rand] = set[index];
    }
    return shuffled;
  };

  // Sample **n** random values from a collection.
  // If **n** is not specified, returns a single random element.
  // The internal `guard` argument allows it to work with `map`.
  _.sample = function(obj, n, guard) {
    if (n == null || guard) {
      if (!isArrayLike(obj)) obj = _.values(obj);
      return obj[_.random(obj.length - 1)];
    }
    return _.shuffle(obj).slice(0, Math.max(0, n));
  };

  // Sort the object's values by a criterion produced by an iteratee.
  _.sortBy = function(obj, iteratee, context) {
    iteratee = cb(iteratee, context);
    return _.pluck(_.map(obj, function(value, index, list) {
      return {
        value: value,
        index: index,
        criteria: iteratee(value, index, list)
      };
    }).sort(function(left, right) {
      var a = left.criteria;
      var b = right.criteria;
      if (a !== b) {
        if (a > b || a === void 0) return 1;
        if (a < b || b === void 0) return -1;
      }
      return left.index - right.index;
    }), 'value');
  };

  // An internal function used for aggregate "group by" operations.
  var group = function(behavior) {
    return function(obj, iteratee, context) {
      var result = {};
      iteratee = cb(iteratee, context);
      _.each(obj, function(value, index) {
        var key = iteratee(value, index, obj);
        behavior(result, value, key);
      });
      return result;
    };
  };

  // Groups the object's values by a criterion. Pass either a string attribute
  // to group by, or a function that returns the criterion.
  _.groupBy = group(function(result, value, key) {
    if (_.has(result, key)) result[key].push(value); else result[key] = [value];
  });

  // Indexes the object's values by a criterion, similar to `groupBy`, but for
  // when you know that your index values will be unique.
  _.indexBy = group(function(result, value, key) {
    result[key] = value;
  });

  // Counts instances of an object that group by a certain criterion. Pass
  // either a string attribute to count by, or a function that returns the
  // criterion.
  _.countBy = group(function(result, value, key) {
    if (_.has(result, key)) result[key]++; else result[key] = 1;
  });

  // Safely create a real, live array from anything iterable.
  _.toArray = function(obj) {
    if (!obj) return [];
    if (_.isArray(obj)) return slice.call(obj);
    if (isArrayLike(obj)) return _.map(obj, _.identity);
    return _.values(obj);
  };

  // Return the number of elements in an object.
  _.size = function(obj) {
    if (obj == null) return 0;
    return isArrayLike(obj) ? obj.length : _.keys(obj).length;
  };

  // Split a collection into two arrays: one whose elements all satisfy the given
  // predicate, and one whose elements all do not satisfy the predicate.
  _.partition = function(obj, predicate, context) {
    predicate = cb(predicate, context);
    var pass = [], fail = [];
    _.each(obj, function(value, key, obj) {
      (predicate(value, key, obj) ? pass : fail).push(value);
    });
    return [pass, fail];
  };

  // Array Functions
  // ---------------

  // Get the first element of an array. Passing **n** will return the first N
  // values in the array. Aliased as `head` and `take`. The **guard** check
  // allows it to work with `_.map`.
  _.first = _.head = _.take = function(array, n, guard) {
    if (array == null) return void 0;
    if (n == null || guard) return array[0];
    return _.initial(array, array.length - n);
  };

  // Returns everything but the last entry of the array. Especially useful on
  // the arguments object. Passing **n** will return all the values in
  // the array, excluding the last N.
  _.initial = function(array, n, guard) {
    return slice.call(array, 0, Math.max(0, array.length - (n == null || guard ? 1 : n)));
  };

  // Get the last element of an array. Passing **n** will return the last N
  // values in the array.
  _.last = function(array, n, guard) {
    if (array == null) return void 0;
    if (n == null || guard) return array[array.length - 1];
    return _.rest(array, Math.max(0, array.length - n));
  };

  // Returns everything but the first entry of the array. Aliased as `tail` and `drop`.
  // Especially useful on the arguments object. Passing an **n** will return
  // the rest N values in the array.
  _.rest = _.tail = _.drop = function(array, n, guard) {
    return slice.call(array, n == null || guard ? 1 : n);
  };

  // Trim out all falsy values from an array.
  _.compact = function(array) {
    return _.filter(array, _.identity);
  };

  // Internal implementation of a recursive `flatten` function.
  var flatten = function(input, shallow, strict, startIndex) {
    var output = [], idx = 0;
    for (var i = startIndex || 0, length = getLength(input); i < length; i++) {
      var value = input[i];
      if (isArrayLike(value) && (_.isArray(value) || _.isArguments(value))) {
        //flatten current level of array or arguments object
        if (!shallow) value = flatten(value, shallow, strict);
        var j = 0, len = value.length;
        output.length += len;
        while (j < len) {
          output[idx++] = value[j++];
        }
      } else if (!strict) {
        output[idx++] = value;
      }
    }
    return output;
  };

  // Flatten out an array, either recursively (by default), or just one level.
  _.flatten = function(array, shallow) {
    return flatten(array, shallow, false);
  };

  // Return a version of the array that does not contain the specified value(s).
  _.without = function(array) {
    return _.difference(array, slice.call(arguments, 1));
  };

  // Produce a duplicate-free version of the array. If the array has already
  // been sorted, you have the option of using a faster algorithm.
  // Aliased as `unique`.
  _.uniq = _.unique = function(array, isSorted, iteratee, context) {
    if (!_.isBoolean(isSorted)) {
      context = iteratee;
      iteratee = isSorted;
      isSorted = false;
    }
    if (iteratee != null) iteratee = cb(iteratee, context);
    var result = [];
    var seen = [];
    for (var i = 0, length = getLength(array); i < length; i++) {
      var value = array[i],
          computed = iteratee ? iteratee(value, i, array) : value;
      if (isSorted) {
        if (!i || seen !== computed) result.push(value);
        seen = computed;
      } else if (iteratee) {
        if (!_.contains(seen, computed)) {
          seen.push(computed);
          result.push(value);
        }
      } else if (!_.contains(result, value)) {
        result.push(value);
      }
    }
    return result;
  };

  // Produce an array that contains the union: each distinct element from all of
  // the passed-in arrays.
  _.union = function() {
    return _.uniq(flatten(arguments, true, true));
  };

  // Produce an array that contains every item shared between all the
  // passed-in arrays.
  _.intersection = function(array) {
    var result = [];
    var argsLength = arguments.length;
    for (var i = 0, length = getLength(array); i < length; i++) {
      var item = array[i];
      if (_.contains(result, item)) continue;
      for (var j = 1; j < argsLength; j++) {
        if (!_.contains(arguments[j], item)) break;
      }
      if (j === argsLength) result.push(item);
    }
    return result;
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
    var rest = flatten(arguments, true, true, 1);
    return _.filter(array, function(value){
      return !_.contains(rest, value);
    });
  };

  // Zip together multiple lists into a single array -- elements that share
  // an index go together.
  _.zip = function() {
    return _.unzip(arguments);
  };

  // Complement of _.zip. Unzip accepts an array of arrays and groups
  // each array's elements on shared indices
  _.unzip = function(array) {
    var length = array && _.max(array, getLength).length || 0;
    var result = Array(length);

    for (var index = 0; index < length; index++) {
      result[index] = _.pluck(array, index);
    }
    return result;
  };

  // Converts lists into objects. Pass either a single array of `[key, value]`
  // pairs, or two parallel arrays of the same length -- one of keys, and one of
  // the corresponding values.
  _.object = function(list, values) {
    var result = {};
    for (var i = 0, length = getLength(list); i < length; i++) {
      if (values) {
        result[list[i]] = values[i];
      } else {
        result[list[i][0]] = list[i][1];
      }
    }
    return result;
  };

  // Generator function to create the findIndex and findLastIndex functions
  function createPredicateIndexFinder(dir) {
    return function(array, predicate, context) {
      predicate = cb(predicate, context);
      var length = getLength(array);
      var index = dir > 0 ? 0 : length - 1;
      for (; index >= 0 && index < length; index += dir) {
        if (predicate(array[index], index, array)) return index;
      }
      return -1;
    };
  }

  // Returns the first index on an array-like that passes a predicate test
  _.findIndex = createPredicateIndexFinder(1);
  _.findLastIndex = createPredicateIndexFinder(-1);

  // Use a comparator function to figure out the smallest index at which
  // an object should be inserted so as to maintain order. Uses binary search.
  _.sortedIndex = function(array, obj, iteratee, context) {
    iteratee = cb(iteratee, context, 1);
    var value = iteratee(obj);
    var low = 0, high = getLength(array);
    while (low < high) {
      var mid = Math.floor((low + high) / 2);
      if (iteratee(array[mid]) < value) low = mid + 1; else high = mid;
    }
    return low;
  };

  // Generator function to create the indexOf and lastIndexOf functions
  function createIndexFinder(dir, predicateFind, sortedIndex) {
    return function(array, item, idx) {
      var i = 0, length = getLength(array);
      if (typeof idx == 'number') {
        if (dir > 0) {
            i = idx >= 0 ? idx : Math.max(idx + length, i);
        } else {
            length = idx >= 0 ? Math.min(idx + 1, length) : idx + length + 1;
        }
      } else if (sortedIndex && idx && length) {
        idx = sortedIndex(array, item);
        return array[idx] === item ? idx : -1;
      }
      if (item !== item) {
        idx = predicateFind(slice.call(array, i, length), _.isNaN);
        return idx >= 0 ? idx + i : -1;
      }
      for (idx = dir > 0 ? i : length - 1; idx >= 0 && idx < length; idx += dir) {
        if (array[idx] === item) return idx;
      }
      return -1;
    };
  }

  // Return the position of the first occurrence of an item in an array,
  // or -1 if the item is not included in the array.
  // If the array is large and already in sort order, pass `true`
  // for **isSorted** to use binary search.
  _.indexOf = createIndexFinder(1, _.findIndex, _.sortedIndex);
  _.lastIndexOf = createIndexFinder(-1, _.findLastIndex);

  // Generate an integer Array containing an arithmetic progression. A port of
  // the native Python `range()` function. See
  // [the Python documentation](http://docs.python.org/library/functions.html#range).
  _.range = function(start, stop, step) {
    if (stop == null) {
      stop = start || 0;
      start = 0;
    }
    step = step || 1;

    var length = Math.max(Math.ceil((stop - start) / step), 0);
    var range = Array(length);

    for (var idx = 0; idx < length; idx++, start += step) {
      range[idx] = start;
    }

    return range;
  };

  // Function (ahem) Functions
  // ------------------

  // Determines whether to execute a function as a constructor
  // or a normal function with the provided arguments
  var executeBound = function(sourceFunc, boundFunc, context, callingContext, args) {
    if (!(callingContext instanceof boundFunc)) return sourceFunc.apply(context, args);
    var self = baseCreate(sourceFunc.prototype);
    var result = sourceFunc.apply(self, args);
    if (_.isObject(result)) return result;
    return self;
  };

  // Create a function bound to a given object (assigning `this`, and arguments,
  // optionally). Delegates to **ECMAScript 5**'s native `Function.bind` if
  // available.
  _.bind = function(func, context) {
    if (nativeBind && func.bind === nativeBind) return nativeBind.apply(func, slice.call(arguments, 1));
    if (!_.isFunction(func)) throw new TypeError('Bind must be called on a function');
    var args = slice.call(arguments, 2);
    var bound = function() {
      return executeBound(func, bound, context, this, args.concat(slice.call(arguments)));
    };
    return bound;
  };

  // Partially apply a function by creating a version that has had some of its
  // arguments pre-filled, without changing its dynamic `this` context. _ acts
  // as a placeholder, allowing any combination of arguments to be pre-filled.
  _.partial = function(func) {
    var boundArgs = slice.call(arguments, 1);
    var bound = function() {
      var position = 0, length = boundArgs.length;
      var args = Array(length);
      for (var i = 0; i < length; i++) {
        args[i] = boundArgs[i] === _ ? arguments[position++] : boundArgs[i];
      }
      while (position < arguments.length) args.push(arguments[position++]);
      return executeBound(func, bound, this, this, args);
    };
    return bound;
  };

  // Bind a number of an object's methods to that object. Remaining arguments
  // are the method names to be bound. Useful for ensuring that all callbacks
  // defined on an object belong to it.
  _.bindAll = function(obj) {
    var i, length = arguments.length, key;
    if (length <= 1) throw new Error('bindAll must be passed function names');
    for (i = 1; i < length; i++) {
      key = arguments[i];
      obj[key] = _.bind(obj[key], obj);
    }
    return obj;
  };

  // Memoize an expensive function by storing its results.
  _.memoize = function(func, hasher) {
    var memoize = function(key) {
      var cache = memoize.cache;
      var address = '' + (hasher ? hasher.apply(this, arguments) : key);
      if (!_.has(cache, address)) cache[address] = func.apply(this, arguments);
      return cache[address];
    };
    memoize.cache = {};
    return memoize;
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  _.delay = function(func, wait) {
    var args = slice.call(arguments, 2);
    return setTimeout(function(){
      return func.apply(null, args);
    }, wait);
  };

  // Defers a function, scheduling it to run after the current call stack has
  // cleared.
  _.defer = _.partial(_.delay, _, 1);

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time. Normally, the throttled function will run
  // as much as it can, without ever going more than once per `wait` duration;
  // but if you'd like to disable the execution on the leading edge, pass
  // `{leading: false}`. To disable execution on the trailing edge, ditto.
  _.throttle = function(func, wait, options) {
    var context, args, result;
    var timeout = null;
    var previous = 0;
    if (!options) options = {};
    var later = function() {
      previous = options.leading === false ? 0 : _.now();
      timeout = null;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    };
    return function() {
      var now = _.now();
      if (!previous && options.leading === false) previous = now;
      var remaining = wait - (now - previous);
      context = this;
      args = arguments;
      if (remaining <= 0 || remaining > wait) {
        if (timeout) {
          clearTimeout(timeout);
          timeout = null;
        }
        previous = now;
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      } else if (!timeout && options.trailing !== false) {
        timeout = setTimeout(later, remaining);
      }
      return result;
    };
  };

  // Returns a function, that, as long as it continues to be invoked, will not
  // be triggered. The function will be called after it stops being called for
  // N milliseconds. If `immediate` is passed, trigger the function on the
  // leading edge, instead of the trailing.
  _.debounce = function(func, wait, immediate) {
    var timeout, args, context, timestamp, result;

    var later = function() {
      var last = _.now() - timestamp;

      if (last < wait && last >= 0) {
        timeout = setTimeout(later, wait - last);
      } else {
        timeout = null;
        if (!immediate) {
          result = func.apply(context, args);
          if (!timeout) context = args = null;
        }
      }
    };

    return function() {
      context = this;
      args = arguments;
      timestamp = _.now();
      var callNow = immediate && !timeout;
      if (!timeout) timeout = setTimeout(later, wait);
      if (callNow) {
        result = func.apply(context, args);
        context = args = null;
      }

      return result;
    };
  };

  // Returns the first function passed as an argument to the second,
  // allowing you to adjust arguments, run code before and after, and
  // conditionally execute the original function.
  _.wrap = function(func, wrapper) {
    return _.partial(wrapper, func);
  };

  // Returns a negated version of the passed-in predicate.
  _.negate = function(predicate) {
    return function() {
      return !predicate.apply(this, arguments);
    };
  };

  // Returns a function that is the composition of a list of functions, each
  // consuming the return value of the function that follows.
  _.compose = function() {
    var args = arguments;
    var start = args.length - 1;
    return function() {
      var i = start;
      var result = args[start].apply(this, arguments);
      while (i--) result = args[i].call(this, result);
      return result;
    };
  };

  // Returns a function that will only be executed on and after the Nth call.
  _.after = function(times, func) {
    return function() {
      if (--times < 1) {
        return func.apply(this, arguments);
      }
    };
  };

  // Returns a function that will only be executed up to (but not including) the Nth call.
  _.before = function(times, func) {
    var memo;
    return function() {
      if (--times > 0) {
        memo = func.apply(this, arguments);
      }
      if (times <= 1) func = null;
      return memo;
    };
  };

  // Returns a function that will be executed at most one time, no matter how
  // often you call it. Useful for lazy initialization.
  _.once = _.partial(_.before, 2);

  // Object Functions
  // ----------------

  // Keys in IE < 9 that won't be iterated by `for key in ...` and thus missed.
  var hasEnumBug = !{toString: null}.propertyIsEnumerable('toString');
  var nonEnumerableProps = ['valueOf', 'isPrototypeOf', 'toString',
                      'propertyIsEnumerable', 'hasOwnProperty', 'toLocaleString'];

  function collectNonEnumProps(obj, keys) {
    var nonEnumIdx = nonEnumerableProps.length;
    var constructor = obj.constructor;
    var proto = (_.isFunction(constructor) && constructor.prototype) || ObjProto;

    // Constructor is a special case.
    var prop = 'constructor';
    if (_.has(obj, prop) && !_.contains(keys, prop)) keys.push(prop);

    while (nonEnumIdx--) {
      prop = nonEnumerableProps[nonEnumIdx];
      if (prop in obj && obj[prop] !== proto[prop] && !_.contains(keys, prop)) {
        keys.push(prop);
      }
    }
  }

  // Retrieve the names of an object's own properties.
  // Delegates to **ECMAScript 5**'s native `Object.keys`
  _.keys = function(obj) {
    if (!_.isObject(obj)) return [];
    if (nativeKeys) return nativeKeys(obj);
    var keys = [];
    for (var key in obj) if (_.has(obj, key)) keys.push(key);
    // Ahem, IE < 9.
    if (hasEnumBug) collectNonEnumProps(obj, keys);
    return keys;
  };

  // Retrieve all the property names of an object.
  _.allKeys = function(obj) {
    if (!_.isObject(obj)) return [];
    var keys = [];
    for (var key in obj) keys.push(key);
    // Ahem, IE < 9.
    if (hasEnumBug) collectNonEnumProps(obj, keys);
    return keys;
  };

  // Retrieve the values of an object's properties.
  _.values = function(obj) {
    var keys = _.keys(obj);
    var length = keys.length;
    var values = Array(length);
    for (var i = 0; i < length; i++) {
      values[i] = obj[keys[i]];
    }
    return values;
  };

  // Returns the results of applying the iteratee to each element of the object
  // In contrast to _.map it returns an object
  _.mapObject = function(obj, iteratee, context) {
    iteratee = cb(iteratee, context);
    var keys =  _.keys(obj),
          length = keys.length,
          results = {},
          currentKey;
      for (var index = 0; index < length; index++) {
        currentKey = keys[index];
        results[currentKey] = iteratee(obj[currentKey], currentKey, obj);
      }
      return results;
  };

  // Convert an object into a list of `[key, value]` pairs.
  _.pairs = function(obj) {
    var keys = _.keys(obj);
    var length = keys.length;
    var pairs = Array(length);
    for (var i = 0; i < length; i++) {
      pairs[i] = [keys[i], obj[keys[i]]];
    }
    return pairs;
  };

  // Invert the keys and values of an object. The values must be serializable.
  _.invert = function(obj) {
    var result = {};
    var keys = _.keys(obj);
    for (var i = 0, length = keys.length; i < length; i++) {
      result[obj[keys[i]]] = keys[i];
    }
    return result;
  };

  // Return a sorted list of the function names available on the object.
  // Aliased as `methods`
  _.functions = _.methods = function(obj) {
    var names = [];
    for (var key in obj) {
      if (_.isFunction(obj[key])) names.push(key);
    }
    return names.sort();
  };

  // Extend a given object with all the properties in passed-in object(s).
  _.extend = createAssigner(_.allKeys);

  // Assigns a given object with all the own properties in the passed-in object(s)
  // (https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)
  _.extendOwn = _.assign = createAssigner(_.keys);

  // Returns the first key on an object that passes a predicate test
  _.findKey = function(obj, predicate, context) {
    predicate = cb(predicate, context);
    var keys = _.keys(obj), key;
    for (var i = 0, length = keys.length; i < length; i++) {
      key = keys[i];
      if (predicate(obj[key], key, obj)) return key;
    }
  };

  // Return a copy of the object only containing the whitelisted properties.
  _.pick = function(object, oiteratee, context) {
    var result = {}, obj = object, iteratee, keys;
    if (obj == null) return result;
    if (_.isFunction(oiteratee)) {
      keys = _.allKeys(obj);
      iteratee = optimizeCb(oiteratee, context);
    } else {
      keys = flatten(arguments, false, false, 1);
      iteratee = function(value, key, obj) { return key in obj; };
      obj = Object(obj);
    }
    for (var i = 0, length = keys.length; i < length; i++) {
      var key = keys[i];
      var value = obj[key];
      if (iteratee(value, key, obj)) result[key] = value;
    }
    return result;
  };

   // Return a copy of the object without the blacklisted properties.
  _.omit = function(obj, iteratee, context) {
    if (_.isFunction(iteratee)) {
      iteratee = _.negate(iteratee);
    } else {
      var keys = _.map(flatten(arguments, false, false, 1), String);
      iteratee = function(value, key) {
        return !_.contains(keys, key);
      };
    }
    return _.pick(obj, iteratee, context);
  };

  // Fill in a given object with default properties.
  _.defaults = createAssigner(_.allKeys, true);

  // Creates an object that inherits from the given prototype object.
  // If additional properties are provided then they will be added to the
  // created object.
  _.create = function(prototype, props) {
    var result = baseCreate(prototype);
    if (props) _.extendOwn(result, props);
    return result;
  };

  // Create a (shallow-cloned) duplicate of an object.
  _.clone = function(obj) {
    if (!_.isObject(obj)) return obj;
    return _.isArray(obj) ? obj.slice() : _.extend({}, obj);
  };

  // Invokes interceptor with the obj, and then returns obj.
  // The primary purpose of this method is to "tap into" a method chain, in
  // order to perform operations on intermediate results within the chain.
  _.tap = function(obj, interceptor) {
    interceptor(obj);
    return obj;
  };

  // Returns whether an object has a given set of `key:value` pairs.
  _.isMatch = function(object, attrs) {
    var keys = _.keys(attrs), length = keys.length;
    if (object == null) return !length;
    var obj = Object(object);
    for (var i = 0; i < length; i++) {
      var key = keys[i];
      if (attrs[key] !== obj[key] || !(key in obj)) return false;
    }
    return true;
  };


  // Internal recursive comparison function for `isEqual`.
  var eq = function(a, b, aStack, bStack) {
    // Identical objects are equal. `0 === -0`, but they aren't identical.
    // See the [Harmony `egal` proposal](http://wiki.ecmascript.org/doku.php?id=harmony:egal).
    if (a === b) return a !== 0 || 1 / a === 1 / b;
    // A strict comparison is necessary because `null == undefined`.
    if (a == null || b == null) return a === b;
    // Unwrap any wrapped objects.
    if (a instanceof _) a = a._wrapped;
    if (b instanceof _) b = b._wrapped;
    // Compare `[[Class]]` names.
    var className = toString.call(a);
    if (className !== toString.call(b)) return false;
    switch (className) {
      // Strings, numbers, regular expressions, dates, and booleans are compared by value.
      case '[object RegExp]':
      // RegExps are coerced to strings for comparison (Note: '' + /a/i === '/a/i')
      case '[object String]':
        // Primitives and their corresponding object wrappers are equivalent; thus, `"5"` is
        // equivalent to `new String("5")`.
        return '' + a === '' + b;
      case '[object Number]':
        // `NaN`s are equivalent, but non-reflexive.
        // Object(NaN) is equivalent to NaN
        if (+a !== +a) return +b !== +b;
        // An `egal` comparison is performed for other numeric values.
        return +a === 0 ? 1 / +a === 1 / b : +a === +b;
      case '[object Date]':
      case '[object Boolean]':
        // Coerce dates and booleans to numeric primitive values. Dates are compared by their
        // millisecond representations. Note that invalid dates with millisecond representations
        // of `NaN` are not equivalent.
        return +a === +b;
    }

    var areArrays = className === '[object Array]';
    if (!areArrays) {
      if (typeof a != 'object' || typeof b != 'object') return false;

      // Objects with different constructors are not equivalent, but `Object`s or `Array`s
      // from different frames are.
      var aCtor = a.constructor, bCtor = b.constructor;
      if (aCtor !== bCtor && !(_.isFunction(aCtor) && aCtor instanceof aCtor &&
                               _.isFunction(bCtor) && bCtor instanceof bCtor)
                          && ('constructor' in a && 'constructor' in b)) {
        return false;
      }
    }
    // Assume equality for cyclic structures. The algorithm for detecting cyclic
    // structures is adapted from ES 5.1 section 15.12.3, abstract operation `JO`.

    // Initializing stack of traversed objects.
    // It's done here since we only need them for objects and arrays comparison.
    aStack = aStack || [];
    bStack = bStack || [];
    var length = aStack.length;
    while (length--) {
      // Linear search. Performance is inversely proportional to the number of
      // unique nested structures.
      if (aStack[length] === a) return bStack[length] === b;
    }

    // Add the first object to the stack of traversed objects.
    aStack.push(a);
    bStack.push(b);

    // Recursively compare objects and arrays.
    if (areArrays) {
      // Compare array lengths to determine if a deep comparison is necessary.
      length = a.length;
      if (length !== b.length) return false;
      // Deep compare the contents, ignoring non-numeric properties.
      while (length--) {
        if (!eq(a[length], b[length], aStack, bStack)) return false;
      }
    } else {
      // Deep compare objects.
      var keys = _.keys(a), key;
      length = keys.length;
      // Ensure that both objects contain the same number of properties before comparing deep equality.
      if (_.keys(b).length !== length) return false;
      while (length--) {
        // Deep compare each member
        key = keys[length];
        if (!(_.has(b, key) && eq(a[key], b[key], aStack, bStack))) return false;
      }
    }
    // Remove the first object from the stack of traversed objects.
    aStack.pop();
    bStack.pop();
    return true;
  };

  // Perform a deep comparison to check if two objects are equal.
  _.isEqual = function(a, b) {
    return eq(a, b);
  };

  // Is a given array, string, or object empty?
  // An "empty" object has no enumerable own-properties.
  _.isEmpty = function(obj) {
    if (obj == null) return true;
    if (isArrayLike(obj) && (_.isArray(obj) || _.isString(obj) || _.isArguments(obj))) return obj.length === 0;
    return _.keys(obj).length === 0;
  };

  // Is a given value a DOM element?
  _.isElement = function(obj) {
    return !!(obj && obj.nodeType === 1);
  };

  // Is a given value an array?
  // Delegates to ECMA5's native Array.isArray
  _.isArray = nativeIsArray || function(obj) {
    return toString.call(obj) === '[object Array]';
  };

  // Is a given variable an object?
  _.isObject = function(obj) {
    var type = typeof obj;
    return type === 'function' || type === 'object' && !!obj;
  };

  // Add some isType methods: isArguments, isFunction, isString, isNumber, isDate, isRegExp, isError.
  _.each(['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp', 'Error'], function(name) {
    _['is' + name] = function(obj) {
      return toString.call(obj) === '[object ' + name + ']';
    };
  });

  // Define a fallback version of the method in browsers (ahem, IE < 9), where
  // there isn't any inspectable "Arguments" type.
  if (!_.isArguments(arguments)) {
    _.isArguments = function(obj) {
      return _.has(obj, 'callee');
    };
  }

  // Optimize `isFunction` if appropriate. Work around some typeof bugs in old v8,
  // IE 11 (#1621), and in Safari 8 (#1929).
  if (typeof /./ != 'function' && typeof Int8Array != 'object') {
    _.isFunction = function(obj) {
      return typeof obj == 'function' || false;
    };
  }

  // Is a given object a finite number?
  _.isFinite = function(obj) {
    return isFinite(obj) && !isNaN(parseFloat(obj));
  };

  // Is the given value `NaN`? (NaN is the only number which does not equal itself).
  _.isNaN = function(obj) {
    return _.isNumber(obj) && obj !== +obj;
  };

  // Is a given value a boolean?
  _.isBoolean = function(obj) {
    return obj === true || obj === false || toString.call(obj) === '[object Boolean]';
  };

  // Is a given value equal to null?
  _.isNull = function(obj) {
    return obj === null;
  };

  // Is a given variable undefined?
  _.isUndefined = function(obj) {
    return obj === void 0;
  };

  // Shortcut function for checking if an object has a given property directly
  // on itself (in other words, not on a prototype).
  _.has = function(obj, key) {
    return obj != null && hasOwnProperty.call(obj, key);
  };

  // Utility Functions
  // -----------------

  // Run Underscore.js in *noConflict* mode, returning the `_` variable to its
  // previous owner. Returns a reference to the Underscore object.
  _.noConflict = function() {
    root._ = previousUnderscore;
    return this;
  };

  // Keep the identity function around for default iteratees.
  _.identity = function(value) {
    return value;
  };

  // Predicate-generating functions. Often useful outside of Underscore.
  _.constant = function(value) {
    return function() {
      return value;
    };
  };

  _.noop = function(){};

  _.property = property;

  // Generates a function for a given object that returns a given property.
  _.propertyOf = function(obj) {
    return obj == null ? function(){} : function(key) {
      return obj[key];
    };
  };

  // Returns a predicate for checking whether an object has a given set of
  // `key:value` pairs.
  _.matcher = _.matches = function(attrs) {
    attrs = _.extendOwn({}, attrs);
    return function(obj) {
      return _.isMatch(obj, attrs);
    };
  };

  // Run a function **n** times.
  _.times = function(n, iteratee, context) {
    var accum = Array(Math.max(0, n));
    iteratee = optimizeCb(iteratee, context, 1);
    for (var i = 0; i < n; i++) accum[i] = iteratee(i);
    return accum;
  };

  // Return a random integer between min and max (inclusive).
  _.random = function(min, max) {
    if (max == null) {
      max = min;
      min = 0;
    }
    return min + Math.floor(Math.random() * (max - min + 1));
  };

  // A (possibly faster) way to get the current timestamp as an integer.
  _.now = Date.now || function() {
    return new Date().getTime();
  };

   // List of HTML entities for escaping.
  var escapeMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '`': '&#x60;'
  };
  var unescapeMap = _.invert(escapeMap);

  // Functions for escaping and unescaping strings to/from HTML interpolation.
  var createEscaper = function(map) {
    var escaper = function(match) {
      return map[match];
    };
    // Regexes for identifying a key that needs to be escaped
    var source = '(?:' + _.keys(map).join('|') + ')';
    var testRegexp = RegExp(source);
    var replaceRegexp = RegExp(source, 'g');
    return function(string) {
      string = string == null ? '' : '' + string;
      return testRegexp.test(string) ? string.replace(replaceRegexp, escaper) : string;
    };
  };
  _.escape = createEscaper(escapeMap);
  _.unescape = createEscaper(unescapeMap);

  // If the value of the named `property` is a function then invoke it with the
  // `object` as context; otherwise, return it.
  _.result = function(object, property, fallback) {
    var value = object == null ? void 0 : object[property];
    if (value === void 0) {
      value = fallback;
    }
    return _.isFunction(value) ? value.call(object) : value;
  };

  // Generate a unique integer id (unique within the entire client session).
  // Useful for temporary DOM ids.
  var idCounter = 0;
  _.uniqueId = function(prefix) {
    var id = ++idCounter + '';
    return prefix ? prefix + id : id;
  };

  // By default, Underscore uses ERB-style template delimiters, change the
  // following template settings to use alternative delimiters.
  _.templateSettings = {
    evaluate    : /<%([\s\S]+?)%>/g,
    interpolate : /<%=([\s\S]+?)%>/g,
    escape      : /<%-([\s\S]+?)%>/g
  };

  // When customizing `templateSettings`, if you don't want to define an
  // interpolation, evaluation or escaping regex, we need one that is
  // guaranteed not to match.
  var noMatch = /(.)^/;

  // Certain characters need to be escaped so that they can be put into a
  // string literal.
  var escapes = {
    "'":      "'",
    '\\':     '\\',
    '\r':     'r',
    '\n':     'n',
    '\u2028': 'u2028',
    '\u2029': 'u2029'
  };

  var escaper = /\\|'|\r|\n|\u2028|\u2029/g;

  var escapeChar = function(match) {
    return '\\' + escapes[match];
  };

  // JavaScript micro-templating, similar to John Resig's implementation.
  // Underscore templating handles arbitrary delimiters, preserves whitespace,
  // and correctly escapes quotes within interpolated code.
  // NB: `oldSettings` only exists for backwards compatibility.
  _.template = function(text, settings, oldSettings) {
    if (!settings && oldSettings) settings = oldSettings;
    settings = _.defaults({}, settings, _.templateSettings);

    // Combine delimiters into one regular expression via alternation.
    var matcher = RegExp([
      (settings.escape || noMatch).source,
      (settings.interpolate || noMatch).source,
      (settings.evaluate || noMatch).source
    ].join('|') + '|$', 'g');

    // Compile the template source, escaping string literals appropriately.
    var index = 0;
    var source = "__p+='";
    text.replace(matcher, function(match, escape, interpolate, evaluate, offset) {
      source += text.slice(index, offset).replace(escaper, escapeChar);
      index = offset + match.length;

      if (escape) {
        source += "'+\n((__t=(" + escape + "))==null?'':_.escape(__t))+\n'";
      } else if (interpolate) {
        source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'";
      } else if (evaluate) {
        source += "';\n" + evaluate + "\n__p+='";
      }

      // Adobe VMs need the match returned to produce the correct offest.
      return match;
    });
    source += "';\n";

    // If a variable is not specified, place data values in local scope.
    if (!settings.variable) source = 'with(obj||{}){\n' + source + '}\n';

    source = "var __t,__p='',__j=Array.prototype.join," +
      "print=function(){__p+=__j.call(arguments,'');};\n" +
      source + 'return __p;\n';

    try {
      var render = new Function(settings.variable || 'obj', '_', source);
    } catch (e) {
      e.source = source;
      throw e;
    }

    var template = function(data) {
      return render.call(this, data, _);
    };

    // Provide the compiled source as a convenience for precompilation.
    var argument = settings.variable || 'obj';
    template.source = 'function(' + argument + '){\n' + source + '}';

    return template;
  };

  // Add a "chain" function. Start chaining a wrapped Underscore object.
  _.chain = function(obj) {
    var instance = _(obj);
    instance._chain = true;
    return instance;
  };

  // OOP
  // ---------------
  // If Underscore is called as a function, it returns a wrapped object that
  // can be used OO-style. This wrapper holds altered versions of all the
  // underscore functions. Wrapped objects may be chained.

  // Helper function to continue chaining intermediate results.
  var result = function(instance, obj) {
    return instance._chain ? _(obj).chain() : obj;
  };

  // Add your own custom functions to the Underscore object.
  _.mixin = function(obj) {
    _.each(_.functions(obj), function(name) {
      var func = _[name] = obj[name];
      _.prototype[name] = function() {
        var args = [this._wrapped];
        push.apply(args, arguments);
        return result(this, func.apply(_, args));
      };
    });
  };

  // Add all of the Underscore functions to the wrapper object.
  _.mixin(_);

  // Add all mutator Array functions to the wrapper.
  _.each(['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'], function(name) {
    var method = ArrayProto[name];
    _.prototype[name] = function() {
      var obj = this._wrapped;
      method.apply(obj, arguments);
      if ((name === 'shift' || name === 'splice') && obj.length === 0) delete obj[0];
      return result(this, obj);
    };
  });

  // Add all accessor Array functions to the wrapper.
  _.each(['concat', 'join', 'slice'], function(name) {
    var method = ArrayProto[name];
    _.prototype[name] = function() {
      return result(this, method.apply(this._wrapped, arguments));
    };
  });

  // Extracts the result from a wrapped and chained object.
  _.prototype.value = function() {
    return this._wrapped;
  };

  // Provide unwrapping proxy for some methods used in engine operations
  // such as arithmetic and JSON stringification.
  _.prototype.valueOf = _.prototype.toJSON = _.prototype.value;

  _.prototype.toString = function() {
    return '' + this._wrapped;
  };

  // AMD registration happens at the end for compatibility with AMD loaders
  // that may not enforce next-turn semantics on modules. Even though general
  // practice for AMD registration is to be anonymous, underscore registers
  // as a named module because, like jQuery, it is a base library that is
  // popular enough to be bundled in a third party lib, but not be part of
  // an AMD load request. Those cases could generate an error when an
  // anonymous define() is called outside of a loader request.
  if (typeof define === 'function' && define.amd) {
    define('underscore', [], function() {
      return _;
    });
  }
}.call(this));

},{}],38:[function(require,module,exports){
// Backbone.Stickit v0.9.2, MIT Licensed
// Copyright (c) 2012-2015 The New York Times, CMS Group, Matthew DeLambo <delambo@gmail.com>

(function (factory) {

  // Set up Stickit appropriately for the environment. Start with AMD.
  if (typeof define === 'function' && define.amd)
    define(['underscore', 'backbone', 'exports'], factory);

  // Next for Node.js or CommonJS.
  else if (typeof exports === 'object')
    factory(require('underscore'), require('backbone'), exports);

  // Finally, as a browser global.
  else
    factory(_, Backbone, {});

}(function (_, Backbone, Stickit) {

  // Stickit Namespace
  // --------------------------

  // Export onto Backbone object
  Backbone.Stickit = Stickit;

  Stickit._handlers = [];

  Stickit.addHandler = function(handlers) {
    // Fill-in default values.
    handlers = _.map(_.flatten([handlers]), function(handler) {
      return _.defaults({}, handler, {
        updateModel: true,
        updateView: true,
        updateMethod: 'text'
      });
    });
    this._handlers = this._handlers.concat(handlers);
  };

  // Backbone.View Mixins
  // --------------------

  Stickit.ViewMixin = {

    // Collection of model event bindings.
    //   [{model,event,fn,config}, ...]
    _modelBindings: null,

    // Unbind the model and event bindings from `this._modelBindings` and
    // `this.$el`. If the optional `model` parameter is defined, then only
    // delete bindings for the given `model` and its corresponding view events.
    unstickit: function(model, bindingSelector) {

      // Support passing a bindings hash in place of bindingSelector.
      if (_.isObject(bindingSelector)) {
        _.each(bindingSelector, function(v, selector) {
          this.unstickit(model, selector);
        }, this);
        return;
      }

      var models = [], destroyFns = [];
      this._modelBindings = _.reject(this._modelBindings, function(binding) {
        if (model && binding.model !== model) return;
        if (bindingSelector && binding.config.selector != bindingSelector) return;

        binding.model.off(binding.event, binding.fn);
        destroyFns.push(binding.config._destroy);
        models.push(binding.model);
        return true;
      });

      // Trigger an event for each model that was unbound.
      _.invoke(_.uniq(models), 'trigger', 'stickit:unstuck', this.cid);

      // Call `_destroy` on a unique list of the binding callbacks.
      _.each(_.uniq(destroyFns), function(fn) { fn.call(this); }, this);

      this.$el.off('.stickit' + (model ? '.' + model.cid : ''), bindingSelector);
    },

    // Initilize Stickit bindings for the view. Subsequent binding additions
    // can either call `stickit` with the new bindings, or add them directly
    // with `addBinding`. Both arguments to `stickit` are optional.
    stickit: function(optionalModel, optionalBindingsConfig) {
      var model = optionalModel || this.model,
          bindings = optionalBindingsConfig || _.result(this, "bindings") || {};

      this._modelBindings || (this._modelBindings = []);

      // Add bindings in bulk using `addBinding`.
      this.addBinding(model, bindings);

      // Wrap `view.remove` to unbind stickit model and dom events.
      var remove = this.remove;
      if (!remove.stickitWrapped) {
        this.remove = function() {
          var ret = this;
          this.unstickit();
          if (remove) ret = remove.apply(this, arguments);
          return ret;
        };
      }
      this.remove.stickitWrapped = true;
      return this;
    },

    // Add a single Stickit binding or a hash of bindings to the model. If
    // `optionalModel` is ommitted, will default to the view's `model` property.
    addBinding: function(optionalModel, selector, binding) {
      var model = optionalModel || this.model,
          namespace = '.stickit.' + model.cid;

      binding = binding || {};

      // Support jQuery-style {key: val} event maps.
      if (_.isObject(selector)) {
        var bindings = selector;
        _.each(bindings, function(val, key) {
          this.addBinding(model, key, val);
        }, this);
        return;
      }

      // Special case the ':el' selector to use the view's this.$el.
      var $el = selector === ':el' ? this.$el : this.$(selector);

      // Clear any previous matching bindings.
      this.unstickit(model, selector);

      // Fail fast if the selector didn't match an element.
      if (!$el.length) return;

      // Allow shorthand setting of model attributes - `'selector':'observe'`.
      if (_.isString(binding)) binding = {observe: binding};

      // Handle case where `observe` is in the form of a function.
      if (_.isFunction(binding.observe)) binding.observe = binding.observe.call(this);

      // Find all matching Stickit handlers that could apply to this element
      // and store in a config object.
      var config = getConfiguration($el, binding);

      // The attribute we're observing in our config.
      var modelAttr = config.observe;

      // Store needed properties for later.
      config.selector = selector;
      config.view = this;

      // Create the model set options with a unique `bindId` so that we
      // can avoid double-binding in the `change:attribute` event handler.
      var bindId = config.bindId = _.uniqueId();

      // Add a reference to the view for handlers of stickitChange events
      var options = _.extend({stickitChange: config}, config.setOptions);

      // Add a `_destroy` callback to the configuration, in case `destroy`
      // is a named function and we need a unique function when unsticking.
      config._destroy = function() {
        applyViewFn.call(this, config.destroy, $el, model, config);
      };

      initializeAttributes($el, config, model, modelAttr);
      initializeVisible($el, config, model, modelAttr);
      initializeClasses($el, config, model, modelAttr);

      if (modelAttr) {
        // Setup one-way (input element -> model) bindings.
        _.each(config.events, function(type) {
          var eventName = type + namespace;
          var listener = function(event) {
            var val = applyViewFn.call(this, config.getVal, $el, event, config, slice.call(arguments, 1));

            // Don't update the model if false is returned from the `updateModel` configuration.
            var currentVal = evaluateBoolean(config.updateModel, val, event, config);
            if (currentVal) setAttr(model, modelAttr, val, options, config);
          };
          var sel = selector === ':el'? '' : selector;
          this.$el.on(eventName, sel, _.bind(listener, this));
        }, this);

        // Setup a `change:modelAttr` observer to keep the view element in sync.
        // `modelAttr` may be an array of attributes or a single string value.
        _.each(_.flatten([modelAttr]), function(attr) {
          observeModelEvent(model, 'change:' + attr, config, function(m, val, options) {
            var changeId = options && options.stickitChange && options.stickitChange.bindId;
            if (changeId !== bindId) {
              var currentVal = getAttr(model, modelAttr, config);
              updateViewBindEl($el, config, currentVal, model);
            }
          });
        });

        var currentVal = getAttr(model, modelAttr, config);
        updateViewBindEl($el, config, currentVal, model, true);
      }

      // After each binding is setup, call the `initialize` callback.
      applyViewFn.call(this, config.initialize, $el, model, config);
    }
  };

  _.extend(Backbone.View.prototype, Stickit.ViewMixin);

  // Helpers
  // -------

  var slice = [].slice;

  // Evaluates the given `path` (in object/dot-notation) relative to the given
  // `obj`. If the path is null/undefined, then the given `obj` is returned.
  var evaluatePath = function(obj, path) {
    var parts = (path || '').split('.');
    var result = _.reduce(parts, function(memo, i) { return memo[i]; }, obj);
    return result == null ? obj : result;
  };

  // If the given `fn` is a string, then view[fn] is called, otherwise it is
  // a function that should be executed.
  var applyViewFn = function(fn) {
    fn = _.isString(fn) ? evaluatePath(this, fn) : fn;
    if (fn) return (fn).apply(this, slice.call(arguments, 1));
  };

  // Given a function, string (view function reference), or a boolean
  // value, returns the truthy result. Any other types evaluate as false.
  // The first argument must be `reference` and the last must be `config`, but
  // middle arguments can be variadic.
  var evaluateBoolean = function(reference, val, config) {
    if (_.isBoolean(reference)) {
      return reference;
    } else if (_.isFunction(reference) || _.isString(reference)) {
      var view = _.last(arguments).view;
      return applyViewFn.apply(view, arguments);
    }
    return false;
  };

  // Setup a model event binding with the given function, and track the event
  // in the view's _modelBindings.
  var observeModelEvent = function(model, event, config, fn) {
    var view = config.view;
    model.on(event, fn, view);
    view._modelBindings.push({model:model, event:event, fn:fn, config:config});
  };

  // Prepares the given `val`ue and sets it into the `model`.
  var setAttr = function(model, attr, val, options, config) {
    var value = {}, view = config.view;
    if (config.onSet) {
      val = applyViewFn.call(view, config.onSet, val, config);
    }

    if (config.set) {
      applyViewFn.call(view, config.set, attr, val, options, config);
    } else {
      value[attr] = val;
      // If `observe` is defined as an array and `onSet` returned
      // an array, then map attributes to their values.
      if (_.isArray(attr) && _.isArray(val)) {
        value = _.reduce(attr, function(memo, attribute, index) {
          memo[attribute] = _.has(val, index) ? val[index] : null;
          return memo;
        }, {});
      }
      model.set(value, options);
    }
  };

  // Returns the given `attr`'s value from the `model`, escaping and
  // formatting if necessary. If `attr` is an array, then an array of
  // respective values will be returned.
  var getAttr = function(model, attr, config) {
    var view = config.view;
    var retrieveVal = function(field) {
      return model[config.escape ? 'escape' : 'get'](field);
    };
    var sanitizeVal = function(val) {
      return val == null ? '' : val;
    };
    var val = _.isArray(attr) ? _.map(attr, retrieveVal) : retrieveVal(attr);
    if (config.onGet) val = applyViewFn.call(view, config.onGet, val, config);
    return _.isArray(val) ? _.map(val, sanitizeVal) : sanitizeVal(val);
  };

  // Find handlers in `Backbone.Stickit._handlers` with selectors that match
  // `$el` and generate a configuration by mixing them in the order that they
  // were found with the given `binding`.
  var getConfiguration = Stickit.getConfiguration = function($el, binding) {
    var handlers = [{
      updateModel: false,
      updateMethod: 'text',
      update: function($el, val, m, opts) { if ($el[opts.updateMethod]) $el[opts.updateMethod](val); },
      getVal: function($el, e, opts) { return $el[opts.updateMethod](); }
    }];
    handlers = handlers.concat(_.filter(Stickit._handlers, function(handler) {
      return $el.is(handler.selector);
    }));
    handlers.push(binding);

    // Merge handlers into a single config object. Last props in wins.
    var config = _.extend.apply(_, handlers);

    // `updateView` is defaulted to false for configutrations with
    // `visible`; otherwise, `updateView` is defaulted to true.
    if (!_.has(config, 'updateView')) config.updateView = !config.visible;
    return config;
  };

  // Setup the attributes configuration - a list that maps an attribute or
  // property `name`, to an `observe`d model attribute, using an optional
  // `onGet` formatter.
  //
  //     attributes: [{
  //       name: 'attributeOrPropertyName',
  //       observe: 'modelAttrName'
  //       onGet: function(modelAttrVal, modelAttrName) { ... }
  //     }, ...]
  //
  var initializeAttributes = function($el, config, model, modelAttr) {
    var props = ['autofocus', 'autoplay', 'async', 'checked', 'controls',
      'defer', 'disabled', 'hidden', 'indeterminate', 'loop', 'multiple',
      'open', 'readonly', 'required', 'scoped', 'selected'];

    var view = config.view;

    _.each(config.attributes || [], function(attrConfig) {
      attrConfig = _.clone(attrConfig);
      attrConfig.view = view;

      var lastClass = '';
      var observed = attrConfig.observe || (attrConfig.observe = modelAttr);
      var updateAttr = function() {
        var updateType = _.contains(props, attrConfig.name) ? 'prop' : 'attr',
            val = getAttr(model, observed, attrConfig);

        // If it is a class then we need to remove the last value and add the new.
        if (attrConfig.name === 'class') {
          $el.removeClass(lastClass).addClass(val);
          lastClass = val;
        } else {
          $el[updateType](attrConfig.name, val);
        }
      };

      _.each(_.flatten([observed]), function(attr) {
        observeModelEvent(model, 'change:' + attr, config, updateAttr);
      });

      // Initialize the matched element's state.
      updateAttr();
    });
  };

  var initializeClasses = function($el, config, model, modelAttr) {
    _.each(config.classes || [], function(classConfig, name) {
      if (_.isString(classConfig)) classConfig = {observe: classConfig};
      classConfig.view = config.view;

      var observed = classConfig.observe;
      var updateClass = function() {
        var val = getAttr(model, observed, classConfig);
        $el.toggleClass(name, !!val);
      };

      _.each(_.flatten([observed]), function(attr) {
        observeModelEvent(model, 'change:' + attr, config, updateClass);
      });
      updateClass();
    });
  };

  // If `visible` is configured, then the view element will be shown/hidden
  // based on the truthiness of the modelattr's value or the result of the
  // given callback. If a `visibleFn` is also supplied, then that callback
  // will be executed to manually handle showing/hiding the view element.
  //
  //     observe: 'isRight',
  //     visible: true, // or function(val, options) {}
  //     visibleFn: function($el, isVisible, options) {} // optional handler
  //
  var initializeVisible = function($el, config, model, modelAttr) {
    if (config.visible == null) return;
    var view = config.view;

    var visibleCb = function() {
      var visible = config.visible,
          visibleFn = config.visibleFn,
          val = getAttr(model, modelAttr, config),
          isVisible = !!val;

      // If `visible` is a function then it should return a boolean result to show/hide.
      if (_.isFunction(visible) || _.isString(visible)) {
        isVisible = !!applyViewFn.call(view, visible, val, config);
      }

      // Either use the custom `visibleFn`, if provided, or execute the standard show/hide.
      if (visibleFn) {
        applyViewFn.call(view, visibleFn, $el, isVisible, config);
      } else {
        $el.toggle(isVisible);
      }
    };

    _.each(_.flatten([modelAttr]), function(attr) {
      observeModelEvent(model, 'change:' + attr, config, visibleCb);
    });

    visibleCb();
  };

  // Update the value of `$el` using the given configuration and trigger the
  // `afterUpdate` callback. This action may be blocked by `config.updateView`.
  //
  //     update: function($el, val, model, options) {},  // handler for updating
  //     updateView: true, // defaults to true
  //     afterUpdate: function($el, val, options) {} // optional callback
  //
  var updateViewBindEl = function($el, config, val, model, isInitializing) {
    var view = config.view;
    if (!evaluateBoolean(config.updateView, val, config)) return;
    applyViewFn.call(view, config.update, $el, val, model, config);
    if (!isInitializing) applyViewFn.call(view, config.afterUpdate, $el, val, config);
  };

  // Default Handlers
  // ----------------

  Stickit.addHandler([{
    selector: '[contenteditable]',
    updateMethod: 'html',
    events: ['input', 'change']
  }, {
    selector: 'input',
    events: ['propertychange', 'input', 'change'],
    update: function($el, val) { $el.val(val); },
    getVal: function($el) {
      return $el.val();
    }
  }, {
    selector: 'textarea',
    events: ['propertychange', 'input', 'change'],
    update: function($el, val) { $el.val(val); },
    getVal: function($el) { return $el.val(); }
  }, {
    selector: 'input[type="radio"]',
    events: ['change'],
    update: function($el, val) {
      $el.filter('[value="'+val+'"]').prop('checked', true);
    },
    getVal: function($el) {
      return $el.filter(':checked').val();
    }
  }, {
    selector: 'input[type="checkbox"]',
    events: ['change'],
    update: function($el, val, model, options) {
      if ($el.length > 1) {
        // There are multiple checkboxes so we need to go through them and check
        // any that have value attributes that match what's in the array of `val`s.
        val || (val = []);
        $el.each(function(i, el) {
          var checkbox = Backbone.$(el);
          var checked = _.contains(val, checkbox.val());
          checkbox.prop('checked', checked);
        });
      } else {
        var checked = _.isBoolean(val) ? val : val === $el.val();
        $el.prop('checked', checked);
      }
    },
    getVal: function($el) {
      var val;
      if ($el.length > 1) {
        val = _.reduce($el, function(memo, el) {
          var checkbox = Backbone.$(el);
          if (checkbox.prop('checked')) memo.push(checkbox.val());
          return memo;
        }, []);
      } else {
        val = $el.prop('checked');
        // If the checkbox has a value attribute defined, then
        // use that value. Most browsers use "on" as a default.
        var boxval = $el.val();
        if (boxval !== 'on' && boxval != null) {
          val = val ? $el.val() : null;
        }
      }
      return val;
    }
  }, {
    selector: 'select',
    events: ['change'],
    update: function($el, val, model, options) {
      var optList,
        selectConfig = options.selectOptions,
        list = selectConfig && selectConfig.collection || undefined,
        isMultiple = $el.prop('multiple');

      // If there are no `selectOptions` then we assume that the `<select>`
      // is pre-rendered and that we need to generate the collection.
      if (!selectConfig) {
        selectConfig = {};
        var getList = function($el) {
          return $el.map(function(index, option) {
            // Retrieve the text and value of the option, preferring "stickit-bind-val"
            // data attribute over value property.
            var dataVal = Backbone.$(option).data('stickit-bind-val');
            return {
              value: dataVal !== undefined ? dataVal : option.value,
              label: option.text
            };
          }).get();
        };
        if ($el.find('optgroup').length) {
          list = {opt_labels:[]};
          // Search for options without optgroup
          if ($el.find('> option').length) {
            list.opt_labels.push(undefined);
            _.each($el.find('> option'), function(el) {
              list[undefined] = getList(Backbone.$(el));
            });
          }
          _.each($el.find('optgroup'), function(el) {
            var label = Backbone.$(el).attr('label');
            list.opt_labels.push(label);
            list[label] = getList(Backbone.$(el).find('option'));
          });
        } else {
          list = getList($el.find('option'));
        }
      }

      // Fill in default label and path values.
      selectConfig.valuePath = selectConfig.valuePath || 'value';
      selectConfig.labelPath = selectConfig.labelPath || 'label';
      selectConfig.disabledPath = selectConfig.disabledPath || 'disabled';

      var addSelectOptions = function(optList, $el, fieldVal) {
        _.each(optList, function(obj) {
          var option = Backbone.$('<option/>'), optionVal = obj;

          var fillOption = function(text, val, disabled) {
            option.text(text);
            optionVal = val;
            // Save the option value as data so that we can reference it later.
            option.data('stickit-bind-val', optionVal);
            if (!_.isArray(optionVal) && !_.isObject(optionVal)) option.val(optionVal);

            if (disabled === true) option.prop('disabled', 'disabled');
          };

          var text, val, disabled;
          if (obj === '__default__') {
            text = fieldVal.label,
            val = fieldVal.value,
            disabled = fieldVal.disabled;
          } else {
            text = evaluatePath(obj, selectConfig.labelPath),
            val = evaluatePath(obj, selectConfig.valuePath),
            disabled = evaluatePath(obj, selectConfig.disabledPath);
          }
          fillOption(text, val, disabled);

          // Determine if this option is selected.
          var isSelected = function() {
            if (!isMultiple && optionVal != null && fieldVal != null && optionVal === fieldVal) {
              return true;
            } else if (_.isObject(fieldVal) && _.isEqual(optionVal, fieldVal)) {
              return true;
            }
            return false;
          };

          if (isSelected()) {
            option.prop('selected', true);
          } else if (isMultiple && _.isArray(fieldVal)) {
            _.each(fieldVal, function(val) {
              if (_.isObject(val)) val = evaluatePath(val, selectConfig.valuePath);
              if (val === optionVal || (_.isObject(val) && _.isEqual(optionVal, val)))
                option.prop('selected', true);
            });
          }

          $el.append(option);
        });
      };

      $el.find('*').remove();

      // The `list` configuration is a function that returns the options list or a string
      // which represents the path to the list relative to `window` or the view/`this`.
      if (_.isString(list)) {
        var context = window;
        if (list.indexOf('this.') === 0) context = this;
        list = list.replace(/^[a-z]*\.(.+)$/, '$1');
        optList = evaluatePath(context, list);
      } else if (_.isFunction(list)) {
        optList = applyViewFn.call(this, list, $el, options);
      } else {
        optList = list;
      }

      // Support Backbone.Collection and deserialize.
      if (optList instanceof Backbone.Collection) {
        var collection = optList;
        var refreshSelectOptions = function() {
          var currentVal = getAttr(model, options.observe, options);
          applyViewFn.call(this, options.update, $el, currentVal, model, options);
        };
        // We need to call this function after unstickit and after an update so we don't end up
        // with multiple listeners doing the same thing
        var removeCollectionListeners = function() {
          collection.off('add remove reset sort', refreshSelectOptions);
        };
        var removeAllListeners = function() {
          removeCollectionListeners();
          collection.off('stickit:selectRefresh');
          model.off('stickit:selectRefresh');
        };
        // Remove previously set event listeners by triggering a custom event
        collection.trigger('stickit:selectRefresh');
        collection.once('stickit:selectRefresh', removeCollectionListeners, this);

        // Listen to the collection and trigger an update of the select options
        collection.on('add remove reset sort', refreshSelectOptions, this);

        // Remove the previous model event listener
        model.trigger('stickit:selectRefresh');
        model.once('stickit:selectRefresh', function() {
          model.off('stickit:unstuck', removeAllListeners);
        });
        // Remove collection event listeners once this binding is unstuck
        model.once('stickit:unstuck', removeAllListeners, this);
        optList = optList.toJSON();
      }

      if (selectConfig.defaultOption) {
        var option = _.isFunction(selectConfig.defaultOption) ?
          selectConfig.defaultOption.call(this, $el, options) :
          selectConfig.defaultOption;
        addSelectOptions(["__default__"], $el, option);
      }

      if (_.isArray(optList)) {
        addSelectOptions(optList, $el, val);
      } else if (optList.opt_labels) {
        // To define a select with optgroups, format selectOptions.collection as an object
        // with an 'opt_labels' property, as in the following:
        //
        //     {
        //       'opt_labels': ['Looney Tunes', 'Three Stooges'],
        //       'Looney Tunes': [{id: 1, name: 'Bugs Bunny'}, {id: 2, name: 'Donald Duck'}],
        //       'Three Stooges': [{id: 3, name : 'moe'}, {id: 4, name : 'larry'}, {id: 5, name : 'curly'}]
        //     }
        //
        _.each(optList.opt_labels, function(label) {
          var $group = Backbone.$('<optgroup/>').attr('label', label);
          addSelectOptions(optList[label], $group, val);
          $el.append($group);
        });
        // With no 'opt_labels' parameter, the object is assumed to be a simple value-label map.
        // Pass a selectOptions.comparator to override the default order of alphabetical by label.
      } else {
        var opts = [], opt;
        for (var i in optList) {
          opt = {};
          opt[selectConfig.valuePath] = i;
          opt[selectConfig.labelPath] = optList[i];
          opts.push(opt);
        }
        opts = _.sortBy(opts, selectConfig.comparator || selectConfig.labelPath);
        addSelectOptions(opts, $el, val);
      }
    },
    getVal: function($el) {
      var selected = $el.find('option:selected');

      if ($el.prop('multiple')) {
        return _.map(selected, function(el) {
          return Backbone.$(el).data('stickit-bind-val');
        });
      } else {
        return selected.data('stickit-bind-val');
      }
    }
  }]);

  return Stickit;

}));

},{"backbone":39,"underscore":48}],39:[function(require,module,exports){
(function (global){(function (){
//     Backbone.js 1.3.3

//     (c) 2010-2016 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
//     Backbone may be freely distributed under the MIT license.
//     For all details and documentation:
//     http://backbonejs.org

(function(factory) {

  // Establish the root object, `window` (`self`) in the browser, or `global` on the server.
  // We use `self` instead of `window` for `WebWorker` support.
  var root = (typeof self == 'object' && self.self === self && self) ||
            (typeof global == 'object' && global.global === global && global);

  // Set up Backbone appropriately for the environment. Start with AMD.
  if (typeof define === 'function' && define.amd) {
    define(['underscore', 'jquery', 'exports'], function(_, $, exports) {
      // Export global even in AMD case in case this script is loaded with
      // others that may still expect a global Backbone.
      root.Backbone = factory(root, exports, _, $);
    });

  // Next for Node.js or CommonJS. jQuery may not be needed as a module.
  } else if (typeof exports !== 'undefined') {
    var _ = require('underscore'), $;
    try { $ = require('backbone-torso/node_modules/jquery'); } catch (e) {}
    factory(root, exports, _, $);

  // Finally, as a browser global.
  } else {
    root.Backbone = factory(root, {}, root._, (root.jQuery || root.Zepto || root.ender || root.$));
  }

})(function(root, Backbone, _, $) {

  // Initial Setup
  // -------------

  // Save the previous value of the `Backbone` variable, so that it can be
  // restored later on, if `noConflict` is used.
  var previousBackbone = root.Backbone;

  // Create a local reference to a common array method we'll want to use later.
  var slice = Array.prototype.slice;

  // Current version of the library. Keep in sync with `package.json`.
  Backbone.VERSION = '1.3.3';

  // For Backbone's purposes, jQuery, Zepto, Ender, or My Library (kidding) owns
  // the `$` variable.
  Backbone.$ = $;

  // Runs Backbone.js in *noConflict* mode, returning the `Backbone` variable
  // to its previous owner. Returns a reference to this Backbone object.
  Backbone.noConflict = function() {
    root.Backbone = previousBackbone;
    return this;
  };

  // Turn on `emulateHTTP` to support legacy HTTP servers. Setting this option
  // will fake `"PATCH"`, `"PUT"` and `"DELETE"` requests via the `_method` parameter and
  // set a `X-Http-Method-Override` header.
  Backbone.emulateHTTP = false;

  // Turn on `emulateJSON` to support legacy servers that can't deal with direct
  // `application/json` requests ... this will encode the body as
  // `application/x-www-form-urlencoded` instead and will send the model in a
  // form param named `model`.
  Backbone.emulateJSON = false;

  // Proxy Backbone class methods to Underscore functions, wrapping the model's
  // `attributes` object or collection's `models` array behind the scenes.
  //
  // collection.filter(function(model) { return model.get('age') > 10 });
  // collection.each(this.addView);
  //
  // `Function#apply` can be slow so we use the method's arg count, if we know it.
  var addMethod = function(length, method, attribute) {
    switch (length) {
      case 1: return function() {
        return _[method](this[attribute]);
      };
      case 2: return function(value) {
        return _[method](this[attribute], value);
      };
      case 3: return function(iteratee, context) {
        return _[method](this[attribute], cb(iteratee, this), context);
      };
      case 4: return function(iteratee, defaultVal, context) {
        return _[method](this[attribute], cb(iteratee, this), defaultVal, context);
      };
      default: return function() {
        var args = slice.call(arguments);
        args.unshift(this[attribute]);
        return _[method].apply(_, args);
      };
    }
  };
  var addUnderscoreMethods = function(Class, methods, attribute) {
    _.each(methods, function(length, method) {
      if (_[method]) Class.prototype[method] = addMethod(length, method, attribute);
    });
  };

  // Support `collection.sortBy('attr')` and `collection.findWhere({id: 1})`.
  var cb = function(iteratee, instance) {
    if (_.isFunction(iteratee)) return iteratee;
    if (_.isObject(iteratee) && !instance._isModel(iteratee)) return modelMatcher(iteratee);
    if (_.isString(iteratee)) return function(model) { return model.get(iteratee); };
    return iteratee;
  };
  var modelMatcher = function(attrs) {
    var matcher = _.matches(attrs);
    return function(model) {
      return matcher(model.attributes);
    };
  };

  // Backbone.Events
  // ---------------

  // A module that can be mixed in to *any object* in order to provide it with
  // a custom event channel. You may bind a callback to an event with `on` or
  // remove with `off`; `trigger`-ing an event fires all callbacks in
  // succession.
  //
  //     var object = {};
  //     _.extend(object, Backbone.Events);
  //     object.on('expand', function(){ alert('expanded'); });
  //     object.trigger('expand');
  //
  var Events = Backbone.Events = {};

  // Regular expression used to split event strings.
  var eventSplitter = /\s+/;

  // Iterates over the standard `event, callback` (as well as the fancy multiple
  // space-separated events `"change blur", callback` and jQuery-style event
  // maps `{event: callback}`).
  var eventsApi = function(iteratee, events, name, callback, opts) {
    var i = 0, names;
    if (name && typeof name === 'object') {
      // Handle event maps.
      if (callback !== void 0 && 'context' in opts && opts.context === void 0) opts.context = callback;
      for (names = _.keys(name); i < names.length ; i++) {
        events = eventsApi(iteratee, events, names[i], name[names[i]], opts);
      }
    } else if (name && eventSplitter.test(name)) {
      // Handle space-separated event names by delegating them individually.
      for (names = name.split(eventSplitter); i < names.length; i++) {
        events = iteratee(events, names[i], callback, opts);
      }
    } else {
      // Finally, standard events.
      events = iteratee(events, name, callback, opts);
    }
    return events;
  };

  // Bind an event to a `callback` function. Passing `"all"` will bind
  // the callback to all events fired.
  Events.on = function(name, callback, context) {
    return internalOn(this, name, callback, context);
  };

  // Guard the `listening` argument from the public API.
  var internalOn = function(obj, name, callback, context, listening) {
    obj._events = eventsApi(onApi, obj._events || {}, name, callback, {
      context: context,
      ctx: obj,
      listening: listening
    });

    if (listening) {
      var listeners = obj._listeners || (obj._listeners = {});
      listeners[listening.id] = listening;
    }

    return obj;
  };

  // Inversion-of-control versions of `on`. Tell *this* object to listen to
  // an event in another object... keeping track of what it's listening to
  // for easier unbinding later.
  Events.listenTo = function(obj, name, callback) {
    if (!obj) return this;
    var id = obj._listenId || (obj._listenId = _.uniqueId('l'));
    var listeningTo = this._listeningTo || (this._listeningTo = {});
    var listening = listeningTo[id];

    // This object is not listening to any other events on `obj` yet.
    // Setup the necessary references to track the listening callbacks.
    if (!listening) {
      var thisId = this._listenId || (this._listenId = _.uniqueId('l'));
      listening = listeningTo[id] = {obj: obj, objId: id, id: thisId, listeningTo: listeningTo, count: 0};
    }

    // Bind callbacks on obj, and keep track of them on listening.
    internalOn(obj, name, callback, this, listening);
    return this;
  };

  // The reducing API that adds a callback to the `events` object.
  var onApi = function(events, name, callback, options) {
    if (callback) {
      var handlers = events[name] || (events[name] = []);
      var context = options.context, ctx = options.ctx, listening = options.listening;
      if (listening) listening.count++;

      handlers.push({callback: callback, context: context, ctx: context || ctx, listening: listening});
    }
    return events;
  };

  // Remove one or many callbacks. If `context` is null, removes all
  // callbacks with that function. If `callback` is null, removes all
  // callbacks for the event. If `name` is null, removes all bound
  // callbacks for all events.
  Events.off = function(name, callback, context) {
    if (!this._events) return this;
    this._events = eventsApi(offApi, this._events, name, callback, {
      context: context,
      listeners: this._listeners
    });
    return this;
  };

  // Tell this object to stop listening to either specific events ... or
  // to every object it's currently listening to.
  Events.stopListening = function(obj, name, callback) {
    var listeningTo = this._listeningTo;
    if (!listeningTo) return this;

    var ids = obj ? [obj._listenId] : _.keys(listeningTo);

    for (var i = 0; i < ids.length; i++) {
      var listening = listeningTo[ids[i]];

      // If listening doesn't exist, this object is not currently
      // listening to obj. Break out early.
      if (!listening) break;

      listening.obj.off(name, callback, this);
    }

    return this;
  };

  // The reducing API that removes a callback from the `events` object.
  var offApi = function(events, name, callback, options) {
    if (!events) return;

    var i = 0, listening;
    var context = options.context, listeners = options.listeners;

    // Delete all events listeners and "drop" events.
    if (!name && !callback && !context) {
      var ids = _.keys(listeners);
      for (; i < ids.length; i++) {
        listening = listeners[ids[i]];
        delete listeners[listening.id];
        delete listening.listeningTo[listening.objId];
      }
      return;
    }

    var names = name ? [name] : _.keys(events);
    for (; i < names.length; i++) {
      name = names[i];
      var handlers = events[name];

      // Bail out if there are no events stored.
      if (!handlers) break;

      // Replace events if there are any remaining.  Otherwise, clean up.
      var remaining = [];
      for (var j = 0; j < handlers.length; j++) {
        var handler = handlers[j];
        if (
          callback && callback !== handler.callback &&
            callback !== handler.callback._callback ||
              context && context !== handler.context
        ) {
          remaining.push(handler);
        } else {
          listening = handler.listening;
          if (listening && --listening.count === 0) {
            delete listeners[listening.id];
            delete listening.listeningTo[listening.objId];
          }
        }
      }

      // Update tail event if the list has any events.  Otherwise, clean up.
      if (remaining.length) {
        events[name] = remaining;
      } else {
        delete events[name];
      }
    }
    return events;
  };

  // Bind an event to only be triggered a single time. After the first time
  // the callback is invoked, its listener will be removed. If multiple events
  // are passed in using the space-separated syntax, the handler will fire
  // once for each event, not once for a combination of all events.
  Events.once = function(name, callback, context) {
    // Map the event into a `{event: once}` object.
    var events = eventsApi(onceMap, {}, name, callback, _.bind(this.off, this));
    if (typeof name === 'string' && context == null) callback = void 0;
    return this.on(events, callback, context);
  };

  // Inversion-of-control versions of `once`.
  Events.listenToOnce = function(obj, name, callback) {
    // Map the event into a `{event: once}` object.
    var events = eventsApi(onceMap, {}, name, callback, _.bind(this.stopListening, this, obj));
    return this.listenTo(obj, events);
  };

  // Reduces the event callbacks into a map of `{event: onceWrapper}`.
  // `offer` unbinds the `onceWrapper` after it has been called.
  var onceMap = function(map, name, callback, offer) {
    if (callback) {
      var once = map[name] = _.once(function() {
        offer(name, once);
        callback.apply(this, arguments);
      });
      once._callback = callback;
    }
    return map;
  };

  // Trigger one or many events, firing all bound callbacks. Callbacks are
  // passed the same arguments as `trigger` is, apart from the event name
  // (unless you're listening on `"all"`, which will cause your callback to
  // receive the true name of the event as the first argument).
  Events.trigger = function(name) {
    if (!this._events) return this;

    var length = Math.max(0, arguments.length - 1);
    var args = Array(length);
    for (var i = 0; i < length; i++) args[i] = arguments[i + 1];

    eventsApi(triggerApi, this._events, name, void 0, args);
    return this;
  };

  // Handles triggering the appropriate event callbacks.
  var triggerApi = function(objEvents, name, callback, args) {
    if (objEvents) {
      var events = objEvents[name];
      var allEvents = objEvents.all;
      if (events && allEvents) allEvents = allEvents.slice();
      if (events) triggerEvents(events, args);
      if (allEvents) triggerEvents(allEvents, [name].concat(args));
    }
    return objEvents;
  };

  // A difficult-to-believe, but optimized internal dispatch function for
  // triggering events. Tries to keep the usual cases speedy (most internal
  // Backbone events have 3 arguments).
  var triggerEvents = function(events, args) {
    var ev, i = -1, l = events.length, a1 = args[0], a2 = args[1], a3 = args[2];
    switch (args.length) {
      case 0: while (++i < l) (ev = events[i]).callback.call(ev.ctx); return;
      case 1: while (++i < l) (ev = events[i]).callback.call(ev.ctx, a1); return;
      case 2: while (++i < l) (ev = events[i]).callback.call(ev.ctx, a1, a2); return;
      case 3: while (++i < l) (ev = events[i]).callback.call(ev.ctx, a1, a2, a3); return;
      default: while (++i < l) (ev = events[i]).callback.apply(ev.ctx, args); return;
    }
  };

  // Aliases for backwards compatibility.
  Events.bind   = Events.on;
  Events.unbind = Events.off;

  // Allow the `Backbone` object to serve as a global event bus, for folks who
  // want global "pubsub" in a convenient place.
  _.extend(Backbone, Events);

  // Backbone.Model
  // --------------

  // Backbone **Models** are the basic data object in the framework --
  // frequently representing a row in a table in a database on your server.
  // A discrete chunk of data and a bunch of useful, related methods for
  // performing computations and transformations on that data.

  // Create a new model with the specified attributes. A client id (`cid`)
  // is automatically generated and assigned for you.
  var Model = Backbone.Model = function(attributes, options) {
    var attrs = attributes || {};
    options || (options = {});
    this.cid = _.uniqueId(this.cidPrefix);
    this.attributes = {};
    if (options.collection) this.collection = options.collection;
    if (options.parse) attrs = this.parse(attrs, options) || {};
    var defaults = _.result(this, 'defaults');
    attrs = _.defaults(_.extend({}, defaults, attrs), defaults);
    this.set(attrs, options);
    this.changed = {};
    this.initialize.apply(this, arguments);
  };

  // Attach all inheritable methods to the Model prototype.
  _.extend(Model.prototype, Events, {

    // A hash of attributes whose current and previous value differ.
    changed: null,

    // The value returned during the last failed validation.
    validationError: null,

    // The default name for the JSON `id` attribute is `"id"`. MongoDB and
    // CouchDB users may want to set this to `"_id"`.
    idAttribute: 'id',

    // The prefix is used to create the client id which is used to identify models locally.
    // You may want to override this if you're experiencing name clashes with model ids.
    cidPrefix: 'c',

    // Initialize is an empty function by default. Override it with your own
    // initialization logic.
    initialize: function(){},

    // Return a copy of the model's `attributes` object.
    toJSON: function(options) {
      return _.clone(this.attributes);
    },

    // Proxy `Backbone.sync` by default -- but override this if you need
    // custom syncing semantics for *this* particular model.
    sync: function() {
      return Backbone.sync.apply(this, arguments);
    },

    // Get the value of an attribute.
    get: function(attr) {
      return this.attributes[attr];
    },

    // Get the HTML-escaped value of an attribute.
    escape: function(attr) {
      return _.escape(this.get(attr));
    },

    // Returns `true` if the attribute contains a value that is not null
    // or undefined.
    has: function(attr) {
      return this.get(attr) != null;
    },

    // Special-cased proxy to underscore's `_.matches` method.
    matches: function(attrs) {
      return !!_.iteratee(attrs, this)(this.attributes);
    },

    // Set a hash of model attributes on the object, firing `"change"`. This is
    // the core primitive operation of a model, updating the data and notifying
    // anyone who needs to know about the change in state. The heart of the beast.
    set: function(key, val, options) {
      if (key == null) return this;

      // Handle both `"key", value` and `{key: value}` -style arguments.
      var attrs;
      if (typeof key === 'object') {
        attrs = key;
        options = val;
      } else {
        (attrs = {})[key] = val;
      }

      options || (options = {});

      // Run validation.
      if (!this._validate(attrs, options)) return false;

      // Extract attributes and options.
      var unset      = options.unset;
      var silent     = options.silent;
      var changes    = [];
      var changing   = this._changing;
      this._changing = true;

      if (!changing) {
        this._previousAttributes = _.clone(this.attributes);
        this.changed = {};
      }

      var current = this.attributes;
      var changed = this.changed;
      var prev    = this._previousAttributes;

      // For each `set` attribute, update or delete the current value.
      for (var attr in attrs) {
        val = attrs[attr];
        if (!_.isEqual(current[attr], val)) changes.push(attr);
        if (!_.isEqual(prev[attr], val)) {
          changed[attr] = val;
        } else {
          delete changed[attr];
        }
        unset ? delete current[attr] : current[attr] = val;
      }

      // Update the `id`.
      if (this.idAttribute in attrs) this.id = this.get(this.idAttribute);

      // Trigger all relevant attribute changes.
      if (!silent) {
        if (changes.length) this._pending = options;
        for (var i = 0; i < changes.length; i++) {
          this.trigger('change:' + changes[i], this, current[changes[i]], options);
        }
      }

      // You might be wondering why there's a `while` loop here. Changes can
      // be recursively nested within `"change"` events.
      if (changing) return this;
      if (!silent) {
        while (this._pending) {
          options = this._pending;
          this._pending = false;
          this.trigger('change', this, options);
        }
      }
      this._pending = false;
      this._changing = false;
      return this;
    },

    // Remove an attribute from the model, firing `"change"`. `unset` is a noop
    // if the attribute doesn't exist.
    unset: function(attr, options) {
      return this.set(attr, void 0, _.extend({}, options, {unset: true}));
    },

    // Clear all attributes on the model, firing `"change"`.
    clear: function(options) {
      var attrs = {};
      for (var key in this.attributes) attrs[key] = void 0;
      return this.set(attrs, _.extend({}, options, {unset: true}));
    },

    // Determine if the model has changed since the last `"change"` event.
    // If you specify an attribute name, determine if that attribute has changed.
    hasChanged: function(attr) {
      if (attr == null) return !_.isEmpty(this.changed);
      return _.has(this.changed, attr);
    },

    // Return an object containing all the attributes that have changed, or
    // false if there are no changed attributes. Useful for determining what
    // parts of a view need to be updated and/or what attributes need to be
    // persisted to the server. Unset attributes will be set to undefined.
    // You can also pass an attributes object to diff against the model,
    // determining if there *would be* a change.
    changedAttributes: function(diff) {
      if (!diff) return this.hasChanged() ? _.clone(this.changed) : false;
      var old = this._changing ? this._previousAttributes : this.attributes;
      var changed = {};
      for (var attr in diff) {
        var val = diff[attr];
        if (_.isEqual(old[attr], val)) continue;
        changed[attr] = val;
      }
      return _.size(changed) ? changed : false;
    },

    // Get the previous value of an attribute, recorded at the time the last
    // `"change"` event was fired.
    previous: function(attr) {
      if (attr == null || !this._previousAttributes) return null;
      return this._previousAttributes[attr];
    },

    // Get all of the attributes of the model at the time of the previous
    // `"change"` event.
    previousAttributes: function() {
      return _.clone(this._previousAttributes);
    },

    // Fetch the model from the server, merging the response with the model's
    // local attributes. Any changed attributes will trigger a "change" event.
    fetch: function(options) {
      options = _.extend({parse: true}, options);
      var model = this;
      var success = options.success;
      options.success = function(resp) {
        var serverAttrs = options.parse ? model.parse(resp, options) : resp;
        if (!model.set(serverAttrs, options)) return false;
        if (success) success.call(options.context, model, resp, options);
        model.trigger('sync', model, resp, options);
      };
      wrapError(this, options);
      return this.sync('read', this, options);
    },

    // Set a hash of model attributes, and sync the model to the server.
    // If the server returns an attributes hash that differs, the model's
    // state will be `set` again.
    save: function(key, val, options) {
      // Handle both `"key", value` and `{key: value}` -style arguments.
      var attrs;
      if (key == null || typeof key === 'object') {
        attrs = key;
        options = val;
      } else {
        (attrs = {})[key] = val;
      }

      options = _.extend({validate: true, parse: true}, options);
      var wait = options.wait;

      // If we're not waiting and attributes exist, save acts as
      // `set(attr).save(null, opts)` with validation. Otherwise, check if
      // the model will be valid when the attributes, if any, are set.
      if (attrs && !wait) {
        if (!this.set(attrs, options)) return false;
      } else if (!this._validate(attrs, options)) {
        return false;
      }

      // After a successful server-side save, the client is (optionally)
      // updated with the server-side state.
      var model = this;
      var success = options.success;
      var attributes = this.attributes;
      options.success = function(resp) {
        // Ensure attributes are restored during synchronous saves.
        model.attributes = attributes;
        var serverAttrs = options.parse ? model.parse(resp, options) : resp;
        if (wait) serverAttrs = _.extend({}, attrs, serverAttrs);
        if (serverAttrs && !model.set(serverAttrs, options)) return false;
        if (success) success.call(options.context, model, resp, options);
        model.trigger('sync', model, resp, options);
      };
      wrapError(this, options);

      // Set temporary attributes if `{wait: true}` to properly find new ids.
      if (attrs && wait) this.attributes = _.extend({}, attributes, attrs);

      var method = this.isNew() ? 'create' : (options.patch ? 'patch' : 'update');
      if (method === 'patch' && !options.attrs) options.attrs = attrs;
      var xhr = this.sync(method, this, options);

      // Restore attributes.
      this.attributes = attributes;

      return xhr;
    },

    // Destroy this model on the server if it was already persisted.
    // Optimistically removes the model from its collection, if it has one.
    // If `wait: true` is passed, waits for the server to respond before removal.
    destroy: function(options) {
      options = options ? _.clone(options) : {};
      var model = this;
      var success = options.success;
      var wait = options.wait;

      var destroy = function() {
        model.stopListening();
        model.trigger('destroy', model, model.collection, options);
      };

      options.success = function(resp) {
        if (wait) destroy();
        if (success) success.call(options.context, model, resp, options);
        if (!model.isNew()) model.trigger('sync', model, resp, options);
      };

      var xhr = false;
      if (this.isNew()) {
        _.defer(options.success);
      } else {
        wrapError(this, options);
        xhr = this.sync('delete', this, options);
      }
      if (!wait) destroy();
      return xhr;
    },

    // Default URL for the model's representation on the server -- if you're
    // using Backbone's restful methods, override this to change the endpoint
    // that will be called.
    url: function() {
      var base =
        _.result(this, 'urlRoot') ||
        _.result(this.collection, 'url') ||
        urlError();
      if (this.isNew()) return base;
      var id = this.get(this.idAttribute);
      return base.replace(/[^\/]$/, '$&/') + encodeURIComponent(id);
    },

    // **parse** converts a response into the hash of attributes to be `set` on
    // the model. The default implementation is just to pass the response along.
    parse: function(resp, options) {
      return resp;
    },

    // Create a new model with identical attributes to this one.
    clone: function() {
      return new this.constructor(this.attributes);
    },

    // A model is new if it has never been saved to the server, and lacks an id.
    isNew: function() {
      return !this.has(this.idAttribute);
    },

    // Check if the model is currently in a valid state.
    isValid: function(options) {
      return this._validate({}, _.extend({}, options, {validate: true}));
    },

    // Run validation against the next complete set of model attributes,
    // returning `true` if all is well. Otherwise, fire an `"invalid"` event.
    _validate: function(attrs, options) {
      if (!options.validate || !this.validate) return true;
      attrs = _.extend({}, this.attributes, attrs);
      var error = this.validationError = this.validate(attrs, options) || null;
      if (!error) return true;
      this.trigger('invalid', this, error, _.extend(options, {validationError: error}));
      return false;
    }

  });

  // Underscore methods that we want to implement on the Model, mapped to the
  // number of arguments they take.
  var modelMethods = {keys: 1, values: 1, pairs: 1, invert: 1, pick: 0,
      omit: 0, chain: 1, isEmpty: 1};

  // Mix in each Underscore method as a proxy to `Model#attributes`.
  addUnderscoreMethods(Model, modelMethods, 'attributes');

  // Backbone.Collection
  // -------------------

  // If models tend to represent a single row of data, a Backbone Collection is
  // more analogous to a table full of data ... or a small slice or page of that
  // table, or a collection of rows that belong together for a particular reason
  // -- all of the messages in this particular folder, all of the documents
  // belonging to this particular author, and so on. Collections maintain
  // indexes of their models, both in order, and for lookup by `id`.

  // Create a new **Collection**, perhaps to contain a specific type of `model`.
  // If a `comparator` is specified, the Collection will maintain
  // its models in sort order, as they're added and removed.
  var Collection = Backbone.Collection = function(models, options) {
    options || (options = {});
    if (options.model) this.model = options.model;
    if (options.comparator !== void 0) this.comparator = options.comparator;
    this._reset();
    this.initialize.apply(this, arguments);
    if (models) this.reset(models, _.extend({silent: true}, options));
  };

  // Default options for `Collection#set`.
  var setOptions = {add: true, remove: true, merge: true};
  var addOptions = {add: true, remove: false};

  // Splices `insert` into `array` at index `at`.
  var splice = function(array, insert, at) {
    at = Math.min(Math.max(at, 0), array.length);
    var tail = Array(array.length - at);
    var length = insert.length;
    var i;
    for (i = 0; i < tail.length; i++) tail[i] = array[i + at];
    for (i = 0; i < length; i++) array[i + at] = insert[i];
    for (i = 0; i < tail.length; i++) array[i + length + at] = tail[i];
  };

  // Define the Collection's inheritable methods.
  _.extend(Collection.prototype, Events, {

    // The default model for a collection is just a **Backbone.Model**.
    // This should be overridden in most cases.
    model: Model,

    // Initialize is an empty function by default. Override it with your own
    // initialization logic.
    initialize: function(){},

    // The JSON representation of a Collection is an array of the
    // models' attributes.
    toJSON: function(options) {
      return this.map(function(model) { return model.toJSON(options); });
    },

    // Proxy `Backbone.sync` by default.
    sync: function() {
      return Backbone.sync.apply(this, arguments);
    },

    // Add a model, or list of models to the set. `models` may be Backbone
    // Models or raw JavaScript objects to be converted to Models, or any
    // combination of the two.
    add: function(models, options) {
      return this.set(models, _.extend({merge: false}, options, addOptions));
    },

    // Remove a model, or a list of models from the set.
    remove: function(models, options) {
      options = _.extend({}, options);
      var singular = !_.isArray(models);
      models = singular ? [models] : models.slice();
      var removed = this._removeModels(models, options);
      if (!options.silent && removed.length) {
        options.changes = {added: [], merged: [], removed: removed};
        this.trigger('update', this, options);
      }
      return singular ? removed[0] : removed;
    },

    // Update a collection by `set`-ing a new list of models, adding new ones,
    // removing models that are no longer present, and merging models that
    // already exist in the collection, as necessary. Similar to **Model#set**,
    // the core operation for updating the data contained by the collection.
    set: function(models, options) {
      if (models == null) return;

      options = _.extend({}, setOptions, options);
      if (options.parse && !this._isModel(models)) {
        models = this.parse(models, options) || [];
      }

      var singular = !_.isArray(models);
      models = singular ? [models] : models.slice();

      var at = options.at;
      if (at != null) at = +at;
      if (at > this.length) at = this.length;
      if (at < 0) at += this.length + 1;

      var set = [];
      var toAdd = [];
      var toMerge = [];
      var toRemove = [];
      var modelMap = {};

      var add = options.add;
      var merge = options.merge;
      var remove = options.remove;

      var sort = false;
      var sortable = this.comparator && at == null && options.sort !== false;
      var sortAttr = _.isString(this.comparator) ? this.comparator : null;

      // Turn bare objects into model references, and prevent invalid models
      // from being added.
      var model, i;
      for (i = 0; i < models.length; i++) {
        model = models[i];

        // If a duplicate is found, prevent it from being added and
        // optionally merge it into the existing model.
        var existing = this.get(model);
        if (existing) {
          if (merge && model !== existing) {
            var attrs = this._isModel(model) ? model.attributes : model;
            if (options.parse) attrs = existing.parse(attrs, options);
            existing.set(attrs, options);
            toMerge.push(existing);
            if (sortable && !sort) sort = existing.hasChanged(sortAttr);
          }
          if (!modelMap[existing.cid]) {
            modelMap[existing.cid] = true;
            set.push(existing);
          }
          models[i] = existing;

        // If this is a new, valid model, push it to the `toAdd` list.
        } else if (add) {
          model = models[i] = this._prepareModel(model, options);
          if (model) {
            toAdd.push(model);
            this._addReference(model, options);
            modelMap[model.cid] = true;
            set.push(model);
          }
        }
      }

      // Remove stale models.
      if (remove) {
        for (i = 0; i < this.length; i++) {
          model = this.models[i];
          if (!modelMap[model.cid]) toRemove.push(model);
        }
        if (toRemove.length) this._removeModels(toRemove, options);
      }

      // See if sorting is needed, update `length` and splice in new models.
      var orderChanged = false;
      var replace = !sortable && add && remove;
      if (set.length && replace) {
        orderChanged = this.length !== set.length || _.some(this.models, function(m, index) {
          return m !== set[index];
        });
        this.models.length = 0;
        splice(this.models, set, 0);
        this.length = this.models.length;
      } else if (toAdd.length) {
        if (sortable) sort = true;
        splice(this.models, toAdd, at == null ? this.length : at);
        this.length = this.models.length;
      }

      // Silently sort the collection if appropriate.
      if (sort) this.sort({silent: true});

      // Unless silenced, it's time to fire all appropriate add/sort/update events.
      if (!options.silent) {
        for (i = 0; i < toAdd.length; i++) {
          if (at != null) options.index = at + i;
          model = toAdd[i];
          model.trigger('add', model, this, options);
        }
        if (sort || orderChanged) this.trigger('sort', this, options);
        if (toAdd.length || toRemove.length || toMerge.length) {
          options.changes = {
            added: toAdd,
            removed: toRemove,
            merged: toMerge
          };
          this.trigger('update', this, options);
        }
      }

      // Return the added (or merged) model (or models).
      return singular ? models[0] : models;
    },

    // When you have more items than you want to add or remove individually,
    // you can reset the entire set with a new list of models, without firing
    // any granular `add` or `remove` events. Fires `reset` when finished.
    // Useful for bulk operations and optimizations.
    reset: function(models, options) {
      options = options ? _.clone(options) : {};
      for (var i = 0; i < this.models.length; i++) {
        this._removeReference(this.models[i], options);
      }
      options.previousModels = this.models;
      this._reset();
      models = this.add(models, _.extend({silent: true}, options));
      if (!options.silent) this.trigger('reset', this, options);
      return models;
    },

    // Add a model to the end of the collection.
    push: function(model, options) {
      return this.add(model, _.extend({at: this.length}, options));
    },

    // Remove a model from the end of the collection.
    pop: function(options) {
      var model = this.at(this.length - 1);
      return this.remove(model, options);
    },

    // Add a model to the beginning of the collection.
    unshift: function(model, options) {
      return this.add(model, _.extend({at: 0}, options));
    },

    // Remove a model from the beginning of the collection.
    shift: function(options) {
      var model = this.at(0);
      return this.remove(model, options);
    },

    // Slice out a sub-array of models from the collection.
    slice: function() {
      return slice.apply(this.models, arguments);
    },

    // Get a model from the set by id, cid, model object with id or cid
    // properties, or an attributes object that is transformed through modelId.
    get: function(obj) {
      if (obj == null) return void 0;
      return this._byId[obj] ||
        this._byId[this.modelId(obj.attributes || obj)] ||
        obj.cid && this._byId[obj.cid];
    },

    // Returns `true` if the model is in the collection.
    has: function(obj) {
      return this.get(obj) != null;
    },

    // Get the model at the given index.
    at: function(index) {
      if (index < 0) index += this.length;
      return this.models[index];
    },

    // Return models with matching attributes. Useful for simple cases of
    // `filter`.
    where: function(attrs, first) {
      return this[first ? 'find' : 'filter'](attrs);
    },

    // Return the first model with matching attributes. Useful for simple cases
    // of `find`.
    findWhere: function(attrs) {
      return this.where(attrs, true);
    },

    // Force the collection to re-sort itself. You don't need to call this under
    // normal circumstances, as the set will maintain sort order as each item
    // is added.
    sort: function(options) {
      var comparator = this.comparator;
      if (!comparator) throw new Error('Cannot sort a set without a comparator');
      options || (options = {});

      var length = comparator.length;
      if (_.isFunction(comparator)) comparator = _.bind(comparator, this);

      // Run sort based on type of `comparator`.
      if (length === 1 || _.isString(comparator)) {
        this.models = this.sortBy(comparator);
      } else {
        this.models.sort(comparator);
      }
      if (!options.silent) this.trigger('sort', this, options);
      return this;
    },

    // Pluck an attribute from each model in the collection.
    pluck: function(attr) {
      return this.map(attr + '');
    },

    // Fetch the default set of models for this collection, resetting the
    // collection when they arrive. If `reset: true` is passed, the response
    // data will be passed through the `reset` method instead of `set`.
    fetch: function(options) {
      options = _.extend({parse: true}, options);
      var success = options.success;
      var collection = this;
      options.success = function(resp) {
        var method = options.reset ? 'reset' : 'set';
        collection[method](resp, options);
        if (success) success.call(options.context, collection, resp, options);
        collection.trigger('sync', collection, resp, options);
      };
      wrapError(this, options);
      return this.sync('read', this, options);
    },

    // Create a new instance of a model in this collection. Add the model to the
    // collection immediately, unless `wait: true` is passed, in which case we
    // wait for the server to agree.
    create: function(model, options) {
      options = options ? _.clone(options) : {};
      var wait = options.wait;
      model = this._prepareModel(model, options);
      if (!model) return false;
      if (!wait) this.add(model, options);
      var collection = this;
      var success = options.success;
      options.success = function(m, resp, callbackOpts) {
        if (wait) collection.add(m, callbackOpts);
        if (success) success.call(callbackOpts.context, m, resp, callbackOpts);
      };
      model.save(null, options);
      return model;
    },

    // **parse** converts a response into a list of models to be added to the
    // collection. The default implementation is just to pass it through.
    parse: function(resp, options) {
      return resp;
    },

    // Create a new collection with an identical list of models as this one.
    clone: function() {
      return new this.constructor(this.models, {
        model: this.model,
        comparator: this.comparator
      });
    },

    // Define how to uniquely identify models in the collection.
    modelId: function(attrs) {
      return attrs[this.model.prototype.idAttribute || 'id'];
    },

    // Private method to reset all internal state. Called when the collection
    // is first initialized or reset.
    _reset: function() {
      this.length = 0;
      this.models = [];
      this._byId  = {};
    },

    // Prepare a hash of attributes (or other model) to be added to this
    // collection.
    _prepareModel: function(attrs, options) {
      if (this._isModel(attrs)) {
        if (!attrs.collection) attrs.collection = this;
        return attrs;
      }
      options = options ? _.clone(options) : {};
      options.collection = this;
      var model = new this.model(attrs, options);
      if (!model.validationError) return model;
      this.trigger('invalid', this, model.validationError, options);
      return false;
    },

    // Internal method called by both remove and set.
    _removeModels: function(models, options) {
      var removed = [];
      for (var i = 0; i < models.length; i++) {
        var model = this.get(models[i]);
        if (!model) continue;

        var index = this.indexOf(model);
        this.models.splice(index, 1);
        this.length--;

        // Remove references before triggering 'remove' event to prevent an
        // infinite loop. #3693
        delete this._byId[model.cid];
        var id = this.modelId(model.attributes);
        if (id != null) delete this._byId[id];

        if (!options.silent) {
          options.index = index;
          model.trigger('remove', model, this, options);
        }

        removed.push(model);
        this._removeReference(model, options);
      }
      return removed;
    },

    // Method for checking whether an object should be considered a model for
    // the purposes of adding to the collection.
    _isModel: function(model) {
      return model instanceof Model;
    },

    // Internal method to create a model's ties to a collection.
    _addReference: function(model, options) {
      this._byId[model.cid] = model;
      var id = this.modelId(model.attributes);
      if (id != null) this._byId[id] = model;
      model.on('all', this._onModelEvent, this);
    },

    // Internal method to sever a model's ties to a collection.
    _removeReference: function(model, options) {
      delete this._byId[model.cid];
      var id = this.modelId(model.attributes);
      if (id != null) delete this._byId[id];
      if (this === model.collection) delete model.collection;
      model.off('all', this._onModelEvent, this);
    },

    // Internal method called every time a model in the set fires an event.
    // Sets need to update their indexes when models change ids. All other
    // events simply proxy through. "add" and "remove" events that originate
    // in other collections are ignored.
    _onModelEvent: function(event, model, collection, options) {
      if (model) {
        if ((event === 'add' || event === 'remove') && collection !== this) return;
        if (event === 'destroy') this.remove(model, options);
        if (event === 'change') {
          var prevId = this.modelId(model.previousAttributes());
          var id = this.modelId(model.attributes);
          if (prevId !== id) {
            if (prevId != null) delete this._byId[prevId];
            if (id != null) this._byId[id] = model;
          }
        }
      }
      this.trigger.apply(this, arguments);
    }

  });

  // Underscore methods that we want to implement on the Collection.
  // 90% of the core usefulness of Backbone Collections is actually implemented
  // right here:
  var collectionMethods = {forEach: 3, each: 3, map: 3, collect: 3, reduce: 0,
      foldl: 0, inject: 0, reduceRight: 0, foldr: 0, find: 3, detect: 3, filter: 3,
      select: 3, reject: 3, every: 3, all: 3, some: 3, any: 3, include: 3, includes: 3,
      contains: 3, invoke: 0, max: 3, min: 3, toArray: 1, size: 1, first: 3,
      head: 3, take: 3, initial: 3, rest: 3, tail: 3, drop: 3, last: 3,
      without: 0, difference: 0, indexOf: 3, shuffle: 1, lastIndexOf: 3,
      isEmpty: 1, chain: 1, sample: 3, partition: 3, groupBy: 3, countBy: 3,
      sortBy: 3, indexBy: 3, findIndex: 3, findLastIndex: 3};

  // Mix in each Underscore method as a proxy to `Collection#models`.
  addUnderscoreMethods(Collection, collectionMethods, 'models');

  // Backbone.View
  // -------------

  // Backbone Views are almost more convention than they are actual code. A View
  // is simply a JavaScript object that represents a logical chunk of UI in the
  // DOM. This might be a single item, an entire list, a sidebar or panel, or
  // even the surrounding frame which wraps your whole app. Defining a chunk of
  // UI as a **View** allows you to define your DOM events declaratively, without
  // having to worry about render order ... and makes it easy for the view to
  // react to specific changes in the state of your models.

  // Creating a Backbone.View creates its initial element outside of the DOM,
  // if an existing element is not provided...
  var View = Backbone.View = function(options) {
    this.cid = _.uniqueId('view');
    _.extend(this, _.pick(options, viewOptions));
    this._ensureElement();
    this.initialize.apply(this, arguments);
  };

  // Cached regex to split keys for `delegate`.
  var delegateEventSplitter = /^(\S+)\s*(.*)$/;

  // List of view options to be set as properties.
  var viewOptions = ['model', 'collection', 'el', 'id', 'attributes', 'className', 'tagName', 'events'];

  // Set up all inheritable **Backbone.View** properties and methods.
  _.extend(View.prototype, Events, {

    // The default `tagName` of a View's element is `"div"`.
    tagName: 'div',

    // jQuery delegate for element lookup, scoped to DOM elements within the
    // current view. This should be preferred to global lookups where possible.
    $: function(selector) {
      return this.$el.find(selector);
    },

    // Initialize is an empty function by default. Override it with your own
    // initialization logic.
    initialize: function(){},

    // **render** is the core function that your view should override, in order
    // to populate its element (`this.el`), with the appropriate HTML. The
    // convention is for **render** to always return `this`.
    render: function() {
      return this;
    },

    // Remove this view by taking the element out of the DOM, and removing any
    // applicable Backbone.Events listeners.
    remove: function() {
      this._removeElement();
      this.stopListening();
      return this;
    },

    // Remove this view's element from the document and all event listeners
    // attached to it. Exposed for subclasses using an alternative DOM
    // manipulation API.
    _removeElement: function() {
      this.$el.remove();
    },

    // Change the view's element (`this.el` property) and re-delegate the
    // view's events on the new element.
    setElement: function(element) {
      this.undelegateEvents();
      this._setElement(element);
      this.delegateEvents();
      return this;
    },

    // Creates the `this.el` and `this.$el` references for this view using the
    // given `el`. `el` can be a CSS selector or an HTML string, a jQuery
    // context or an element. Subclasses can override this to utilize an
    // alternative DOM manipulation API and are only required to set the
    // `this.el` property.
    _setElement: function(el) {
      this.$el = el instanceof Backbone.$ ? el : Backbone.$(el);
      this.el = this.$el[0];
    },

    // Set callbacks, where `this.events` is a hash of
    //
    // *{"event selector": "callback"}*
    //
    //     {
    //       'mousedown .title':  'edit',
    //       'click .button':     'save',
    //       'click .open':       function(e) { ... }
    //     }
    //
    // pairs. Callbacks will be bound to the view, with `this` set properly.
    // Uses event delegation for efficiency.
    // Omitting the selector binds the event to `this.el`.
    delegateEvents: function(events) {
      events || (events = _.result(this, 'events'));
      if (!events) return this;
      this.undelegateEvents();
      for (var key in events) {
        var method = events[key];
        if (!_.isFunction(method)) method = this[method];
        if (!method) continue;
        var match = key.match(delegateEventSplitter);
        this.delegate(match[1], match[2], _.bind(method, this));
      }
      return this;
    },

    // Add a single event listener to the view's element (or a child element
    // using `selector`). This only works for delegate-able events: not `focus`,
    // `blur`, and not `change`, `submit`, and `reset` in Internet Explorer.
    delegate: function(eventName, selector, listener) {
      this.$el.on(eventName + '.delegateEvents' + this.cid, selector, listener);
      return this;
    },

    // Clears all callbacks previously bound to the view by `delegateEvents`.
    // You usually don't need to use this, but may wish to if you have multiple
    // Backbone views attached to the same DOM element.
    undelegateEvents: function() {
      if (this.$el) this.$el.off('.delegateEvents' + this.cid);
      return this;
    },

    // A finer-grained `undelegateEvents` for removing a single delegated event.
    // `selector` and `listener` are both optional.
    undelegate: function(eventName, selector, listener) {
      this.$el.off(eventName + '.delegateEvents' + this.cid, selector, listener);
      return this;
    },

    // Produces a DOM element to be assigned to your view. Exposed for
    // subclasses using an alternative DOM manipulation API.
    _createElement: function(tagName) {
      return document.createElement(tagName);
    },

    // Ensure that the View has a DOM element to render into.
    // If `this.el` is a string, pass it through `$()`, take the first
    // matching element, and re-assign it to `el`. Otherwise, create
    // an element from the `id`, `className` and `tagName` properties.
    _ensureElement: function() {
      if (!this.el) {
        var attrs = _.extend({}, _.result(this, 'attributes'));
        if (this.id) attrs.id = _.result(this, 'id');
        if (this.className) attrs['class'] = _.result(this, 'className');
        this.setElement(this._createElement(_.result(this, 'tagName')));
        this._setAttributes(attrs);
      } else {
        this.setElement(_.result(this, 'el'));
      }
    },

    // Set attributes from a hash on this view's element.  Exposed for
    // subclasses using an alternative DOM manipulation API.
    _setAttributes: function(attributes) {
      this.$el.attr(attributes);
    }

  });

  // Backbone.sync
  // -------------

  // Override this function to change the manner in which Backbone persists
  // models to the server. You will be passed the type of request, and the
  // model in question. By default, makes a RESTful Ajax request
  // to the model's `url()`. Some possible customizations could be:
  //
  // * Use `setTimeout` to batch rapid-fire updates into a single request.
  // * Send up the models as XML instead of JSON.
  // * Persist models via WebSockets instead of Ajax.
  //
  // Turn on `Backbone.emulateHTTP` in order to send `PUT` and `DELETE` requests
  // as `POST`, with a `_method` parameter containing the true HTTP method,
  // as well as all requests with the body as `application/x-www-form-urlencoded`
  // instead of `application/json` with the model in a param named `model`.
  // Useful when interfacing with server-side languages like **PHP** that make
  // it difficult to read the body of `PUT` requests.
  Backbone.sync = function(method, model, options) {
    var type = methodMap[method];

    // Default options, unless specified.
    _.defaults(options || (options = {}), {
      emulateHTTP: Backbone.emulateHTTP,
      emulateJSON: Backbone.emulateJSON
    });

    // Default JSON-request options.
    var params = {type: type, dataType: 'json'};

    // Ensure that we have a URL.
    if (!options.url) {
      params.url = _.result(model, 'url') || urlError();
    }

    // Ensure that we have the appropriate request data.
    if (options.data == null && model && (method === 'create' || method === 'update' || method === 'patch')) {
      params.contentType = 'application/json';
      params.data = JSON.stringify(options.attrs || model.toJSON(options));
    }

    // For older servers, emulate JSON by encoding the request into an HTML-form.
    if (options.emulateJSON) {
      params.contentType = 'application/x-www-form-urlencoded';
      params.data = params.data ? {model: params.data} : {};
    }

    // For older servers, emulate HTTP by mimicking the HTTP method with `_method`
    // And an `X-HTTP-Method-Override` header.
    if (options.emulateHTTP && (type === 'PUT' || type === 'DELETE' || type === 'PATCH')) {
      params.type = 'POST';
      if (options.emulateJSON) params.data._method = type;
      var beforeSend = options.beforeSend;
      options.beforeSend = function(xhr) {
        xhr.setRequestHeader('X-HTTP-Method-Override', type);
        if (beforeSend) return beforeSend.apply(this, arguments);
      };
    }

    // Don't process data on a non-GET request.
    if (params.type !== 'GET' && !options.emulateJSON) {
      params.processData = false;
    }

    // Pass along `textStatus` and `errorThrown` from jQuery.
    var error = options.error;
    options.error = function(xhr, textStatus, errorThrown) {
      options.textStatus = textStatus;
      options.errorThrown = errorThrown;
      if (error) error.call(options.context, xhr, textStatus, errorThrown);
    };

    // Make the request, allowing the user to override any Ajax options.
    var xhr = options.xhr = Backbone.ajax(_.extend(params, options));
    model.trigger('request', model, xhr, options);
    return xhr;
  };

  // Map from CRUD to HTTP for our default `Backbone.sync` implementation.
  var methodMap = {
    'create': 'POST',
    'update': 'PUT',
    'patch': 'PATCH',
    'delete': 'DELETE',
    'read': 'GET'
  };

  // Set the default implementation of `Backbone.ajax` to proxy through to `$`.
  // Override this if you'd like to use a different library.
  Backbone.ajax = function() {
    return Backbone.$.ajax.apply(Backbone.$, arguments);
  };

  // Backbone.Router
  // ---------------

  // Routers map faux-URLs to actions, and fire events when routes are
  // matched. Creating a new one sets its `routes` hash, if not set statically.
  var Router = Backbone.Router = function(options) {
    options || (options = {});
    if (options.routes) this.routes = options.routes;
    this._bindRoutes();
    this.initialize.apply(this, arguments);
  };

  // Cached regular expressions for matching named param parts and splatted
  // parts of route strings.
  var optionalParam = /\((.*?)\)/g;
  var namedParam    = /(\(\?)?:\w+/g;
  var splatParam    = /\*\w+/g;
  var escapeRegExp  = /[\-{}\[\]+?.,\\\^$|#\s]/g;

  // Set up all inheritable **Backbone.Router** properties and methods.
  _.extend(Router.prototype, Events, {

    // Initialize is an empty function by default. Override it with your own
    // initialization logic.
    initialize: function(){},

    // Manually bind a single named route to a callback. For example:
    //
    //     this.route('search/:query/p:num', 'search', function(query, num) {
    //       ...
    //     });
    //
    route: function(route, name, callback) {
      if (!_.isRegExp(route)) route = this._routeToRegExp(route);
      if (_.isFunction(name)) {
        callback = name;
        name = '';
      }
      if (!callback) callback = this[name];
      var router = this;
      Backbone.history.route(route, function(fragment) {
        var args = router._extractParameters(route, fragment);
        if (router.execute(callback, args, name) !== false) {
          router.trigger.apply(router, ['route:' + name].concat(args));
          router.trigger('route', name, args);
          Backbone.history.trigger('route', router, name, args);
        }
      });
      return this;
    },

    // Execute a route handler with the provided parameters.  This is an
    // excellent place to do pre-route setup or post-route cleanup.
    execute: function(callback, args, name) {
      if (callback) callback.apply(this, args);
    },

    // Simple proxy to `Backbone.history` to save a fragment into the history.
    navigate: function(fragment, options) {
      Backbone.history.navigate(fragment, options);
      return this;
    },

    // Bind all defined routes to `Backbone.history`. We have to reverse the
    // order of the routes here to support behavior where the most general
    // routes can be defined at the bottom of the route map.
    _bindRoutes: function() {
      if (!this.routes) return;
      this.routes = _.result(this, 'routes');
      var route, routes = _.keys(this.routes);
      while ((route = routes.pop()) != null) {
        this.route(route, this.routes[route]);
      }
    },

    // Convert a route string into a regular expression, suitable for matching
    // against the current location hash.
    _routeToRegExp: function(route) {
      route = route.replace(escapeRegExp, '\\$&')
                   .replace(optionalParam, '(?:$1)?')
                   .replace(namedParam, function(match, optional) {
                     return optional ? match : '([^/?]+)';
                   })
                   .replace(splatParam, '([^?]*?)');
      return new RegExp('^' + route + '(?:\\?([\\s\\S]*))?$');
    },

    // Given a route, and a URL fragment that it matches, return the array of
    // extracted decoded parameters. Empty or unmatched parameters will be
    // treated as `null` to normalize cross-browser behavior.
    _extractParameters: function(route, fragment) {
      var params = route.exec(fragment).slice(1);
      return _.map(params, function(param, i) {
        // Don't decode the search params.
        if (i === params.length - 1) return param || null;
        return param ? decodeURIComponent(param) : null;
      });
    }

  });

  // Backbone.History
  // ----------------

  // Handles cross-browser history management, based on either
  // [pushState](http://diveintohtml5.info/history.html) and real URLs, or
  // [onhashchange](https://developer.mozilla.org/en-US/docs/DOM/window.onhashchange)
  // and URL fragments. If the browser supports neither (old IE, natch),
  // falls back to polling.
  var History = Backbone.History = function() {
    this.handlers = [];
    this.checkUrl = _.bind(this.checkUrl, this);

    // Ensure that `History` can be used outside of the browser.
    if (typeof window !== 'undefined') {
      this.location = window.location;
      this.history = window.history;
    }
  };

  // Cached regex for stripping a leading hash/slash and trailing space.
  var routeStripper = /^[#\/]|\s+$/g;

  // Cached regex for stripping leading and trailing slashes.
  var rootStripper = /^\/+|\/+$/g;

  // Cached regex for stripping urls of hash.
  var pathStripper = /#.*$/;

  // Has the history handling already been started?
  History.started = false;

  // Set up all inheritable **Backbone.History** properties and methods.
  _.extend(History.prototype, Events, {

    // The default interval to poll for hash changes, if necessary, is
    // twenty times a second.
    interval: 50,

    // Are we at the app root?
    atRoot: function() {
      var path = this.location.pathname.replace(/[^\/]$/, '$&/');
      return path === this.root && !this.getSearch();
    },

    // Does the pathname match the root?
    matchRoot: function() {
      var path = this.decodeFragment(this.location.pathname);
      var rootPath = path.slice(0, this.root.length - 1) + '/';
      return rootPath === this.root;
    },

    // Unicode characters in `location.pathname` are percent encoded so they're
    // decoded for comparison. `%25` should not be decoded since it may be part
    // of an encoded parameter.
    decodeFragment: function(fragment) {
      return decodeURI(fragment.replace(/%25/g, '%2525'));
    },

    // In IE6, the hash fragment and search params are incorrect if the
    // fragment contains `?`.
    getSearch: function() {
      var match = this.location.href.replace(/#.*/, '').match(/\?.+/);
      return match ? match[0] : '';
    },

    // Gets the true hash value. Cannot use location.hash directly due to bug
    // in Firefox where location.hash will always be decoded.
    getHash: function(window) {
      var match = (window || this).location.href.match(/#(.*)$/);
      return match ? match[1] : '';
    },

    // Get the pathname and search params, without the root.
    getPath: function() {
      var path = this.decodeFragment(
        this.location.pathname + this.getSearch()
      ).slice(this.root.length - 1);
      return path.charAt(0) === '/' ? path.slice(1) : path;
    },

    // Get the cross-browser normalized URL fragment from the path or hash.
    getFragment: function(fragment) {
      if (fragment == null) {
        if (this._usePushState || !this._wantsHashChange) {
          fragment = this.getPath();
        } else {
          fragment = this.getHash();
        }
      }
      return fragment.replace(routeStripper, '');
    },

    // Start the hash change handling, returning `true` if the current URL matches
    // an existing route, and `false` otherwise.
    start: function(options) {
      if (History.started) throw new Error('Backbone.history has already been started');
      History.started = true;

      // Figure out the initial configuration. Do we need an iframe?
      // Is pushState desired ... is it available?
      this.options          = _.extend({root: '/'}, this.options, options);
      this.root             = this.options.root;
      this._wantsHashChange = this.options.hashChange !== false;
      this._hasHashChange   = 'onhashchange' in window && (document.documentMode === void 0 || document.documentMode > 7);
      this._useHashChange   = this._wantsHashChange && this._hasHashChange;
      this._wantsPushState  = !!this.options.pushState;
      this._hasPushState    = !!(this.history && this.history.pushState);
      this._usePushState    = this._wantsPushState && this._hasPushState;
      this.fragment         = this.getFragment();

      // Normalize root to always include a leading and trailing slash.
      this.root = ('/' + this.root + '/').replace(rootStripper, '/');

      // Transition from hashChange to pushState or vice versa if both are
      // requested.
      if (this._wantsHashChange && this._wantsPushState) {

        // If we've started off with a route from a `pushState`-enabled
        // browser, but we're currently in a browser that doesn't support it...
        if (!this._hasPushState && !this.atRoot()) {
          var rootPath = this.root.slice(0, -1) || '/';
          this.location.replace(rootPath + '#' + this.getPath());
          // Return immediately as browser will do redirect to new url
          return true;

        // Or if we've started out with a hash-based route, but we're currently
        // in a browser where it could be `pushState`-based instead...
        } else if (this._hasPushState && this.atRoot()) {
          this.navigate(this.getHash(), {replace: true});
        }

      }

      // Proxy an iframe to handle location events if the browser doesn't
      // support the `hashchange` event, HTML5 history, or the user wants
      // `hashChange` but not `pushState`.
      if (!this._hasHashChange && this._wantsHashChange && !this._usePushState) {
        this.iframe = document.createElement('iframe');
        this.iframe.src = 'javascript:0';
        this.iframe.style.display = 'none';
        this.iframe.tabIndex = -1;
        var body = document.body;
        // Using `appendChild` will throw on IE < 9 if the document is not ready.
        var iWindow = body.insertBefore(this.iframe, body.firstChild).contentWindow;
        iWindow.document.open();
        iWindow.document.close();
        iWindow.location.hash = '#' + this.fragment;
      }

      // Add a cross-platform `addEventListener` shim for older browsers.
      var addEventListener = window.addEventListener || function(eventName, listener) {
        return attachEvent('on' + eventName, listener);
      };

      // Depending on whether we're using pushState or hashes, and whether
      // 'onhashchange' is supported, determine how we check the URL state.
      if (this._usePushState) {
        addEventListener('popstate', this.checkUrl, false);
      } else if (this._useHashChange && !this.iframe) {
        addEventListener('hashchange', this.checkUrl, false);
      } else if (this._wantsHashChange) {
        this._checkUrlInterval = setInterval(this.checkUrl, this.interval);
      }

      if (!this.options.silent) return this.loadUrl();
    },

    // Disable Backbone.history, perhaps temporarily. Not useful in a real app,
    // but possibly useful for unit testing Routers.
    stop: function() {
      // Add a cross-platform `removeEventListener` shim for older browsers.
      var removeEventListener = window.removeEventListener || function(eventName, listener) {
        return detachEvent('on' + eventName, listener);
      };

      // Remove window listeners.
      if (this._usePushState) {
        removeEventListener('popstate', this.checkUrl, false);
      } else if (this._useHashChange && !this.iframe) {
        removeEventListener('hashchange', this.checkUrl, false);
      }

      // Clean up the iframe if necessary.
      if (this.iframe) {
        document.body.removeChild(this.iframe);
        this.iframe = null;
      }

      // Some environments will throw when clearing an undefined interval.
      if (this._checkUrlInterval) clearInterval(this._checkUrlInterval);
      History.started = false;
    },

    // Add a route to be tested when the fragment changes. Routes added later
    // may override previous routes.
    route: function(route, callback) {
      this.handlers.unshift({route: route, callback: callback});
    },

    // Checks the current URL to see if it has changed, and if it has,
    // calls `loadUrl`, normalizing across the hidden iframe.
    checkUrl: function(e) {
      var current = this.getFragment();

      // If the user pressed the back button, the iframe's hash will have
      // changed and we should use that for comparison.
      if (current === this.fragment && this.iframe) {
        current = this.getHash(this.iframe.contentWindow);
      }

      if (current === this.fragment) return false;
      if (this.iframe) this.navigate(current);
      this.loadUrl();
    },

    // Attempt to load the current URL fragment. If a route succeeds with a
    // match, returns `true`. If no defined routes matches the fragment,
    // returns `false`.
    loadUrl: function(fragment) {
      // If the root doesn't match, no routes can match either.
      if (!this.matchRoot()) return false;
      fragment = this.fragment = this.getFragment(fragment);
      return _.some(this.handlers, function(handler) {
        if (handler.route.test(fragment)) {
          handler.callback(fragment);
          return true;
        }
      });
    },

    // Save a fragment into the hash history, or replace the URL state if the
    // 'replace' option is passed. You are responsible for properly URL-encoding
    // the fragment in advance.
    //
    // The options object can contain `trigger: true` if you wish to have the
    // route callback be fired (not usually desirable), or `replace: true`, if
    // you wish to modify the current URL without adding an entry to the history.
    navigate: function(fragment, options) {
      if (!History.started) return false;
      if (!options || options === true) options = {trigger: !!options};

      // Normalize the fragment.
      fragment = this.getFragment(fragment || '');

      // Don't include a trailing slash on the root.
      var rootPath = this.root;
      if (fragment === '' || fragment.charAt(0) === '?') {
        rootPath = rootPath.slice(0, -1) || '/';
      }
      var url = rootPath + fragment;

      // Strip the hash and decode for matching.
      fragment = this.decodeFragment(fragment.replace(pathStripper, ''));

      if (this.fragment === fragment) return;
      this.fragment = fragment;

      // If pushState is available, we use it to set the fragment as a real URL.
      if (this._usePushState) {
        this.history[options.replace ? 'replaceState' : 'pushState']({}, document.title, url);

      // If hash changes haven't been explicitly disabled, update the hash
      // fragment to store history.
      } else if (this._wantsHashChange) {
        this._updateHash(this.location, fragment, options.replace);
        if (this.iframe && fragment !== this.getHash(this.iframe.contentWindow)) {
          var iWindow = this.iframe.contentWindow;

          // Opening and closing the iframe tricks IE7 and earlier to push a
          // history entry on hash-tag change.  When replace is true, we don't
          // want this.
          if (!options.replace) {
            iWindow.document.open();
            iWindow.document.close();
          }

          this._updateHash(iWindow.location, fragment, options.replace);
        }

      // If you've told us that you explicitly don't want fallback hashchange-
      // based history, then `navigate` becomes a page refresh.
      } else {
        return this.location.assign(url);
      }
      if (options.trigger) return this.loadUrl(fragment);
    },

    // Update the hash location, either replacing the current entry, or adding
    // a new one to the browser history.
    _updateHash: function(location, fragment, replace) {
      if (replace) {
        var href = location.href.replace(/(javascript:|#).*$/, '');
        location.replace(href + '#' + fragment);
      } else {
        // Some browsers require that `hash` contains a leading #.
        location.hash = '#' + fragment;
      }
    }

  });

  // Create the default Backbone.history.
  Backbone.history = new History;

  // Helpers
  // -------

  // Helper function to correctly set up the prototype chain for subclasses.
  // Similar to `goog.inherits`, but uses a hash of prototype properties and
  // class properties to be extended.
  var extend = function(protoProps, staticProps) {
    var parent = this;
    var child;

    // The constructor function for the new subclass is either defined by you
    // (the "constructor" property in your `extend` definition), or defaulted
    // by us to simply call the parent constructor.
    if (protoProps && _.has(protoProps, 'constructor')) {
      child = protoProps.constructor;
    } else {
      child = function(){ return parent.apply(this, arguments); };
    }

    // Add static properties to the constructor function, if supplied.
    _.extend(child, parent, staticProps);

    // Set the prototype chain to inherit from `parent`, without calling
    // `parent`'s constructor function and add the prototype properties.
    child.prototype = _.create(parent.prototype, protoProps);
    child.prototype.constructor = child;

    // Set a convenience property in case the parent's prototype is needed
    // later.
    child.__super__ = parent.prototype;

    return child;
  };

  // Set up inheritance for the model, collection, router, view and history.
  Model.extend = Collection.extend = Router.extend = View.extend = History.extend = extend;

  // Throw an error when a URL is needed, and none is supplied.
  var urlError = function() {
    throw new Error('A "url" property or function must be specified');
  };

  // Wrap an optional error callback with a fallback error event.
  var wrapError = function(model, options) {
    var error = options.error;
    options.error = function(resp) {
      if (error) error.call(options.context, model, resp, options);
      model.trigger('error', model, resp, options);
    };
  };

  return Backbone;
});

}).call(this)}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"backbone-torso/node_modules/jquery":36,"underscore":48}],40:[function(require,module,exports){
(function (global){(function (){
"use strict";
/*globals Handlebars: true */
var base = require("./handlebars/base");

// Each of these augment the Handlebars object. No need to setup here.
// (This is done to easily share code between commonjs and browse envs)
var SafeString = require("./handlebars/safe-string")["default"];
var Exception = require("./handlebars/exception")["default"];
var Utils = require("./handlebars/utils");
var runtime = require("./handlebars/runtime");

// For compatibility and usage outside of module systems, make the Handlebars object a namespace
var create = function() {
  var hb = new base.HandlebarsEnvironment();

  Utils.extend(hb, base);
  hb.SafeString = SafeString;
  hb.Exception = Exception;
  hb.Utils = Utils;
  hb.escapeExpression = Utils.escapeExpression;

  hb.VM = runtime;
  hb.template = function(spec) {
    return runtime.template(spec, hb);
  };

  return hb;
};

var Handlebars = create();
Handlebars.create = create;

/*jshint -W040 */
/* istanbul ignore next */
var root = typeof global !== 'undefined' ? global : window,
    $Handlebars = root.Handlebars;
/* istanbul ignore next */
Handlebars.noConflict = function() {
  if (root.Handlebars === Handlebars) {
    root.Handlebars = $Handlebars;
  }
};

Handlebars['default'] = Handlebars;

exports["default"] = Handlebars;
}).call(this)}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"./handlebars/base":41,"./handlebars/exception":42,"./handlebars/runtime":43,"./handlebars/safe-string":44,"./handlebars/utils":45}],41:[function(require,module,exports){
"use strict";
var Utils = require("./utils");
var Exception = require("./exception")["default"];

var VERSION = "3.0.0";
exports.VERSION = VERSION;var COMPILER_REVISION = 6;
exports.COMPILER_REVISION = COMPILER_REVISION;
var REVISION_CHANGES = {
  1: '<= 1.0.rc.2', // 1.0.rc.2 is actually rev2 but doesn't report it
  2: '== 1.0.0-rc.3',
  3: '== 1.0.0-rc.4',
  4: '== 1.x.x',
  5: '== 2.0.0-alpha.x',
  6: '>= 2.0.0-beta.1'
};
exports.REVISION_CHANGES = REVISION_CHANGES;
var isArray = Utils.isArray,
    isFunction = Utils.isFunction,
    toString = Utils.toString,
    objectType = '[object Object]';

function HandlebarsEnvironment(helpers, partials) {
  this.helpers = helpers || {};
  this.partials = partials || {};

  registerDefaultHelpers(this);
}

exports.HandlebarsEnvironment = HandlebarsEnvironment;HandlebarsEnvironment.prototype = {
  constructor: HandlebarsEnvironment,

  logger: logger,
  log: log,

  registerHelper: function(name, fn) {
    if (toString.call(name) === objectType) {
      if (fn) { throw new Exception('Arg not supported with multiple helpers'); }
      Utils.extend(this.helpers, name);
    } else {
      this.helpers[name] = fn;
    }
  },
  unregisterHelper: function(name) {
    delete this.helpers[name];
  },

  registerPartial: function(name, partial) {
    if (toString.call(name) === objectType) {
      Utils.extend(this.partials,  name);
    } else {
      if (typeof partial === 'undefined') {
        throw new Exception('Attempting to register a partial as undefined');
      }
      this.partials[name] = partial;
    }
  },
  unregisterPartial: function(name) {
    delete this.partials[name];
  }
};

function registerDefaultHelpers(instance) {
  instance.registerHelper('helperMissing', function(/* [args, ]options */) {
    if(arguments.length === 1) {
      // A missing field in a {{foo}} constuct.
      return undefined;
    } else {
      // Someone is actually trying to call something, blow up.
      throw new Exception("Missing helper: '" + arguments[arguments.length-1].name + "'");
    }
  });

  instance.registerHelper('blockHelperMissing', function(context, options) {
    var inverse = options.inverse,
        fn = options.fn;

    if(context === true) {
      return fn(this);
    } else if(context === false || context == null) {
      return inverse(this);
    } else if (isArray(context)) {
      if(context.length > 0) {
        if (options.ids) {
          options.ids = [options.name];
        }

        return instance.helpers.each(context, options);
      } else {
        return inverse(this);
      }
    } else {
      if (options.data && options.ids) {
        var data = createFrame(options.data);
        data.contextPath = Utils.appendContextPath(options.data.contextPath, options.name);
        options = {data: data};
      }

      return fn(context, options);
    }
  });

  instance.registerHelper('each', function(context, options) {
    if (!options) {
      throw new Exception('Must pass iterator to #each');
    }

    var fn = options.fn, inverse = options.inverse;
    var i = 0, ret = "", data;

    var contextPath;
    if (options.data && options.ids) {
      contextPath = Utils.appendContextPath(options.data.contextPath, options.ids[0]) + '.';
    }

    if (isFunction(context)) { context = context.call(this); }

    if (options.data) {
      data = createFrame(options.data);
    }

    function execIteration(key, i, last) {
      if (data) {
        data.key = key;
        data.index = i;
        data.first = i === 0;
        data.last  = !!last;

        if (contextPath) {
          data.contextPath = contextPath + key;
        }
      }

      ret = ret + fn(context[key], {
        data: data,
        blockParams: Utils.blockParams([context[key], key], [contextPath + key, null])
      });
    }

    if(context && typeof context === 'object') {
      if (isArray(context)) {
        for(var j = context.length; i<j; i++) {
          execIteration(i, i, i === context.length-1);
        }
      } else {
        var priorKey;

        for(var key in context) {
          if(context.hasOwnProperty(key)) {
            // We're running the iterations one step out of sync so we can detect
            // the last iteration without have to scan the object twice and create
            // an itermediate keys array. 
            if (priorKey) {
              execIteration(priorKey, i-1);
            }
            priorKey = key;
            i++;
          }
        }
        if (priorKey) {
          execIteration(priorKey, i-1, true);
        }
      }
    }

    if(i === 0){
      ret = inverse(this);
    }

    return ret;
  });

  instance.registerHelper('if', function(conditional, options) {
    if (isFunction(conditional)) { conditional = conditional.call(this); }

    // Default behavior is to render the positive path if the value is truthy and not empty.
    // The `includeZero` option may be set to treat the condtional as purely not empty based on the
    // behavior of isEmpty. Effectively this determines if 0 is handled by the positive path or negative.
    if ((!options.hash.includeZero && !conditional) || Utils.isEmpty(conditional)) {
      return options.inverse(this);
    } else {
      return options.fn(this);
    }
  });

  instance.registerHelper('unless', function(conditional, options) {
    return instance.helpers['if'].call(this, conditional, {fn: options.inverse, inverse: options.fn, hash: options.hash});
  });

  instance.registerHelper('with', function(context, options) {
    if (isFunction(context)) { context = context.call(this); }

    var fn = options.fn;

    if (!Utils.isEmpty(context)) {
      if (options.data && options.ids) {
        var data = createFrame(options.data);
        data.contextPath = Utils.appendContextPath(options.data.contextPath, options.ids[0]);
        options = {data:data};
      }

      return fn(context, options);
    } else {
      return options.inverse(this);
    }
  });

  instance.registerHelper('log', function(message, options) {
    var level = options.data && options.data.level != null ? parseInt(options.data.level, 10) : 1;
    instance.log(level, message);
  });

  instance.registerHelper('lookup', function(obj, field) {
    return obj && obj[field];
  });
}

var logger = {
  methodMap: { 0: 'debug', 1: 'info', 2: 'warn', 3: 'error' },

  // State enum
  DEBUG: 0,
  INFO: 1,
  WARN: 2,
  ERROR: 3,
  level: 1,

  // Can be overridden in the host environment
  log: function(level, message) {
    if (typeof console !== 'undefined' && logger.level <= level) {
      var method = logger.methodMap[level];
      (console[method] || console.log).call(console, message);
    }
  }
};
exports.logger = logger;
var log = logger.log;
exports.log = log;
var createFrame = function(object) {
  var frame = Utils.extend({}, object);
  frame._parent = object;
  return frame;
};
exports.createFrame = createFrame;
},{"./exception":42,"./utils":45}],42:[function(require,module,exports){
"use strict";

var errorProps = ['description', 'fileName', 'lineNumber', 'message', 'name', 'number', 'stack'];

function Exception(message, node) {
  var loc = node && node.loc,
      line,
      column;
  if (loc) {
    line = loc.start.line;
    column = loc.start.column;

    message += ' - ' + line + ':' + column;
  }

  var tmp = Error.prototype.constructor.call(this, message);

  // Unfortunately errors are not enumerable in Chrome (at least), so `for prop in tmp` doesn't work.
  for (var idx = 0; idx < errorProps.length; idx++) {
    this[errorProps[idx]] = tmp[errorProps[idx]];
  }

  if (loc) {
    this.lineNumber = line;
    this.column = column;
  }
}

Exception.prototype = new Error();

exports["default"] = Exception;
},{}],43:[function(require,module,exports){
"use strict";
var Utils = require("./utils");
var Exception = require("./exception")["default"];
var COMPILER_REVISION = require("./base").COMPILER_REVISION;
var REVISION_CHANGES = require("./base").REVISION_CHANGES;
var createFrame = require("./base").createFrame;

function checkRevision(compilerInfo) {
  var compilerRevision = compilerInfo && compilerInfo[0] || 1,
      currentRevision = COMPILER_REVISION;

  if (compilerRevision !== currentRevision) {
    if (compilerRevision < currentRevision) {
      var runtimeVersions = REVISION_CHANGES[currentRevision],
          compilerVersions = REVISION_CHANGES[compilerRevision];
      throw new Exception("Template was precompiled with an older version of Handlebars than the current runtime. "+
            "Please update your precompiler to a newer version ("+runtimeVersions+") or downgrade your runtime to an older version ("+compilerVersions+").");
    } else {
      // Use the embedded version info since the runtime doesn't know about this revision yet
      throw new Exception("Template was precompiled with a newer version of Handlebars than the current runtime. "+
            "Please update your runtime to a newer version ("+compilerInfo[1]+").");
    }
  }
}

exports.checkRevision = checkRevision;// TODO: Remove this line and break up compilePartial

function template(templateSpec, env) {
  /* istanbul ignore next */
  if (!env) {
    throw new Exception("No environment passed to template");
  }
  if (!templateSpec || !templateSpec.main) {
    throw new Exception('Unknown template object: ' + typeof templateSpec);
  }

  // Note: Using env.VM references rather than local var references throughout this section to allow
  // for external users to override these as psuedo-supported APIs.
  env.VM.checkRevision(templateSpec.compiler);

  var invokePartialWrapper = function(partial, context, options) {
    if (options.hash) {
      context = Utils.extend({}, context, options.hash);
    }

    partial = env.VM.resolvePartial.call(this, partial, context, options);
    var result = env.VM.invokePartial.call(this, partial, context, options);

    if (result == null && env.compile) {
      options.partials[options.name] = env.compile(partial, templateSpec.compilerOptions, env);
      result = options.partials[options.name](context, options);
    }
    if (result != null) {
      if (options.indent) {
        var lines = result.split('\n');
        for (var i = 0, l = lines.length; i < l; i++) {
          if (!lines[i] && i + 1 === l) {
            break;
          }

          lines[i] = options.indent + lines[i];
        }
        result = lines.join('\n');
      }
      return result;
    } else {
      throw new Exception("The partial " + options.name + " could not be compiled when running in runtime-only mode");
    }
  };

  // Just add water
  var container = {
    strict: function(obj, name) {
      if (!(name in obj)) {
        throw new Exception('"' + name + '" not defined in ' + obj);
      }
      return obj[name];
    },
    lookup: function(depths, name) {
      var len = depths.length;
      for (var i = 0; i < len; i++) {
        if (depths[i] && depths[i][name] != null) {
          return depths[i][name];
        }
      }
    },
    lambda: function(current, context) {
      return typeof current === 'function' ? current.call(context) : current;
    },

    escapeExpression: Utils.escapeExpression,
    invokePartial: invokePartialWrapper,

    fn: function(i) {
      return templateSpec[i];
    },

    programs: [],
    program: function(i, data, declaredBlockParams, blockParams, depths) {
      var programWrapper = this.programs[i],
          fn = this.fn(i);
      if (data || depths || blockParams || declaredBlockParams) {
        programWrapper = program(this, i, fn, data, declaredBlockParams, blockParams, depths);
      } else if (!programWrapper) {
        programWrapper = this.programs[i] = program(this, i, fn);
      }
      return programWrapper;
    },

    data: function(data, depth) {
      while (data && depth--) {
        data = data._parent;
      }
      return data;
    },
    merge: function(param, common) {
      var ret = param || common;

      if (param && common && (param !== common)) {
        ret = Utils.extend({}, common, param);
      }

      return ret;
    },

    noop: env.VM.noop,
    compilerInfo: templateSpec.compiler
  };

  var ret = function(context, options) {
    options = options || {};
    var data = options.data;

    ret._setup(options);
    if (!options.partial && templateSpec.useData) {
      data = initData(context, data);
    }
    var depths,
        blockParams = templateSpec.useBlockParams ? [] : undefined;
    if (templateSpec.useDepths) {
      depths = options.depths ? [context].concat(options.depths) : [context];
    }

    return templateSpec.main.call(container, context, container.helpers, container.partials, data, blockParams, depths);
  };
  ret.isTop = true;

  ret._setup = function(options) {
    if (!options.partial) {
      container.helpers = container.merge(options.helpers, env.helpers);

      if (templateSpec.usePartial) {
        container.partials = container.merge(options.partials, env.partials);
      }
    } else {
      container.helpers = options.helpers;
      container.partials = options.partials;
    }
  };

  ret._child = function(i, data, blockParams, depths) {
    if (templateSpec.useBlockParams && !blockParams) {
      throw new Exception('must pass block params');
    }
    if (templateSpec.useDepths && !depths) {
      throw new Exception('must pass parent depths');
    }

    return program(container, i, templateSpec[i], data, 0, blockParams, depths);
  };
  return ret;
}

exports.template = template;function program(container, i, fn, data, declaredBlockParams, blockParams, depths) {
  var prog = function(context, options) {
    options = options || {};

    return fn.call(container,
        context,
        container.helpers, container.partials,
        options.data || data,
        blockParams && [options.blockParams].concat(blockParams),
        depths && [context].concat(depths));
  };
  prog.program = i;
  prog.depth = depths ? depths.length : 0;
  prog.blockParams = declaredBlockParams || 0;
  return prog;
}

exports.program = program;function resolvePartial(partial, context, options) {
  if (!partial) {
    partial = options.partials[options.name];
  } else if (!partial.call && !options.name) {
    // This is a dynamic partial that returned a string
    options.name = partial;
    partial = options.partials[partial];
  }
  return partial;
}

exports.resolvePartial = resolvePartial;function invokePartial(partial, context, options) {
  options.partial = true;

  if(partial === undefined) {
    throw new Exception("The partial " + options.name + " could not be found");
  } else if(partial instanceof Function) {
    return partial(context, options);
  }
}

exports.invokePartial = invokePartial;function noop() { return ""; }

exports.noop = noop;function initData(context, data) {
  if (!data || !('root' in data)) {
    data = data ? createFrame(data) : {};
    data.root = context;
  }
  return data;
}
},{"./base":41,"./exception":42,"./utils":45}],44:[function(require,module,exports){
"use strict";
// Build out our basic SafeString type
function SafeString(string) {
  this.string = string;
}

SafeString.prototype.toString = SafeString.prototype.toHTML = function() {
  return "" + this.string;
};

exports["default"] = SafeString;
},{}],45:[function(require,module,exports){
"use strict";
/*jshint -W004 */
var escape = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#x27;",
  "`": "&#x60;"
};

var badChars = /[&<>"'`]/g;
var possible = /[&<>"'`]/;

function escapeChar(chr) {
  return escape[chr];
}

function extend(obj /* , ...source */) {
  for (var i = 1; i < arguments.length; i++) {
    for (var key in arguments[i]) {
      if (Object.prototype.hasOwnProperty.call(arguments[i], key)) {
        obj[key] = arguments[i][key];
      }
    }
  }

  return obj;
}

exports.extend = extend;var toString = Object.prototype.toString;
exports.toString = toString;
// Sourced from lodash
// https://github.com/bestiejs/lodash/blob/master/LICENSE.txt
var isFunction = function(value) {
  return typeof value === 'function';
};
// fallback for older versions of Chrome and Safari
/* istanbul ignore next */
if (isFunction(/x/)) {
  isFunction = function(value) {
    return typeof value === 'function' && toString.call(value) === '[object Function]';
  };
}
var isFunction;
exports.isFunction = isFunction;
/* istanbul ignore next */
var isArray = Array.isArray || function(value) {
  return (value && typeof value === 'object') ? toString.call(value) === '[object Array]' : false;
};
exports.isArray = isArray;
// Older IE versions do not directly support indexOf so we must implement our own, sadly.
function indexOf(array, value) {
  for (var i = 0, len = array.length; i < len; i++) {
    if (array[i] === value) {
      return i;
    }
  }
  return -1;
}

exports.indexOf = indexOf;
function escapeExpression(string) {
  // don't escape SafeStrings, since they're already safe
  if (string && string.toHTML) {
    return string.toHTML();
  } else if (string == null) {
    return "";
  } else if (!string) {
    return string + '';
  }

  // Force a string conversion as this will be done by the append regardless and
  // the regex test will do this transparently behind the scenes, causing issues if
  // an object's to string has escaped characters in it.
  string = "" + string;

  if(!possible.test(string)) { return string; }
  return string.replace(badChars, escapeChar);
}

exports.escapeExpression = escapeExpression;function isEmpty(value) {
  if (!value && value !== 0) {
    return true;
  } else if (isArray(value) && value.length === 0) {
    return true;
  } else {
    return false;
  }
}

exports.isEmpty = isEmpty;function blockParams(params, ids) {
  params.path = ids;
  return params;
}

exports.blockParams = blockParams;function appendContextPath(contextPath, id) {
  return (contextPath ? contextPath + '.' : '') + id;
}

exports.appendContextPath = appendContextPath;
},{}],46:[function(require,module,exports){
// Create a simple path alias to allow browserify to resolve
// the runtime on a supported path.
module.exports = require('./dist/cjs/handlebars.runtime').default;

},{"./dist/cjs/handlebars.runtime":40}],47:[function(require,module,exports){
module.exports = require("handlebars/runtime")["default"];

},{"handlebars/runtime":46}],48:[function(require,module,exports){
(function (global){(function (){
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define('underscore', factory) :
  (global = global || self, (function () {
    var current = global._;
    var exports = global._ = factory();
    exports.noConflict = function () { global._ = current; return exports; };
  }()));
}(this, (function () {
  //     Underscore.js 1.12.0
  //     https://underscorejs.org
  //     (c) 2009-2020 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
  //     Underscore may be freely distributed under the MIT license.

  // Current version.
  var VERSION = '1.12.0';

  // Establish the root object, `window` (`self`) in the browser, `global`
  // on the server, or `this` in some virtual machines. We use `self`
  // instead of `window` for `WebWorker` support.
  var root = typeof self == 'object' && self.self === self && self ||
            typeof global == 'object' && global.global === global && global ||
            Function('return this')() ||
            {};

  // Save bytes in the minified (but not gzipped) version:
  var ArrayProto = Array.prototype, ObjProto = Object.prototype;
  var SymbolProto = typeof Symbol !== 'undefined' ? Symbol.prototype : null;

  // Create quick reference variables for speed access to core prototypes.
  var push = ArrayProto.push,
      slice = ArrayProto.slice,
      toString = ObjProto.toString,
      hasOwnProperty = ObjProto.hasOwnProperty;

  // Modern feature detection.
  var supportsArrayBuffer = typeof ArrayBuffer !== 'undefined',
      supportsDataView = typeof DataView !== 'undefined';

  // All **ECMAScript 5+** native function implementations that we hope to use
  // are declared here.
  var nativeIsArray = Array.isArray,
      nativeKeys = Object.keys,
      nativeCreate = Object.create,
      nativeIsView = supportsArrayBuffer && ArrayBuffer.isView;

  // Create references to these builtin functions because we override them.
  var _isNaN = isNaN,
      _isFinite = isFinite;

  // Keys in IE < 9 that won't be iterated by `for key in ...` and thus missed.
  var hasEnumBug = !{toString: null}.propertyIsEnumerable('toString');
  var nonEnumerableProps = ['valueOf', 'isPrototypeOf', 'toString',
    'propertyIsEnumerable', 'hasOwnProperty', 'toLocaleString'];

  // The largest integer that can be represented exactly.
  var MAX_ARRAY_INDEX = Math.pow(2, 53) - 1;

  // Some functions take a variable number of arguments, or a few expected
  // arguments at the beginning and then a variable number of values to operate
  // on. This helper accumulates all remaining arguments past the function’s
  // argument length (or an explicit `startIndex`), into an array that becomes
  // the last argument. Similar to ES6’s "rest parameter".
  function restArguments(func, startIndex) {
    startIndex = startIndex == null ? func.length - 1 : +startIndex;
    return function() {
      var length = Math.max(arguments.length - startIndex, 0),
          rest = Array(length),
          index = 0;
      for (; index < length; index++) {
        rest[index] = arguments[index + startIndex];
      }
      switch (startIndex) {
        case 0: return func.call(this, rest);
        case 1: return func.call(this, arguments[0], rest);
        case 2: return func.call(this, arguments[0], arguments[1], rest);
      }
      var args = Array(startIndex + 1);
      for (index = 0; index < startIndex; index++) {
        args[index] = arguments[index];
      }
      args[startIndex] = rest;
      return func.apply(this, args);
    };
  }

  // Is a given variable an object?
  function isObject(obj) {
    var type = typeof obj;
    return type === 'function' || type === 'object' && !!obj;
  }

  // Is a given value equal to null?
  function isNull(obj) {
    return obj === null;
  }

  // Is a given variable undefined?
  function isUndefined(obj) {
    return obj === void 0;
  }

  // Is a given value a boolean?
  function isBoolean(obj) {
    return obj === true || obj === false || toString.call(obj) === '[object Boolean]';
  }

  // Is a given value a DOM element?
  function isElement(obj) {
    return !!(obj && obj.nodeType === 1);
  }

  // Internal function for creating a `toString`-based type tester.
  function tagTester(name) {
    var tag = '[object ' + name + ']';
    return function(obj) {
      return toString.call(obj) === tag;
    };
  }

  var isString = tagTester('String');

  var isNumber = tagTester('Number');

  var isDate = tagTester('Date');

  var isRegExp = tagTester('RegExp');

  var isError = tagTester('Error');

  var isSymbol = tagTester('Symbol');

  var isArrayBuffer = tagTester('ArrayBuffer');

  var isFunction = tagTester('Function');

  // Optimize `isFunction` if appropriate. Work around some `typeof` bugs in old
  // v8, IE 11 (#1621), Safari 8 (#1929), and PhantomJS (#2236).
  var nodelist = root.document && root.document.childNodes;
  if (typeof /./ != 'function' && typeof Int8Array != 'object' && typeof nodelist != 'function') {
    isFunction = function(obj) {
      return typeof obj == 'function' || false;
    };
  }

  var isFunction$1 = isFunction;

  var hasObjectTag = tagTester('Object');

  // In IE 10 - Edge 13, `DataView` has string tag `'[object Object]'`.
  // In IE 11, the most common among them, this problem also applies to
  // `Map`, `WeakMap` and `Set`.
  var hasStringTagBug = (
        supportsDataView && hasObjectTag(new DataView(new ArrayBuffer(8)))
      ),
      isIE11 = (typeof Map !== 'undefined' && hasObjectTag(new Map));

  var isDataView = tagTester('DataView');

  // In IE 10 - Edge 13, we need a different heuristic
  // to determine whether an object is a `DataView`.
  function ie10IsDataView(obj) {
    return obj != null && isFunction$1(obj.getInt8) && isArrayBuffer(obj.buffer);
  }

  var isDataView$1 = (hasStringTagBug ? ie10IsDataView : isDataView);

  // Is a given value an array?
  // Delegates to ECMA5's native `Array.isArray`.
  var isArray = nativeIsArray || tagTester('Array');

  // Internal function to check whether `key` is an own property name of `obj`.
  function has(obj, key) {
    return obj != null && hasOwnProperty.call(obj, key);
  }

  var isArguments = tagTester('Arguments');

  // Define a fallback version of the method in browsers (ahem, IE < 9), where
  // there isn't any inspectable "Arguments" type.
  (function() {
    if (!isArguments(arguments)) {
      isArguments = function(obj) {
        return has(obj, 'callee');
      };
    }
  }());

  var isArguments$1 = isArguments;

  // Is a given object a finite number?
  function isFinite$1(obj) {
    return !isSymbol(obj) && _isFinite(obj) && !isNaN(parseFloat(obj));
  }

  // Is the given value `NaN`?
  function isNaN$1(obj) {
    return isNumber(obj) && _isNaN(obj);
  }

  // Predicate-generating function. Often useful outside of Underscore.
  function constant(value) {
    return function() {
      return value;
    };
  }

  // Common internal logic for `isArrayLike` and `isBufferLike`.
  function createSizePropertyCheck(getSizeProperty) {
    return function(collection) {
      var sizeProperty = getSizeProperty(collection);
      return typeof sizeProperty == 'number' && sizeProperty >= 0 && sizeProperty <= MAX_ARRAY_INDEX;
    }
  }

  // Internal helper to generate a function to obtain property `key` from `obj`.
  function shallowProperty(key) {
    return function(obj) {
      return obj == null ? void 0 : obj[key];
    };
  }

  // Internal helper to obtain the `byteLength` property of an object.
  var getByteLength = shallowProperty('byteLength');

  // Internal helper to determine whether we should spend extensive checks against
  // `ArrayBuffer` et al.
  var isBufferLike = createSizePropertyCheck(getByteLength);

  // Is a given value a typed array?
  var typedArrayPattern = /\[object ((I|Ui)nt(8|16|32)|Float(32|64)|Uint8Clamped|Big(I|Ui)nt64)Array\]/;
  function isTypedArray(obj) {
    // `ArrayBuffer.isView` is the most future-proof, so use it when available.
    // Otherwise, fall back on the above regular expression.
    return nativeIsView ? (nativeIsView(obj) && !isDataView$1(obj)) :
                  isBufferLike(obj) && typedArrayPattern.test(toString.call(obj));
  }

  var isTypedArray$1 = supportsArrayBuffer ? isTypedArray : constant(false);

  // Internal helper to obtain the `length` property of an object.
  var getLength = shallowProperty('length');

  // Internal helper to create a simple lookup structure.
  // `collectNonEnumProps` used to depend on `_.contains`, but this led to
  // circular imports. `emulatedSet` is a one-off solution that only works for
  // arrays of strings.
  function emulatedSet(keys) {
    var hash = {};
    for (var l = keys.length, i = 0; i < l; ++i) hash[keys[i]] = true;
    return {
      contains: function(key) { return hash[key]; },
      push: function(key) {
        hash[key] = true;
        return keys.push(key);
      }
    };
  }

  // Internal helper. Checks `keys` for the presence of keys in IE < 9 that won't
  // be iterated by `for key in ...` and thus missed. Extends `keys` in place if
  // needed.
  function collectNonEnumProps(obj, keys) {
    keys = emulatedSet(keys);
    var nonEnumIdx = nonEnumerableProps.length;
    var constructor = obj.constructor;
    var proto = isFunction$1(constructor) && constructor.prototype || ObjProto;

    // Constructor is a special case.
    var prop = 'constructor';
    if (has(obj, prop) && !keys.contains(prop)) keys.push(prop);

    while (nonEnumIdx--) {
      prop = nonEnumerableProps[nonEnumIdx];
      if (prop in obj && obj[prop] !== proto[prop] && !keys.contains(prop)) {
        keys.push(prop);
      }
    }
  }

  // Retrieve the names of an object's own properties.
  // Delegates to **ECMAScript 5**'s native `Object.keys`.
  function keys(obj) {
    if (!isObject(obj)) return [];
    if (nativeKeys) return nativeKeys(obj);
    var keys = [];
    for (var key in obj) if (has(obj, key)) keys.push(key);
    // Ahem, IE < 9.
    if (hasEnumBug) collectNonEnumProps(obj, keys);
    return keys;
  }

  // Is a given array, string, or object empty?
  // An "empty" object has no enumerable own-properties.
  function isEmpty(obj) {
    if (obj == null) return true;
    // Skip the more expensive `toString`-based type checks if `obj` has no
    // `.length`.
    var length = getLength(obj);
    if (typeof length == 'number' && (
      isArray(obj) || isString(obj) || isArguments$1(obj)
    )) return length === 0;
    return getLength(keys(obj)) === 0;
  }

  // Returns whether an object has a given set of `key:value` pairs.
  function isMatch(object, attrs) {
    var _keys = keys(attrs), length = _keys.length;
    if (object == null) return !length;
    var obj = Object(object);
    for (var i = 0; i < length; i++) {
      var key = _keys[i];
      if (attrs[key] !== obj[key] || !(key in obj)) return false;
    }
    return true;
  }

  // If Underscore is called as a function, it returns a wrapped object that can
  // be used OO-style. This wrapper holds altered versions of all functions added
  // through `_.mixin`. Wrapped objects may be chained.
  function _(obj) {
    if (obj instanceof _) return obj;
    if (!(this instanceof _)) return new _(obj);
    this._wrapped = obj;
  }

  _.VERSION = VERSION;

  // Extracts the result from a wrapped and chained object.
  _.prototype.value = function() {
    return this._wrapped;
  };

  // Provide unwrapping proxies for some methods used in engine operations
  // such as arithmetic and JSON stringification.
  _.prototype.valueOf = _.prototype.toJSON = _.prototype.value;

  _.prototype.toString = function() {
    return String(this._wrapped);
  };

  // Internal function to wrap or shallow-copy an ArrayBuffer,
  // typed array or DataView to a new view, reusing the buffer.
  function toBufferView(bufferSource) {
    return new Uint8Array(
      bufferSource.buffer || bufferSource,
      bufferSource.byteOffset || 0,
      getByteLength(bufferSource)
    );
  }

  // We use this string twice, so give it a name for minification.
  var tagDataView = '[object DataView]';

  // Internal recursive comparison function for `_.isEqual`.
  function eq(a, b, aStack, bStack) {
    // Identical objects are equal. `0 === -0`, but they aren't identical.
    // See the [Harmony `egal` proposal](https://wiki.ecmascript.org/doku.php?id=harmony:egal).
    if (a === b) return a !== 0 || 1 / a === 1 / b;
    // `null` or `undefined` only equal to itself (strict comparison).
    if (a == null || b == null) return false;
    // `NaN`s are equivalent, but non-reflexive.
    if (a !== a) return b !== b;
    // Exhaust primitive checks
    var type = typeof a;
    if (type !== 'function' && type !== 'object' && typeof b != 'object') return false;
    return deepEq(a, b, aStack, bStack);
  }

  // Internal recursive comparison function for `_.isEqual`.
  function deepEq(a, b, aStack, bStack) {
    // Unwrap any wrapped objects.
    if (a instanceof _) a = a._wrapped;
    if (b instanceof _) b = b._wrapped;
    // Compare `[[Class]]` names.
    var className = toString.call(a);
    if (className !== toString.call(b)) return false;
    // Work around a bug in IE 10 - Edge 13.
    if (hasStringTagBug && className == '[object Object]' && isDataView$1(a)) {
      if (!isDataView$1(b)) return false;
      className = tagDataView;
    }
    switch (className) {
      // These types are compared by value.
      case '[object RegExp]':
        // RegExps are coerced to strings for comparison (Note: '' + /a/i === '/a/i')
      case '[object String]':
        // Primitives and their corresponding object wrappers are equivalent; thus, `"5"` is
        // equivalent to `new String("5")`.
        return '' + a === '' + b;
      case '[object Number]':
        // `NaN`s are equivalent, but non-reflexive.
        // Object(NaN) is equivalent to NaN.
        if (+a !== +a) return +b !== +b;
        // An `egal` comparison is performed for other numeric values.
        return +a === 0 ? 1 / +a === 1 / b : +a === +b;
      case '[object Date]':
      case '[object Boolean]':
        // Coerce dates and booleans to numeric primitive values. Dates are compared by their
        // millisecond representations. Note that invalid dates with millisecond representations
        // of `NaN` are not equivalent.
        return +a === +b;
      case '[object Symbol]':
        return SymbolProto.valueOf.call(a) === SymbolProto.valueOf.call(b);
      case '[object ArrayBuffer]':
      case tagDataView:
        // Coerce to typed array so we can fall through.
        return deepEq(toBufferView(a), toBufferView(b), aStack, bStack);
    }

    var areArrays = className === '[object Array]';
    if (!areArrays && isTypedArray$1(a)) {
        var byteLength = getByteLength(a);
        if (byteLength !== getByteLength(b)) return false;
        if (a.buffer === b.buffer && a.byteOffset === b.byteOffset) return true;
        areArrays = true;
    }
    if (!areArrays) {
      if (typeof a != 'object' || typeof b != 'object') return false;

      // Objects with different constructors are not equivalent, but `Object`s or `Array`s
      // from different frames are.
      var aCtor = a.constructor, bCtor = b.constructor;
      if (aCtor !== bCtor && !(isFunction$1(aCtor) && aCtor instanceof aCtor &&
                               isFunction$1(bCtor) && bCtor instanceof bCtor)
                          && ('constructor' in a && 'constructor' in b)) {
        return false;
      }
    }
    // Assume equality for cyclic structures. The algorithm for detecting cyclic
    // structures is adapted from ES 5.1 section 15.12.3, abstract operation `JO`.

    // Initializing stack of traversed objects.
    // It's done here since we only need them for objects and arrays comparison.
    aStack = aStack || [];
    bStack = bStack || [];
    var length = aStack.length;
    while (length--) {
      // Linear search. Performance is inversely proportional to the number of
      // unique nested structures.
      if (aStack[length] === a) return bStack[length] === b;
    }

    // Add the first object to the stack of traversed objects.
    aStack.push(a);
    bStack.push(b);

    // Recursively compare objects and arrays.
    if (areArrays) {
      // Compare array lengths to determine if a deep comparison is necessary.
      length = a.length;
      if (length !== b.length) return false;
      // Deep compare the contents, ignoring non-numeric properties.
      while (length--) {
        if (!eq(a[length], b[length], aStack, bStack)) return false;
      }
    } else {
      // Deep compare objects.
      var _keys = keys(a), key;
      length = _keys.length;
      // Ensure that both objects contain the same number of properties before comparing deep equality.
      if (keys(b).length !== length) return false;
      while (length--) {
        // Deep compare each member
        key = _keys[length];
        if (!(has(b, key) && eq(a[key], b[key], aStack, bStack))) return false;
      }
    }
    // Remove the first object from the stack of traversed objects.
    aStack.pop();
    bStack.pop();
    return true;
  }

  // Perform a deep comparison to check if two objects are equal.
  function isEqual(a, b) {
    return eq(a, b);
  }

  // Retrieve all the enumerable property names of an object.
  function allKeys(obj) {
    if (!isObject(obj)) return [];
    var keys = [];
    for (var key in obj) keys.push(key);
    // Ahem, IE < 9.
    if (hasEnumBug) collectNonEnumProps(obj, keys);
    return keys;
  }

  // Since the regular `Object.prototype.toString` type tests don't work for
  // some types in IE 11, we use a fingerprinting heuristic instead, based
  // on the methods. It's not great, but it's the best we got.
  // The fingerprint method lists are defined below.
  function ie11fingerprint(methods) {
    var length = getLength(methods);
    return function(obj) {
      if (obj == null) return false;
      // `Map`, `WeakMap` and `Set` have no enumerable keys.
      var keys = allKeys(obj);
      if (getLength(keys)) return false;
      for (var i = 0; i < length; i++) {
        if (!isFunction$1(obj[methods[i]])) return false;
      }
      // If we are testing against `WeakMap`, we need to ensure that
      // `obj` doesn't have a `forEach` method in order to distinguish
      // it from a regular `Map`.
      return methods !== weakMapMethods || !isFunction$1(obj[forEachName]);
    };
  }

  // In the interest of compact minification, we write
  // each string in the fingerprints only once.
  var forEachName = 'forEach',
      hasName = 'has',
      commonInit = ['clear', 'delete'],
      mapTail = ['get', hasName, 'set'];

  // `Map`, `WeakMap` and `Set` each have slightly different
  // combinations of the above sublists.
  var mapMethods = commonInit.concat(forEachName, mapTail),
      weakMapMethods = commonInit.concat(mapTail),
      setMethods = ['add'].concat(commonInit, forEachName, hasName);

  var isMap = isIE11 ? ie11fingerprint(mapMethods) : tagTester('Map');

  var isWeakMap = isIE11 ? ie11fingerprint(weakMapMethods) : tagTester('WeakMap');

  var isSet = isIE11 ? ie11fingerprint(setMethods) : tagTester('Set');

  var isWeakSet = tagTester('WeakSet');

  // Retrieve the values of an object's properties.
  function values(obj) {
    var _keys = keys(obj);
    var length = _keys.length;
    var values = Array(length);
    for (var i = 0; i < length; i++) {
      values[i] = obj[_keys[i]];
    }
    return values;
  }

  // Convert an object into a list of `[key, value]` pairs.
  // The opposite of `_.object` with one argument.
  function pairs(obj) {
    var _keys = keys(obj);
    var length = _keys.length;
    var pairs = Array(length);
    for (var i = 0; i < length; i++) {
      pairs[i] = [_keys[i], obj[_keys[i]]];
    }
    return pairs;
  }

  // Invert the keys and values of an object. The values must be serializable.
  function invert(obj) {
    var result = {};
    var _keys = keys(obj);
    for (var i = 0, length = _keys.length; i < length; i++) {
      result[obj[_keys[i]]] = _keys[i];
    }
    return result;
  }

  // Return a sorted list of the function names available on the object.
  function functions(obj) {
    var names = [];
    for (var key in obj) {
      if (isFunction$1(obj[key])) names.push(key);
    }
    return names.sort();
  }

  // An internal function for creating assigner functions.
  function createAssigner(keysFunc, defaults) {
    return function(obj) {
      var length = arguments.length;
      if (defaults) obj = Object(obj);
      if (length < 2 || obj == null) return obj;
      for (var index = 1; index < length; index++) {
        var source = arguments[index],
            keys = keysFunc(source),
            l = keys.length;
        for (var i = 0; i < l; i++) {
          var key = keys[i];
          if (!defaults || obj[key] === void 0) obj[key] = source[key];
        }
      }
      return obj;
    };
  }

  // Extend a given object with all the properties in passed-in object(s).
  var extend = createAssigner(allKeys);

  // Assigns a given object with all the own properties in the passed-in
  // object(s).
  // (https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)
  var extendOwn = createAssigner(keys);

  // Fill in a given object with default properties.
  var defaults = createAssigner(allKeys, true);

  // Create a naked function reference for surrogate-prototype-swapping.
  function ctor() {
    return function(){};
  }

  // An internal function for creating a new object that inherits from another.
  function baseCreate(prototype) {
    if (!isObject(prototype)) return {};
    if (nativeCreate) return nativeCreate(prototype);
    var Ctor = ctor();
    Ctor.prototype = prototype;
    var result = new Ctor;
    Ctor.prototype = null;
    return result;
  }

  // Creates an object that inherits from the given prototype object.
  // If additional properties are provided then they will be added to the
  // created object.
  function create(prototype, props) {
    var result = baseCreate(prototype);
    if (props) extendOwn(result, props);
    return result;
  }

  // Create a (shallow-cloned) duplicate of an object.
  function clone(obj) {
    if (!isObject(obj)) return obj;
    return isArray(obj) ? obj.slice() : extend({}, obj);
  }

  // Invokes `interceptor` with the `obj` and then returns `obj`.
  // The primary purpose of this method is to "tap into" a method chain, in
  // order to perform operations on intermediate results within the chain.
  function tap(obj, interceptor) {
    interceptor(obj);
    return obj;
  }

  // Normalize a (deep) property `path` to array.
  // Like `_.iteratee`, this function can be customized.
  function toPath(path) {
    return isArray(path) ? path : [path];
  }
  _.toPath = toPath;

  // Internal wrapper for `_.toPath` to enable minification.
  // Similar to `cb` for `_.iteratee`.
  function toPath$1(path) {
    return _.toPath(path);
  }

  // Internal function to obtain a nested property in `obj` along `path`.
  function deepGet(obj, path) {
    var length = path.length;
    for (var i = 0; i < length; i++) {
      if (obj == null) return void 0;
      obj = obj[path[i]];
    }
    return length ? obj : void 0;
  }

  // Get the value of the (deep) property on `path` from `object`.
  // If any property in `path` does not exist or if the value is
  // `undefined`, return `defaultValue` instead.
  // The `path` is normalized through `_.toPath`.
  function get(object, path, defaultValue) {
    var value = deepGet(object, toPath$1(path));
    return isUndefined(value) ? defaultValue : value;
  }

  // Shortcut function for checking if an object has a given property directly on
  // itself (in other words, not on a prototype). Unlike the internal `has`
  // function, this public version can also traverse nested properties.
  function has$1(obj, path) {
    path = toPath$1(path);
    var length = path.length;
    for (var i = 0; i < length; i++) {
      var key = path[i];
      if (!has(obj, key)) return false;
      obj = obj[key];
    }
    return !!length;
  }

  // Keep the identity function around for default iteratees.
  function identity(value) {
    return value;
  }

  // Returns a predicate for checking whether an object has a given set of
  // `key:value` pairs.
  function matcher(attrs) {
    attrs = extendOwn({}, attrs);
    return function(obj) {
      return isMatch(obj, attrs);
    };
  }

  // Creates a function that, when passed an object, will traverse that object’s
  // properties down the given `path`, specified as an array of keys or indices.
  function property(path) {
    path = toPath$1(path);
    return function(obj) {
      return deepGet(obj, path);
    };
  }

  // Internal function that returns an efficient (for current engines) version
  // of the passed-in callback, to be repeatedly applied in other Underscore
  // functions.
  function optimizeCb(func, context, argCount) {
    if (context === void 0) return func;
    switch (argCount == null ? 3 : argCount) {
      case 1: return function(value) {
        return func.call(context, value);
      };
      // The 2-argument case is omitted because we’re not using it.
      case 3: return function(value, index, collection) {
        return func.call(context, value, index, collection);
      };
      case 4: return function(accumulator, value, index, collection) {
        return func.call(context, accumulator, value, index, collection);
      };
    }
    return function() {
      return func.apply(context, arguments);
    };
  }

  // An internal function to generate callbacks that can be applied to each
  // element in a collection, returning the desired result — either `_.identity`,
  // an arbitrary callback, a property matcher, or a property accessor.
  function baseIteratee(value, context, argCount) {
    if (value == null) return identity;
    if (isFunction$1(value)) return optimizeCb(value, context, argCount);
    if (isObject(value) && !isArray(value)) return matcher(value);
    return property(value);
  }

  // External wrapper for our callback generator. Users may customize
  // `_.iteratee` if they want additional predicate/iteratee shorthand styles.
  // This abstraction hides the internal-only `argCount` argument.
  function iteratee(value, context) {
    return baseIteratee(value, context, Infinity);
  }
  _.iteratee = iteratee;

  // The function we call internally to generate a callback. It invokes
  // `_.iteratee` if overridden, otherwise `baseIteratee`.
  function cb(value, context, argCount) {
    if (_.iteratee !== iteratee) return _.iteratee(value, context);
    return baseIteratee(value, context, argCount);
  }

  // Returns the results of applying the `iteratee` to each element of `obj`.
  // In contrast to `_.map` it returns an object.
  function mapObject(obj, iteratee, context) {
    iteratee = cb(iteratee, context);
    var _keys = keys(obj),
        length = _keys.length,
        results = {};
    for (var index = 0; index < length; index++) {
      var currentKey = _keys[index];
      results[currentKey] = iteratee(obj[currentKey], currentKey, obj);
    }
    return results;
  }

  // Predicate-generating function. Often useful outside of Underscore.
  function noop(){}

  // Generates a function for a given object that returns a given property.
  function propertyOf(obj) {
    if (obj == null) return noop;
    return function(path) {
      return get(obj, path);
    };
  }

  // Run a function **n** times.
  function times(n, iteratee, context) {
    var accum = Array(Math.max(0, n));
    iteratee = optimizeCb(iteratee, context, 1);
    for (var i = 0; i < n; i++) accum[i] = iteratee(i);
    return accum;
  }

  // Return a random integer between `min` and `max` (inclusive).
  function random(min, max) {
    if (max == null) {
      max = min;
      min = 0;
    }
    return min + Math.floor(Math.random() * (max - min + 1));
  }

  // A (possibly faster) way to get the current timestamp as an integer.
  var now = Date.now || function() {
    return new Date().getTime();
  };

  // Internal helper to generate functions for escaping and unescaping strings
  // to/from HTML interpolation.
  function createEscaper(map) {
    var escaper = function(match) {
      return map[match];
    };
    // Regexes for identifying a key that needs to be escaped.
    var source = '(?:' + keys(map).join('|') + ')';
    var testRegexp = RegExp(source);
    var replaceRegexp = RegExp(source, 'g');
    return function(string) {
      string = string == null ? '' : '' + string;
      return testRegexp.test(string) ? string.replace(replaceRegexp, escaper) : string;
    };
  }

  // Internal list of HTML entities for escaping.
  var escapeMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '`': '&#x60;'
  };

  // Function for escaping strings to HTML interpolation.
  var _escape = createEscaper(escapeMap);

  // Internal list of HTML entities for unescaping.
  var unescapeMap = invert(escapeMap);

  // Function for unescaping strings from HTML interpolation.
  var _unescape = createEscaper(unescapeMap);

  // By default, Underscore uses ERB-style template delimiters. Change the
  // following template settings to use alternative delimiters.
  var templateSettings = _.templateSettings = {
    evaluate: /<%([\s\S]+?)%>/g,
    interpolate: /<%=([\s\S]+?)%>/g,
    escape: /<%-([\s\S]+?)%>/g
  };

  // When customizing `_.templateSettings`, if you don't want to define an
  // interpolation, evaluation or escaping regex, we need one that is
  // guaranteed not to match.
  var noMatch = /(.)^/;

  // Certain characters need to be escaped so that they can be put into a
  // string literal.
  var escapes = {
    "'": "'",
    '\\': '\\',
    '\r': 'r',
    '\n': 'n',
    '\u2028': 'u2028',
    '\u2029': 'u2029'
  };

  var escapeRegExp = /\\|'|\r|\n|\u2028|\u2029/g;

  function escapeChar(match) {
    return '\\' + escapes[match];
  }

  // JavaScript micro-templating, similar to John Resig's implementation.
  // Underscore templating handles arbitrary delimiters, preserves whitespace,
  // and correctly escapes quotes within interpolated code.
  // NB: `oldSettings` only exists for backwards compatibility.
  function template(text, settings, oldSettings) {
    if (!settings && oldSettings) settings = oldSettings;
    settings = defaults({}, settings, _.templateSettings);

    // Combine delimiters into one regular expression via alternation.
    var matcher = RegExp([
      (settings.escape || noMatch).source,
      (settings.interpolate || noMatch).source,
      (settings.evaluate || noMatch).source
    ].join('|') + '|$', 'g');

    // Compile the template source, escaping string literals appropriately.
    var index = 0;
    var source = "__p+='";
    text.replace(matcher, function(match, escape, interpolate, evaluate, offset) {
      source += text.slice(index, offset).replace(escapeRegExp, escapeChar);
      index = offset + match.length;

      if (escape) {
        source += "'+\n((__t=(" + escape + "))==null?'':_.escape(__t))+\n'";
      } else if (interpolate) {
        source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'";
      } else if (evaluate) {
        source += "';\n" + evaluate + "\n__p+='";
      }

      // Adobe VMs need the match returned to produce the correct offset.
      return match;
    });
    source += "';\n";

    // If a variable is not specified, place data values in local scope.
    if (!settings.variable) source = 'with(obj||{}){\n' + source + '}\n';

    source = "var __t,__p='',__j=Array.prototype.join," +
      "print=function(){__p+=__j.call(arguments,'');};\n" +
      source + 'return __p;\n';

    var render;
    try {
      render = new Function(settings.variable || 'obj', '_', source);
    } catch (e) {
      e.source = source;
      throw e;
    }

    var template = function(data) {
      return render.call(this, data, _);
    };

    // Provide the compiled source as a convenience for precompilation.
    var argument = settings.variable || 'obj';
    template.source = 'function(' + argument + '){\n' + source + '}';

    return template;
  }

  // Traverses the children of `obj` along `path`. If a child is a function, it
  // is invoked with its parent as context. Returns the value of the final
  // child, or `fallback` if any child is undefined.
  function result(obj, path, fallback) {
    path = toPath$1(path);
    var length = path.length;
    if (!length) {
      return isFunction$1(fallback) ? fallback.call(obj) : fallback;
    }
    for (var i = 0; i < length; i++) {
      var prop = obj == null ? void 0 : obj[path[i]];
      if (prop === void 0) {
        prop = fallback;
        i = length; // Ensure we don't continue iterating.
      }
      obj = isFunction$1(prop) ? prop.call(obj) : prop;
    }
    return obj;
  }

  // Generate a unique integer id (unique within the entire client session).
  // Useful for temporary DOM ids.
  var idCounter = 0;
  function uniqueId(prefix) {
    var id = ++idCounter + '';
    return prefix ? prefix + id : id;
  }

  // Start chaining a wrapped Underscore object.
  function chain(obj) {
    var instance = _(obj);
    instance._chain = true;
    return instance;
  }

  // Internal function to execute `sourceFunc` bound to `context` with optional
  // `args`. Determines whether to execute a function as a constructor or as a
  // normal function.
  function executeBound(sourceFunc, boundFunc, context, callingContext, args) {
    if (!(callingContext instanceof boundFunc)) return sourceFunc.apply(context, args);
    var self = baseCreate(sourceFunc.prototype);
    var result = sourceFunc.apply(self, args);
    if (isObject(result)) return result;
    return self;
  }

  // Partially apply a function by creating a version that has had some of its
  // arguments pre-filled, without changing its dynamic `this` context. `_` acts
  // as a placeholder by default, allowing any combination of arguments to be
  // pre-filled. Set `_.partial.placeholder` for a custom placeholder argument.
  var partial = restArguments(function(func, boundArgs) {
    var placeholder = partial.placeholder;
    var bound = function() {
      var position = 0, length = boundArgs.length;
      var args = Array(length);
      for (var i = 0; i < length; i++) {
        args[i] = boundArgs[i] === placeholder ? arguments[position++] : boundArgs[i];
      }
      while (position < arguments.length) args.push(arguments[position++]);
      return executeBound(func, bound, this, this, args);
    };
    return bound;
  });

  partial.placeholder = _;

  // Create a function bound to a given object (assigning `this`, and arguments,
  // optionally).
  var bind = restArguments(function(func, context, args) {
    if (!isFunction$1(func)) throw new TypeError('Bind must be called on a function');
    var bound = restArguments(function(callArgs) {
      return executeBound(func, bound, context, this, args.concat(callArgs));
    });
    return bound;
  });

  // Internal helper for collection methods to determine whether a collection
  // should be iterated as an array or as an object.
  // Related: https://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength
  // Avoids a very nasty iOS 8 JIT bug on ARM-64. #2094
  var isArrayLike = createSizePropertyCheck(getLength);

  // Internal implementation of a recursive `flatten` function.
  function flatten(input, depth, strict, output) {
    output = output || [];
    if (!depth && depth !== 0) {
      depth = Infinity;
    } else if (depth <= 0) {
      return output.concat(input);
    }
    var idx = output.length;
    for (var i = 0, length = getLength(input); i < length; i++) {
      var value = input[i];
      if (isArrayLike(value) && (isArray(value) || isArguments$1(value))) {
        // Flatten current level of array or arguments object.
        if (depth > 1) {
          flatten(value, depth - 1, strict, output);
          idx = output.length;
        } else {
          var j = 0, len = value.length;
          while (j < len) output[idx++] = value[j++];
        }
      } else if (!strict) {
        output[idx++] = value;
      }
    }
    return output;
  }

  // Bind a number of an object's methods to that object. Remaining arguments
  // are the method names to be bound. Useful for ensuring that all callbacks
  // defined on an object belong to it.
  var bindAll = restArguments(function(obj, keys) {
    keys = flatten(keys, false, false);
    var index = keys.length;
    if (index < 1) throw new Error('bindAll must be passed function names');
    while (index--) {
      var key = keys[index];
      obj[key] = bind(obj[key], obj);
    }
    return obj;
  });

  // Memoize an expensive function by storing its results.
  function memoize(func, hasher) {
    var memoize = function(key) {
      var cache = memoize.cache;
      var address = '' + (hasher ? hasher.apply(this, arguments) : key);
      if (!has(cache, address)) cache[address] = func.apply(this, arguments);
      return cache[address];
    };
    memoize.cache = {};
    return memoize;
  }

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  var delay = restArguments(function(func, wait, args) {
    return setTimeout(function() {
      return func.apply(null, args);
    }, wait);
  });

  // Defers a function, scheduling it to run after the current call stack has
  // cleared.
  var defer = partial(delay, _, 1);

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time. Normally, the throttled function will run
  // as much as it can, without ever going more than once per `wait` duration;
  // but if you'd like to disable the execution on the leading edge, pass
  // `{leading: false}`. To disable execution on the trailing edge, ditto.
  function throttle(func, wait, options) {
    var timeout, context, args, result;
    var previous = 0;
    if (!options) options = {};

    var later = function() {
      previous = options.leading === false ? 0 : now();
      timeout = null;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    };

    var throttled = function() {
      var _now = now();
      if (!previous && options.leading === false) previous = _now;
      var remaining = wait - (_now - previous);
      context = this;
      args = arguments;
      if (remaining <= 0 || remaining > wait) {
        if (timeout) {
          clearTimeout(timeout);
          timeout = null;
        }
        previous = _now;
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      } else if (!timeout && options.trailing !== false) {
        timeout = setTimeout(later, remaining);
      }
      return result;
    };

    throttled.cancel = function() {
      clearTimeout(timeout);
      previous = 0;
      timeout = context = args = null;
    };

    return throttled;
  }

  // When a sequence of calls of the returned function ends, the argument
  // function is triggered. The end of a sequence is defined by the `wait`
  // parameter. If `immediate` is passed, the argument function will be
  // triggered at the beginning of the sequence instead of at the end.
  function debounce(func, wait, immediate) {
    var timeout, result;

    var later = function(context, args) {
      timeout = null;
      if (args) result = func.apply(context, args);
    };

    var debounced = restArguments(function(args) {
      if (timeout) clearTimeout(timeout);
      if (immediate) {
        var callNow = !timeout;
        timeout = setTimeout(later, wait);
        if (callNow) result = func.apply(this, args);
      } else {
        timeout = delay(later, wait, this, args);
      }

      return result;
    });

    debounced.cancel = function() {
      clearTimeout(timeout);
      timeout = null;
    };

    return debounced;
  }

  // Returns the first function passed as an argument to the second,
  // allowing you to adjust arguments, run code before and after, and
  // conditionally execute the original function.
  function wrap(func, wrapper) {
    return partial(wrapper, func);
  }

  // Returns a negated version of the passed-in predicate.
  function negate(predicate) {
    return function() {
      return !predicate.apply(this, arguments);
    };
  }

  // Returns a function that is the composition of a list of functions, each
  // consuming the return value of the function that follows.
  function compose() {
    var args = arguments;
    var start = args.length - 1;
    return function() {
      var i = start;
      var result = args[start].apply(this, arguments);
      while (i--) result = args[i].call(this, result);
      return result;
    };
  }

  // Returns a function that will only be executed on and after the Nth call.
  function after(times, func) {
    return function() {
      if (--times < 1) {
        return func.apply(this, arguments);
      }
    };
  }

  // Returns a function that will only be executed up to (but not including) the
  // Nth call.
  function before(times, func) {
    var memo;
    return function() {
      if (--times > 0) {
        memo = func.apply(this, arguments);
      }
      if (times <= 1) func = null;
      return memo;
    };
  }

  // Returns a function that will be executed at most one time, no matter how
  // often you call it. Useful for lazy initialization.
  var once = partial(before, 2);

  // Returns the first key on an object that passes a truth test.
  function findKey(obj, predicate, context) {
    predicate = cb(predicate, context);
    var _keys = keys(obj), key;
    for (var i = 0, length = _keys.length; i < length; i++) {
      key = _keys[i];
      if (predicate(obj[key], key, obj)) return key;
    }
  }

  // Internal function to generate `_.findIndex` and `_.findLastIndex`.
  function createPredicateIndexFinder(dir) {
    return function(array, predicate, context) {
      predicate = cb(predicate, context);
      var length = getLength(array);
      var index = dir > 0 ? 0 : length - 1;
      for (; index >= 0 && index < length; index += dir) {
        if (predicate(array[index], index, array)) return index;
      }
      return -1;
    };
  }

  // Returns the first index on an array-like that passes a truth test.
  var findIndex = createPredicateIndexFinder(1);

  // Returns the last index on an array-like that passes a truth test.
  var findLastIndex = createPredicateIndexFinder(-1);

  // Use a comparator function to figure out the smallest index at which
  // an object should be inserted so as to maintain order. Uses binary search.
  function sortedIndex(array, obj, iteratee, context) {
    iteratee = cb(iteratee, context, 1);
    var value = iteratee(obj);
    var low = 0, high = getLength(array);
    while (low < high) {
      var mid = Math.floor((low + high) / 2);
      if (iteratee(array[mid]) < value) low = mid + 1; else high = mid;
    }
    return low;
  }

  // Internal function to generate the `_.indexOf` and `_.lastIndexOf` functions.
  function createIndexFinder(dir, predicateFind, sortedIndex) {
    return function(array, item, idx) {
      var i = 0, length = getLength(array);
      if (typeof idx == 'number') {
        if (dir > 0) {
          i = idx >= 0 ? idx : Math.max(idx + length, i);
        } else {
          length = idx >= 0 ? Math.min(idx + 1, length) : idx + length + 1;
        }
      } else if (sortedIndex && idx && length) {
        idx = sortedIndex(array, item);
        return array[idx] === item ? idx : -1;
      }
      if (item !== item) {
        idx = predicateFind(slice.call(array, i, length), isNaN$1);
        return idx >= 0 ? idx + i : -1;
      }
      for (idx = dir > 0 ? i : length - 1; idx >= 0 && idx < length; idx += dir) {
        if (array[idx] === item) return idx;
      }
      return -1;
    };
  }

  // Return the position of the first occurrence of an item in an array,
  // or -1 if the item is not included in the array.
  // If the array is large and already in sort order, pass `true`
  // for **isSorted** to use binary search.
  var indexOf = createIndexFinder(1, findIndex, sortedIndex);

  // Return the position of the last occurrence of an item in an array,
  // or -1 if the item is not included in the array.
  var lastIndexOf = createIndexFinder(-1, findLastIndex);

  // Return the first value which passes a truth test.
  function find(obj, predicate, context) {
    var keyFinder = isArrayLike(obj) ? findIndex : findKey;
    var key = keyFinder(obj, predicate, context);
    if (key !== void 0 && key !== -1) return obj[key];
  }

  // Convenience version of a common use case of `_.find`: getting the first
  // object containing specific `key:value` pairs.
  function findWhere(obj, attrs) {
    return find(obj, matcher(attrs));
  }

  // The cornerstone for collection functions, an `each`
  // implementation, aka `forEach`.
  // Handles raw objects in addition to array-likes. Treats all
  // sparse array-likes as if they were dense.
  function each(obj, iteratee, context) {
    iteratee = optimizeCb(iteratee, context);
    var i, length;
    if (isArrayLike(obj)) {
      for (i = 0, length = obj.length; i < length; i++) {
        iteratee(obj[i], i, obj);
      }
    } else {
      var _keys = keys(obj);
      for (i = 0, length = _keys.length; i < length; i++) {
        iteratee(obj[_keys[i]], _keys[i], obj);
      }
    }
    return obj;
  }

  // Return the results of applying the iteratee to each element.
  function map(obj, iteratee, context) {
    iteratee = cb(iteratee, context);
    var _keys = !isArrayLike(obj) && keys(obj),
        length = (_keys || obj).length,
        results = Array(length);
    for (var index = 0; index < length; index++) {
      var currentKey = _keys ? _keys[index] : index;
      results[index] = iteratee(obj[currentKey], currentKey, obj);
    }
    return results;
  }

  // Internal helper to create a reducing function, iterating left or right.
  function createReduce(dir) {
    // Wrap code that reassigns argument variables in a separate function than
    // the one that accesses `arguments.length` to avoid a perf hit. (#1991)
    var reducer = function(obj, iteratee, memo, initial) {
      var _keys = !isArrayLike(obj) && keys(obj),
          length = (_keys || obj).length,
          index = dir > 0 ? 0 : length - 1;
      if (!initial) {
        memo = obj[_keys ? _keys[index] : index];
        index += dir;
      }
      for (; index >= 0 && index < length; index += dir) {
        var currentKey = _keys ? _keys[index] : index;
        memo = iteratee(memo, obj[currentKey], currentKey, obj);
      }
      return memo;
    };

    return function(obj, iteratee, memo, context) {
      var initial = arguments.length >= 3;
      return reducer(obj, optimizeCb(iteratee, context, 4), memo, initial);
    };
  }

  // **Reduce** builds up a single result from a list of values, aka `inject`,
  // or `foldl`.
  var reduce = createReduce(1);

  // The right-associative version of reduce, also known as `foldr`.
  var reduceRight = createReduce(-1);

  // Return all the elements that pass a truth test.
  function filter(obj, predicate, context) {
    var results = [];
    predicate = cb(predicate, context);
    each(obj, function(value, index, list) {
      if (predicate(value, index, list)) results.push(value);
    });
    return results;
  }

  // Return all the elements for which a truth test fails.
  function reject(obj, predicate, context) {
    return filter(obj, negate(cb(predicate)), context);
  }

  // Determine whether all of the elements pass a truth test.
  function every(obj, predicate, context) {
    predicate = cb(predicate, context);
    var _keys = !isArrayLike(obj) && keys(obj),
        length = (_keys || obj).length;
    for (var index = 0; index < length; index++) {
      var currentKey = _keys ? _keys[index] : index;
      if (!predicate(obj[currentKey], currentKey, obj)) return false;
    }
    return true;
  }

  // Determine if at least one element in the object passes a truth test.
  function some(obj, predicate, context) {
    predicate = cb(predicate, context);
    var _keys = !isArrayLike(obj) && keys(obj),
        length = (_keys || obj).length;
    for (var index = 0; index < length; index++) {
      var currentKey = _keys ? _keys[index] : index;
      if (predicate(obj[currentKey], currentKey, obj)) return true;
    }
    return false;
  }

  // Determine if the array or object contains a given item (using `===`).
  function contains(obj, item, fromIndex, guard) {
    if (!isArrayLike(obj)) obj = values(obj);
    if (typeof fromIndex != 'number' || guard) fromIndex = 0;
    return indexOf(obj, item, fromIndex) >= 0;
  }

  // Invoke a method (with arguments) on every item in a collection.
  var invoke = restArguments(function(obj, path, args) {
    var contextPath, func;
    if (isFunction$1(path)) {
      func = path;
    } else {
      path = toPath$1(path);
      contextPath = path.slice(0, -1);
      path = path[path.length - 1];
    }
    return map(obj, function(context) {
      var method = func;
      if (!method) {
        if (contextPath && contextPath.length) {
          context = deepGet(context, contextPath);
        }
        if (context == null) return void 0;
        method = context[path];
      }
      return method == null ? method : method.apply(context, args);
    });
  });

  // Convenience version of a common use case of `_.map`: fetching a property.
  function pluck(obj, key) {
    return map(obj, property(key));
  }

  // Convenience version of a common use case of `_.filter`: selecting only
  // objects containing specific `key:value` pairs.
  function where(obj, attrs) {
    return filter(obj, matcher(attrs));
  }

  // Return the maximum element (or element-based computation).
  function max(obj, iteratee, context) {
    var result = -Infinity, lastComputed = -Infinity,
        value, computed;
    if (iteratee == null || typeof iteratee == 'number' && typeof obj[0] != 'object' && obj != null) {
      obj = isArrayLike(obj) ? obj : values(obj);
      for (var i = 0, length = obj.length; i < length; i++) {
        value = obj[i];
        if (value != null && value > result) {
          result = value;
        }
      }
    } else {
      iteratee = cb(iteratee, context);
      each(obj, function(v, index, list) {
        computed = iteratee(v, index, list);
        if (computed > lastComputed || computed === -Infinity && result === -Infinity) {
          result = v;
          lastComputed = computed;
        }
      });
    }
    return result;
  }

  // Return the minimum element (or element-based computation).
  function min(obj, iteratee, context) {
    var result = Infinity, lastComputed = Infinity,
        value, computed;
    if (iteratee == null || typeof iteratee == 'number' && typeof obj[0] != 'object' && obj != null) {
      obj = isArrayLike(obj) ? obj : values(obj);
      for (var i = 0, length = obj.length; i < length; i++) {
        value = obj[i];
        if (value != null && value < result) {
          result = value;
        }
      }
    } else {
      iteratee = cb(iteratee, context);
      each(obj, function(v, index, list) {
        computed = iteratee(v, index, list);
        if (computed < lastComputed || computed === Infinity && result === Infinity) {
          result = v;
          lastComputed = computed;
        }
      });
    }
    return result;
  }

  // Sample **n** random values from a collection using the modern version of the
  // [Fisher-Yates shuffle](https://en.wikipedia.org/wiki/Fisher–Yates_shuffle).
  // If **n** is not specified, returns a single random element.
  // The internal `guard` argument allows it to work with `_.map`.
  function sample(obj, n, guard) {
    if (n == null || guard) {
      if (!isArrayLike(obj)) obj = values(obj);
      return obj[random(obj.length - 1)];
    }
    var sample = isArrayLike(obj) ? clone(obj) : values(obj);
    var length = getLength(sample);
    n = Math.max(Math.min(n, length), 0);
    var last = length - 1;
    for (var index = 0; index < n; index++) {
      var rand = random(index, last);
      var temp = sample[index];
      sample[index] = sample[rand];
      sample[rand] = temp;
    }
    return sample.slice(0, n);
  }

  // Shuffle a collection.
  function shuffle(obj) {
    return sample(obj, Infinity);
  }

  // Sort the object's values by a criterion produced by an iteratee.
  function sortBy(obj, iteratee, context) {
    var index = 0;
    iteratee = cb(iteratee, context);
    return pluck(map(obj, function(value, key, list) {
      return {
        value: value,
        index: index++,
        criteria: iteratee(value, key, list)
      };
    }).sort(function(left, right) {
      var a = left.criteria;
      var b = right.criteria;
      if (a !== b) {
        if (a > b || a === void 0) return 1;
        if (a < b || b === void 0) return -1;
      }
      return left.index - right.index;
    }), 'value');
  }

  // An internal function used for aggregate "group by" operations.
  function group(behavior, partition) {
    return function(obj, iteratee, context) {
      var result = partition ? [[], []] : {};
      iteratee = cb(iteratee, context);
      each(obj, function(value, index) {
        var key = iteratee(value, index, obj);
        behavior(result, value, key);
      });
      return result;
    };
  }

  // Groups the object's values by a criterion. Pass either a string attribute
  // to group by, or a function that returns the criterion.
  var groupBy = group(function(result, value, key) {
    if (has(result, key)) result[key].push(value); else result[key] = [value];
  });

  // Indexes the object's values by a criterion, similar to `_.groupBy`, but for
  // when you know that your index values will be unique.
  var indexBy = group(function(result, value, key) {
    result[key] = value;
  });

  // Counts instances of an object that group by a certain criterion. Pass
  // either a string attribute to count by, or a function that returns the
  // criterion.
  var countBy = group(function(result, value, key) {
    if (has(result, key)) result[key]++; else result[key] = 1;
  });

  // Split a collection into two arrays: one whose elements all pass the given
  // truth test, and one whose elements all do not pass the truth test.
  var partition = group(function(result, value, pass) {
    result[pass ? 0 : 1].push(value);
  }, true);

  // Safely create a real, live array from anything iterable.
  var reStrSymbol = /[^\ud800-\udfff]|[\ud800-\udbff][\udc00-\udfff]|[\ud800-\udfff]/g;
  function toArray(obj) {
    if (!obj) return [];
    if (isArray(obj)) return slice.call(obj);
    if (isString(obj)) {
      // Keep surrogate pair characters together.
      return obj.match(reStrSymbol);
    }
    if (isArrayLike(obj)) return map(obj, identity);
    return values(obj);
  }

  // Return the number of elements in a collection.
  function size(obj) {
    if (obj == null) return 0;
    return isArrayLike(obj) ? obj.length : keys(obj).length;
  }

  // Internal `_.pick` helper function to determine whether `key` is an enumerable
  // property name of `obj`.
  function keyInObj(value, key, obj) {
    return key in obj;
  }

  // Return a copy of the object only containing the allowed properties.
  var pick = restArguments(function(obj, keys) {
    var result = {}, iteratee = keys[0];
    if (obj == null) return result;
    if (isFunction$1(iteratee)) {
      if (keys.length > 1) iteratee = optimizeCb(iteratee, keys[1]);
      keys = allKeys(obj);
    } else {
      iteratee = keyInObj;
      keys = flatten(keys, false, false);
      obj = Object(obj);
    }
    for (var i = 0, length = keys.length; i < length; i++) {
      var key = keys[i];
      var value = obj[key];
      if (iteratee(value, key, obj)) result[key] = value;
    }
    return result;
  });

  // Return a copy of the object without the disallowed properties.
  var omit = restArguments(function(obj, keys) {
    var iteratee = keys[0], context;
    if (isFunction$1(iteratee)) {
      iteratee = negate(iteratee);
      if (keys.length > 1) context = keys[1];
    } else {
      keys = map(flatten(keys, false, false), String);
      iteratee = function(value, key) {
        return !contains(keys, key);
      };
    }
    return pick(obj, iteratee, context);
  });

  // Returns everything but the last entry of the array. Especially useful on
  // the arguments object. Passing **n** will return all the values in
  // the array, excluding the last N.
  function initial(array, n, guard) {
    return slice.call(array, 0, Math.max(0, array.length - (n == null || guard ? 1 : n)));
  }

  // Get the first element of an array. Passing **n** will return the first N
  // values in the array. The **guard** check allows it to work with `_.map`.
  function first(array, n, guard) {
    if (array == null || array.length < 1) return n == null || guard ? void 0 : [];
    if (n == null || guard) return array[0];
    return initial(array, array.length - n);
  }

  // Returns everything but the first entry of the `array`. Especially useful on
  // the `arguments` object. Passing an **n** will return the rest N values in the
  // `array`.
  function rest(array, n, guard) {
    return slice.call(array, n == null || guard ? 1 : n);
  }

  // Get the last element of an array. Passing **n** will return the last N
  // values in the array.
  function last(array, n, guard) {
    if (array == null || array.length < 1) return n == null || guard ? void 0 : [];
    if (n == null || guard) return array[array.length - 1];
    return rest(array, Math.max(0, array.length - n));
  }

  // Trim out all falsy values from an array.
  function compact(array) {
    return filter(array, Boolean);
  }

  // Flatten out an array, either recursively (by default), or up to `depth`.
  // Passing `true` or `false` as `depth` means `1` or `Infinity`, respectively.
  function flatten$1(array, depth) {
    return flatten(array, depth, false);
  }

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  var difference = restArguments(function(array, rest) {
    rest = flatten(rest, true, true);
    return filter(array, function(value){
      return !contains(rest, value);
    });
  });

  // Return a version of the array that does not contain the specified value(s).
  var without = restArguments(function(array, otherArrays) {
    return difference(array, otherArrays);
  });

  // Produce a duplicate-free version of the array. If the array has already
  // been sorted, you have the option of using a faster algorithm.
  // The faster algorithm will not work with an iteratee if the iteratee
  // is not a one-to-one function, so providing an iteratee will disable
  // the faster algorithm.
  function uniq(array, isSorted, iteratee, context) {
    if (!isBoolean(isSorted)) {
      context = iteratee;
      iteratee = isSorted;
      isSorted = false;
    }
    if (iteratee != null) iteratee = cb(iteratee, context);
    var result = [];
    var seen = [];
    for (var i = 0, length = getLength(array); i < length; i++) {
      var value = array[i],
          computed = iteratee ? iteratee(value, i, array) : value;
      if (isSorted && !iteratee) {
        if (!i || seen !== computed) result.push(value);
        seen = computed;
      } else if (iteratee) {
        if (!contains(seen, computed)) {
          seen.push(computed);
          result.push(value);
        }
      } else if (!contains(result, value)) {
        result.push(value);
      }
    }
    return result;
  }

  // Produce an array that contains the union: each distinct element from all of
  // the passed-in arrays.
  var union = restArguments(function(arrays) {
    return uniq(flatten(arrays, true, true));
  });

  // Produce an array that contains every item shared between all the
  // passed-in arrays.
  function intersection(array) {
    var result = [];
    var argsLength = arguments.length;
    for (var i = 0, length = getLength(array); i < length; i++) {
      var item = array[i];
      if (contains(result, item)) continue;
      var j;
      for (j = 1; j < argsLength; j++) {
        if (!contains(arguments[j], item)) break;
      }
      if (j === argsLength) result.push(item);
    }
    return result;
  }

  // Complement of zip. Unzip accepts an array of arrays and groups
  // each array's elements on shared indices.
  function unzip(array) {
    var length = array && max(array, getLength).length || 0;
    var result = Array(length);

    for (var index = 0; index < length; index++) {
      result[index] = pluck(array, index);
    }
    return result;
  }

  // Zip together multiple lists into a single array -- elements that share
  // an index go together.
  var zip = restArguments(unzip);

  // Converts lists into objects. Pass either a single array of `[key, value]`
  // pairs, or two parallel arrays of the same length -- one of keys, and one of
  // the corresponding values. Passing by pairs is the reverse of `_.pairs`.
  function object(list, values) {
    var result = {};
    for (var i = 0, length = getLength(list); i < length; i++) {
      if (values) {
        result[list[i]] = values[i];
      } else {
        result[list[i][0]] = list[i][1];
      }
    }
    return result;
  }

  // Generate an integer Array containing an arithmetic progression. A port of
  // the native Python `range()` function. See
  // [the Python documentation](https://docs.python.org/library/functions.html#range).
  function range(start, stop, step) {
    if (stop == null) {
      stop = start || 0;
      start = 0;
    }
    if (!step) {
      step = stop < start ? -1 : 1;
    }

    var length = Math.max(Math.ceil((stop - start) / step), 0);
    var range = Array(length);

    for (var idx = 0; idx < length; idx++, start += step) {
      range[idx] = start;
    }

    return range;
  }

  // Chunk a single array into multiple arrays, each containing `count` or fewer
  // items.
  function chunk(array, count) {
    if (count == null || count < 1) return [];
    var result = [];
    var i = 0, length = array.length;
    while (i < length) {
      result.push(slice.call(array, i, i += count));
    }
    return result;
  }

  // Helper function to continue chaining intermediate results.
  function chainResult(instance, obj) {
    return instance._chain ? _(obj).chain() : obj;
  }

  // Add your own custom functions to the Underscore object.
  function mixin(obj) {
    each(functions(obj), function(name) {
      var func = _[name] = obj[name];
      _.prototype[name] = function() {
        var args = [this._wrapped];
        push.apply(args, arguments);
        return chainResult(this, func.apply(_, args));
      };
    });
    return _;
  }

  // Add all mutator `Array` functions to the wrapper.
  each(['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'], function(name) {
    var method = ArrayProto[name];
    _.prototype[name] = function() {
      var obj = this._wrapped;
      if (obj != null) {
        method.apply(obj, arguments);
        if ((name === 'shift' || name === 'splice') && obj.length === 0) {
          delete obj[0];
        }
      }
      return chainResult(this, obj);
    };
  });

  // Add all accessor `Array` functions to the wrapper.
  each(['concat', 'join', 'slice'], function(name) {
    var method = ArrayProto[name];
    _.prototype[name] = function() {
      var obj = this._wrapped;
      if (obj != null) obj = method.apply(obj, arguments);
      return chainResult(this, obj);
    };
  });

  // Named Exports

  var allExports = {
    __proto__: null,
    VERSION: VERSION,
    restArguments: restArguments,
    isObject: isObject,
    isNull: isNull,
    isUndefined: isUndefined,
    isBoolean: isBoolean,
    isElement: isElement,
    isString: isString,
    isNumber: isNumber,
    isDate: isDate,
    isRegExp: isRegExp,
    isError: isError,
    isSymbol: isSymbol,
    isArrayBuffer: isArrayBuffer,
    isDataView: isDataView$1,
    isArray: isArray,
    isFunction: isFunction$1,
    isArguments: isArguments$1,
    isFinite: isFinite$1,
    isNaN: isNaN$1,
    isTypedArray: isTypedArray$1,
    isEmpty: isEmpty,
    isMatch: isMatch,
    isEqual: isEqual,
    isMap: isMap,
    isWeakMap: isWeakMap,
    isSet: isSet,
    isWeakSet: isWeakSet,
    keys: keys,
    allKeys: allKeys,
    values: values,
    pairs: pairs,
    invert: invert,
    functions: functions,
    methods: functions,
    extend: extend,
    extendOwn: extendOwn,
    assign: extendOwn,
    defaults: defaults,
    create: create,
    clone: clone,
    tap: tap,
    get: get,
    has: has$1,
    mapObject: mapObject,
    identity: identity,
    constant: constant,
    noop: noop,
    toPath: toPath,
    property: property,
    propertyOf: propertyOf,
    matcher: matcher,
    matches: matcher,
    times: times,
    random: random,
    now: now,
    escape: _escape,
    unescape: _unescape,
    templateSettings: templateSettings,
    template: template,
    result: result,
    uniqueId: uniqueId,
    chain: chain,
    iteratee: iteratee,
    partial: partial,
    bind: bind,
    bindAll: bindAll,
    memoize: memoize,
    delay: delay,
    defer: defer,
    throttle: throttle,
    debounce: debounce,
    wrap: wrap,
    negate: negate,
    compose: compose,
    after: after,
    before: before,
    once: once,
    findKey: findKey,
    findIndex: findIndex,
    findLastIndex: findLastIndex,
    sortedIndex: sortedIndex,
    indexOf: indexOf,
    lastIndexOf: lastIndexOf,
    find: find,
    detect: find,
    findWhere: findWhere,
    each: each,
    forEach: each,
    map: map,
    collect: map,
    reduce: reduce,
    foldl: reduce,
    inject: reduce,
    reduceRight: reduceRight,
    foldr: reduceRight,
    filter: filter,
    select: filter,
    reject: reject,
    every: every,
    all: every,
    some: some,
    any: some,
    contains: contains,
    includes: contains,
    include: contains,
    invoke: invoke,
    pluck: pluck,
    where: where,
    max: max,
    min: min,
    shuffle: shuffle,
    sample: sample,
    sortBy: sortBy,
    groupBy: groupBy,
    indexBy: indexBy,
    countBy: countBy,
    partition: partition,
    toArray: toArray,
    size: size,
    pick: pick,
    omit: omit,
    first: first,
    head: first,
    take: first,
    initial: initial,
    last: last,
    rest: rest,
    tail: rest,
    drop: rest,
    compact: compact,
    flatten: flatten$1,
    without: without,
    uniq: uniq,
    unique: uniq,
    union: union,
    intersection: intersection,
    difference: difference,
    unzip: unzip,
    transpose: unzip,
    zip: zip,
    object: object,
    range: range,
    chunk: chunk,
    mixin: mixin,
    'default': _
  };

  // Default Export

  // Add all of the Underscore functions to the wrapper object.
  var _$1 = mixin(allExports);
  // Legacy Node.js API.
  _$1._ = _$1;

  return _$1;

})));


}).call(this)}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],49:[function(require,module,exports){
module.exports = {
  port: 3000
};
},{}]},{},[7])


//# sourceMappingURL=app.js.map