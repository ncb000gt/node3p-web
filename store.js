var sys = require('sys')
, couchdb = require('couchdb')
,client = couchdb.createClient(5983, 'localhost')
,db = client.db('node3p-web')
,crypto = require('crypto')
,request = require('request')
,base64 = require('base64');

function Store(dlEvents) {
  if (!dlEvents) throw new Error("Must include the event emitter.");

  if (!(db.exists())) db.create();

  this.dlEvents = dlEvents;

  this.dlEvents.on('finished', this.saveFiles);
};

exports.Store = Store;

Store.prototype.saveFiles = function(files) {
  var d = new Date();
  var len = files.length;
  for (var i = 0; i < len; i++) {
    var file = files[i];
    file.created = d;
    var key = crypto.createHash('md5').update(file.filename).digest('hex');
    db.saveDoc(key, file, function(err, ok) {
		 //if (err) throw new Error(JSON.stringify(err));
		 //sys.debug('File "'+file.filename+'" saved in couch to "'+key+'".');
	       });
  }
};

Store.prototype.getFiles = function(count, cb) {
  var query = {};
  if (count) query.limit = count;
  db.view('node3p-web', 'getFiles', query, function(err, results) {
	    if (err) throw new Error(JSON.stringify(err));
	    if (cb) cb(results.rows);
	  });
};

Store.prototype.getAlbums = function(cb) {
  db.view('node3p-web', 'getAlbums', {group:true}, function(err, results) {
	    if (err) throw new Error(JSON.stringify(err));
	    if (cb) cb(results.rows);
	  });
};