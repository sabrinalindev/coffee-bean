require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient
const { ObjectID } = require('mongodb');


var db, collection;

const url = process.env.DB_STRING;
const dbName = "coffeeBean";

app.listen(3000, () => {
    MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
        if(error) {
            throw error;
        }
        db = client.db(dbName);
        console.log("Connected to `" + dbName + "`!");
    });
});

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.static('public'))

app.get('/', (req, res) => {
  db.collection('coffee').find().toArray((err, result) => {
    if (err) return console.log(err)
    res.render('index.ejs', {coffee: result})
  })
})

app.post('/coffeeBean', (req, res) => {
  db.collection('coffee').insertOne({
    name: req.body.name, 
    roastLevel: req.body.roastLevel, 
    remainingGrams: parseInt(req.body.remainingGrams)
    }, (err, result) => {
    if (err) return console.log(err)
    console.log('saved to database')
    res.redirect('/')
  })
})

//update
app.put('/coffeeBean', (req, res) => {
  console.log(req.body.userID)
  db.collection('coffee')
  .findOneAndUpdate({
    _id: new ObjectID(req.body.userID)
  }, {
    $inc: {
      remainingGrams:-21
    }},
   (err, result) => {
    if (err) return res.send(err)
    res.send(result)
  })
})



app.delete('/coffeeBean', (req, res) => {
  //onsole.log(req.body.userID)
  db.collection('coffee').findOneAndDelete({
    _id: new ObjectID(req.body.userID)
  }, (err, result) => {
    if (err) return res.send(500, err)
    res.send('Bean deleted!')
  })
})



//get/ list all the coffee bean in the database

//same ejs - form for POST new coffee bean

//add delete button -js function fetch a delete coffee bean

//Update 