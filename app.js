const MongoClient = require('mongodb').MongoClient
const session = require('express-session');
const express = require('express');
const path = require('path');
const passport = require('passport');
const LocalStrategy = require('passport-local');

const lat = 41.85
const lng = -71.65

// Constants
const PORT = 8000;
const connectionString = 'mongodb+srv://luke-user:2visblyb76RJGook@cycle-cluster.0w7bb.mongodb.net/test?retryWrites=true&w=majority'

// App
const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, 'public')));

// MongoDB/App
MongoClient.connect(connectionString, {
    useUnifiedTopology: true
})
    .then(client => {
        console.log('Connected to the database')
        const db = client.db('cyle-db')

        app.get('/auth/google',
            passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }));

        app.get('/auth/google/callback',
            passport.authenticate('google', { failureRedirect: '/login' }),
            function(req, res) {
                res.redirect('/');
            });

        app.get('/', (req, res) => {
            res.render('index', {title: 'Index'})
        })

        app.get('/map', (req, res) => {
            res.render('map', { title: 'Map', lat: lat, lng:lng});
        });

        app.listen(PORT, function() {
            console.log(`Example app listening on port ${PORT}!`)
        })

})
    .catch(console.error)