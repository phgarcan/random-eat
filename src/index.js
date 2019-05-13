import L from 'leaflet'
import buffer from '@turf/buffer'
import bbox from '@turf/bbox'
import getRestaurants from './getRestaurants'
// import search from './search'
import position from './getLocation'

// initialiser la carte
const map = L.map('map').setView([0,0], 2)

// définit le style de "tuile"
const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'RandomEAT &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    maxZoom: 19
})

// ajouter les "tuiles" à la carte
tiles.addTo(map)

const loc = ({ lat, lng }) => {
    // géolocalisation de l'utilisateur
    L.circle([lat, lng], {
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.5,
        radius: 10,
        className: 'animation'})
        .addTo(map)
        .bindPopup("Tu es ici")
        .openPopup()

    const geojson = {
        type: 'Point',
        coordinates: [lng, lat]
    }

    // récupérer tous les restaurants dans un rayon de 2km
    const rayon2km = buffer(geojson, 2)

    return getRestaurants(bbox(rayon2km))
        .then(restaurants => {
            restaurants.forEach(({ latitude, longitude, name}) => {
                L.marker([latitude, longitude])
                    .bindPopup(name)
                    .addTo(map)
            })
            return { lat, lng }
        })
}

position()
    .then(loc)
    .then(({ lat, lng }) => {
        map.setView([lat, lng], 17)
    })