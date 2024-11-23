const {event } = require('../../models');
const { ObjectId } = require('mongodb');

const UpdateNew = async (id, updateeventData) => {
    try {
        console.log('Updating event with ID:', id);
        console.log('Update data:', updateeventData);
        
        // Check for valid ObjectId
        if (!ObjectId.isValid(id)) {
            throw new Error('Invalid event ID format');
        }

        // Create the filter using ObjectId
        const filter = { _id: new ObjectId(id) };

        // Update the event
        const result = await event.findByIdAndUpdate(filter, updateeventData, {
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
