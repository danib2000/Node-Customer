const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const search = require("./search");
const User = require('../modules/User');


//GET requests 

router.get('/', (req, res, next) =>{
    
    User.find().then(docs => {
        console.log(docs);
        res.status(200).json(docs);
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            error:err
        });
    });
});
router.use('/search', search)

//GET by id
router.get('/:userId', (req, res, next) =>{
    
    const id = req.params.userId;
    User.findById(id).exec().then(doc => {
        console.log(doc);
        if(doc) {
            res.status(200).json(doc);
        }else {
            res.status(404).json({message : 'not a valid id'});
        }
        
    })
    .catch(err => {
        
        console.log(err) 
        res.status(500).json({error : err})
        });
    
});





//POST requests
router.post('/', (req, res, next) =>{
    const customer = new User({
        _id: new mongoose.Types.ObjectId(),
        name : req.body.name,
        email : req.body.email,
        phone : req.body.phone
    });
    customer.save().then(result =>
        {
            console.log(result)
            res.status(201).json({
                user: customer,
                message : "YAY! POST"
            });
        })
        .catch(err =>
            {
                console.log(err)
                res.status(500).json({
                    error: err
                });
            });
    
});

module.exports = router;