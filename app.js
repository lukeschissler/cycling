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
        const commentCollection = db.collection('comments')

        app.get('/', (req, res) => {
            db.collection('comments').find().toArray()
                .then(results => {
                    res.render('index', {title: 'Index', comments : results});
                })
                .catch(error => console.error(error))
        })

        app.post('/', (req, res) => {
            commentCollection.insertOne(req.body)
                .then(result => {
                   console.log(result.ops)
                })
                .catch(error => console.error(error))
        })

        app.get('/about', (req, res) => {
            res.render('about');
        })

        app.get('/stats', (req, res) => {
            res.render('stats');
        })

        app.listen(PORT, function() {
            console.log(`Example app listening on port ${PORT}!`)
        })

    })
    .catch(console.error)