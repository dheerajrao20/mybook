const express = require('express');
const router = express.Router();
const Notes = require('../models/Notes')
const fetchuser = require('../middleware/fetchuser')
const { body, validationResult } = require('express-validator');

// ROUTE 1 :: get all notes using GET 'api/notes/fetchnotes' => LOGIN REQUIRE
router.get('/fetchnotes', fetchuser,  async (req, res)=>{
    try {
        const notes = await Notes.find({user : req.user.id});
        res.json(notes);  
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
      }
})

// ROUTE 2 :: add a new note using POST 'api/notes/addnotes' => LOGIN REQUIRE
router.post('/addnots', fetchuser,[
    body('title').isLength({ min: 3 }),
    body('description').isLength({ min: 5 }),
] , async (req, res)=>{
    try {
        
        const {title, description, tag} = req.body;
    
        const errors = validationResult(req);          // checking for an error in input methods
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
        const note = new Notes({
            title, description, tag, user: req.user.id
        })
        const savednote = await note.save();
    
        res.json(savednote);
    
    }catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
      }
})

module.exports = router 