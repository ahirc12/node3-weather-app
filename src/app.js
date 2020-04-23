const path = require('path');
const express = require('express');
const hbs = require('hbs');

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

// define paths for express config
const publicPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);


// setup static directory to serve
app.use(express.static(publicPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Ahir'
    })
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Ahir'
    })
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Ahir'
    })
});

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }
    const { address } = req.query;
    geocode(address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error });
        }
        forecast(latitude, longitude, (error, forecast) => {
            if (error) {
                return res.send({ error });
            }
            res.send({
                forecast,
                location,
                address
            });
        });
    })
});

app.get('/help*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Ahir',
        error: 'Help article not found'
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Ahir',
        error: 'Page not found'
    });
})

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});