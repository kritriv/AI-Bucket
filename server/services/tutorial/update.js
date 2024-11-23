const {tutorial, tool } = require('../../models');
const { ObjectId } = require('mongodb');

const UpdateNew = async (id, updatetutorialData) => {
    try {
        console.log('Updating tutorial with ID:', id);
        console.log('Update data:', updatetutorialData);
        
        // Check for valid ObjectId
        if (!ObjectId.isValid(id)) {
            throw new Error('Invalid tutorial ID format');
        }


        if (updatetutorialData.tool) {
            if (!ObjectId.isValid(updatetutorialData.tool)) {
                throw new Error('Invalid tool ID format');
            }

            // Check if category exists
            const toolExists = await tool.findById(updatetutorialData.tool);
            if (!toolExists) {
                throw new Error('Tool does not exist');
            }
        }
        // Create the filter using ObjectId
        const filter = { _id: new ObjectId(id) };

        // Update the tutorial
        const result = await tutorial.findByIdAndUpdate(filter, updatetutorialData, {
            new: true,
            runValidators: true, // Ensures validation rules are applied
        });

        // Check if New was found and updated
        if (!result) {
            throw new Error('New not found');
        }

        console.log('Updated New:', result); // Log the updated New
        return result;
    } catch (error) {
        throw new Error(`Error occurred while updating New: ${error.message}`);
    }
};

module.exports = UpdateNew;
