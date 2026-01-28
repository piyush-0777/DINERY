const cloudinary = require('../config/cloudConfig')



async function deleteImage (publicId) {
  try {
    // const publicId = getPublicIdFromUrl(imageUrl);
     console.log(publicId)
    const result = await cloudinary.uploader.destroy(publicId , {
    resource_type: "image",
    invalidate: true,
  });
    
    return result.result;
  } catch (error) {
   
    throw error;
  }
}
module.exports = deleteImage;
