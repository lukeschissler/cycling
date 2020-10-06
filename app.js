const MongoClient = require('mongodb').MongoClient
const express = require('express');
const path = require('path');
const bodyParser= require('body-parser');
require('dotenv').config();


// Constants
const PORT = 8000;

// App
const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded());

app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());

// MongoDB/App
MongoClient.connect(process.env.MONGO_KEY, {
    useUnifiedTopology: true
})
    .then(client => {
        console.log('Connected to the database');
        const db = client.db('cycle-db');
        const commentCollection = db.collection('comments')

        app.get('/', (req, res) => {
            res.render('index', {title: 'Index', key : process.env.GOOGLE_KEY});
        })

        app.post('/retrieve-comments/', (req, res) => {
            const oLat = req.body.originLat;
            const oLng = req.body.originLng;
            const dLat = req.body.destinationLat;
            const dLng = req.body.destinationLng;

            db.collection('comments').find({$or :
                [{originLat : { $lte : oLat+0.045, $gte : oLat-0.045},
                originLng : { $lte : oLng+0.045, $gte : oLng-0.045}},
                {destLat : { $lte : dLat+0.045, $gte : dLat-0.045},
                destLng : { $lte : dLng+0.045, $gte : dLng-0.045}}]
            }).toArray()
                .then(results => {
                    res.json(results);
                })
        });

        app.post('/', (req, res) => {
            commentCollection.insertOne(req.body)
                .then(result => {
                   console.log(result.ops)
                })
                .catch(error => console.error(error))
        })

        app.get('/retrieve-route/:user', async (req, res) => {
            commentCollection.findOne({id: req.params.user})
                .then(result => {
                    res.json({origin : { lat : result.originLat, lng : result.originLng },
                        destination : { lat : result.destLat, lng : result.destLng}})
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