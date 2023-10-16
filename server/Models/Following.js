const mongoose = require('mongoose')

const FollowingSchema = mongoose.Schema({
    userId:{type:String,required:true},
    followId:{type:String,required:true},
    name:{type:String,required:true},
    username:{type:String,required:true}
    
   
    
   
   
})

const Model = mongoose.model('Followers',FollowingSchema);
module.exports= Model;