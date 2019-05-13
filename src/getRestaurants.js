const getUrl = bbox => [
    'http://www.overpass-api.de/api/interpreter',
    '?data=[out:json][timeout:25];',
    '(node["amenity"="restaurant"]',
    `(${bbox[1]},${bbox[0]},${bbox[3]},${bbox[2]});`,
    ');out body;>;out skel qt;'
].join('')

const format = ({ elements }) =>
    elements.map(({ tags, lon, lat }) => ({
        longitude: lon,
        latitude: lat,
        name: tags.name || 'UNKNOWN',
        website: tags.website || 'UNKNOWN',
        cuisine: tags.cuisine || 'UNKNOWN'
    }))

export default bbox =>
    fetch(getUrl(bbox))
        .then(r => r.json())
        .then(format)