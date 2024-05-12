const zod = require('zod')
const Post = require('../model/post')
const Like = require('../model/like')
const User = require('../model/user')
const Cloudinary = require('../cloudinary/Cloudinary')

//Post Creation
const PostSchema = zod.object({
    title:zod.string(),
    content:zod.string().optional(),
    category:zod.string().optional()
})
const CreatePostController = async(req,res) =>{
    try {
        
        const file = req.files.file;
        const filePath = file.tempFilePath;
        const url = await Cloudinary(filePath);

        const parse = PostSchema.safeParse(req.body);
        if(parse.success === false){
             res.json({msg:"something wrong with the object sent!!!"});
        }
        
        const userId = req.userId;

        //get user
        const user = await User.findById({_id:userId});
        const userName = user.username;
        const userImg = user.imgPath;

        await  Post.create({...req.body,userName,userImg,imagePath:url,userId});
        res.json({msg:"post created successfully"});

    } catch (error) {
        res.json({msg:error.message})
    }
} 

//get all post
const GetPostController = async(req,res)=>{
    try {

        const categories = req.params.categories;
        
        let posts;
        if(categories === "all"){
            posts = await Post.find({});
        }else{
            posts = await Post.find({category:categories});
        }
        res.json({posts});
    } catch (error) {
        res.json({msg:error.message})
    }
}

//view clicked post
const viewClickedPost = async(req,res)=>{
    try {
        const id = req.params.id;
        const data = await Post.findById({_id:id});


        return res.json({data})
    } catch (error) {
        return res.json({msg:error.message})
    }
}

//get my post
const getMyPost = async(req,res)=>{
    try {

        const myBlog = await Post.find({userId:req.userId});
        return res.json({myBlog});

    } catch (error) {
        return res.json({msg:error.message});
    }
}

//Update a post
const PostUpdateSchema = zod.object({
    title:zod.string().optional(),
    content:zod.string().optional(),
    image:zod.string().optional(),
})
const UpdatePostcontroller = async(req,res)=>{
    try {
        const id = req.params.postid;
        const userId = req.userId; 
        const parse = PostUpdateSchema.safeParse(req.body);
        
        if(parse.success === false){
            res.json({msg:"something wrong with the sent object!!!"})
        }
        
        await Post.updateOne({_id:id,userId:userId},{...req.body});
        res.json({msg:"post updated successfully!!!"});
    
    } catch (error) {
        res.json({msg:error.message});
    }
}

//Delete a post
const DeletePostController = async(req,res)=>{
    try {
       const id = req.params.postid;
       const userId = req.userId;
       await Post.deleteOne({_id:id , userId})
       res.json({msg:"post deleted successfully"})
    } catch (error) {
       res.json({msg:error.message})
    }
}


//Like a post
const LikeController = async (req,res)=>{
    try {
        const postId = req.params.postId;
        const userId = req.userId;
        
        const liked = await Like.findOne({postId,userId});
        if(liked){
           res.json({msg:"liked already"})
        }
        await Like.create({
           postId,
           userId
        })
        res.json({msg:"you Liked a post"})
    } catch (error) {
       res.json({msg:error.message});
    }
}

const UnlikeController = async (req,res)=>{
    try {
        const postId = req.params.postId;
        const userId = req.userId;
        await Like.deleteOne({
           postId,
           userId
        })
        res.json({msg:"you unLiked a post"})
    } catch (error) {
       res.json({msg:error.message});
    }
}

const GetLikeController = async(req,res)=>{
    try {
        const postId = req.params.postId;
        const likes = await Like.findOne({postId});

        res.json({likes});
    } catch (error) {
        res.json({msg:error.message});
    }
}

module.exports = {  CreatePostController ,getMyPost ,viewClickedPost ,GetPostController , UpdatePostcontroller ,DeletePostController,LikeController,UnlikeController,GetLikeController};