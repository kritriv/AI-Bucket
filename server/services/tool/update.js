const { tool, listing } = require('../../models');
const { ObjectId } = require('mongodb');

const Updatetool = async (id, updatetoolData) => {
    try {
        console.log('Updating tool with ID:', id);
        console.log('Update data:', updatetoolData);

        // Validate tool ID format
        if (!ObjectId.isValid(id)) {
            throw new Error('Invalid tool ID format');
        }

        // Check if a valid listing ID is provided
        if (updatetoolData.listing) {
            if (!ObjectId.isValid(updatetoolData.listing)) {
                throw new Error('Invalid listing ID format');
            }

            // Check if the listing exists in the database
            const listingExists = await listing.findById(updatetoolData.listing);
            if (!listingExists) {
                throw new Error('Listing not found');
            }
        }

        // Find and update the tool by its ID
        const updatedTool = await tool.findByIdAndUpdate(id, updatetoolData, {
            new: true,           // Return the updated document
            runValidators: true, // Ensure that the validation rules are applied
        });

        // If the tool is not found, throw an error
        if (!updatedTool) {
            throw new Error('Tool not found with the provided ID');
        }

        console.log('Updated tool:', updatedTool); // Log the updated tool
        return updatedTool;
    } catch (error) {
        throw new Error(`Error occurred while updating tool: ${error.message}`);
    }
};

module.exports = Updatetool;
