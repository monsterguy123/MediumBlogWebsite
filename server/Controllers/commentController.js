const Comment = require('../model/comments')
const User = require('../model/user')
const zod = require('zod')


//Create a comment
const commentSchema = zod.object({
    comment:zod.string(),
    postId:zod.string()
})

const CreateCommentController = async(req,res)=>{
    try {
        const parse = commentSchema.safeParse(req.body);
        if(parse.success === false){
            res.json({msg:"something wrong with the request body"})
        }

        const userId = req.userId;
        //getting user's name and img
        const user = await User.findById({_id:userId});
        const userName = user.username;
        const img = user.imgPath;

        
        await Comment.create({
           ...req.body,
           user:userName,
           userImg:img,
           userId  
        })
        res.json({msg:"comment posted successfully..."});
    } catch (error) {
        res.json({msg:error.message});
    }
}

//Delete a comment
const DeleteCommentController = async(req,res)=>{
    try {
       const userId = req.userId;
       const id = req.params.commentId;
       const postId = req.params.postId;
       await Comment.deleteOne({_id:id , userId , postId})
       res.json({msg:"comment deleted successfully!!!"})
    } catch (error) {
       res.json({msg:error.message})
    }
}

//get all comment of a post
const GetCommentController = async(req,res)=>{
    try {
        const postId = req.params.postId;
        const Comments = await Comment.find({postId});
        
        res.json({Comments})
    } catch (error) {
        res.json({msg:error.message})
    }
}

module.exports = {CreateCommentController,DeleteCommentController,GetCommentController}