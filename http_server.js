const express = require('express');
const low = require('lowdb');
const fs = require('lowdb/adapters/FileSync');
const cors = require('cors');

const app = express();
const adapter = new fs('db.json');
const db = low(adapter);

// allow cross-origin resource sharing (CORS)
app.use(cors());

// data parser - used to parse post data
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// serve static files from public directory
// -------------------------------------------
app.use(express.static('public'));

// init the data store
db.defaults({ users: [] }).write();

// return all users
app.get('/data', function(req, res){     
    res.send(db.get('users').value());
});

// add user
app.post('/add', function(req, res){
    var user = {
        'name'          : req.body.name,
        'dob'           : req.body.dob,
        'email'         : req.body.email,
        'username'      : req.body.username,
        'password'      : req.body.password,
        'phone'         : req.body.phone,
        'streetaddress' : req.body.streetaddress,
        'citystatezip'  : req.body.citystatezip,
        'latitude'      : req.body.latitude,
        'longitude'     : req.body.longitude,
        'avatar'        : req.body.avatar
    }
    db.get('users').push(user).write();
    res.send(db.get('users').value());
});

const server = app.listen(3000, function(){
    console.log('Running on port 3000!')
});

module.exports = { app, server };
