angular.module('jaunter.routes', [])

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('jaunter', {
    url: '/jaunter',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('jaunter.search', {
    url: '/search',
    views: {
      'menuContent': {
        templateUrl: 'templates/search.html'
      }
    }
  })

  .state('jaunter.Trips', {
      url: '/Trips',
      views: {
        'menuContent': {
          templateUrl: 'templates/trips.html'
        }
      }
    })
    .state('jaunter.addTrip', {
        url: '/addTrip',
        views: {
          'menuContent': {
            templateUrl: 'templates/addtrip.html',
            controller: 'TripCtrl'
          }
        }
      })
    .state('jaunter.cars', {
      url: '/Cars',
      views: {
        'menuContent': {
          templateUrl: 'templates/Cars.html',
          controller: 'CarsCtrl'
        }
      }
    })

    .state('jaunter.addCar', {
      url: '/addCar',
      views: {
        'menuContent': {
          templateUrl: 'templates/addcar.html',
          controller: 'CarFormCtrl'
        }
      }
    })

  .state('jaunter.car', {
    url: '/Cars/:carId',
    views: {
      'menuContent': {
        templateUrl: 'templates/car.html',
        controller: 'CarCtrl'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/jaunter/Cars');
});
