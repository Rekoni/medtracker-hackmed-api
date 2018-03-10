const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');

const port = process.env.PORT || 5000;
const app = express();

mongoose.connect("mongodb://" + process.env.DB_USER + ":" +
        process.env.DB_PASSWORD + "@" + process.env.DB_NAME);
app.use(morgan('dev'));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,cache-control');
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

dbRoutes(app);
userRoutes(app);

app.listen(port);

console.log('Medtracker started on port: ' + port);
