angular.module('jaunter.shared', [])

.factory('Constants',function(){
  return {
    BaseUrl: "https://enigmatic-river-82723.herokuapp.com/api/",
    TemporalToken: "eqU8zv65cVBsFBrYzcp4dRyqyC0QlETgDJVcDb8KYhTGoXMZVNMTz8i1JVP4IPmZ"
  };
})
.factory('BranchSvc',function($http,Constants){
  var url =Constants.BaseUrl+"Branches";
  return {
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
      },function(err){ return err.data });
    }
  };
})
.factory('LocationSvc',function($http,Constants){
  var url =Constants.BaseUrl+"Locations";
  return {
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
    Find: function(name) {
      var query = '{"where":{"nombre":"'+name+'"}}';
      return $http.get(url+"/findOne?filter="+query+"&access_token="+Constants.TemporalToken)
      .then(function(r){return r.data;}
        ,function(err){ console.log(err.data); return null;});
    },
    Create: function(data) {
      return $http.post(url+"?access_token="
        +Constants.TemporalToken,data)
      .then(function(r){return r.data;}
        ,function(err){ return err.data; });
    }
  };
});
