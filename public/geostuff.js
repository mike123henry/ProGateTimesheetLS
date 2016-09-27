var handleLocation = function(){
        if (!navigator.geolocation){
            console.log("no geo")
        } else {
             navigator.geolocation.getCurrentPosition(function(position) {
                console.log("yes geo")
                console.log(position.coords.latitude)
                console.log("1")
                console.log( position.coords.longitude)
                console.log("2")
                console.log(position)
                console.log("3")
                console.log(position.coords)
                })
             var datetime = new Date();
             console.log(datetime);
            }
        }

handleLocation()
