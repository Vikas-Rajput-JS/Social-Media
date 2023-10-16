const express = require("express");
const Router = express.Router();
const { body, validationResult } = require("express-validator");
const JWT = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../Models/User");
const { generateFromEmail, generateUsername } = require("unique-username-generator");
const SECRET_KEY = "59358JDGKJD@#gfdfgAKSDJH";
const FetchUser = require('../Middleware/Auth')

Router.post(
  "/signup",
  [
    body("name").isLength({ min: 4 }),
    body("email").isEmail(),
    body("password").isLength({ min: 8 }),
  ],
  async (req, res) => {
    const Error = validationResult(req);
    if (!Error.isEmpty()) {
      return res.status(400).json({ error: Error.array() });
    }

    const { name, email, password } = req.body;

    try {
      const user = await User.findOne({ email: email });
      if (user) {
        return res
          .status(400)
          .json({ error: "Email already Exists with Another User" });
      }

      let Salt = await bcrypt.genSalt(10);
      let secPass = await bcrypt.hash(password, Salt);
      
      let NewUser = await User.create({
        name: name,
        email: email,
        password: secPass,
        username:`@${name}`
      });

      const data = {
        NewUser: {
          id: NewUser.id,
        },
      };

      const AuthToken = JWT.sign(data, SECRET_KEY);

      res.json({ AuthToken });
    } catch (error) {
      res.status(400).json({ error: "Something Went Wrong" });
      console.log(error);
    }
  }
);



Router.post('/login',[  body("email").isEmail(),
body("password").isLength({ min: 8 }),],async(req,res)=>{
    const Error = validationResult(req)

    if(!Error.isEmpty()){
        return res.status(400).json({error:Error.array()})
    }

const {email,password} = req.body;
try {
    
const user = await User.findOne({email})
if(!user){
    return res.status(400).json({error:'User Not Found'})
}

let PassCompare = await bcrypt.compare(password,user.password)

if(!PassCompare){
    return res.status(400).json({error:'Please Enter Valid Credentials'})
}


let data = {
    user:{
        id:user.id
    }
}
const token = JWT.sign(data,SECRET_KEY)
 res.send({token})



} catch (error) {
    res.status(400).json({error:"Something Went Wrong"})
    console.log(error)
}


})

Router.post('/getuserdetails',FetchUser,async(req,res)=>{
    try {
        const UserId = req.user.id;
        // console.log(UserId)
        const user = await User.findById(UserId).select('-password')
        // if(!user){
        //     return res.status(501).json({error:'Please Login Using Valid Token'})
        // }
        res.send({user})
    } catch (error) {
        res.status(400).json({error:"Something Went Wrong"})
        console.log(error)   
    }
})


Router.post('/getallusers',FetchUser,async(req,res)=>{
try {
    const UserId = req.user.id;
    // console.log(UserId)
    let user =  await User.find({});

    res.send({user})
} catch (error) {
    res.status(400).json({error:"Something Went Wrong"})
    console.log(error)  
}
})



module.exports = Router;
