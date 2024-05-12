const zod = require('zod');
const User = require('../model/user')
const JWT = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const Cloudinary = require('../cloudinary/Cloudinary')

//user Sign up Controller with zod validation
const userSignupSchema = zod.object({
    username:zod.string().max(20).min(6),
    email:zod.string().email(),
    password:zod.string(),
    imgPath:zod.string()
})
const SignupController = async(req,res)=>{
     try {
        const file = req.files.file;
        const filePath = file.tempFilePath;
        const url = await Cloudinary(filePath);

        const body = {
            username:req.body.name,
            email:req.body.email,
            password:req.body.password,
            imgPath:url
        };

        const parse = userSignupSchema.safeParse(body)

         if(parse.success === false){
             return res.json({msg:"error in either email , password or username"})
        }
         const existingUser = await User.findOne({email:body.email})

         if(existingUser){
             return res.json({msg:"user already exists try with different email"})
         }
         
         const SALT = await bcrypt.genSalt(10);
         const HashPass = await bcrypt.hash(body.password,SALT)
         
         await User.create({
            ...body,
            password:HashPass
         })
         
         return res.json({msg:"user Created Successfully!!!"})
    } catch (error) {
        return res.json({msg:error.message})
    }
};

//user signin with zod validation
const userSigninSchema = zod.object({
    email:zod.string().email(),
    password:zod.string()
})
const SigninController = async(req,res)=>{
    try {
        const body = req.body;    
        const parse = userSigninSchema.safeParse(body)

        if(parse.success === false){
            res.status(403).json({msg:"error in either email , password or username"})
        }

         const existingUser = await User.findOne({email:body.email})

        if(!existingUser){
            res.status(403).json({msg:"user with the email doesn't exist"})
        }
        
        const com = await bcrypt.compare(body.password,existingUser.password)
         console.log(com)
        if(!com){
            res.status(403).json({msg:"incorrect password!!!"})
        }

        const token = JWT.sign({id:existingUser._id},process.env.JWTPRIVATEKEY,{expiresIn:'2d'})

        res.status(200).json({msg:`${existingUser.username} welcome to the wonderful world...`,token,userId:existingUser._id})
    } catch (error) {
        res.json({msg:error.message})
    }
}

const userInfo = async(req,res)=>{
    try {
        const result = await User.findById({_id:req.userId});

        return res.json({imgPath : result.imgPath});
    } catch (error) {
        return res.json({msg:error.message})
    }
}

module.exports = {SignupController , SigninController , userInfo }