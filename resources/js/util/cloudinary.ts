
import axios from 'axios';
const PRESET= import.meta.env.VITE_CLOUDINARY_PRESET;
const CLOUD_NAME= import.meta.env.VITE_CLOUDINARY_CLOUD_NAME

export const uploadToCloudinary = async (file: File, folder: string, publicId?: string) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", PRESET);
    formData.append("folder", folder);

    const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        formData
    );
    
    // Return the full response so we can get the public_id
    return response.data; 
};