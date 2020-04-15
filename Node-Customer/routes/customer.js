const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const search = require("./search");
const User = require('../modules/User');
const customerController = require('../controllers/customerController');


/**
 * Verify Token
 * FORMAT:
 * Authorization: Bearer <access_token>
 */
function verifyToken(req, res, next) {
    // Get auth header value
    const bearerHeader = req.headers["authorization"];
    // check if bearer is undefined
    if (typeof bearerHeader !== "undefined") {
      // split at space
      const bearer = bearerHeader.split(" ");
      // Get Token from array
      const bearerToken = bearer[1];
      // Set token
      req.token = bearerToken;
      // continue
      next();
    } else {
      res.sendStatus(403);
}
}

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

router.get('/getCustomer', (req,res,next) =>{
    // Get auth header value
    const bearerHeader = req.headers["authorization"];
    // check if bearer is undefined
    if (typeof bearerHeader !== "undefined") {
      // split at space
      const bearer = bearerHeader.split(" ");
      // Get Token from array
      const bearerToken = bearer[1];
      // Set token
      req.token = bearerToken;
      // continue
    } else {
      res.sendStatus(403);
    }
    try{
        customerController.getUserDetailsFromToken(req.token).then((customer) =>{
            res.status(200).json(customer);
        }).catch((err) => {
            res.sendStatus(400);
            throw new Error(err);
         });
    }catch (err){
        console.error(err);
        if (err.message === "Not Found") {
          res.status(404).json({ Error: err.message });
        } else {
          res.status(400).json({ Error: err.message });
        }
    }
});

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
router.post('/create', (req, res, next) =>{
    try{
      customerController.addNewUser(
        req.body.userName,
        req.body.email,
        req.body.password,
        req.body.role).then(() => res.sendStatus(200)).catch((err)=>{
          res.status(409).json({Error:err.message});
      }); 
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
        customerController.deleteUser(req.body.id).then(res.sendStatus(200));
    }catch(err){
        if (err.message === "Not Found") {
            res.status(404).json({ Error: err.message });
            } else {
            res.status(400).json({ Error: err.message });
        }
    }
});
router.post('/update', (req,res)=>{
  try{
    if(req.body.isSeller){
      customerController.updateSeller(
        req.body.userName, 
        req.body.role,
        req.body.address,
        req.body.city,
        req.body.country,
        req.body.region,
        req.body.secondAddress,
        req.body.secondCity,
        req.body.secondRegion,
        req.body.walletAddress,
        req.body.infoAboutUser)
        .then((token)=> {
          res.status(200).json({Update : "Updated!", token:token})
          }).catch(err =>{
            if (err.message === "Not Found") {
              res.status(404).json({ Error: err.message });
              } else {
              res.status(400).json({ Error: err.message });
          }
        });
      };   
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
        customerController
          .authenticateLogIn(req.body.userName, req.body.password)
          .then(token => {
            res.status(200).json({ token: token });
          }).catch(err => {
            console.error(err);
            if (err.message === "Not Found") {
              res.status(404).json({ Error: err.message });
            } else {
              res.status(400).json({ Error: err.message });
            }
          });
      }catch (err) {
        console.error(err);
        if (err.message === "Not Found") {
          res.status(404).json({ Error: err.message });
        } else {
          res.status(400).json({ Error: err.message });
        }
      }
});

module.exports = router;