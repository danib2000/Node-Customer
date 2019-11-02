const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');

const User = require('../modules/User');
const search = require('./search');


router.get('/', (req, res, next) =>
{
    const name = req.query.name;
    const phone = req.query.phone;
    const email = req.query.email;
    console.log(name);
    console.log(phone);
    console.log(email);
    const User_data = User.find({name : { $eq : name}, phone: phone, email:email}).exec()
    .then(doc => {
        console.log(doc)
        if(doc){
            res.status(200).json(doc);
        }
        else {
            res.status(404).json('not found');
        }
    });

       
});

module.exports = router;