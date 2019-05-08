import L from 'leaflet'
import buffer from '@turf/buffer'
import bbox from '@turf/bbox'
import getRestaurants from './getRestaurants'
import search from './search'

const map = L.map('map').setView([46.7785, 6.6412], 15);

const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

tiles.addTo(map);

map.on('click', e => {
    const { lat, lng } = e.latlng;
    const geojson = { type: 'Point', coordinates: [lng, lat] };
    const rayon1km = buffer(geojson, 1);
    getRestaurants(bbox(rayon1km))
        .then(restaurants => {
            restaurants.forEach(({ latitude, longitude, name}) => {
                L.marker([latitude, longitude])
                    .bindPopup(name)
                    .addTo(map)
            })
        })
});

document.getElementById('search')
    .addEventListener('keydown', e => {
        if (e.key === 'Enter') {
            search(e.target.value)
                .then(({ lat, lon }) => {
                    map.flyTo([lat, lon], 15);
                    e.target.value = ''
                })
        }
    });