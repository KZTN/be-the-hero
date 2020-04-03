const express = require('express');
const routes = require('./routes');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const {errors} = require('celebrate');
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({
    extended: true
  }));
app.use(bodyParser.json());
app.use(routes);
app.use(errors());
module.exports = app;