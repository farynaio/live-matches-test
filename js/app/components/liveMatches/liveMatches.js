app.directive('liveMatches', ['$interval', '$timeout', 'componentsPath', function($interval, $timeout, componentsPath) {
  'use strict';

  return {
    restrict: 'E',
    templateUrl: componentsPath + '/liveMatches/liveMatches.html',
    link: function(scope, elm, attrs) {
    	var url = 'http://api.unicdn.net/v1/feeds/sportsbook/event/live.jsonp?app_id=ca7871d7&app_key=5371c125b8d99c8f6b5ff9a12de8b85a';
      var fetchInterval = attrs.fetchInterval || 120000;
      scope.betLinkFormat = 'https://www.unibet.com/betting#/event/live';

      var carouselOptions = {
        autoplaySpeed: true,
        autoplaySpeed: attrs.slideInterval || 3000,
        speed: attrs.transitionDuration || 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: false,
        infinite: true,
        cssEase: 'linear',
        prevArrow: '',
        nextArrow: ''
        // ,
        // dataLoaded: false
      }

      $(function() {
      	fetchData();
        $interval(fetchData, fetchInterval);

        function fetchData() {
        	$.ajax({
            url: url,
            jsonp: 'callback',
            dataType: 'jsonp',
            success: function(response) {
              callback(response);
            },
            beforeSend: function() {
            	// later
            }
          });
        }	

        function isSlickInited() {
        	return $('.match', elm).hasClass('slick-initialized');
        }

        function callback(data) {
          var newPlays = [];

          data.liveEvents.forEach(function(elem) {
						var play = {
							eventId: elem.liveData.eventId,
							score: elem.liveData.score ? elem.liveData.score.home + ' - ' + elem.liveData.score.away : '',
							name: elem.event.name,
							sport: elem.event.sport,
							startTime: elem.event.start // check if data today - YYYY-MM-DD
						};

						newPlays.push(play);
					});

					$timeout(function() {
						scope.plays = newPlays;
					});
        }

        function reinitSlick() {
					var slickElem = $('.match', elm);
        	if (isSlickInited()) {
						slickElem.slick('unslick');
					}

					slickElem.slick(carouselOptions);
        }

        scope.$watch('plays', function (newVal) {
        	if (newVal) {
						reinitSlick();
        	}
        });
      });
    }
  };
}]);