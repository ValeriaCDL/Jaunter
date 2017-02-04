angular.module('jaunter.services', ['ngResource'])

.factory('Carros', function($resource){
        return $resource('raw/'+'carros.json');
});
