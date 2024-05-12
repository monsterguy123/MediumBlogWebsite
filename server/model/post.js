const mongoose = require('mongoose');
const postSchema = new mongoose.Schema({
    imagePath:{type:String},
    title:{type:String , required:true},
    content:{type:String},
    category:{type:String},
    userImg:{type:String},
    userName:{type:String},
    userId:{type:mongoose.Schema.Types.ObjectId , ref:'user'}
},{timestamps:true})

const Post = mongoose.model("Post",postSchema)

module.exports = Post;