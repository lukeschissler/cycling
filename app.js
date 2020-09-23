const MongoClient = require('mongodb').MongoClient
const express = require('express');
const path = require('path');
const bodyParser= require('body-parser');


// Constants
const PORT = 8000;
const connectionString = 'mongodb+srv://luke-user:2visblyb76RJGook@cycle-cluster.0w7bb.mongodb.net/test?retryWrites=true&w=majority'

// App
const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded());

app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: true }))

// MongoDB/App
MongoClient.connect(connectionString, {
    useUnifiedTopology: true
})
    .then(client => {
        console.log('Connected to the database');
        const db = client.db('cycle-db');
        const users = db.collection('users')

        app.get('/', (req, res) => {
            res.render('index', {title: 'Index'});
        })

        app.post('/', (req,res) => {
            console.log(req.body);
            res.render('index', {title: 'Index'});
        })

        app.get('/about', (req, res) => {
            res.render('about');
        })

        app.get('/stats', (req, res) => {
            res.render('stats');
        })

        app.post('/register', (req, res) => {
            users.insertOne({
               user: req.body.username,
               pwd : req.body.password
            })
                .then(result => {
                    console.log(result.ops);
                })
                .catch(error => console.error(error));

            res.redirect('/');
        })

        app.get('/map', (req, res) => {
            res.render('map', { title: 'Map', lat: lat, lng:lng});
        })

        app.listen(PORT, function() {
            console.log(`Example app listening on port ${PORT}!`)
        })

    })
    .catch(console.error)