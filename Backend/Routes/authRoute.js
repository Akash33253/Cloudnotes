const express = require('express');
const authRouter = express.Router()
const User = require('../Models/User')
const { body, validationResult } = require("express-validator")
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const fetchUser = require('../middleware/fetchUser')
const JWT_SECRET  =  'akashgtcatopk'
//creating user no log in required Route :1
authRouter.post('/createUser', [
    body('name').isLength({ min: 3 }),
    body('email').isEmail(),
    body('password').isLength({ min: 5 })
], async (req, res) => {
    try {
        let success = false;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({success, errors: errors.array() })
        }
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.json({
                success,
                message: "Email id already exists!!"
            })
        }
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass
        });
        const data  = {
            user : {
                id : user.id
            }
        }
        const authToken = jwt.sign(data,JWT_SECRET);
        success = true;
        return res.json({
            success,authToken
        })
    } catch (error) {
        return res.json({
            message: error.message
        })
    }
})


// authenitcating a user login method Route : 2
authRouter.post('/login', [
    body('email').isEmail(),
    body('password').exists()
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        let success = false;
        const { email, password } = req.body;
        let user = await User.findOne({email});
        if(user){ 
            const passwordCmp = await bcrypt.compare(password,user.password);
            if(passwordCmp){
                const data = {
                    user : {
                        id : user.id
                    }
                }
                const authToken = jwt.sign(data,JWT_SECRET);
                success = true;
                res.json({
                    success,
                    authToken
                })
            }
            else{
                success = false;
                return res.json({
                    success,
                    message : "try logging in with correct credeintials1"
                })
            }
        }
        else{
            success  = false;
            return res.json({
                success,
                message : "email not found"
            })
        }
    } catch (error) {
        return res.json({
            message: error.message
        })
    }
    
    
})

//getting the user data Route :3
authRouter.post('/getUser',fetchUser,async (req,res)=>{
       try {
           let user = await User.findById(req.user.id);
           if(user){
                return res.json({
                    user : user
                })
           }
           
       } 
       catch (error) {
        return res.json({
            message : error.message
        })
       }
})

module.exports = authRouter