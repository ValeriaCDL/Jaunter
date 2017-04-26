var cars=[];
angular.module('jaunter.cars', ['jaunter.shared'])

.controller('CarListCtrl', function($scope,CarSvc,$state,$ionicPopup) {

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
  }
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
  // $scope.post= function(obj){
  //   $http.post(Constants.BaseUrl+"Autos?access_token="+Constants.TemporalToken,
  //   obj).then(function(response){
  //     console.log(response);
  //   });
  // }
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
  var url =Constants.BaseUrl+"Cars";
  return {
    All: function() {
      return $http.get(url+"?access_token="+Constants.TemporalToken)
      .then(function(response){
        return response.data;
      });
    },
    Get: function(id) {
      return $http.get(url+"/"+id+"?access_token="+Constants.TemporalToken)
      .then(function(response){
        return response.data;
      },function(err){ return err.data });
    },
    Create: function(data) {
      return $http.post(url+"?access_token="
        +Constants.TemporalToken,data)
      .then(function(r){return r.data;}
        ,function(err){ return err.data; });
    }
  };
});
