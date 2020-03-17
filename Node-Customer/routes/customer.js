const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const search = require("./search");
const User = require('../modules/User');
const UserController = require('../controllers/customerController');

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
    try{
    UserController.addNewUser(
        req.body.userName,
        req.body.email,
        req.body.password,
        req.body.role).then(res.sendStatus(200)); 
    }
    catch (err) {
        console.error(err);
        if (err.message === "Not Found") {
        res.status(404).json({ Error: err.message });
        } else {
        res.status(400).json({ Error: err.message });
        }
    }
})
router.post('/delete', (req,res) =>{
    try{
        UserController.deleteUser(req.body.id).then(res.sendStatus(200));
    }catch(err){
        if (err.message === "Not Found") {
            res.status(404).json({ Error: err.message });
            } else {
            res.status(400).json({ Error: err.message });
        }
    }
});
router.post('/authenticate', (req,res,next) =>{
    try {
        UserController
          .authenticateLogIn(req.body.userName, req.body.password)
          .then(token => {
            res.status(200).json({ token: token });
          });
      } catch (err) {
        console.error(err);
        if (err.message === "Not Found") {
          res.status(404).json({ Error: err.message });
        } else {
          res.status(400).json({ Error: err.message });
        }
      }
});

module.exports = router;