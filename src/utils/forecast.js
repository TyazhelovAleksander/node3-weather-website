const request = require('request');

const forecast = (latitude, longitude, callback) => {
    
    // const url = 'http://api.weatherstack.com/current?access_key=4a9cf1614d6cf7629fa83f04bc68a76c&query=37.8267,-122.4233&units=m'

    const url = 'http://api.weatherstack.com/current?access_key=4a9cf1614d6cf7629fa83f04bc68a76c&query=' + encodeURIComponent(latitude) + ','+ encodeURIComponent(longitude)+'&units=m';

    //console.log(url)

    request({url, json:true}, (error, {body}) => {
        if(error){
            callback('unable to connect to location servises!', undefined)
        }
        else if(body.error){
            callback('Unable to find location. Try another search', undefined)
        }
        else{
            callback(undefined,  body.current.weather_descriptions[0] + '.It is currently ' + body.current.temperature + 
            ' degrees out. There is feel like  a ' +  body.current.feelslike + ' degree' + ' the humidity is ' +  body.current.humidity            
            );
        }
    })
}

module.exports = forecast
