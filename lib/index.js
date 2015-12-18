import {} from 'colors';

//WARN: these functions should be replaced in real production environment
function get(req, key) {
  var id = req.session.id;
  console.log('You must register a new ' + 'get'.red + ' function with ' + 'node-weixin-settings'.red +
    ', and should not use this function in production!');
  if (this._ && this._[id] && this._[id][key]) {
    return this._[id][key];
  }
  return null;
}

function set(req, key, value) {
  var id = req.session.id;
  console.log('You must register a new ' + 'set'.red + ' function with ' + 'node-weixin-settings'.red +
    ', and should not use this function in production!');
  if (!this._[id]) {
    this._[id] = {};
  }
  this._[id][key] = value;
}

function all(req) {
  var id = req.session.id;
  console.log('You must register a new ' + 'all'.red + ' function with ' + 'node-weixin-settings'.red +
    ', and should not use this function in production!');
  if (!this._[id]) {
    this._[id] = {};
  }
  return this._[id];
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
  get: function (req, key) {
    return this._get(req, key);
  },
  set: function (req, key, value) {
    this._set(req, key, value);
  },
  all: function (req) {
    return this._all(req);
  }
};
