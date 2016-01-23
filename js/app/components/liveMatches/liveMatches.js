app.directive('liveMatches', ['componentsPath', function (componentsPath) {
	'use strict';

	return {
		restrict: 'E',
		templateUrl: componentsPath + '/liveMatches/liveMatches.html',
		link: function(scope, elm, attrs) {
			$(function() {
	      setInterval(function() {
	        $.ajax({
	          url: "http://api.unicdn.net/v1/feeds/sportsbook/event/live.jsonp?app_id=ca7871d7&app_key=5371c125b8d99c8f6b5ff9a12de8b85a",
	          jsonp: "callback",
	          dataType: "jsonp",
	          success: function(response) {
	            callback(response);
	          }
	        });
	      }, 10000);

	      function callback(data) {
					console.log(data);
	      };
      });
		}
	};
}]);
