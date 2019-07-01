const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')
const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


// Setup handlebars engine and views location
app.set('views', viewsPath)
app.set('view engine', 'hbs')
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))
app.get('', (req,res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Daniel'
    })
})

app.get('/about', (req,res) => {
    res.render('about', {
        title: ' About',
        name: 'Daniel'
    })
})

app.get('/help', (req,res) => {
    res.render('help', {
        title: ' Help',
        message: 'This is a message',
        name:'Daniel'
    })
}
)

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address'
        })
    }
    
    geocode(req.query.address, (error, {latitude,longitude, location} = {}) => {
    
        if(error){
            return res.send({ error })
        }
        
        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return res.send({ error })
            }
            
            res.send({
                location,
                forecast: forecastData,
                address:req.query.address
            })
          })
    })
    
    
})

app.get('/products', (req,res) =>{
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products:[]
    })
})

app.get('/help/*', (req,res) =>{
    res.render('404page', {
        title: ' 404 PAGE',
        message: 'Help article not found',
        name:'Daniel'
    })
})

app.get('*', (req,res) =>{
    res.render('404page', {
        title: ' 404 PAGE',
        message: 'Page not found',
        name:'Daniel'
    })})

app.listen(3000, () => {
    console.log("Server is up on port 3000.")
})