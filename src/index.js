import L from 'leaflet'
import buffer from '@turf/buffer'
import $ from 'jquery'
import bbox from '@turf/bbox'
import getRestaurants from './getRestaurants'
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

    // définit le type de marker et leur position sur la carte
    const geojson = {
        type: 'Point',
        coordinates: [lng, lat]
    }

    const rayon2km = buffer(geojson, 2)

    return getRestaurants(bbox(rayon2km))
        .then(restaurants => {
            $("#random").click(function()
                {
                    let restaurant = restaurants[Math.floor(Math.random() * restaurants.length)];
                    console.log(restaurant.name)
                    L.marker([restaurant.latitude, restaurant.longitude])
                        .bindPopup(restaurant.name)
                        .addTo(map)
                        .openPopup()
                    let n = document.getElementById('n')
                    n.innerHTML = restaurant.name
                    let s = document.getElementById('s')
                    s.innerHTML = restaurant.website
                    let c = document.getElementById('c')
                    c.innerHTML = restaurant.cuisine
                }
            )
            return { lat, lng }
        })
}

position()
    .then(loc)
    .then(({ lat, lng }) => {
        map.setView([lat, lng], 15)
    })