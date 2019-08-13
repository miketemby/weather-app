const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geo = require('./utils/geo-code')
const weather = require('./utils/weather')


const app = express()
const port = process.env.PORT || 3000


//define path for Express configs
const publicPath = path.join(__dirname, '../public')
const templatePath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

// setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', templatePath)
hbs.registerPartials(partialPath)

// setup static directory to serve
app.use(express.static(publicPath))


app.get('', (req,res) => {
    res.render('index', {
        title : 'Weather App',
        name : 'Mike Temby'
    })
})

app.get('/about', (req,res) => {
    res.render('about', {
        title : 'About Me',
        name : 'Mike Temby'
    })
})

app.get('/help', (req,res) => {
    res.render('help', {
        title : 'Help Page',
        name : 'Mike Temby',
        helpMessage : 'This app provides weather forcasts based on a provided address'
    })
})

app.get('/weather', (req, res) => {
    
    // if not address send error
    if(!req.query.address) {
        return res.send({
            error: 'No address provided'
        })
    }
    
    const {address} = req.query

        //call geo code function with call back
        geo.getGeo(address, (err, {lat, long, location} = {}) => {
            if (err) {
                res.send({
                    error: `Error: ${err}`
                })
            } else {

                // if geo code returns data, call weather function with call back
                weather.getWeather(lat,long, (err, weatherData) => {
                    if (err) {
                        res.send({
                            error : `Error: ${err}`
                        })
                    } else {

                        // extend to include icon text
                        res.send({
                            location,
                            forecast: weatherData.forecast,
                            icon : weatherData.icon,
                            address
                        })
                    }
                })
            }
        })
})


app.get('/product', (req, res) => {
    if(!req.query.search) {
        return res.send({
            error : 'Search String Missing'
        })
    }
    res.send({
        products : []
    })
    console.log(req.query)
    
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title : '404',
        name : 'Mike Temby',
        message : 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title : '404',
        name : 'Mike Temby',
        message : 'Page not found'
    })
})

app.listen(port, () => {
    console.log(`server started on port ${port}`)
})