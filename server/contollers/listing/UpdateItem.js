const { handleApiResponse } = require('../../modules/responseHandler');
const { update } = require('../../services/listing');
const { idSchema } = require('../../validators/Schemas');

// To Update a Single listing Details
const UpdateItem = async (req, res) => {
    try {
        const id = req.params.id;
        await idSchema.parseAsync({ _id: id });

        const updatelistingData = req.body;
        const listing = await update(id, updatelistingData);

        if (!listing) {
            return handleApiResponse(res, 404, `listing not found with id: ${id} ! Updation unsuccessful`);
        }
        

        handleApiResponse(res, 200, 'listing updated successfully', {
            data: listing,
        });
    } catch (error) {
        const errorMessage = error.message.includes('Invalid ID format') ? 'Provide valid Id' : `An error occurred while updating the single listing: ${error.message}`;
        if (errorMessage === 'Provide valid Id') {
            handleApiResponse(res, 400, errorMessage, { error: 'An error occurred while updating the single listing' });
        } else {
            if (error.message.includes('E11000 duplicate key error')) {
                handleApiResponse(res, 400, 'listing Name must be unique', { error: error.message });
            } else {
                handleApiResponse(res, 500, errorMessage, { error: 'Internal Server Error' });
            }
        }
    }
};

module.exports = UpdateItem;
