const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = `https://api.darksky.net/forecast/3af502e8b58908888b4f862e6826f078/${latitude},${longitude}?units=si`;
    request({
        url,
        json: true
    }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather services!', undefined);
        }
        else if (body.error) {
            callback('Unable to find location', undefined);
        }
        else {
            callback(undefined, body);
        }
    })
}

module.exports = forecast;