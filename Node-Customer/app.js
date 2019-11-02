const express = require("express");
const app = express();
const User = require("./modules/User");
const mongoose = require("mongoose");
const authRoutes = require('./routes/customer');
const morgan = require("morgan");
const bodyParser = require('body-parser');
const search = require('./routes/search');

mongoose.connect("mongodb+srv://danib2000:12345@workcluster-8ib57.mongodb.net/test?retryWrites=true&w=majority", { useUnifiedTopology: true });
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//cores headers
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Controll-Allow-Headers', '*');
    if(req.method == 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
})

// Routes which should handle requests
app.use('/customer', authRoutes);
//app.use('/auth/search', search)
app.use((req, res, next) => {
    const err = new Error('not found');
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
        err: {
            message: err.message
        }
    });
});
module.exports = app;
