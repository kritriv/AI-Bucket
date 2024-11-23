const { category } = require('../../models');
const path = require('path');

const AddImg = async (id, file) => {
    try {
        // Check if the file is provided
        if (!file) {
            throw new Error('No file provided. Please upload an image.');
        }

        // Find the category by ID
        const foundCategory = await category.findById(id);
        if (!foundCategory) {
            throw new Error('Category not found. Please provide a valid category ID.');
        }

        // Construct the image path
        const imagePath = path.join(file.path);
        foundCategory.icon = imagePath;

        // Save the updated category
        await foundCategory.save();
        return imagePath; // Return the saved image path
    } catch (error) {
        throw new Error(`Error occurred while updating the category icon: ${error.message}`);
    }
};

module.exports = AddImg;
