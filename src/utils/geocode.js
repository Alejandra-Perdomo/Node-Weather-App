const request = require('postman-request');

const geocode = (address,callback) =>{
    const encoded_address = encodeURIComponent(address);
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encoded_address}.json?access_token=pk.eyJ1IjoiYWxlamFuZHJhLXBlcmRvbW8iLCJhIjoiY2xnZjc5dHNxMHB2czNkcm53M3U4dGc4dyJ9.6Ex6Xr_KwyVXBp46Z9x3Qg`;
    
    request({ url:url, json:true },(error,{body})=>{
      if(error){
          callback('Unable to connect to location services!',undefined);
      }else if(body.features.length === 0){
        callback('Unable to find location',undefined);
      }else{
        callback(undefined,{
          latitude: body.features[0].geometry.coordinates[1],
          longitude: body.features[0].geometry.coordinates[0],
          location: body.features[0].place_name
        })
      }
    })
}

module.exports = geocode