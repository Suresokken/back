'use strict';
const express = require('express');
const serverless = require('serverless-http');
const app = express();
const bodyParser = require('body-parser');
const mysql = require('mysql');
var cors = require('cors');
app.use(cors());
const router = express.Router();

const con = mysql.createConnection({
  host: "sql7.freesqldatabase.com",
  user: "sql7284796",
  password: "AfL37Tigjs"
});

router.get('/', (req, res) => {
  res.send("Welcome to nothing");
});
router.get('/wines', (req, res) => {
  con.query('select sql7284796.wines.id as wineid, sql7284796.wines.type, sql7284796.`lines`.* from sql7284796.wines, sql7284796.`lines` '+
  'where wines.id = `lines`.wineid and active = TRUE', (error, wines, fields) => {
    if (error) {
        console.error('An error occurred while executing the query')
        throw error
      }
      res.send(wines);
    });
});
router.post('/', (req, res) => res.json({ postBody: req.body }));


app.use(bodyParser.json());
app.use('/.netlify/functions/server', router);

module.exports = app;
module.exports.handler = serverless(app);





con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});
