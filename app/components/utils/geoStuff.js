 var options = {
      enableHighAccuracy: false,
      timeout: 5000,
      maximumAge: 0
    };

module.exports = function(){

    return new Promise(function(resolve, reject){
        navigator.geolocation.getCurrentPosition(success, error, options);

        function success(pos) {
          var crd = pos.coords;
          resolve(crd);
        };

        function error(err) {
          console.warn('ERROR(' + err.code + '): ' + err.message);
          reject(err);
        };
    });
}


