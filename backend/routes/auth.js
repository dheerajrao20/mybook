const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const router = express.Router();
const User = require('../models/Users.js')
const { body, validationResult } = require('express-validator');

router.post('/createuser',[      // giving backend some info from form as an object
    body('name').isLength({ min: 5 }),
    body('email').isEmail(),
    body('password').isLength({ min: 5 }),
], async (req, res)=>{    // taking request and giving response

    const errors = validationResult(req);          // checking for an error in input methods
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try{   // if inputs are correct then try this
      let user = await User.findOne({ email: req.body.email });   // checking whether user is already exist or not
      if (user) {
        return res.status(400).json({ error: "Sorry a user with this email already exists" })
      }
      const JWT_SECRET = "abc"
      const salt = await bcrypt.genSalt(10);   // adding salt to password
      const secPass = await bcrypt.hash(req.body.password, salt)  // hashing that password

      user = await User.create({  // creating a user
          name: req.body.name,
          email: req.body.email,
          password: secPass,
        })
        const data = {
          user:{
            id:User.id  // taking user email id
          }
        }
        const authToken = jwt.sign(data, JWT_SECRET); // sending token to user
        res.json({authToken})
    }
    catch (error) {
      console.error(error.message);  // if any error occurs in try use this
      res.status(500).send("Internal Server Error");  
    }
      
      
})

module.exports = router 