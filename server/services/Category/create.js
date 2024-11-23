const { category } = require('../../models');
const path = require('path');
const {deleteFiles} = require("../../utils/fileUtils");

const AddCategory = async ({ status, name, description, icon}) => {
    try {

       
        // Validate required fields
        if (!name) {
            throw new Error('Category name is required.');
        }
        if (!icon) {
            throw new Error('Icon is required.');
        }

        // Check if a category with the same name already exists
        const existingCategory = await category.findOne({ name });
        if (existingCategory) {
            throw new Error('Category with this name already exists.');
        }
        // Create a new category instance
        const newCategory = new category({
            status,
            name,
            description: description || '', // Optional description
            icon:{ path: icon.path,
                filename: icon.filename,
             } // Assuming this is the path to the uploaded icon image
        });

        // Save the category to the database
        const result = await newCategory.save();
        return result; // Return the created category
    } catch (error) {
        try {
            if (icon) {
                await deleteFiles(icon.map(icon => path.join(__dirname, '../../../uploads/category', icon.filename)));
            }
        } catch (rollbackError) {
            console.error(`Error during rollback of file deletions: ${rollbackError.message}`);
       
        throw new Error(`Error occurred while updating listing: ${error.message}`);
    }
    }
};

module.exports = AddCategory;
