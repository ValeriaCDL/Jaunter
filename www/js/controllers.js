angular.module('jaunter.controllers', ['ionic-timepicker'])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('CarsCtrl', function($scope,$http) {
  // $scope.Cars = [
  //   { title: 'Honda', id: 1 },
  //   { title: 'Mazda', id: 2 },
  //   { title: 'Mitsubishi', id: 3 },
  //   { title: 'Ford', id: 4 },
  //   { title: 'Renault', id: 5 },
  //   { title: 'Otro', id: 6 }
  // ];

  $http.get("https://enigmatic-river-82723.herokuapp.com/api/Autos?access_token=nSUwbIVzPQRFISVFxhWKTGs6JwBPiixgaJ6bGGIGw0t44PSMFNEqCI2jnBjqz2SA")
  .then(function(response){
    $scope.Cars = response.data;
  })
})

.controller('CarCtrl', function($scope, $stateParams) {
})

.controller('TripCtrl', function($scope){
  $scope.slots = {epochTime: 12600, format: 12, step: 15};

  $scope.timePickerCallback = function (val) {
    if (typeof (val) === 'undefined') {
      console.log('Time not selected');
    } else {
      console.log('Selected time is : ', val);	// `val` will contain the selected time in epoch
    }
  };
});
