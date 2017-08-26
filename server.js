var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool; 
var crypto = require('crypto');
var bodyParser = require('body-parser');

var config = {
   user: 'datasci1204',
   database: 'datasci1204',
   host: 'db.imad.hasura-app.io',
   port: '5432',
   password: process.env.DB_PASSWORD
    
};


var app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

var pool = new Pool(config);
app.get('/testdb22', function(req, res){

    
    pool.query('select * from "user" ' , function(err, result){
      
      if(err){
          res.status(500).send(err.toString());
        
      } else {
       
        res.send(JSON.stringify(result));
          
      }
      } 
    );
});

function hash (input, salt) {
    var hashed = crypto.pbkdf2Sync(input ,salt , 10000, 512, 'sha512');
    return ["pbkdf2", "10000", salt, hashed.toString('hex')].join('$');
}

app.post('/create', function (req, res) {
    var username = req.body.username;
    var password = req.body.password;
    var salt = crypto.randomBytes(128).toString('hex');
    var dbString = hash(password,salt);
    pool.query('INSERT INTO "user" (username, password) VALUES ($1, $2)', [username, dbString], function (err, result){
        if(err) {
            res.status(500).send(err.toString());
            res.send('Not able to connect');
        } else {
            res.send('User successfully created:' + username);
        }
});
});

/*var pool = new Pool(config); */
app.post('/testdb', function(req, res){
    var username = req.body.username;
    var password = req.body.password;
     
    pool.query('select * from "user" where username = $1', [username, password], function(err, result){
      if(err){
          res.status(500).send(err.toString());
      } else {
          if (result.rows.length === 0) {
              res.send(400).send('No user');
          }
        res.send(JSON.stringify(result));
          
      }
      } 
    );
});
    
var counter = 0;
app.get('/login', function (req, res) {
    counter = counter + 1;
    res.send(counter.toString());
    
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
  console.log(`IMAD course app listening on port!! ${port}!`);

});
