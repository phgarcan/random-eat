import L from 'leaflet'
import buffer from '@turf/buffer'
import bbox from '@turf/bbox'
import getRestaurants from './getRestaurants'
import search from './search'
import position from './getLocation'

const map = L.map('map').setView([0,0], 2);

const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

tiles.addTo(map);

const loc = ({ lat, lng }) => {
    const geojson = { type: 'Point', coordinates: [lng, lat] };
    const rayon1km = buffer(geojson, 1);
    return getRestaurants(bbox(rayon1km))
        .then(restaurants => {
            restaurants.forEach(({ latitude, longitude, name}) => {
                L.marker([latitude, longitude])
                    .bindPopup(name)
                    .addTo(map);
            });
            return { lat, lng }
        })
};

position()
    .then(loc)
    .then(({ lat, lng }) => {
        map.setView([lat, lng], 12);
    });

const trouverLesRestos = ville =>
    search(ville)
        .then(coordonneesDeLaVille => {
            // créer la bbox
            return getRestaurants(bbox)
        })
        .then(lesRestos => {
            // choisir un resto au bol
            // bouger le centre de la carte
            // afficher le nom du resto (avec addresse, site web, cuisine, s'il y a)
        });

document.getElementById('random')
    .addEventListener('click', e => {
        if (e.click === true) {
            const nomDeLaVille = e.target.value;
            trouverLesRestos(nomDeLaVille)
        }
    });