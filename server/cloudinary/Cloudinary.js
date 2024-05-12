const Cloudinary = require('cloudinary').v2

Cloudinary.config({
    cloud_name:"db3hh5stk",
    api_key:"738345996131422",
    api_secret:"5WpYoszYqVid7I-Yq2bOtPPahEE"
})


const uploadImages = async(filePath)=>{
    try {
        const img = await Cloudinary.uploader.upload(filePath);
        return img.secure_url;
    } catch (error) {
        console.log(error.message);
    }
} 

module.exports =  uploadImages;