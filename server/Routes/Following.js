const express = require('express')
const FetchUser = require('../Middleware/Auth')
const Router = express.Router()
const Following = require('../Models/Following')
const User = require('../Models/User')
const Followers = require('../Models/Followers')



Router.post('/alluser',async(req,res)=>{
    try {
        let user = await User.find({})
        res.send(user)
    } catch (error) {
        res.status(400).send(error)
    }
})

Router.post('/startfollow',async(req,res)=>{
    try {
        
        let find = await  Followers.findOne(req.body)
  
        if(find){
            return res.status(400).send({error:"You Have Already Followed"})

        }
        const StartFollow = new Followers(req.body)
        const save = await StartFollow.save()

        res.send(StartFollow)
    } catch (error) {
      res.status(400).send(error)  
    }
})

Router.post('/follower',async(req,res)=>{
    try {
        const find = await Followers.find({followId:req.body.userId})
        if(!find){
            return res.status(400).send({error:"You Don't Have Followers"})
        }

        res.send(find)
    } catch (error) {
        res.status(400).send(error)
    }
})


Router.post('/following',async(req,res)=>{
    try {
        const find = await Followers.find({userId:req.body.userId})
        if(!find){
            res.status(400).send({error:"You not following"})
        }
        res.send(find)
    } catch (error) {
        
    }
})

Router.post('/unfollow/:id',async(req,res)=>{
    try {
        let Unfollow = await Followers.findByIdAndDelete(req.params.id)
        if(!Unfollow){
            res.status(400).send({error:"Something Went Wrong"})
        }
res.send(Unfollow)
    } catch (error) {
        
    }
})



module.exports=Router;
