const mongoose = require('mongoose')
const PostSchema = mongoose.Schema({
    caption:{type:String,required:true},
    pic:{type:String,default:"https://i.pinimg.com/originals/25/25/0a/25250a0b1df5d8dbd9d43c7e7d45268e.jpg"},
    userId:{type:String,required:true},
    date:{type:String,default:Date.now},
    name:{type:String,required:true},
    islike:{type:String,default:false}
})
const Model = mongoose.model('posts',PostSchema)

module.exports=Model;