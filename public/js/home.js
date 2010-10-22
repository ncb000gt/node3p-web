$(document).ready(
  function(){

    // Local copy of jQuery selectors, for performance.
    var jpPlayTime = $("#jplayer_play_time");
    var jpTotalTime = $("#jplayer_total_time");
    var jpStatus = $("#demo_status"); // For displaying information about jPlayer's status in the demo page

    $("#jquery_jplayer").jPlayer({ volume: 50,
                                   oggSupport: false,
                                   preload: 'none'
                                 })
      .jPlayer("onProgressChange", function(loadPercent, playedPercentRelative, playedPercentAbsolute, playedTime, totalTime) {
                 jpPlayTime.text($.jPlayer.convertTime(playedTime));
                 jpTotalTime.text($.jPlayer.convertTime(totalTime));

               })
      .jPlayer("onSoundComplete", function() {
               });

    var contentFlow = new ContentFlow('contentFlow', { circularFlow: false } ) ;
    if (file) play(file);
  });

function play(file) {
  $("#jquery_jplayer").jPlayer("setFile", file).jPlayer("play");
};