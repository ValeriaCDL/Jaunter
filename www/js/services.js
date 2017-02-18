angular.module('jaunter.services', [])

.factory('CarService',function($http){
  var url ="https://enigmatic-river-82723.herokuapp.com/api/"
  return {
    Get: function() {
        return $http.get(url+"Autos?access_token=nSUwbIVzPQRFISVFxhWKTGs6JwBPiixgaJ6bGGIGw0t44PSMFNEqCI2jnBjqz2SA")
         .then(function(response){
           //console.log(response);
           return response.data;
         });
    }
  };
});
