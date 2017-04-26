var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
var labelIndex = 0;
var markers =[];
var resultStr=[];
var wayPoints=[];
angular.module('jaunter.map',[])
.directive("mapView", function() {
  return {    //La idea es hacer una directiva del mapa
  };
})
.controller('OriginMapCtrl', function($scope,$ionicHistory,TripFactory,ClickValidationFactory,$state){
  var ensenadaLatLng = new google.maps.LatLng(31.8544973,-116.6054236);
  var mapOptions = {center: ensenadaLatLng,zoom: 13,mapTypeId: google.maps.MapTypeId.ROADMAP};
  var map = new google.maps.Map(document.getElementById("originMap"), mapOptions);
  var geocoder = new google.maps.Geocoder();
  $scope.map = map;
  var address = document.getElementById('inputAddressOrigin');
  var school = document.getElementById('schoolSelectOrigin');
  address.addEventListener('change',function(){
    school.value="";
  });
  school.addEventListener('change',function(){
    address.value="";
  });
  $scope.searchAddressMap = function(){
    if(school.value=="" && address.value==""){
      alert("Selecciona almenos una opcion");
    }else if (school.value!="" && address.value=="") {
      console.log(school.value);
      geocodeAddress(geocoder, map,school.value);
    }else if (school.value=="" && address.value!="") {
      console.log(address.value);
      geocodeAddress(geocoder, map,address.value);
    }
    $scope.hidden = true;
  }
  $scope.editAddressMap = function(){
    deleteMarkers();
    $scope.hidden = false;
  }
  $scope.acceptMap = function(){
    var newMarker = markers[0];
    var origin = newMarker.position;
    geocoder.geocode({'location': origin}, function(results, status) {
      if (status === google.maps.GeocoderStatus.OK) {
        if (results[1]) {
          if(address.value!=""){
            TripFactory.originType = true;
          }else if(school.value!=""){
            TripFactory.originType = false;
          }
          //datos de localizacion
          TripFactory.origin = results[1].formatted_address;
          TripFactory.originLatLng = {
            "lat": results[1].geometry.location.lat(),
            "lng": results[1].geometry.location.lng()
          };
          //datos de ruta
          TripFactory.route.startpoint = {
            "lat": results[0].geometry.location.lat(),
            "lng": results[0].geometry.location.lng()
          };
          if(TripFactory.originLatLng!=null){
            $state.go("jaunter.destinationTrip");
          }else{
            alert("No se pudo guardar la direccion");
          }

        } else {
          TripFactory.origin = 'No results found';
        }
      } else {
        TripFactory.origin = 'Geocoder failed due to: ' + status;
      }

    });
    ClickValidationFactory.origin=true;
    // $ionicHistory.goBack();

  }
})
.controller('DestinationMapCtrl', function($scope,$ionicHistory,TripFactory,ClickValidationFactory,$state,BranchSvc){
  if(TripFactory.originType){
    $scope.schoolHide=false;
    $scope.zoneHide=true;
  }else {
    $scope.schoolHide=false;
    $scope.zoneHide=false;
  }

  BranchSvc.All().then(function(s) {
    $scope.branches = s;
  });

  var ensenadaLatLng = new google.maps.LatLng(31.8544973,-116.6054236);
  var mapOptions = {center: ensenadaLatLng,zoom: 13, mapTypeId: google.maps.MapTypeId.ROADMAP};
  var map = new google.maps.Map(document.getElementById("destinationMap"), mapOptions);
  var geocoder = new google.maps.Geocoder();
  $scope.map = map;
  var zone = document.getElementById('zoneSelectDestination');
  var school = document.getElementById('schoolSelectDestination');
  zone.addEventListener('change',function(){
    school.value="";
  });
  school.addEventListener('change',function(){
    zone.value="";
  });
$scope.searchAddressMap = function(){
  if (zone.value!="" && school.value==""){
    deleteMarkers();
    geocodeAddress(geocoder, map,zone.value);
  } else if (school.value!="" && zone.value=="") {
    deleteMarkers();
    geocodeAddress(geocoder, map,$scope.selectedHq.name); ////////////////////SE NECESITA UNA SUPER REFACTORIZACION
    TripFactory.hq = $scope.selectedHq;
  } else if (school.value!="" && zone.value!="") {
    zone.value="";
    school.value="";
    deleteMarkers();
    alert("Solo selecciona una opcion");
  }
  $scope.schoolHide=true;
  $scope.zoneHide=true;
  $scope.hidden = true;
}
$scope.editAddressMap = function(){
  if(TripFactory.originType){
    $scope.schoolHide=false;
    $scope.zoneHide=true;
  }else {
    $scope.schoolHide=false;
    $scope.zoneHide=false;
  }
  deleteMarkers();
  $scope.hidden = false;
}
$scope.acceptMap = function(){
    var newMarker = markers[0];
    var destination = newMarker.position;
    geocoder.geocode({'location': destination}, function(results, status) {
      if (status === google.maps.GeocoderStatus.OK) {
        if (results[1]) {
          //datos de localizacion
          TripFactory.destination = results[1].formatted_address;
          TripFactory.destinationLatLng = {
            "lat": results[1].geometry.location.lat(),
            "lng": results[1].geometry.location.lng()
          };
          //datos de ruta
          TripFactory.route.endpoint = {
            "lat": results[0].geometry.location.lat(),
            "lng": results[0].geometry.location.lng()
          };
          // if(TripFactory.destinationLatLng!="" && TripFactory.destinationLatLng!=""){
          $state.go("jaunter.googleRouteMap");
          //  }
        } else {
          TripFactory.destination = 'No results found';
        }
      } else {
        TripFactory.destination = 'Geocoder failed due to: ' + status;
      }
    });
    ClickValidationFactory.destination=true;
     // $ionicHistory.goBack();
  }
})
.controller('GoogleMapCtrl', function($scope,$ionicHistory,TripFactory,ClickValidationFactory,$state){
  var ensenadaLatLng = new google.maps.LatLng(31.8544973,-116.6054236);
  var mapOptions = {center: ensenadaLatLng,zoom: 13, mapTypeId: google.maps.MapTypeId.ROADMAP};
  var map = new google.maps.Map(document.getElementById("googleRouteMap"), mapOptions);
  var directionsService = new google.maps.DirectionsService;
  var directionsDisplay = new google.maps.DirectionsRenderer;
  //To do: revisar que TripFactory.route.startpoint y endpoint no esten vacios
  var origin = new google.maps.LatLng(TripFactory.route.startpoint.lat,TripFactory.route.startpoint.lng);
  var destination = new google.maps.LatLng(TripFactory.route.endpoint.lat,TripFactory.route.endpoint.lng);
  calculateAndDisplayRouteGoogle(directionsService,directionsDisplay,origin,destination);
  directionsDisplay.setMap(map);
  $scope.map = map;
  $scope.acceptRoute = function(){
    TripFactory.acceptedRoute = 'Ruta Aceptada';
    ClickValidationFactory.acceptedRoute=true;
    $state.go("jaunter.scheduleTrip");
    // $ionicHistory.goBack();
  }
})
.controller('searchPeopleCtrl',function($scope,$ionicHistory,$http,$ionicPopup){
  var ensenadaLatLng = new google.maps.LatLng(31.8544973,-116.6054236);
  var mapOptions = {center: ensenadaLatLng,zoom: 13,mapTypeId: google.maps.MapTypeId.ROADMAP};
  var map = new google.maps.Map(document.getElementById("searchPeopleMap"), mapOptions);
  $scope.hidden = false;
  map.addListener('click', function(e) {

    $scope.data = {};
    var rangePopup = $ionicPopup.show({
      template: '  <div class="item range"><i class="icon ion-ios-circle-outline"></i><input type="range" name="rangeInpt" min="100" max="500" value="300" ng-model="data.rangeInpt"><i class="icon ion-ios-circle-filled"></i></div><span>{{data.rangeInpt}} m</span>',
      title: 'Buscar',
      subTitle: 'Ingresa el rango de busqueda',
      scope: $scope,
      buttons: [
        { text: 'Cancelar' },
        {
          text: '<b>Aceptar</b>',
          type: 'button-positive',
          onTap: function(es) {
            if (!$scope.data.rangeInpt) {
              //don't allow the user to close unless he enters wifi password
              es.preventDefault();
            } else {
              var range = parseInt($scope.data.rangeInpt);
              placeMarkerAndRadius(e.latLng, map,range);
            }
          }
        }
      ]
    });

  });
  $scope.map = map;
  $scope.searchNearPeople = function(){

  };

})
.controller('CustomMapCtrl', function($scope,$ionicHistory,TripFactory,ClickValidationFactory,$ionicPopup,$state){
  var ensenadaLatLng = new google.maps.LatLng(31.8544973,-116.6054236);
  var mapOptions = {center: ensenadaLatLng,zoom: 13,mapTypeId: google.maps.MapTypeId.ROADMAP};
  var map = new google.maps.Map(document.getElementById("customRouteMap"), mapOptions);
  var destinationMarker = new google.maps.Marker({position: TripFactory.route.endpoint,map: map});
  var originMarker = new google.maps.Marker({position: TripFactory.route.startpoint,map: map});
  var directionsService = new google.maps.DirectionsService;
  var directionsDisplay = new google.maps.DirectionsRenderer;
  $scope.hidden=false;

  var alertPopup = $ionicPopup.alert({
    title: 'Instrucción',
    template: 'Da click en el mapa en los lugare clave de tu ruta'
  });

  alertPopup.then(function(res) {
    console.log('Thank you for not eating my delicious ice cream cone');
  });


  map.addListener('click', function(e) {
    placeMarkerAndPanTo(e.latLng, map);
    wayPoints.push({location:e.latLng});
  });
  $scope.generateRoute = function(){
    TripFactory.route.waypoints = wayPoints;
    calculateAndDisplayRoute(directionsService, directionsDisplay,wayPoints,TripFactory.route.startpoint,TripFactory.route.endpoint);
    $scope.hidden = true;
  }
  $scope.acceptRoute = function(){
    TripFactory.route.waypoints=wayPoints;
    TripFactory.acceptedRoute='Ruta Aceptada';
    ClickValidationFactory.acceptedRoute=true;
    $state.go("jaunter.scheduleTrip");
    // $ionicHistory.goBack(-2);
  }
  directionsDisplay.setMap(map);
  $scope.map = map;
});

function setMapOnAll(map) {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
  }

}
function clearMarkers() {
  setMapOnAll(null);
}
function deleteMarkers() {
  clearMarkers();
  markers = [];
}
function calculateAndDisplayRoute(directionsService, directionsDisplay,wayPoints,origin,destination) {
  directionsService.route({
    origin: origin,
    destination: destination,
    waypoints: wayPoints,
    optimizeWaypoints: true,
    travelMode: google.maps.TravelMode.DRIVING
  }, function(response, status) {
    if (status === google.maps.DirectionsStatus.OK) {
      directionsDisplay.setDirections(response);
    } else {
      window.alert('Directions request failed due to ' + status);
    }
  });
}
function placeMarkerAndPanTo(latLng, map) {
  var marker = new google.maps.Marker({
    position: latLng,
    map: map,
    animation: google.maps.Animation.DROP,
    label:labels[labelIndex++ % labels.length]
  });
  map.setZoom(15);
  map.panTo(latLng);
}
function placeMarkerAndRadius(latLng, map,range) {
  var marker = new google.maps.Marker({
    position: latLng,
    map: map,
    animation: google.maps.Animation.DROP,
    label:labels[labelIndex++ % labels.length]
  });
  map.setZoom(15);
  // Add circle overlay and bind to marker
  var circle = new google.maps.Circle({
    map: map,
    center:latLng,
    strokeColor: '#656565',
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: '#656565',
    fillOpacity: 0.35,
    radius: range    // metres

  });
  circle.bindTo('center', marker, 'position');
  map.panTo(latLng);
}


function geocodeAddress(geocoder, resultsMap,address) {
  geocoder.geocode({'address': address}, function(results, status) {
    if (status === google.maps.GeocoderStatus.OK) {
      resultsMap.setCenter(results[0].geometry.location);
      var marker = new google.maps.Marker({
        map: resultsMap,
        draggable: true,
        animation: google.maps.Animation.DROP,
        position: results[0].geometry.location
      });
      resultsMap.setZoom(15);
      markers.push(marker);

    } else {

      // alert('Geocode was not successful for the following reason: ' + status);
    }

  });
}
function calculateAndDisplayRouteGoogle(directionsService, directionsDisplay,origin,destination) {
  directionsService.route({
    origin: origin,
    destination: destination,
    optimizeWaypoints: true,
    travelMode: google.maps.TravelMode.DRIVING
  }, function(response, status) {
    if (status === google.maps.DirectionsStatus.OK) {
      directionsDisplay.setDirections(response);

    } else {
      window.alert('Directions request failed due to ' + status);
    }
  });}
