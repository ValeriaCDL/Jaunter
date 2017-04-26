
angular.module('jaunter.trips', ['ionic-timepicker'])

.controller('TripCtrl', function($scope,TripFactory,ClickValidationFactory,$state,$ionicPopup,TripSvc){
  $scope.trip = TripFactory;
  $scope.hidden=false;
  $scope.slots = {epochTime: 43200, format: 12, step: 5};
  $scope.trip.days ={lun:false,mar:false,mie:false,jue:false,vie:false,sab:false,dom:false};
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
      if(ClickValidationFactory.departureTime
        && ClickValidationFactory.arrivalTime
        && ClickValidationFactory.origin
        && ClickValidationFactory.destination
        && ClickValidationFactory.acceptedRoute)
        {
          $scope.hidden=false;
          //como que este if no entra
          TripFactory.isPopulated = true;
        }
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

      if(ClickValidationFactory.departureTime
        && ClickValidationFactory.arrivalTime
        && ClickValidationFactory.origin
        && ClickValidationFactory.destination
        && ClickValidationFactory.acceptedRoute)
        {
          $scope.hidden=false;
          //este si entra
          TripFactory.isPopulated = true;
        }
    }
  };
  $scope.add = function (){
    TripSvc.Create();
    $state.go('jaunter.trips', {}, {reload: true});
  };
  $scope.validClick = function(event){
    switch (event.target.id) {
      case 'destinationBtn':
      if(ClickValidationFactory.origin){
        $state.go("jaunter.destinationTrip");
      }else{
        var alertPopup = $ionicPopup.alert({
          title: 'Alerta',
          template: 'Debes tener ingresado Origen'
        });
      }
      break;
      case 'routeBtn':
      if(ClickValidationFactory.destination){
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
  };

})
.controller('TripListCtrl',function($scope,TripSvc,$state,$ionicPopup,TripFactory){
  TripSvc.All().then(function(c) {
    $scope.trips = c;
  });
  $scope.userTypePopup = function(){
    $scope.data = {};
    var typePopup = $ionicPopup.show({
      template: '<ion-toggle ng-model="data.driver" toggle-class="toggle-balanced">Conductor</ion-toggle><ion-toggle ng-model="data.passenger" toggle-class="toggle-balanced">Pasajero</ion-toggle>',
      title: 'Tipo de usuario',
      scope: $scope,
      buttons: [
        { text: 'Cancelar' },
        {
          text: '<b>Aceptar</b>',
          type: 'button-positive',
          onTap: function(es) {
            if (!$scope.data.driver && !$scope.data.passenger) {
              es.preventDefault();
            } else {
              if($scope.data.driver == true && $scope.data.passenger==undefined){
                TripFactory.userType = true;
                $state.go("jaunter.originTrip");
              console.log("Driver "+$scope.data.driver);
            }else if ($scope.data.driver == undefined && $scope.data.passenger== true) {
                TripFactory.userType = false;
                $state.go("jaunter.originTrip");
                console.log("passenger"+$scope.data.passenger);
            } else if ($scope.data.driver == true && $scope.data.passenger== true) {
              alert("Solo debes elegir una opción");
            }

            }
          }
        }
      ]
    });
  }
})
.factory('TripFactory', function(){
  var trip = {
    days:{}, //en el api es un array, lo cambio justo antes de guardarlo //POR HACER: cambiarlo de regreso
    userType:true, //true=conductor, false=pasajero
    origin:'', //el nombre del origen (colonia)
    originLatLng: {}, //results[1] de google (la colonia) para la localizacion
    destination:'', //el nombre del destino (colonia)
    destinationLatLng:{}, //results[1] de google (la colonia) para la localizacion
    route:{
      startpoint:{    //results[0] de google (la calle) para la ruta
        "lat": "",
        "lng": ""
      },
      endpoint:{  //results[0] de google (la calle) para la ruta
        "lat": "",
        "lng": ""
      },
      waypoints:null  //por si el usuario hace su propia ruta que no es la generada por google
    },
    acceptedRoute:'',
    departureTime:'',
    departureTimeText:'',
    arrivalTime:'',
    arrivalTimeText:'',
    isPopulated:false, //bandera de validacion de todos los campos
    originType:true, //true = el origen es diferente de sede
    hq:{} //El objeto sede (o localizacion) que elija el usuario
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
})
.factory('TripSvc',function($http,Constants,TripFactory,LocationSvc,BranchSvc){
  var url =Constants.BaseUrl+"Trips";
  var trip, location, hq; //hq es la branch

  var create = function(){
    //1.TripFactory ya debe estar lleno
    if(!TripFactory.isPopulated)
      return;

    //2.La sede ya debe estar creada solo tomo el objeto de la seleccion del usuario
    //POR HACER: Que pueda intercalarse entre origen y destino
    hq = TripFactory.hq;

    //3.Busco o creo el objeto localizacion
    location = {
    "name": TripFactory.origin,
    "coordinates": TripFactory.originLatLng
    };
    LocationSvc.Find(location["name"]).then(function(response) {
      if(response){
        location = response;
        makeTrip();
      } else {
        LocationSvc.Create(location).then(function(response) {
          location = response;
          makeTrip();
        });
      }
    });

    //4. Ligo mis datos y location y sede a viaje
    var makeTrip = function(){
      //preparo los datos...
      var t1 = TripFactory.origin.split(","); t1.pop();t1.pop();t1.pop();
      var t2 = TripFactory.destination.split(","); t2.pop();t2.pop();t2.pop();
      var dayResult;
      if (!(TripFactory.days instanceof Array)){ //si no es un array...
        // var TripFactory.days = {"lun": false,"mar": false,"mie": true...}
        function hasDay(element) {
            return TripFactory.days[element] == true;
        }
        dayResult = Object.keys(TripFactory.days).filter(hasDay); //["mie"]
      } else {
        dayResult=TripFactory.days;
      }
      trip = {
          "name":t1+" a "+t2,
          "days": dayResult,
          "departure_time": TripFactory.departureTimeText,
          "arrival_time": TripFactory.arrivalTimeText,
          "user_type": TripFactory.userType,
          "route": TripFactory.route,
          "id_origin": location["id"], //debe ser location o branch (sucursal/sede)
          "id_destination": hq["id"], //debe ser localizacion o sede
          "id_jaunter-user": "59001f2abe885c0011a4772e", //mmm..arreglar luego..
          "id_institution": "59001e5bbe885c0011a4772c"
        };
        saveTrip(trip).then(function(response) {
          trip = response;
          console.log("Trip created Succesfully");
        });
    };
  };

  var saveTrip = function(data) {
    return $http.post(url+"?access_token="
      +Constants.TemporalToken,data)
    .then(function(r){return r.data;}
      ,function(err){ return err.data; });
  };

  //No se si funciona :S no lo he probado no se donde
  var coincidences = function(tripData){
    return $http.get(url+"/coincidences?trip="+tripData+"&access_token="+Constants.TemporalToken)
    .then(function(response){
      console.log(response.data);
      for(var trip in response.data){
        console.log(trip["name"]);
      }
    });
  };

  return {
    ///POR HACER: debo regresar todas, pero con el filtro del usuario
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
      });
    },
    Create: create,
    GetCoincidence: coincidences
  };
});
