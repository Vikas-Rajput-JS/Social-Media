const express = require('express')
const Router = express.Router();
const Posts = require('../Models/Posts')

Router.post('/createpost',async(req,res)=>{
    try {
        let post = await Posts.create({
            name:req.body.name,
            caption:req.body.caption,
            pic:req.body.pic,
            userId:req.body.userId
        })
       
            res.send(post)
        
       
        
    } catch (error) {
        res.status(400).send(error)
    }
})


Router.post('/getpost',async(req,res)=>{
    try {
        let find = await Posts.find(req.body.userId)
        if(!find){
            res.status(400).send({error:"You Do Not Have Any Posts"})
        }
        res.send(find)
       
    } catch (error) {
        // res.status(400).send(error)
    }
})


Router.post('/editpost/:id',async(req,res)=>{
   
    try {
   


    let find = await Posts.findById(req.params.id)
    if(!find){
        res.status(401).send({error:"Post not found"})
    }

    let Update = await Posts.updateOne({_id:req.params.id},{$set:{caption:req.body.caption}})

    res.send(Update)
} catch (error) {
    res.status(401).send(error)
}

})


Router.post('/deletepost/:id',async(req,res)=>{
    try {
  
        const deleteitem = await Posts.findByIdAndDelete(req.params.id)
    if(!deleteitem){
        res.status(400).send({error:"Post Not Found"})
    }
    res.send(deleteitem)

    } catch (error) {

    }
})

Router.post('/like',async(req,res)=>{
    try {

let find = await Posts.find(req.body._id)
if(find.islike==true){
    let update = await Posts.updateOne({_id:req.body._id},{$set:{islike:false}})
    res.send(update)

}else if(find.islike==false){
    let update = await Posts.updateOne({_id:req.body._id},{$set:{islike:true}})
    res.send(update)
}
    } catch (error) {
        res.status(401).send(error)
    }
    
})






module.exports = Router;