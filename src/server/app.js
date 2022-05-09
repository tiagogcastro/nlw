const express = require('express');
const nunjucks = require('nunjucks');

const { routes} = require('./routes');

const app = express();

nunjucks.configure('src/views', {
  express: app,
  noCache: true,
  autoescape: false,
})

app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));
app.use(routes);

module.exports = {
  app,
  nunjucks
}