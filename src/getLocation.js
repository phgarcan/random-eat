export default () => new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(function(location) {
        console.log(location.coords.latitude);
        console.log(location.coords.longitude);
        console.log(location.coords.accuracy);
        return resolve({
            lat: location.coords.latitude,
            lng: location.coords.longitude,
        });
    });
})

// module.exports = {
//
//     geoLocation : function() {
//         return "longitude"
//     },
//
//     getLatitude : function() {
//         return location.coords.latitude
//     },
//
//     getLongitude : function() {
//         return location.coords.longitude
//     },
//
//     getAccuracy : function() {
//         return location.coords.accuracy
//     }
//
// };