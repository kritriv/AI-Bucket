const { category } = require('../../models');
const { ObjectId } = require('mongodb');
const fs = require('fs');
const path = require('path');
const { deleteFiles } = require('../../utils/fileUtils');
const ICON_UPLOAD_DIR = process.env.UploadPath || 'uploads/'; // Ensure it uses the correct base path

const UpdateCategory = async (id, updateCategoryData, iconFile) => {
    try {
        console.log('Updating category with ID:', id);
        console.log('Update data:', updateCategoryData);

        // Validate Category ID format
        if (!ObjectId.isValid(id)) {
            throw new Error('Invalid Category ID format');
        }

        // Fetch the current category using the ObjectId
        const currentCategory = await category.findById(id);
        if (!currentCategory) {
            throw new Error('Category not found');
        }

        // Handle icon file replacement if provided
        if (iconFile) {
            // Remove old icon file if it exists
            const filepath = path.join(__dirname,'../../../uploads/category',currentCategory.icon.filename);
            await deleteFiles(filepath);
            // Update the new icon's path and filename
            updateCategoryData.icon = {
                path: iconFile.path,       // Full path where the file is stored
                filename: iconFile.filename // The filename assigned by multer
            };
        }

        // Update the category with the new data
        const updatedCategory = await category.findByIdAndUpdate(
            id,
            updateCategoryData,
            { new: true, runValidators: true } // Ensure the latest data is returned and validation is enforced
        );

        console.log('Updated Category:', updatedCategory); // Log the updated category
        return updatedCategory;
    } catch (error) {
        try {
            if (iconFile) {
                await deleteFiles(iconFile.map(icon => path.join(__dirname, '../../../uploads/category', icon.filename)));
            }
        } catch (rollbackError) {
            console.error(`Error during rollback of file deletions: ${rollbackError.message}`);
        throw new Error(`Error occurred while updating listing: ${error.message}`);
    }
    }
};

module.exports = UpdateCategory;
