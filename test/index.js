import assert from 'assert';
import nodeWeixinSession from '../lib';
import nodeWeixinSession1 from '../lib';

var req = {
  session: {
    id: 1
  }
};

describe('node-weixin-settings', function () {
  it('should be equal before !', function () {
    assert.equal(true, nodeWeixinSession === nodeWeixinSession1);
  });

  it('should get what is set!', function () {
    var set = {state: 'STATE', scope: 0};
    nodeWeixinSession.set(req, 'oauth', set);
    var get = nodeWeixinSession.get(req, 'oauth');

    assert.equal(true, set === get);
    assert.equal(true, nodeWeixinSession.get(req, 'oauth1') === null);

    var all = nodeWeixinSession.all(req);
    assert.equal(true, all.oauth === get);
    all = nodeWeixinSession.all({session: {
      id: 2
    }});
    assert.equal(true, all.oauth === undefined);
  });

  it('should register get, set!', function () {
    var insideGet = false;
    var insideSet = false;
    var insideAll = false;
    var sessionConf = {};


    function MyGet(req1, key) {
      var id = req1.session.id;
      insideGet = true;
      if (sessionConf[id] && sessionConf[id][key]) {
        return sessionConf[id][key];
      }
      return null;
    }

    function MySet(req1, key, value) {
      var id = req1.session.id;

      insideSet = true;
      if (!sessionConf[id]) {
        sessionConf[id] = {};
      }
      sessionConf[id][key] = value;
    }

    function MyAll(req1) {
      var id = req1.session.id;
      insideAll = true;
      if (!sessionConf[id]) {
        sessionConf[id] = {};
      }
      return sessionConf[id];
    }

    assert.equal(true, nodeWeixinSession.registerSet(MySet));

    var set = {state: 'STATE', scope: 0};
    nodeWeixinSession.set(req, 'oauth', set);

    assert.equal(true, insideSet);

    assert.equal(true, nodeWeixinSession.registerGet(MyGet));

    var get = nodeWeixinSession.get(req, 'oauth');
    assert.equal(true, insideGet);
    assert.equal(true, set === get);

    assert.equal(true, nodeWeixinSession.registerAll(MyAll));
    assert.equal(true, typeof nodeWeixinSession.all(req) === 'object');
    assert.equal(true, insideAll);

    assert.equal(false, nodeWeixinSession.registerGet('MyGet'));
    assert.equal(false, nodeWeixinSession.registerSet('MySet'));
    assert.equal(false, nodeWeixinSession.registerAll('MyAll'));

  });

  it('should be equal after!', function () {
    assert.equal(true, nodeWeixinSession === nodeWeixinSession1);
  });
});
