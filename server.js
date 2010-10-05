var connect = require('connect')
,sys = require('sys')
,forms = require('formidable')
,node3p = require('node3p')
,jade = require('jade')
,path = require('path')
,fs = require('fs')
,file = require('./lib/file');

var DOWNLOAD_LOCATION = '/tmp/node3p/';

//TODO: Make more robust
if (path.existsSync('/usr/local/etc/node3p-web/config.js')) {
  var config = require('/usr/local/etc/node3p-web/config');
  if ('downloadLocation' in config) DOWNLOAD_LOCATION = file.path.abspath(config.downloadLocation);
}

var TEMPLATE_ROOT = __dirname + '/templates';

function index(app) {
  app.get('/', function (req, res) {
	    res.writeHead(200, { "Content-Type": "text/html" });
	    jade.renderFile(
	      TEMPLATE_ROOT + '/index.jade',
	      { },
	      function(err, html){
		res.end(html);
	      }
	    );
	  });
  app.post('/', function (req, res) {
             sys.debug('uploading!');
	     var file_info = {};
	     var headers = {};
	     var form = new forms.IncomingForm();
	     var amz_data, filename;
	     form.parse(req, function(err, fields, files){
			  res.writeHead(200, { "Content-Type": "text/html" });

			  var n3p = new node3p.Node3p(DOWNLOAD_LOCATION);

			  n3p.on('end', function(files) {
				   sys.puts('All files downloaded');
				 });

			  var file = files.file;
			  n3p.parse(file.path);

			  jade.renderFile(
			    TEMPLATE_ROOT + '/uploaded.jade',
			    { },
			    function(err, html){
			      res.end(html);
			    }
			  );
			});
	   });
}

var server = connect.createServer(
  connect.logger({buffer: true}),
  connect.staticProvider(__dirname + '/static')
);

server.use(connect.router(index));

module.exports = server;