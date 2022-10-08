const cloudinary = require('cloudinary').v2;
require('dotenv').config();
const { CLOUDINARY_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = process.env;

cloudinary.config({ 
    cloud_name: CLOUDINARY_NAME, 
    api_key: CLOUDINARY_API_KEY, 
    api_secret: CLOUDINARY_API_SECRET,
    secure: true
});
const uploadImage = async (filePath)=>{
    return await cloudinary.uploader.upload(filePath, {
        folder: 'Images-Proyect-Ecommerce'
    })
}
const deleteImage = async (imageId)=>{
    return await cloudinary.uploader.destroy(imageId);
}

module.exports = {uploadImage, deleteImage};