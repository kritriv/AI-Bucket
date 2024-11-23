const { handleApiResponse } = require('../../modules/responseHandler');
const { update } = require('../../services/event');
const { idSchema } = require('../../validators/Schemas');

// To Update a Single event Details
const UpdateItem = async (req, res) => {
    try {
        const id = req.params.id;
        await idSchema.parseAsync({ _id: id });

        const updateeventData = req.body;
        const event = await update(id, updateeventData);

        if (!event) {
            return handleApiResponse(res, 404, `event not found with id: ${id} ! Updation unsuccessful`);
        }
        

        handleApiResponse(res, 200, 'event updated successfully', {
            data: event,
        });
    } catch (error) {
        const errorMessage = error.message.includes('Invalid ID format') ? 'Provide valid Id' : `An error occurred while updating the single event: ${error.message}`;
        if (errorMessage === 'Provide valid Id') {
            handleApiResponse(res, 400, errorMessage, { error: 'An error occurred while updating the single event' });
        } else {
            if (error.message.includes('E11000 duplicate key error')) {
                handleApiResponse(res, 400, 'event Name must be unique', { error: error.message });
            } else {
                handleApiResponse(res, 500, errorMessage, { error: 'Internal Server Error' });
            }
        }
    }
};

module.exports = UpdateItem;
