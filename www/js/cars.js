
angular.module('jaunter.cars', ['jaunter.shared'])

.controller('CarsCtrl', function($scope,CarSvc) {
  CarSvc.All().then(function(c) {
    $scope.Cars = c;
  });
})
.controller('CarCtrl', function($scope,$stateParams,CarSvc) {
  //$scope.car = angular.fromJson($stateParams.car); //funciona..pero noseqpedo con la vista
  $scope.car = CarSvc.Get($stateParams.carId);
})

.controller('CarFormCtrl', function($scope, $http,Constants){
  // POR ahora casi todos los campos son obligatorios...
  $scope.post= function(obj){
    $http.post(Constants.BaseUrl+"Autos?access_token="+Constants.TemporalToken,
     obj).then(function(response){
       console.log(response);
     });
  };
})

.factory('CarSvc',function($http,Constants){
  var url =Constants.BaseUrl;
  var cars;
  return {
    All: function() {
        return $http.get(url+"Autos?access_token="+Constants.TemporalToken)
         .then(function(response){
           cars = response.data;
           return cars;
         });
    },
    Get: function(carId) {
      ///Esto es propenso a error porque primero tengo q haber hecho el All
      ///pero no se cuando se desaparece el objeto cars
      if(!cars){
        this.All(); /////////mmmmmm
      } else {
        for (var i = 0; i < cars.length; i++) {
          if (cars[i].id === carId) {
            return cars[i];
          }
        };
      }
      return null;
    }
  };
});
