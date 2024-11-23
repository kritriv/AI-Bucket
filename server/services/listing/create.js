const { category, listing } = require('../../models');
const mongoose = require('mongoose');
const path = require("path");
const {deleteFiles} = require("../../utils/fileUtils");


const Addlisting = async ({ name, description, category: categoryId,icon, status }) => {
    try {
        
            if (icon) {
                // Store paths to delete in case of error
                uploadedIconPath = path.join(__dirname, '../../../uploads/listing', icon.filename);
            }
            
        // Ensure categoryId is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(categoryId)) {
            throw new Error('Invalid category ID format');
        }

        // Check if the category exists
        const existingCategory = await category.findById(categoryId);
        console.log('Checking for existing category:', existingCategory); // Log for debugging
        if (!existingCategory) {
            throw new Error('Category not found');
        }

        // Create the new listing
        const newListing = new listing({
            name,
            description,
            category: categoryId, // Use the correct category reference
            icon:{ path: icon.path,
                filename: icon.filename,
             },
            status,
        });
        console.log(newListing)
        const result = await newListing.save(); // Save the listing
        return result;
    } catch (error) {
        await deleteFiles([uploadedIconPath]);
        throw new Error(`Error occurred while adding listing: ${error.message}`);
    }
};

module.exports = Addlisting;
