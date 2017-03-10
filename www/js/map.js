var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
var labelIndex = 0;
var markers =[];
var resultStr=[];
angular.module('jaunter.map',[])
.controller('OriginMapCtrl', function($scope){
  var ensenadaLatLng = new google.maps.LatLng(31.8544973,-116.6054236);
  var mapOptions = {
    center: ensenadaLatLng,
    zoom: 13,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  var map = new google.maps.Map(document.getElementById("map"), mapOptions);
    var geocoder = new google.maps.Geocoder();
  $scope.map = map;
  $scope.searchAddressMap = function(){
    geocodeAddress(geocoder, map,$scope);
  }
  $scope.editAddressMap = function(){
    deleteMarkers();
  }
  $scope.acceptMap = function(){
    var newMarker = markers[0];
    var origin = newMarker.position;
    geocodeLatLng(geocoder, map,origin);


  }


})
.controller('GoogleMapCtrl', function($scope){
  var ensenadaLatLng = new google.maps.LatLng(31.8544973,-116.6054236);
  var mapOptions = {
    center: ensenadaLatLng,
    zoom: 13,
    mapTypeId: google.maps.MapTypeId.ROADMAP};
    var map = new google.maps.Map(document.getElementById("googleRouteMap"), mapOptions);
    var directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer;
    calculateAndDisplayRouteGoogle(directionsService,directionsDisplay,"Valle Dorado Ensenada","CETYS ENSENADA");
    directionsDisplay.setMap(map);
    $scope.map = map;
  })
.controller('CustomMapCtrl', function($scope){
    var wayPoints=[];
    var ensenadaLatLng = new google.maps.LatLng(31.8544973,-116.6054236);
    var cetys = new google.maps.LatLng(31.8764534,-116.6564669);
    var valleDorado = new google.maps.LatLng(31.8402542,-116.6007235);
    var mapOptions = {
      center: ensenadaLatLng,
      zoom: 13,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var map = new google.maps.Map(document.getElementById("customRouteMap"), mapOptions);
    var cetysMarker = new google.maps.Marker({
      position: cetys,
      map: map
    });

    var originMarker = new google.maps.Marker({
      position: valleDorado,
      map: map
    });

    var directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer;
    map.addListener('click', function(e) {
      placeMarkerAndPanTo(e.latLng, map);
      wayPoints.push({location:e.latLng});
    });
    $scope.generateRoute = function(){
      calculateAndDisplayRoute(directionsService, directionsDisplay,wayPoints,valleDorado,cetys);
    }
    directionsDisplay.setMap(map);
    $scope.map = map;
})

function geocodeLatLng(geocoder,map,origin) {

  geocoder.geocode({'location': origin}, function(results, status) {

    if (status === google.maps.GeocoderStatus.OK) {
      if (results[1]) {
      resultStr.push(results[1].formatted_address);

      } else {
        alert ('No results found');
      }
    } else {
      alert( 'Geocoder failed due to: ' + status);
    }
  });

}
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
    map.panTo(latLng);
  }


  function geocodeAddress(geocoder, resultsMap) {
    var address = document.getElementById('inputAddress').value;
    geocoder.geocode({'address': address}, function(results, status) {
      if (status === google.maps.GeocoderStatus.OK) {
        resultsMap.setCenter(results[0].geometry.location);
        var marker = new google.maps.Marker({
          map: resultsMap,
          draggable: true,
          animation: google.maps.Animation.DROP,
          position: results[0].geometry.location
        });
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
