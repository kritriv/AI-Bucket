const { category, listing } = require('../../models');
const mongoose = require('mongoose');

const Addlisting = async ({ name, description, category: categoryId, status }) => {
    try {
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
            status,
        });
        console.log(newListing)
        const result = await newListing.save(); // Save the listing
        return result;
    } catch (error) {
        throw new Error(`Error occurred while adding listing: ${error.message}`);
    }
};

module.exports = Addlisting;
