
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
.controller('TripsCtrl',function($scope,TripSvc,$state,$ionicPopup,TripFactory){
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
.factory('TripSvc',function($http,Constants,TripFactory,LocalizationSvc,HqSvc){
  var url =Constants.BaseUrl;
  var trip, localization, hq; //hq es la sede

  var create = function(){
    //config_sesion (viaje) tiene una sede y una localización (o sede y sede), entonces:
    //1.TripFactory ya debe estar lleno
    if(!TripFactory.isPopulated)
      return;

    //2.La sede ya debe estar creada solo tomo el objeto de la seleccion del usuario
    //POR HACER: Que pueda intercalarse entre origen y destino
    hq = TripFactory.hq;

    //3.Busco o creo el objeto localizacion
    localization = {
    "nombre": TripFactory.origin,
    "coordenadas": TripFactory.originLatLng
    };
    LocalizationSvc.Find(localization["nombre"]).then(function(response) {
      if(response){
        localization = response;
        makeTrip();
      } else {
        LocalizationSvc.Create(localization).then(function(response) {
          localization = response;
          makeTrip();
        });
      }
    });

    //4. Ligo mis datos y localization y sede a viaje
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
          "nombre":t1+" a "+t2,
          "dias": dayResult,
          "hora_salida": TripFactory.departureTimeText,
          "hora_llegada": TripFactory.arrivalTimeText,
          "tipo_usuario": TripFactory.userType,
          "ruta": TripFactory.route,
          "id_origen": localization["id"], //debe ser localizacion o sede
          "id_destino": hq["id"], //debe ser localizacion o sede
          "id_usuario": "57144936499020ce31940fc3", //mmm..arreglar luego..
          "id_institucion": "57140c13b1e821443037b692"
        };
        saveTrip(trip).then(function(response) {
          trip = response;
          console.log("Trip created Succesfully");
        });
    };
  };

  var saveTrip = function(data) {
    return $http.post(url+"Config_Sesions?access_token="
      +Constants.TemporalToken,data)
    .then(function(r){return r.data;}
      ,function(r){ return "Error:"+r.error; });
  };

  //No se si funciona :S no lo he probado no se donde
  var coincidences = function(tripData){
    return $http.get(url+"Config_Sesions/coincidencias?viaje="+tripData+"&access_token="+Constants.TemporalToken)
    .then(function(response){
      console.log(response.data);
      for(var trip in response.data){
        console.log(trip["nombre"]);
      }
    });
  };

  return {
    ///POR HACER: debo regresar todas, pero con el filtro del usuario
    All: function() {
      return $http.get(url+"Config_Sesions?access_token="+Constants.TemporalToken)
      .then(function(response){
        return response.data;
      });
    },
    Get: function(id) {
      return $http.get(url+"Config_Sesions/"+id+"?access_token="+Constants.TemporalToken)
      .then(function(response){
        return response.data;
      });
    },
    Create: create,  //la funcion definida arriba
    GetCoincidence: coincidences
  };
})
.factory('HqSvc',function($http,Constants){
  var url =Constants.BaseUrl;
  return {
    All: function() {
      return $http.get(url+"Sedes?access_token="+Constants.TemporalToken)
      .then(function(response){
        return response.data;
      });
    },
    Get: function(id) {
      return $http.get(url+"Sedes/"+id+"?access_token="+Constants.TemporalToken)
      .then(function(response){
        return response.data;
      },function(r){ return "Error:"+r; });
    }
  };
})
.factory('LocalizationSvc',function($http,Constants){
  var url =Constants.BaseUrl;
  return {
    All: function() {
      return $http.get(url+"Localizaciones?access_token="+Constants.TemporalToken)
      .then(function(response){
        return response.data;
      });
    },
    Get: function(id) {
      return $http.get(url+"Localizaciones/"+id+"?access_token="+Constants.TemporalToken)
      .then(function(response){
        return response.data;
      });
    },
    Find: function(name) {
      var query = '{"where":{"nombre":"'+name+'"}}';
      return $http.get(url+"Localizaciones/findOne?filter="+query+"&access_token="+Constants.TemporalToken)
      .then(function(r){return r.data;}
        ,function(err){ console.log(err.data); return null;});
    },
    Create: function(data) {
      return $http.post(url+"Localizaciones?access_token="
        +Constants.TemporalToken,data)
      .then(function(r){return r.data;}
        ,function(err){ return err.data; });
    }
  };
});
