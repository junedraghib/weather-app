const request = require('request')
const forecast = (lat, long, callback) => {
    const url = "https://api.darksky.net/forecast/72463e4e91fcee711de15e124f777699/"+lat+","+long+"?unit=in"
    request({url : url, json : true}, (error, response) => {
        if (error) {
            callback('unable to connect to Weather API', undefined)
        } else if (response.body.error) {
            // console.log("Error : " + response.body.error)
            callback('unable to connect to Weather API', undefined)
        } else{
            // console.log()
            // console.log(response.body.daily.data[0].summary + 'Its is currently '+ response.body.data[0].temperature)
            callback(undefined, response.body.daily.data[0].summary + ' Its is currently ' + response.body.currently.temperature)
        } 
    })
}

module.exports = forecast