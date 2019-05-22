const request = require('request')



const urlPart = 'https://api.darksky.net/forecast/2a591ae8f76a346f7105741d651ead6a/'
const queryPart = 'exclude=minutely,hourly,daily,alerts,flags&units=si'


// return weather data from destructured geoData object
const getWeather = (lat, long, cb) => {
    
    // compile URL
    const url = `${urlPart}${lat},${long}?${queryPart}`
    // make http request
    request({url, json: true},(err,{body}) => {
        if (err) {
            cb('Could not connect to weather service', undefined)
        } else if (body.error) {
            cb(body.error, undefined)
        } else {
        cb(undefined, `${body.currently.summary}. It is currently ${body.currently.temperature} degrees with ${body.currently.precipProbability} percent chance of rain`)
        }
    })

} 

module.exports = {
    getWeather : getWeather
}