const cloudinary = require('../config/cloudConfig')


function getPublicIdFromUrl(url) {
  const parts = url.split("/upload/")[1]; // v123/menu/burger_123.jpg
  const withoutVersion = parts.replace(/^v\d+\//, ""); // menu/burger_123.jpg
  const publicId = withoutVersion.replace(/\.[^/.]+$/, ""); // menu/burger_123
  return publicId;
}

async function deleteImage (imageUrl) {
  try {
    // const publicId = getPublicIdFromUrl(imageUrl);
     console.log(imageUrl)
    const result = await cloudinary.uploader.destroy(imageUrl , {
    resource_type: "image",
    invalidate: true,
  });
    console.log(result)
    return result;
  } catch (error) {
    console.error("Cloudinary delete error:", error);
    throw error;
  }
}
module.exports = deleteImage;
