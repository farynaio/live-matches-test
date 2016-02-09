'use strict';

app.directive('ticker', ['$interval', '$timeout', 'componentsPath', 'sportIconMap', 'options', '$http', function($interval, $timeout, componentsPath, sportIconMap, options, $http) {

  return {
    restrict: 'E',
    templateUrl: componentsPath + '/ticker/ticker.html',
    link: function(scope, elm, attrs) {
      var fetchInterval = attrs.fetchInterval || options.defaultServiceFetchInterval;
      scope.betLinkFormat = options.betLinkFormat;

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
      };

      $(function() {
      	fetchData();
        $interval(fetchData, fetchInterval);

        function fetchData() {
          $http.jsonp(options.serviceURL + '&callback=JSON_CALLBACK')
            .then(function(response) {
              callback(response.data);

            }, function(response) {
              console.log(JSON.stringify(response));
          });
        }

        function isSlickInited() {
          return elm.find('match').hasClass('slick-initialized');
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
					var slickElem = elm.find('match');
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
