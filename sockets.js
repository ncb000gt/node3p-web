var socketio = require('socket.io')
,sys = require('sys');

exports.setup = function(server, dlEvents) {
  var socket = socketio.listen(server);

  socket.on('connection', function(client) {
	      dlEvents.on('finished', function(files) {
			    sys.debug('finished with files');
			    client.send(JSON.stringify({files: files}));
			  });
	    });
};