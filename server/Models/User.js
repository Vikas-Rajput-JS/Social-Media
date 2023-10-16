const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    bio:{type:String,default:"Hello Wolrd"},
    image:{type:String,default:'user-image'},
    follower:{type:Number,default:0},
    following:{type:Number,default:0}
})

const Model = mongoose.model('Users',UserSchema);
module.exports= Model;