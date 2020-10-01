const request = require('request');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const path = require('path');
const express = require('express');
const hbs = require('hbs');

const app = express()
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicDirectoryPath));

app.get('', (req, res)=>{
    res.render('index', {
        title: 'Weather',
        name: "Andrew Mid"
    });
});

app.get('/about', (req, res)=>{
    res.render('about',{
        title: 'About Me',
        name: 'Andrew Mid'
    });
});

app.get('/help', (req, res)=>{
    res.render('help',{
        title: 'Help Message',
        text: 'Info',
        name: 'Bill'
    });
});

app.get('/weather', (req, res)=>{
    if(!req.query.address){
        return res.send({
            error: "You must provide an address"
        })
    } 
    
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error){
           return res.send({  error });
            //return console.log(error);
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return res.send({ error });
                //return console.log(error);
            }
            res.send({
                forecast: forecastData,
                location: location,
                address: req.query.address
            });

            //console.log(location)
            //console.log(forecastData)       
        });
    });

    // res.send({
    //     forecast: 'It is snowing',
    //     location: 'Philadelphia',
    //     address: req.query.address
    // })
    
});

app.get('/products', (req, res)=>{
    if(!req.query.search){
        return res.send({
            error: "You must provide a search tearm"
        })
    }    

    res.send({
        products:[]
    })
})

app.get('/help/*',(req, res)=>{
    res.render('404',{
        title:'404',
        name:'Andrew Mead',
        errorMessage:'Help article not found'
    });
});

app.get('*', (req, res)=>{
    res.render('404', {
        title:'404',
        name:'Andrew Mead',
        errorMessage: 'Page not found'
    });
});

app.listen(3000, ()=>{
    console.log('Server is up on port 3000.')
});