'use strict';
const express = require('express');
const serverless = require('serverless-http');
const app = express();
const bodyParser = require('body-parser');
const mysql = require('mysql');

const router = express.Router();

const con = mysql.createConnection({
  host: "sql7.freesqldatabase.com",
  user: "sql7284796",
  password: "AfL37Tigjs"
});

function getWines(){
 const wines = con.query('SELECT * FROM sql7284796.wines', (error, wines, fields) => {
    if (error) {
        console.error('An error occurred while executing the query')
        throw error
      }
    });
    return wines;
}

router.get('/', (req, res) => {
  res.send("ss");
});
router.get('/another', (req, res) => res.json({ route: req.originalUrl }));
router.post('/', (req, res) => res.json({ postBody: req.body }));

app.use(bodyParser.json());
app.use('/.netlify/functions/server', router);  // path must route to lambda
app.use('/wines', (res, req) => {
 res.send(wines());
});

module.exports = app;
module.exports.handler = serverless(app);





con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});
