const request = require('request')

const forecast = (latitude,longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/82fe9e16aacaf52f8bec787f450525cd/' + latitude  + ',' + longitude + '?units=uk2'
    request ({url, json:true}, (error, {body}) =>{
        if(error){
            callback('Cannot connect to forecast services', undefined)
        }
        else if(body.error) {
            callback('Unable to create a forecast for the given coordinates', undefined)
        }else{
            callback(undefined, {
                temperature: body.currently.temperature,
                precipProbability: body.currently.precipProbability
            })
        }
    })
    
}
module.exports = forecast