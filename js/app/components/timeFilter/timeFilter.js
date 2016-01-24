app.filter('timeFilter', [function() {
	'use strict';

	return function(x) {
		var date = x.slice(0, 10);
		var time = x.slice(-6, -1);
		
		var xDate = new Date(Date.parse(x));
		xDate.setHours(0, 0, 0, 0);

		var today = new Date();
		today.setHours(0, 0, 0, 0);

		if (xDate.getTime() == today.getTime()) {
			date = 'Today';
		}

		return date + ', ' + time;
	};
}]);
