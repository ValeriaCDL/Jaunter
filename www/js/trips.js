
angular.module('jaunter.trips', ['ionic-timepicker'])

.controller('TripCtrl', function($scope,TripFactory,ClickValidationFactory,$state,$ionicPopup,TripSvc){
  $scope.trip = TripFactory;
  $scope.hidden=true;
  $scope.slots = {epochTime: 12600, format: 12, step: 5};
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
.controller('TripsCtrl',function($scope,TripSvc){
  TripSvc.All().then(function(c) {
    $scope.trips = c;
  });
})
.factory('TripFactory', function(){
  var trip = {
    days:{},
    userType:true, //true=conductor, false=pasajero
    origin:'',
    originLatLng:'',
    simpleOriginLatLng: {},
    destination:'',
    destinationLatLng:'',
    route:{
      startpoint:{
        "lat": "",
        "lng": ""
      },
      endpoint:{
        "lat": "",
        "lng": ""
      },
      waypoints:null
    },
    acceptedRoute:'',
    departureTime:'',
    departureTimeText:'',
    arrivalTime:'',
    arrivalTimeText:'',
    isPopulated:false
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
.factory('TripSvc',function($http,Constants,TripFactory,LocalizationSvc,SessionSvc,HqSvc){
  var url =Constants.BaseUrl;
  var trip, localization, hq, session; //hq es la sede

  var create = function(){
	//Evitar viajes por cambios en BD
	return;
    //config_sesion (viaje) tiene una sesion,
    //y esa sesión tiene una localización y una sede, entonces:
    //1.TripFactory ya debe estar lleno
    if(!TripFactory.isPopulated)
      return;
    //2.Creo el objeto localizacion (la api esta en espa;ol y esos son los nombres)
    //POR HACER: verificar que el objeto no esta ya creado
    localization = {
    "nombre": TripFactory.origin,
    "coordenadas": TripFactory.simpleOriginLatLng
    };
    LocalizationSvc.Create(localization).then(function(response) {
      localization = response;
      //3.La sede ya debe estar creada solo tomo el id de.. cuando pongamos a elegir al usuario
      //es el Cetys Ensenada
      //en este caso el destino es la sede
      HqSvc.Get("571587029bbd43cf34ca5793").then(function(response) {
        hq = response;
        //4.ligo sede y localizacion con mi sesion
        session = {
        "ruta":{ "waypoints":TripFactory.route.waypoints},
        "id_localizacion": localization["id"],
        "id_sede": hq["id"]
        };
        SessionSvc.Create(session).then(function(response) {
          session = response;
          //5.ligo mi sesion con mi config_sesion (viaje)
          var t1 = TripFactory.origin.split(","); t1.pop();t1.pop();
          var t2 = TripFactory.destination.split(","); t2.pop();t2.pop();

          trip = {
          "nombre":t1+" a "+t2,
          "dias":TripFactory.days,
          "hora_salida": TripFactory.departureTimeText,
          "hora_llegada": TripFactory.arrivalTimeText,
          "tipo_usuario": TripFactory.userType,
          "id_usuario": "5714434c429d899231431566", //no se quien es pero es requerido
          "id_institucion": hq["id_institucion"],
          "id_sesion": session["id"]
          };
          //no se como guardar la ruta.. ni siquiera se cual es el objeto o array de las rutas... :C
          saveTrip(trip).then(function(response) {
            trip = response;
            return trip; //lo regreso??
          }); //trip
        }); //session
      }); //hq
    }); //localization

  };

  var saveTrip = function(data) {
    return $http.post(url+"Config_Sesions?access_token="
      +Constants.TemporalToken,data)
    .then(function(r){return r.data;}
      ,function(r){ return "Error:"+r.error; });
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
    Create: create  //la funcion definida arriba
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
    Create: function(data) {
      return $http.post(url+"Localizaciones?access_token="
        +Constants.TemporalToken,data)
      .then(function(r){return r.data;}
        ,function(r){ return "Error:"+r; });
    }
  };
})
.factory('SessionSvc',function($http,Constants){
  var url =Constants.BaseUrl;
  return {
    All: function() {
      return $http.get(url+"Sesiones?access_token="+Constants.TemporalToken)
      .then(function(response){
        return response.data;
      });
    },
    Get: function(id) {
      return $http.get(url+"Sesiones/"+id+"?access_token="+Constants.TemporalToken)
      .then(function(response){
        return response.data;
      });
    },
    Create: function(data) {
      return $http.post(url+"Sesiones?access_token="
        +Constants.TemporalToken,data)
      .then(function(r){return r.data;}
        ,function(r){ return "Error:"+r.error; });
    }
  };
});
