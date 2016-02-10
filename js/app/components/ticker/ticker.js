'use strict';

app.directive('ticker', ['$interval', '$timeout', 'componentsPath', 'sportIconMap', 'options', '$http', function($interval, $timeout, componentsPath, sportIconMap, options, $http) {

  return {
    restrict: 'E',
    templateUrl: componentsPath + '/ticker/ticker.html',
    link: function(scope, elm, attrs) {
      var fetchInterval = attrs.fetchInterval || options.defaultServiceFetchInterval;
      scope.betLinkFormat = options.betLinkFormat;

      fetchData();
      $interval(fetchData, fetchInterval);

      var isNextPlayRunning = false;
      //var currentPlay;
      var carouelStarted = false;

      function startCarousel() {
        carouelStarted = true;
        isNextPlayRunning = true;
        var match = elm.find('match');

        function switcher() {
          var currentOffset = parseInt(match.css('left'), 10);
          currentOffset -= 1;
          match.css('left', currentOffset + 'px');

          console.log(currentOffset + ' % 585 = ' + (currentOffset % 585 === 0));
          if (currentOffset % 585 === 0) {
            clearInterval(timer);
            isNextPlayRunning = false;
            setTimeout(startCarousel, 3000);
          }
        }

        var timer = setInterval(switcher, 10);
      }

      function fetchData() {
        $http.jsonp(options.serviceURL + '&callback=JSON_CALLBACK')
          .then(function(response) {
            callback(response.data);

          }, function(response) {
            console.log(JSON.stringify(response));
        });
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

        var singlePlayWidth = elm.find('cover').css('width');
        var matchWidth = parseInt(singlePlayWidth, 10) * newPlays.length;
        elm.find('match').css('width', matchWidth + 'px');

        (function check() {
          if (isNextPlayRunning) {
            $timeout(function () {
              scope.plays = newPlays;
            });

            if (!carouelStarted) {
              setTimeout(startCarousel, 300);
            }

          } else {
            setTimeout(check, 10);
          }
        })();
      }
    }
  };
}]);
