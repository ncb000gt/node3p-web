var connect = require('connect')
,sys = require('sys')
,forms = require('formidable')
,node3p = require('node3p')
,jade = require('jade')
,path = require('path')
,fs = require('fs')
,file = require('./lib/file')
,sockets = require('./sockets')
,store = require('./store')
,emitter = require('events').EventEmitter;

var DOWNLOAD_LOCATION = '/tmp/node3p/';
var LOG_PATH = '/var/log/node3p-web.log';

//TODO: Make more robust
if (path.existsSync('/usr/local/etc/node3p-web/config.js')) {
  var config = require('/usr/local/etc/node3p-web/config');
  if ('downloadLocation' in config) DOWNLOAD_LOCATION = file.path.abspath(config.downloadLocation);
  if ('logPath' in config) LOG_PATH = file.path.abspath(config.logPath);
}

var TEMPLATE_ROOT = __dirname + '/templates';

function render_index(req, res, errs, message) {
  Store.getAlbums(function(albums) {
		    var locals = {
		      error_message: message
		    };
		    locals.albums = albums;
		    res.writeHead(200, { "Content-Type": "text/html" });
		    jade.renderFile(
		      TEMPLATE_ROOT + '/index.jade',
		      {locals: locals},
		      function(err, html) {
			res.end(html);
		      }
		    );
		  });
}

function index(app) {
  app.get('/', render_index);
  app.post('/', function (req, res) {
             sys.debug('uploading!');
	     var file_info = {};
	     var headers = {};
	     var form = new forms.IncomingForm();
	     var amz_data, filename;
	     form.parse(req, function(err, fields, files){
			  //TODO: other validation (file types and so on)
			  if (!files || !(files.file)) {
			    render_index(req, res, null, "You need to select a file.");
			    return;
			  }

			  res.writeHead(200, { "Content-Type": "text/html" });

			  var n3p = new node3p.Node3p(DOWNLOAD_LOCATION);
			  var downloaded_files = [];
			  n3p.on('end', function(downloaded) {
				   files = downloaded;
				   sys.puts('All files downloaded');
				   dlEvents.emit('finished', downloaded);
				 });

			  var file = files.file;
			  n3p.parse(file.path);

			  jade.renderFile(
			    TEMPLATE_ROOT + '/uploaded.jade',
			    {locals:{files: downloaded_files}},
			    function(err, html){
			      res.end(html);
			    }
			  );
			});
	   });
}

var logStream = fs.createWriteStream(LOG_PATH);

var server = connect.createServer(
  connect.logger({buffer: true, stream: logStream}),
  connect.staticProvider(__dirname + '/public')
);

server.use(connect.router(index));

function DownloadEvents() {
  emitter.call(this);
}
sys.inherits(DownloadEvents, emitter);

var dlEvents = new DownloadEvents();

var Store = new store.Store(dlEvents);

sockets.setup(server, dlEvents);

module.exports = server;
