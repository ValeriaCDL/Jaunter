angular.module('jaunter.routes', [])

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('jaunter', {
    url: '/jaunter',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('jaunter.home', {
    url: '/Home',
    views: {
      'menuContent': {
        templateUrl: 'index.html'
      }
    }
  })
  .state('jaunter.profile', {
      url: '/Profile',
      views: {
        'menuContent': {
          templateUrl: 'templates/profile.html'
        }
      }
    })
  .state('jaunter.trips', {
      url: '/Trips',
      views: {
        'menuContent': {
          templateUrl: 'templates/trips.html',
          controller:'TripsCtrl'
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
      .state('jaunter.originTrip', {
          url: '/originTrip',
          views: {
            'menuContent': {
              templateUrl: 'templates/originMap.html',
              controller: 'OriginMapCtrl'
            }
          }
        })
        .state('jaunter.destinationTrip', {
            url: '/destinationTrip',
            views: {
              'menuContent': {
                templateUrl: 'templates/destinationMap.html',
                controller: 'DestinationMapCtrl'
              }
            }
          })
        .state('jaunter.googleRouteMap', {
            url: '/googleRouteMap',
            views: {
              'menuContent': {
                templateUrl: 'templates/googleRouteMap.html',
                controller: 'GoogleMapCtrl'
              }
            }
          })
    .state('jaunter.customRouteMap', {
        url: '/customRouteMap',
        views: {
          'menuContent': {
      templateUrl: 'templates/customRouteMap.html',
          controller: 'CustomMapCtrl'
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
          controller: 'CarCtrl'
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
  $urlRouterProvider.otherwise('/jaunter/Trips');
});
