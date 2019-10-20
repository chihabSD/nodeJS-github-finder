const express = require('express')
const path = require('path');
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser')
const fetch = require('node-fetch')
require('dotenv').config;


const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// parse application/vnd.api+json as json
app.use(bodyParser.json({ type: 'application/vnd.api+json' }))

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars')

app.get('/', (req, res) => {
        res.render('home')
    })
    /**
     * Get user input or req.body
     * fetch the api using the query url wit app_id adn secerted_key from github
     */
app.post('/', async(req, res) => {
    const user = req.body.user;
    //get client_id and client_secret from proce.evn
    const client_id = process.env.client_id
    const client_secret = process.env.client_secret
    let status;
    await fetch(`https://api.github.com/users/${user}?client_id=${client_id}&client_secret=${client_secret}`)
        //return a response    
        .then((res) => {
            status = res.status;
            return res.json()
        })
        // get the data as an object
        .then((jsonData) => {
            //pass the data to the home.handlebars
            console.log('Json data', jsonData);
            res.render('home', { jsonData: jsonData })
        })
        //return if there is an error
        .catch((err) => {
            // handle error for example
            console.error(err);
        });

})


const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`The server is running on port${PORT}`));