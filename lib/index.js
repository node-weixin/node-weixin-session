import {} from 'colors';

//WARN: these functions should be replaced in real production environment
function get(req, key, next) {
  var id = req.session.id;
  console.log('You must register a new ' + 'get'.red + ' function with ' + 'node-weixin-settings'.red +
    ', and should not use this function in production!');
  if (this._ && this._[id] && this._[id][key]) {
    return next(this._[id][key]);
  }
  next(null);
}

function set(req, key, value, next) {
  var id = req.session.id;
  console.log('You must register a new ' + 'set'.red + ' function with ' + 'node-weixin-settings'.red +
    ', and should not use this function in production!');
  if (!this._[id]) {
    this._[id] = {};
  }
  this._[id][key] = value;
  next();
}

function all(req, next) {
  var id = req.session.id;
  console.log('You must register a new ' + 'all'.red + ' function with ' + 'node-weixin-settings'.red +
    ', and should not use this function in production!');
  if (!this._[id]) {
    this._[id] = {};
  }
  next(this._[id]);
}

export default {
  _: {},
  _get: get,
  _set: set,
  _all: all,
  registerGet: function (cb) {
    if (cb instanceof Function) {
      this._get = cb;
      return true;
    }
    return false;
  },

  registerSet: function (cb) {
    if (cb instanceof Function) {
      this._set = cb;
      return true;
    }
    return false;
  },

  registerAll: function (cb) {
    if (cb instanceof Function) {
      this._all = cb;
      return true;
    }
    return false;
  },
  get: function (req, key, next) {
    return this._get(req, key, next);
  },
  set: function (req, key, value, next) {
    this._set(req, key, value, next);
  },
  all: function (req, next) {
    return this._all(req, next);
  }
};
