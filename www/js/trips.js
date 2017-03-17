
angular.module('jaunter.trips', ['ionic-timepicker'])

.controller('TripCtrl', function($scope,TripFactory,ClickValidationFactory,$state,$ionicPopup){
  $scope.trip = TripFactory;
  $scope.hidden=true;
  $scope.slots = {epochTime: 12600, format: 12, step: 5};
  $scope.departureTimeCallback = function (val) {
    if (typeof (val) === 'undefined') {
      console.log('Time not selected');
    } else {
      var selectedTime = new Date(val * 1000);
      TripFactory.departureTime=val;
      switch (selectedTime.getUTCHours()) {
        case 13:
        TripFactory.departureTimeText= '1 : '+selectedTime.getUTCMinutes()+' PM';
        break;
        case 14:
        TripFactory.departureTimeText= '2 : '+selectedTime.getUTCMinutes()+' PM';
        break;
        case 15:
        TripFactory.departureTimeText= '3 : '+selectedTime.getUTCMinutes()+' PM';
        break;
        case 16:
        TripFactory.departureTimeText= '4 : '+selectedTime.getUTCMinutes()+' PM';
        break;
        case 17:
        TripFactory.departureTimeText= '5 : '+selectedTime.getUTCMinutes()+' PM';
        break;
        case 18:
        TripFactory.departureTimeText= '6 : '+selectedTime.getUTCMinutes()+' PM';
        break;
        case 19:
        TripFactory.departureTimeText= '7 : '+selectedTime.getUTCMinutes()+' PM';
        break;
        case 20:
        TripFactory.departureTimeText= '8 : '+selectedTime.getUTCMinutes()+' PM';
        break;
        case 21:
        TripFactory.departureTimeText= '9 : '+selectedTime.getUTCMinutes()+' PM';
        break;
        case 22:
        TripFactory.departureTimeText= '10 : '+selectedTime.getUTCMinutes()+' PM';
        break;
        case 23:
        TripFactory.departureTimeText= '11 : '+selectedTime.getUTCMinutes()+' PM';
        break;
        case 24:
        TripFactory.departureTimeText= '12 : '+selectedTime.getUTCMinutes()+' AM';
        break;
        default:
        TripFactory.departureTimeText= selectedTime.getUTCHours()+' : '+selectedTime.getUTCMinutes()+' AM';
        break;

      }
      ClickValidationFactory.departureTime=true;
      if(ClickValidationFactory.departureTime==true && ClickValidationFactory.arrivalTime==true && ClickValidationFactory.origin==true && ClickValidationFactory.destination==true && ClickValidationFactory.acceptedRoute){ $scope.hidden=false;}
    }
  };
  $scope.arrivalTimeCallback = function (val) {
    if (typeof (val) === 'undefined') {
      console.log('Time not selected');
    } else {
      var selectedTime = new Date(val * 1000);
      TripFactory.arrivalTime=val;
      switch (selectedTime.getUTCHours()) {
        case 13:
        TripFactory.arrivalTimeText= '1 : '+selectedTime.getUTCMinutes()+' PM';
        break;
        case 14:
        TripFactory.arrivalTimeText= '2 : '+selectedTime.getUTCMinutes()+' PM';

        break;
        case 15:
        TripFactory.arrivalTimeText= '3 : '+selectedTime.getUTCMinutes()+' PM';
        break;
        case 16:
        TripFactory.arrivalTimeText= '4 : '+selectedTime.getUTCMinutes()+' PM';
        break;
        case 17:
        TripFactory.arrivalTimeText= '5 : '+selectedTime.getUTCMinutes()+' PM';

        break;
        case 18:
        TripFactory.arrivalTimeText= '6 : '+selectedTime.getUTCMinutes()+' PM';
        break;
        case 19:
        TripFactory.arrivalTimeText= '7 : '+selectedTime.getUTCMinutes()+' PM';
        break;
        case 20:
        TripFactory.arrivalTimeText= '8 : '+selectedTime.getUTCMinutes()+' PM';
        break;
        case 21:
        TripFactory.arrivalTimeText= '9 : '+selectedTime.getUTCMinutes()+' PM';
        break;
        case 22:
        TripFactory.arrivalTimeText= '10 : '+selectedTime.getUTCMinutes()+' PM';
        break;
        case 23:
        TripFactory.arrivalTimeText= '11 : '+selectedTime.getUTCMinutes()+' PM';
        break;
        case 24:
        TripFactory.arrivalTimeText= '12 : '+selectedTime.getUTCMinutes()+' AM';
        break;
        default:  TripFactory.arrivalTimeText= selectedTime.getUTCHours()+' : '+selectedTime.getUTCMinutes()+' AM';
        break;

      }
      ClickValidationFactory.arrivalTime=true;

      if(ClickValidationFactory.departureTime==true && ClickValidationFactory.arrivalTime==true && ClickValidationFactory.origin==true && ClickValidationFactory.destination==true && ClickValidationFactory.acceptedRoute){ $scope.hidden=false;}
    }
  };
  $scope.checkObj = function (){
    console.log(TripFactory);
  }
  $scope.validClick = function(event){
    switch (event.target.id) {
      case 'destinationBtn':
      if(ClickValidationFactory.origin==true){
        $state.go("jaunter.destinationTrip");
      }else{
        var alertPopup = $ionicPopup.alert({
          title: 'Alerta',
          template: 'Debes tener ingresado Origen'
        });
      }
      break;
      case 'routeBtn':
      if(ClickValidationFactory.destination==true){
        $state.go("jaunter.googleRouteMap");
      }else{
        var alertPopup = $ionicPopup.alert({
          title: 'Alerta',
          template: 'Debes tener ingresados Origen y Destino'
        });
      }
      break;

      default:

    }


  }
})
.factory('TripFactory', function(){
  var trip = {
    origin:'',
    originLatLng:'',
    destination:'',
    destinationLatLng:'',
    waypoints:'',
    acceptedRoute:'',
    departureTime:'',
    departureTimeText:'',
    arrivalTime:'',
    arrivalTimeText:''
  };
  return trip;
})
.factory('ClickValidationFactory', function(){

  var valid = {
    origin:false,
    destination:false,
    acceptedRoute:false,
    departureTime:false,
    arrivalTime:false
  };
  return valid;
});
