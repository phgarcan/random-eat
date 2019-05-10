export default ville => fetch(`https://nominatim.openstreetmap.org/search?format=json&city=${ville}`)
    .then(r => r.json())
    .then(villes => {
        const v = villes[0];
        return v ? { lat: Number(v.lat), lng: Number(v.lng) } : null
    })