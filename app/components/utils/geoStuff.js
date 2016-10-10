 var options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };

console.log('geostuff.js has run')
alert("geostuff.js has run")
module.exports = function(){

    return new Promise(function(resolve, reject){
      console.log('geostuff.js has run 2')
      alert("geostuff.js has run 2")
        navigator.geolocation.getCurrentPosition(success, error, options);

        function success(pos) {
          console.log('geostuff.js has run success')
          alert("geostuff.js has run success")
          var crd = pos.coords;
          resolve(crd);
        };

        function error(err) {
          console.log('geostuff.js has run error', err)
          alert("geostuff.js has run error",err)
          console.warn('ERROR(' + err.code + '): ' + err.message);
          reject(err);
        };
    });
}


