$(document).ready(function() {
		    console.log(io);
		    var socket = new io.Socket('localhost');
		    socket.on('message', function(data) {
				//TODO: find a better way than eval...eval sucks.
				eval('data = ' + data);
				$.each(data.files, function(idx, file) {
					 $('.files').append('<li>'+idx+': '+file.filename+'</li>');
				       });
				$('.finished').css({display:'block'});
				socket.disconnect();
			      });
		    socket.connect();
		  });