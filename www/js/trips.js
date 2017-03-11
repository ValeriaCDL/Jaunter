
angular.module('jaunter.trips', ['ionic-timepicker'])

.controller('TripCtrl', function($scope,TripFactory){

 $scope.trip = TripFactory;

  $scope.slots = {epochTime: 12600, format: 12, step: 15};

  $scope.timePickerCallback = function (val) {
    if (typeof (val) === 'undefined') {
      console.log('Time not selected');
    } else {
      console.log('Selected time is : ', val);	// `val` will contain the selected time in epoch
    }
  };
})
.factory('TripFactory', function(){

  var trip = {
    origin:'',
    destination:'',
    route:'',
    departureTime:'',
    arrivalTime:''
  };

  return trip;
});
