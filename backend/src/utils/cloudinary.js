const cloudinary = require('cloudinary').v2;
require('dotenv').config();
const fs = require('fs');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

async function uploadImageToCloudinary(filePath) {
    try {
        if (!filePath) {
            return null;
        }
        const response = await cloudinary.uploader.upload(filePath,{
            folder: 'job-portal',
            allowed_formats: ['jpg', 'png', 'jpeg']
        })
        console.log(`Image uploaded to cloud : ${response.secure_url}`)
        return response;
    } catch (error) {
        console.error("Failed to upload image to cloud", error);
        return null;

    }
    finally{
          try {
              if (fs.existsSync(filePath)) {
                  fs.unlinkSync(filePath); // Delete the file locally after upload
                  console.log("Local file deleted:", filePath);
              }
          } catch (unlinkErr) {
              console.error("Failed to delete local file:", unlinkErr);
          }
    }
}


async function deleteImageByPublicId(publicId) {
    try {
        const response = cloudinary.uploader.destroy(`job-portal/${publicId}`);
        console.log(`Image deleted from cloudinary: ${response}`)
        return response;
    } catch (error) {
        console.log(`Failed to delete image from cloudinary: ${error}`)
        return null;
    }
}


module.exports = {
    uploadImageToCloudinary,
    deleteImageByPublicId
};
