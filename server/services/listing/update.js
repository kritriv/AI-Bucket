const { listing, category } = require('../../models');
const { ObjectId } = require('mongodb');
const path = require("path");
const { deleteFiles } = require('../../utils/fileUtils');

const Updatelisting = async (id, updatelistingData,icon) => {
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

        if(icon){
            const listingdata = await listing.find({_id:id},'icon');
            const filepath = path.join(__dirname, '../../../uploads/listing', listingdata.i.filename);
            await deleteFiles(filepath);
            updatelistingData.icon = {
                path: icon.path,
                filename: icon.filename,
            }
        };

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
        try {
            if (icon) {
                await deleteFiles(icon.map(icon => path.join(__dirname, '../../../uploads/listing', icon.filename)));
            }
        } catch (rollbackError) {
            console.error(`Error during rollback of file deletions: ${rollbackError.message}`);
       
        throw new Error(`Error occurred while updating listing: ${error.message}`);
    }
};
}
module.exports = Updatelisting;
