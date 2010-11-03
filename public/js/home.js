$(document).ready(
    function() {
        dnd();
        player();
        contentFlow();
    });

var setEvent = (function () {
    //from html5demos by @rem
    if (document.addEventListener) {
        return function (el, type, fn) {
            if (el && el.nodeName || el === window) {
                el.addEventListener(type, fn, false);
            } else if (el && el.length) {
                for (var i = 0; i < el.length; i++) {
                    setEvent(el[i], type, fn);
                }
            }
        };
    } else {
        return function (el, type, fn) {
            if (el && el.nodeName || el === window) {
                el.attachEvent('on' + type, function () { return fn.call(el, window.event); });
            } else if (el && el.length) {
                for (var i = 0; i < el.length; i++) {
                    setEvent(el[i], type, fn);
                }
            }
        };
    }
})();

function cancel(e) {
    if (e.preventDefault) e.preventDefault(); // required by FF + Safari
    //  e.dataTransfer.dropEffect = 'copy'; // tells the browser what drop effect is allowed here
    return false; // required by IE
}

function dnd() {
    var drop = $('#drop_zone');

    setEvent(drop, 'dragover', cancel);
    setEvent(drop, 'dragenter', cancel);
    setEvent(drop, 'drop', function (event) {   //$('.upload_zone').bind('ondrop', upload, false);

        var filedata = '',
        file = event.dataTransfer.files[0],
        reader = new FileReader();

        reader.onloadend = function(f) {
            console.log(f.target.result);
            upload(f.target.result);
        };
        reader.readAsBinaryString(file);

        function upload(data) {
            //function upload(event) {
            var boundary = '------multipartformboundary' + (new Date).getTime();
            var dashdash = '--';
            var crlf     = '\r\n';

            // Build RFC2388 string.
            var builder = '';

            builder += dashdash;
            builder += boundary;
            builder += crlf;

            var xhr = new XMLHttpRequest();

            // Generate headers.
            builder += 'Content-Disposition: form-data; name="file"';
            if (file.fileName) {
                builder += '; filename="' + file.fileName + '"';
            }
            builder += crlf;

            builder += 'Content-Type: audio/x-amzxml';
            builder += crlf;
            builder += crlf;

            //Append binary data.
            builder += data;
            builder += crlf;

            // Mark end of the request.
            builder += dashdash;
            builder += boundary;
            builder += dashdash;
            builder += crlf;

            xhr.open("POST", "/", true);
            xhr.setRequestHeader('Content-Type', 'multipart/form-data; boundary='
                                 + boundary);
            xhr.send(builder);

            xhr.onload = function(event) {
                //If we got an error display it.
                if (xhr.responseText) {
                    console.log(xhr.responseText);
                }
            };

            // Prevent FireFox opening the dragged file.
        };
        event.stopPropagation();
    });
};

function contentFlow() {
    var contentFlow = new ContentFlow(
        'contentFlow',
        { circularFlow: false,
          onclickInactiveItem: function (item) {
              this.conf.onclickActiveItem(item);
          },

          onclickActiveItem: function (item) {
              //if ($(item.item).hasClass('active')) console.log('clicked');
          }
        });
};

function player() {
    var jpPlayTime = $("#jplayer_play_time");
    var jpTotalTime = $("#jplayer_total_time");
    var jpStatus = $("#demo_status");

    $("#jquery_jplayer").jPlayer(
        { volume: 50,
          oggSupport: false,
          preload: 'none'
        })
        .jPlayer("onProgressChange", function(loadPercent, playedPercentRelative, playedPercentAbsolute, playedTime, totalTime) {
            jpPlayTime.text($.jPlayer.convertTime(playedTime));
            jpTotalTime.text($.jPlayer.convertTime(totalTime));

        })
        .jPlayer("onSoundComplete", function() {
            console.log('song is done');
        });

    if (file) play(file);
}

function play(file) {
    $("#jquery_jplayer").jPlayer("setFile", file).jPlayer("play");
};