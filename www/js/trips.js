
angular.module('jaunter.trips', ['ionic-timepicker'])

.controller('TripCtrl', function($scope){
  $scope.slots = {epochTime: 12600, format: 12, step: 15};

  $scope.timePickerCallback = function (val) {
    if (typeof (val) === 'undefined') {
      console.log('Time not selected');
    } else {
      console.log('Selected time is : ', val);	// `val` will contain the selected time in epoch
    }
  };
})
