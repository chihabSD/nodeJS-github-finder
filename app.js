const express = require('express')
const path = require('path');
var keypress = require('keypress');
const readline = require('readline');
var exphbs = require('express-handlebars');
var request = require('request');
var bodyParser = require('body-parser')
const fetch = require('node-fetch')
require('dotenv').config;

//console.log(process.env)
// define express app
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


// const profileResponse = await fetch(`https://api.github.com/users/${user}?client_id=${this.client_id}&client_secret=${this.client_secret}`)
//         const repoResponse = await fetch(`https://api.github.com/users/${user}/repos?per_page=${this.repos_count}&sort=${this.repos_sort}&client_id=${this.client_id}&client_secret=${this.client_secret}`);
var options = {
    url: 'https://api.github.com/repos/request/request',
    headers: {
        'User-Agent': 'request'
    }
};



app.post('/', async(req, res) => {
    const user = req.body.user;
    const client_id = process.env.client_id //GitHub client id
    const client_secret = process.env.client_secret //GitHub secret key
    let status;
    await fetch(`https://api.github.com/users/${user}?client_id=${client_id}&client_secret=${client_secret}`)
        .then((res) => {
            status = res.status;
            return res.json()
        })
        .then((jsonData) => {
            console.log('Json data', jsonData);
            res.render('home', { jsonData: jsonData })
        })
        .catch((err) => {
            // handle error for example
            console.error(err);
        });
    //res.render('home', { user: req.body.user })
})


const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`The server is running on port${PORT}`));