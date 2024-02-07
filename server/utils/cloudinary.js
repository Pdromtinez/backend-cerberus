import dotenv from 'dotenv'
import {v2 as cloudinary} from 'cloudinary';

dotenv.config();

const {
    CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET,
    CLOUDINARY_CLOUD_NAME,
} = process.env;


cloudinary.config({
    cloud_name: CLOUDINARY_CLOUD_NAME, 
    api_key: CLOUDINARY_API_KEY, 
    api_secret: CLOUDINARY_API_SECRET,
    secure: true
})

    export const uploadImage = async (filePath) => {
        return await cloudinary.uploader.upload(filePath, {
            folder: 'Cerberus-Guard'
        })
    }

    export const deleteImage = async (publicId) => {
        return await cloudinary.uploader.destroy(publicId)
    }