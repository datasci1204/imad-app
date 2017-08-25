var express = require('express');
var morgan = require('morgan');
var path = require('path');
var pool = require('pg').Pool;
var crypto = require('crypto');
var bodyParser = require('body-parser');

var config = {
   user: 'datasci1204',
   database: 'datasci1204',
   host: 'db.imad.hasura-app.io',
   post: '5432',
   password: 'db-datasci1204-99885'
    
};

var app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/create-user', function (req, res) {
    var username = req.body.username;
    var password = req.body.password;
    pool.query('INSERT INTO "user" (username, password) VALUES ($1, $2)', [username, password], function (req, result){
        if(err) {
            res.status(500).send(err.toString());
        } else {
            res.send('User successfully created:' + username);
        }
});
});
    

app.get('/login', function (req, res) {
    var username = req.body.username;
    var password = req.body.password;
    pool.query('INSERT INTO "user" (username, password) VALUES ($1, $2)', [username, password], function (req, result){
        if(err) {
            res.status(500).send(err.toString());
        } else {
            res.send('User successfully created:' + username);
        }
});
});


app.get('/Article1.html', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'Article1.html'));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
