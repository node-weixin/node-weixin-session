import assert from 'assert';
import nodeWeixinSession from '../lib';
import nodeWeixinSession1 from '../lib';
import async from 'async';

var req = {
  session: {
    id: 1
  }
};

describe('node-weixin-settings', function() {
  it('should be equal before !', function() {
    assert.equal(true, nodeWeixinSession === nodeWeixinSession1);
  });

  it('should get what is set!', function(done) {
    var set = {
      state: 'STATE',
      scope: 0
    };
    var get = null;
    async.series([
      function(cb) {
        nodeWeixinSession.set(req, 'oauth', set, function() {
          cb();
        });
      },
      function(cb) {
        nodeWeixinSession.get(req, 'oauth', function(oauth) {
          get = oauth;
          assert.equal(true, set === oauth);
          cb();
        });
      },
      function(cb) {
        nodeWeixinSession.get(req, 'oauth1', function(oauth1) {
          assert.equal(true, oauth1 === null);
          cb();
        });
      },
      function(cb) {
        nodeWeixinSession.all(req, function(all) {
          assert.equal(true, all.oauth === get);
          cb();
        });
      },
      function(cb) {
        nodeWeixinSession.all({
          session: {
            id: 2
          }
        }, function(all1) {
          assert.equal(true, all1.oauth === undefined);
          cb();
        });
      }
    ], function() {
      done();
    });
  });

  it('should register get, set!', function(done) {
    var insideGet = false;
    var insideSet = false;
    var insideAll = false;
    var sessionConf = {};


    function MyGet(req1, key, next) {
      var id = req1.session.id;
      insideGet = true;
      if (sessionConf[id] && sessionConf[id][key]) {
        return next(sessionConf[id][key]);
      }
      return next(null);
    }

    function MySet(req1, key, value, next) {
      var id = req1.session.id;

      insideSet = true;
      if (!sessionConf[id]) {
        sessionConf[id] = {};
      }
      sessionConf[id][key] = value;
      next();
    }

    function MyAll(req1, next) {
      var id = req1.session.id;
      insideAll = true;
      if (!sessionConf[id]) {
        sessionConf[id] = {};
      }
      next(sessionConf[id]);
    }


    assert.equal(true, nodeWeixinSession.registerSet(MySet));

    var set = {
      state: 'STATE',
      scope: 0
    };
    async.series([
      function(cb) {
        nodeWeixinSession.set(req, 'oauth', set, function() {
          assert.equal(true, insideSet);
          assert.equal(true, nodeWeixinSession.registerGet(MyGet));
          cb();
        });
      },
      function(cb) {
        nodeWeixinSession.get(req, 'oauth', function(get) {
          assert.equal(true, insideGet);
          assert.equal(true, set === get);
          cb();
        });
      },
      function(cb) {

        assert.equal(true, nodeWeixinSession.registerAll(MyAll));
        nodeWeixinSession.all(req, function(all) {
          assert.equal(true, typeof all === 'object');
          assert.equal(true, insideAll);
          cb();
        });

        assert.equal(false, nodeWeixinSession.registerGet('MyGet'));
        assert.equal(false, nodeWeixinSession.registerSet('MySet'));
        assert.equal(false, nodeWeixinSession.registerAll('MyAll'));
      }
    ], function() {
      done();
    });
  });

  it('should be equal after!', function() {
    assert.equal(true, nodeWeixinSession === nodeWeixinSession1);
  });
});
