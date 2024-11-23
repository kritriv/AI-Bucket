const multer = require('multer');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

// Get the base upload directory from the environment variable
const baseUploadDir = process.env.UploadPath;

// Ensure the upload directory is defined
if (!baseUploadDir) {
    throw new Error('UploadPath environment variable is not defined');
}

// Utility function to create the directory structure dynamically
const ensureDirectoryExists = (dirPath) => {
    try {
        fs.accessSync(dirPath, fs.constants.R_OK | fs.constants.W_OK);
    } catch (error) {
        fs.mkdirSync(dirPath, { recursive: true });
    }
};

const generateUniqueFilename = (originalName) => {
    const timestamp = Date.now();
    return `${timestamp}-${originalName}`;
};

// Multer storage configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        try {
            // Safeguard: Check if baseUploadDir exists
            if (!baseUploadDir) {
                throw new Error('Base upload directory is not set.');
            }

            // Safeguard: Ensure base directory is valid
            ensureDirectoryExists(baseUploadDir);

            // Extract entity from the URL or route
            let entity;

            // Try to get the entity from the route (assuming it’s the last part of the URL)
            const parts = req.baseUrl.split('/');
            if (parts.length > 1) {
                entity = parts[parts.length - 1]; // This should now be 'category'
            } else {
                entity = 'default'; // Fallback if we can't extract the entity
            }

            // Handle potential versioning in the URL (like 'v1') and skip it
            if (entity.startsWith('v')) {
                entity = req.path.split('/')[1]; // Adjust to pick the correct entity like 'category'
            }

            // Construct the dynamic path for the entity (use the entity name as the folder name)
            const uploadDir = path.join(baseUploadDir, entity);

            // Ensure that the upload directory exists
            ensureDirectoryExists(uploadDir);

            // Pass the upload directory to multer
            cb(null, uploadDir);
        } catch (error) {
            console.error('Error setting upload destination:', error.message);
            cb(error);
        }
    },
    filename: (req, file, cb) => {
        try {
            const uniqueFilename = generateUniqueFilename(file.originalname);
            cb(null, uniqueFilename);
        } catch (error) {
            console.error('Error generating file name:', error.message);
            cb(error);
        }
    },
});

// File filter to allow only images (JPEG, PNG, JPG)
const fileFilter = (req, file, cb) => {
    const isImage = file.mimetype.startsWith('image/');
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];

    if (!isImage) {
        req.fileValidationError = 'Invalid file type. Only images allowed.';
        console.error(req.fileValidationError);
        return cb(null, false);
    }

    if (!allowedTypes.includes(file.mimetype)) {
        req.fileValidationError = 'Invalid file type. Only JPEG and PNG images are allowed.';
        console.error(req.fileValidationError);
        return cb(null, false);
    }

    cb(null, true);
};

// Create upload middleware with dynamic file size limit and multiple fields support
const createUploadMiddleware = (fields, maxSize = 5 * 1024 * 1024) => {
    return multer({
        storage,
        fileFilter,
        limits: { fileSize: maxSize }, // Dynamic file size limit
    }).fields(fields); // Support multiple files for each entity
};

// Error handling middleware for multer errors
const handleUploadError = (err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        return res.status(500).json({ error: err.message });
    } else if (err) {
        return res.status(400).json({ error: err });
    }
    next();
};

module.exports = { createUploadMiddleware, handleUploadError };
