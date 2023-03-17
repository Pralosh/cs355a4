const express  = require('express'); //load express module
const app = express(); //initialize app

const nedb = require('nedb-promises'); //load nedb-promises
const db = nedb.create('hits.jsonl'); //creatae and initialize a db file

//add static route
app.use(express.static('public'));

//check the database if there is a doc
db.findOne({hits: {$exists: true}}).then(doc => {
    if(doc) {
        console.log('Found DOC --', doc);
        hits = doc.hits;
    }
    else {
        console.log('No DOC found!!');
    }
});

//hits route
var hits = 0;
app.get('/hits', (req,res) => {
    res.contentType('text/plain').send((++hits).toString());

    //upsert (update doc if exists otherwise create new doc)
    db.updateOne(
        {hits: {$exists: true}},
        {$set: {hits: hits}},
        {upsert: true})
        .then(() => {
            console.log("Hits updated to: ", hits);
        });
});

//root route
app.get('/', (req,res) =>{
    res.send('Hello World');
});

//server
app.listen(3000, () => {
    console.log('Server started.\nGo to http://localhost:3000/');
});