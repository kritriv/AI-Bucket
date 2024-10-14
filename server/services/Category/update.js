const {category } = require('../../models');
const { ObjectId } = require('mongodb');

const UpdateCategory = async (id, updateCategoryData) => {
    try {
        console.log('Updating category with ID:', id);
        console.log('Update data:', updateCategoryData);
        
        // Check for valid ObjectId
        if (!ObjectId.isValid(id)) {
            throw new Error('Invalid Category ID format');
        }

        // Create the filter using ObjectId
        const filter = { _id: new ObjectId(id) };

        // Update the category
        const result = await category.findByIdAndUpdate(filter, updateCategoryData, {
            new: true,
            runValidators: true, // Ensures validation rules are applied
        });

        // Check if category was found and updated
        if (!result) {
            throw new Error('Category not found');
        }

        console.log('Updated Category:', result); // Log the updated category
        return result;
    } catch (error) {
        throw new Error(`Error occurred while updating Category: ${error.message}`);
    }
};

module.exports = UpdateCategory;
