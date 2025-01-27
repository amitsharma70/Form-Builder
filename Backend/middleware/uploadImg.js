const multer = require('multer');
const path = require('path');
const sharp = require('sharp');
const fs = require('fs');

// Multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../public/images/"));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + "-" + uniqueSuffix + ".jpeg");
  },
});

// File filter to ensure only images are uploaded
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Not an image! Please upload an image.'), false);
  }
};

// Multer upload configuration
const uploadPhoto = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 2 * 1024 * 1024 } // Limit file size to 2MB
});

// Sharp image resize function
const productImgResize = async (req, res, next) => {
  if (!req.file) return next();
  
  const file = req.file;
  const newFilePath = path.join(__dirname, "../public/images/products/", file.filename);
  
  await sharp(file.path)
    .resize(300, 300)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(newFilePath); // Save the resized image to the new directory
    
  // fs.unlinkSync(file.path); // Delete the original image
  file.path = newFilePath; // Update the file path to the resized image
  
  next();
};

module.exports = { productImgResize, uploadPhoto };
