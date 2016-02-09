app
	.constant('componentsPath', 'js/app/components')
	.constant('sportIconMap', {
		FOOTBALL: 'images/icons/football.png',
		BASKETBALL: 'images/icons/basketball.png',
		TENNIS: 'images/icons/tennis.png',
		DEFAULT: 'images/icons/default.png'
	})
	.constant('options', {
		defaultServiceFetchInterval: 120000,
		serviceURL: 'http://api.unicdn.net/v1/feeds/sportsbook/event/live.jsonp?app_id=ca7871d7&app_key=5371c125b8d99c8f6b5ff9a12de8b85a',
		betLinkFormat: 'https://www.unibet.com/betting#/event/live/'
	});
