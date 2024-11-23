const { handleApiResponse } = require('../../modules/responseHandler');
const { update } = require('../../services/tutorial');
const { idSchema } = require('../../validators/Schemas');

// To Update a Single tutorial Details
const UpdateItem = async (req, res) => {
    try {
        const id = req.params.id;
        await idSchema.parseAsync({ _id: id });

        const updateTutorialData = req.body;
        const Tutorial = await update(id, updateTutorialData);

        if (!Tutorial) {
            return handleApiResponse(res, 404, `Tutorial not found with id: ${id} ! Updation unsuccessful`);
        }
        

        handleApiResponse(res, 200, 'Tutorial updated successfully', {
            data: Tutorial,
        });
    } catch (error) {
        const errorMessage = error.message.includes('Invalid ID format') ? 'Provide valid Id' : `An error occurred while updating the single tutorial: ${error.message}`;
        if (errorMessage === 'Provide valid Id') {
            handleApiResponse(res, 400, errorMessage, { error: 'An error occurred while updating the single tutorial' });
        } else {
            if (error.message.includes('E11000 duplicate key error')) {
                handleApiResponse(res, 400, 'tutorial Name must be unique', { error: error.message });
            } else {
                handleApiResponse(res, 500, errorMessage, { error: 'Internal Server Error' });
            }
        }
    }
};

module.exports = UpdateItem;
