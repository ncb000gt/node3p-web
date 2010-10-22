$(document).ready(
  function(){

    // Local copy of jQuery selectors, for performance.
    var jpPlayTime = $("#jplayer_play_time");
    var jpTotalTime = $("#jplayer_total_time");
    var jpStatus = $("#demo_status"); // For displaying information about jPlayer's status in the demo page

    $("#jquery_jplayer").jPlayer({
                                   ready: function () {
                                     this.element.jPlayer("setFile", "http://www.miaowmusic.com/audio/mp3/Miaow-07-Bubble.mp3", "http://www.miaowmusic.com/audio/ogg/Miaow-07-Bubble.ogg").jPlayer("play");
                                     ///demoInstanceInfo(this.element, $("#demo_info")); // This displays information about jPlayer's configuration in the demo page
                                   },
                                   volume: 50,
                                   oggSupport: false,
                                   preload: 'none'
                                 })
      .jPlayer("onProgressChange", function(loadPercent, playedPercentRelative, playedPercentAbsolute, playedTime, totalTime) {
                 jpPlayTime.text($.jPlayer.convertTime(playedTime));
                 jpTotalTime.text($.jPlayer.convertTime(totalTime));

                 //demoStatusInfo(this.element, jpStatus); // This displays information about jPlayer's status in the demo page
               })
      .jPlayer("onSoundComplete", function() {
                 //this.element.jPlayer("play");
               });

    var contentFlow = new ContentFlow('contentFlow', { circularFlow: false } ) ;
  });