const nunjucks = require('nunjucks');
const express = require("express");

const app = express();

const database = require('../database/db.js');

app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded( { extended: true } ));

nunjucks.configure('src/views', {
  express: app,
  noCache: true
});

module.exports = {
  app,
  database,
};