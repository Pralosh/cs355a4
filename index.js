//load express module
const express  = require('express');

//initialize app
const app = express();

//add static route
app.use(express.static('public'));

//hits route
var hits = 0;
app.get('/hits', (req,res) => {
    res.contentType('text/plain').send((++hits).toString());
})

//root route
app.get('/', (req,res) =>{
    res.send('Hello World');
})

//server
app.listen(3000, () => {
    console.log('Server started.\nGo to http://localhost:3000/');
})