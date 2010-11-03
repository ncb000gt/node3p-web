$(document).ready(function() {
                    console.log(io);
                    var socket = new io.Socket('localhost');
                    socket.connect();
                    socket.on('message', function(data) {
                                //TODO: find a better way than eval...eval sucks.
                                eval('data = ' + data);
                                $.each(data.files, function(idx, file) {
                                         $('.filelist').append('<li>'+idx+': '+file.filename+'</li>');
                                       });
                                $('.finest').css({display:'none'});
                                $('.finished').css({display:'block'});
                                socket.disconnect();
                              });
                  });