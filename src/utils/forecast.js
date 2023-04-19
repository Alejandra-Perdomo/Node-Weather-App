const request = require('postman-request');

const forecast = (lon, lat ,callback) =>{
    const url = `http://api.weatherstack.com/current?access_key=46d6b414e249b3e7f24bfa03fbc9edb2&query=${lat},${lon}&units=f`;

    request({url,json:true},(error,{body})=>{
      if(error){
        callback('Unable to connect to location services!',undefined);
      }else if(body.success === false){
        callback('Unable find location!',undefined);
      }else if(typeof lon !== 'number' || typeof lat != 'number'){
        callback('Coordinates must be numbers!',undefined);
      }else{
        let current = body.current;
        callback(undefined,`Weather is ${current.weather_descriptions} and temperature is ${current.temperature}°F`);
      }
    })
}

module.exports = forecast;