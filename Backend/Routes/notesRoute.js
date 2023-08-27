const express = require('express');
const notesRouter = express.Router()
const User = require('../Models/User')
const Notes = require('../Models/Notes')
const fetchUser = require('../middleware/fetchUser')
const { body, validationResult } = require("express-validator")



// Route 1 : get all the notes of loggin user
notesRouter.get('/fetchAllNotes',fetchUser,async (req,res)=>{
    try {
        const notes = await Notes.find({user : req.user.id});
        return res.json(notes)
    } catch (error) {
        return res.json({
            message : error.message
        })
    }
})



// Route 2 : Add a new note of loggin user
notesRouter.post('/addNote',[
    body('title').exists(),
    body('description').exists()
],fetchUser,async (req,res)=>{
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        } 
        let newNotes = req.body
        newNotes.user = req.user.id;
        let note = await Notes.create(newNotes);
        return res.json({
            note
        })
    } catch (error) {
        return res.json({
            message : error.message
        })
    }
})


// Route 3 : Update a note of loggin user
notesRouter.put('/updateNote/:id',fetchUser,async (req,res)=>{
    try {
        const {title, description, tag} = req.body;
        const newNote = {};
        if(title) newNote.title = title;
        if(description) newNote.description = description;
        if(tag) newNote.tag = tag;

        // find the note to be updtaed
        let  note =await Notes.findById(req.params.id);
        if(!note){
            return res.json({
                message : "Note do not exist"
            })
        }
        if(note.user.toString()!=req.user.id){
            return res.json({
                message : "unauthorised operation"
            })
        }
        note = await Notes.findByIdAndUpdate(req.params.id,{$set : newNote},{new : true});
        return res.json({
            data  : note,
            message : " Note updated succesfully"
        })
       
    } catch (error) {
        return res.json({
            message : error.message
        })
    }
})


// Route 4 : Delete a note of loggin user
notesRouter.delete('/deleteNote/:id',fetchUser,async (req,res)=>{
    try {
        // find the note to be updtaed
        let  note =await Notes.findById(req.params.id);
        if(!note){
            return res.json({
                message : "Note do not exist"
            })
        }
        if(note.user.toString()!=req.user.id){
            return res.json({
                message : "unauthorised operation"
            })
        }
        note = await Notes.findByIdAndDelete(req.params.id);
        return res.json({
            data  : note,
            message : " Note Deleted succesfully"
        })
       
    } catch (error) {
        return res.json({
            message : error.message
        })
    }
})


module.exports  = notesRouter