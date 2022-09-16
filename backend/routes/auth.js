const express = require('express');
const router = express.Router();
const User = require('../models/Users.js')
const { body, validationResult } = require('express-validator');

router.post('/createuser',[
    body('name').isLength({ min: 5 }),
    body('email').isEmail(),
    body('password').isLength({ min: 5 }),
], (req, res)=>{

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      }).then(user => res.json(user))
         .catch(err=>{console.log(err)  //catches error and thenn console it
        res.json({error:'Please enter a unique value', message:err.message})})  // showing it on server
    
})

module.exports = router 