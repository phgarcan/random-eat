export default () => new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(function(location) {
        // console.log(location.coords.latitude);
        // console.log(location.coords.longitude);
        // console.log(location.coords.accuracy);
        return resolve({
            lat: location.coords.latitude,
            lng: location.coords.longitude,
        });
    });
})