'use strict';

const express = require('express');
const http = require('http');
const path = require('path');
const fs = require('fs');
const async = require('async');
const routes = require('./routes');

const app = express();
const serverPort = process.env.PORT || 9000;

app.use(express.static('public'));

routes(app);

http.createServer(app).listen(serverPort);
console.log('Run server on port: ' + serverPort);
