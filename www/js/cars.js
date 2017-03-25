var cars=[];
angular.module('jaunter.cars', ['jaunter.shared'])

.controller('CarsCtrl', function($scope,CarSvc,$state,$ionicPopup) {

  CarSvc.All().then(function(c) {
    // console.log(c);
    $scope.Cars = c;
    for(var current=0;current<c.length;current++){
      cars.push(c[current]);
      console.log(c[current]);
    }
  });
  $scope.detailCar =function (event){
    var id = event.target.id;
    console.log(id);
    // $scope.data = {};

 // An elaborate, custom popup
 // var myPopup = $ionicPopup.show({
 //   template:
 //    '<p><strong>Marca: </strong></p>'+car[id],
 //   title: 'Enter Wi-Fi Password',
 //   subTitle: 'Please use normal things',
 //   scope: $scope,
 //   buttons: [
 //     { text: 'Cancel' },
 //     {
 //       text: '<b>Save</b>',
 //       type: 'button-positive',
 //       onTap: function(e) {
 //         if (!$scope.data.wifi) {
 //           //don't allow the user to close unless he enters wifi password
 //           e.preventDefault();
 //         } else {
 //           return $scope.data.wifi;
 //         }
 //       }
 //     }
 //   ]
 // });
  }
})
.controller('CarCtrl', function($scope,$stateParams,CarSvc) {
  //$scope.car = angular.fromJson($stateParams.car); //funciona..pero noseqpedo con la vista
  $scope.car = CarSvc.Get($stateParams.carId);

})

.controller('CarCtrl', function($scope, $http,Constants,CarValidationFactory){
  // POR ahora casi todos los campos son obligatorios...
  $scope.hidden=true;
  $scope.checkInput = function(event){

    var input = document.getElementById(event.target.id).value;
    // console.log(event.target.id);
    var regStr = /^([A-z]{2,15})$/i;
    var regNum = /^([0-9]{3,4})$/i;
    switch (event.target.id) {
      case 'brandInput':
      if(regStr.test(input)) {
        CarValidationFactory.brand=true;
        // console.log('Brand'+' Paso');
      }
      break;
      case 'modelInput':
      if(regStr.test(input)) {
        CarValidationFactory.model=true;
        // console.log('Model'+' Paso');
      }
      break;
      case 'yearInput':
      if(input!='') {
        CarValidationFactory.year=true;
        // console.log('Year'+' Paso');
      }
      break;
      case 'colorInput':
      if(input!='') {
        CarValidationFactory.color=true;
        // console.log('Color'+' Paso');
      }
      break;
      case 'seatInput':
      if(input!='') {
        CarValidationFactory.seat=true;
        // console.log('Seat'+' Paso');
      }
      break;
      case 'descriptionInput':
      if(input!='') {
        CarValidationFactory.description=true;
        // console.log('description'+' Paso');
      }
      break;
      default:

    }
    if(CarValidationFactory.brand==true && CarValidationFactory.model==true && CarValidationFactory.year==true && CarValidationFactory.year==true && CarValidationFactory.seat==true && CarValidationFactory.description==true){
      $scope.hidden =false;
    }

  }
  $scope.post= function(obj){
    $http.post(Constants.BaseUrl+"Autos?access_token="+Constants.TemporalToken,
    obj).then(function(response){
      console.log(response);
    });
  }
})
.factory('CarValidationFactory', function(){
  var valid = {
    brand:false,
    model:false,
    year:false,
    color:false,
    seat:false,
    description:false
  };
  return valid;
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
