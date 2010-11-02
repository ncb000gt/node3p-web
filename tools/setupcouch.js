var couchapp = require('couchapp'),
    path = require('path');

function abspath (pathname) {
  return path.join(process.env.PWD, path.normalize(pathname));
}

var COUCH_CONFIG = {};

//TODO: Make more robust
if (path.existsSync('/usr/local/etc/node3p-web/config.js')) {
  var config = require('/usr/local/etc/node3p-web/config');
  if ('couchConfig' in config) COUCH_CONFIG = config.couchConfig;
}

var couchurl = 'http://'+COUCH_CONFIG.host+':'+COUCH_CONFIG.port+'/node3p-web';

couchapp.createApp(require(abspath('./couchapp.js')), couchurl, function (app) {
    app.push();
});