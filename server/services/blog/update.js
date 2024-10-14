const {blog } = require('../../models');
const { ObjectId } = require('mongodb');

const UpdateNew = async (id, updateblogData) => {
    try {
        console.log('Updating blog with ID:', id);
        console.log('Update data:', updateblogData);
        
        // Check for valid ObjectId
        if (!ObjectId.isValid(id)) {
            throw new Error('Invalid blog ID format');
        }

        // Create the filter using ObjectId
        const filter = { _id: new ObjectId(id) };

        // Update the blog
        const result = await blog.findByIdAndUpdate(filter, updateblogData, {
            new: true,
            runValidators: true, // Ensures validation rules are applied
        });

        // Check if New was found and updated
        if (!result) {
            throw new Error('Blog not found');
        }

        console.log('Updated Blog:', result); // Log the updated New
        return result;
    } catch (error) {
        throw new Error(`Error occurred while updating Blog: ${error.message}`);
    }
};

module.exports = UpdateNew;
