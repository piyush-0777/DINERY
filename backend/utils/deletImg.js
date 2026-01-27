const cloudinary = require('../config/cloudConfig')



async function deleteImage (imageUrl) {
  try {
    // const publicId = getPublicIdFromUrl(imageUrl);
     console.log(imageUrl)
    const result = await cloudinary.uploader.destroy(imageUrl , {
    resource_type: "image",
    invalidate: true,
  });
    console.log('this is img status',result.result)
    return result.result;
  } catch (error) {
    console.error("Cloudinary delete error:", error);
    throw error;
  }
}
module.exports = deleteImage;
