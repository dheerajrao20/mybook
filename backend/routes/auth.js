const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const User = require('../models/Users.js')
const { body, validationResult } = require('express-validator');

router.post('/createuser',[
    body('name').isLength({ min: 5 }),
    body('email').isEmail(),
    body('password').isLength({ min: 5 }),
], async (req, res)=>{

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt)

    User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      }).then(user => res.json(user))
         .catch(err=>{console.log(err)  //catches error and thenn console it
        res.json({error:'Please enter a unique value', message:err.message})})  // showing it on server
    
})

module.exports = router 