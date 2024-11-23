const {news } = require('../../models');
const { ObjectId } = require('mongodb');
const path = require('path');
const { deleteFiles } = require('../../utils/fileUtils');


const UpdateNew = async (id, updateNewsData, iconFile) => {
    try {
        console.log('Updating News with ID:', id);
        console.log('Update data:', updateNewsData);
        
        // Check for valid ObjectId
        if (!ObjectId.isValid(id)) {
            throw new Error('Invalid News ID format');
        }
        const currentnews = await news.findById(id);
        if (!currentnews) {
            throw new Error('news not found');
        }

        // Handle icon file replacement if provided
        if (iconFile) {
            // Remove old icon file if it exists
            await deleteFiles(path.join(__dirname,"../../../uploads/news",currentnews.icon.filename));

            // Update the new icon's path and filename
            updateNewsData.icon = {
                path: iconFile.path,       // Full path where the file is stored
                filename: iconFile.filename // The filename assigned by multer
            };
        }

        // Update the News
        const result = await news.findByIdAndUpdate(id, updateNewsData, {
            new: true,
            runValidators: true, // Ensures validation rules are applied
        });

        // Check if New was found and updated
        if (!result) {
            throw new Error('New not found');
        }

        console.log('Updated New:', result); // Log the updated New
        return result;
    } catch (error) {
        throw new Error(`Error occurred while updating New: ${error.message}`);
    }
};

module.exports = UpdateNew;
