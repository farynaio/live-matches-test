app.directive('ticker', ['$interval', '$timeout', 'componentsPath', 'sportIconMap', function($interval, $timeout, componentsPath, sportIconMap) {
  'use strict';

  return {
    restrict: 'E',
    templateUrl: componentsPath + '/ticker/ticker.html',
    link: function(scope, elm, attrs) {
    	var url = 'http://api.unicdn.net/v1/feeds/sportsbook/event/live.jsonp?app_id=ca7871d7&app_key=5371c125b8d99c8f6b5ff9a12de8b85a';
      var fetchInterval = attrs.fetchInterval || 120000;
      scope.betLinkFormat = 'https://www.unibet.com/betting#/event/live';

      var carouselOptions = {
        autoplay: true,
        autoplaySpeed: attrs.slideInterval || 3000,
        speed: attrs.transitionDuration || 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: false,
        infinite: true,
        cssEase: 'linear',
        prevArrow: '',
        nextArrow: ''
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
            error: function(data) {
              console.log(data.error);
            }
          });
        }	

        function isSlickInited() {
        	return $('.match', elm).hasClass('slick-initialized');
        }

        function mapSportToIcon(sportString) {
          var pom = sportString.toUpperCase();

          for (var key in sportIconMap) {
            if (~pom.indexOf(key)) {
              return sportIconMap[key];
            }
          }

          return sportIconMap.DEFAULT;
        }

        function callback(data) {
          var newPlays = [];

          data.liveEvents.forEach(function(elem) {
						var play = {
							eventId: elem.liveData.eventId,
							score: elem.liveData.score ? elem.liveData.score.home + ' - ' + elem.liveData.score.away : '',
							name: elem.event.name,
							sportIcon: mapSportToIcon(elem.event.sport),
              sportIconAlt: 'Sport Icon',
							startTime: elem.event.start
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