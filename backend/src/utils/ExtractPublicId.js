// Utility function to extract public ID from Cloudinary URL
 function extractPublicId(url) {
    const segments = url.split("/");
    const fileName = segments.pop(); // Get the file name
    return fileName.split(".")[0]; // Remove the file extension
}

module.exports = {
    extractPublicId
};
