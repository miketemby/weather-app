const request = require('request')


// return lat long array from address
const getGeo = (searchString, cb) => {
    const searchText = encodeURI(searchString)
    const urlPart = `https://api.mapbox.com/geocoding/v5/mapbox.places/${searchText}.json`
    const queryString = 'access_token=pk.eyJ1IjoiZGlnaXRhbHNlcnZpY2VzbGFiIiwiYSI6ImNqdnU5aXRibTI3bDY0NXJob2Rud2ZwaGEifQ.HejALubIYuUJWgMsWVmQmA&limit=1'
    const url = `${urlPart}?${queryString}`
    request({url, json: true}, (err, {body}) => {
        if (err) {
            cb('Unable to connect to location service', undefined);
            
        } else if (body.message) {
            cb(body.message, undefined)
            
        } else if (body.features.length === 0) {
            cb('No geocode results returned for given location', undefined)
            
        } else {
            cb(undefined, {
                lat : body.features[0].center[1],
                long : body.features[0].center[0],
                location : body.features[0].place_name
            })
        }
    })
}

module.exports = {
    getGeo : getGeo
}