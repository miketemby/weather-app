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

        // extend response to include additional information. 
        const weatherData = {
            forecast : `${body.currently.summary}. It is currently ${body.currently.temperature} degrees with ${body.currently.precipProbability} percent chance of rain`,
            icon : body.currently.icon,
        }
        
        cb(undefined, weatherData)
        }
    })

} 


// getWeather(-37.5184,145.3591,outPut)

// function outPut(err,response) {
//     console.log(err,response)
// }

module.exports = {
    getWeather : getWeather
}