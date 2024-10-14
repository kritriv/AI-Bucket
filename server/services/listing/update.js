const { listing, category } = require('../../models');
const { ObjectId } = require('mongodb');

const Updatelisting = async (id, updatelistingData) => {
    try {
        console.log('Updating listing with ID:', id);
        console.log('Update data:', updatelistingData);

        // Validate listing ID format
        if (!ObjectId.isValid(id)) {
            throw new Error('Invalid listing ID format');
        }

        // Check if category ID is provided and validate format
        if (updatelistingData.category) {
            if (!ObjectId.isValid(updatelistingData.category)) {
                throw new Error('Invalid category ID format');
            }

            // Check if category exists
            const categoryExists = await category.findById(updatelistingData.category);
            if (!categoryExists) {
                throw new Error('Category does not exist');
            }
        }

        // Update the listing by ID
        const result = await listing.findByIdAndUpdate(id, updatelistingData, {
            new: true,           // Return the updated document
            runValidators: true, // Apply validation rules
        });

        // Check if the listing was found and updated
        if (!result) {
            throw new Error('Listing not found');
        }

        console.log('Updated listing:', result); // Log the updated listing
        return result;
    } catch (error) {
        throw new Error(`Error occurred while updating listing: ${error.message}`);
    }
};

module.exports = Updatelisting;
