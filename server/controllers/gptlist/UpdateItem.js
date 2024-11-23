const { handleApiResponse } = require('../../modules/responseHandler');
const { update } = require('../../services/gptlist');
const { idSchema } = require('../../validators/Schemas');

// To Update a Single gpt Details
const UpdateItem = async (req, res) => {
    try {
        const id = req.params.id;
        await idSchema.parseAsync({ _id: id });

        const updategptData = req.body;
        const gpt = await update(id, updategptData);

        if (!gpt) {
            return handleApiResponse(res, 404, `Gpt not found with id: ${id} ! Updation unsuccessful`);
        }
        

        handleApiResponse(res, 200, 'Gpt updated successfully', {
            data: gpt,
        });
    } catch (error) {
        const errorMessage = error.message.includes('Invalid ID format') ? 'Provide valid Id' : `An error occurred while updating the single gpt: ${error.message}`;
        if (errorMessage === 'Provide valid Id') {
            handleApiResponse(res, 400, errorMessage, { error: 'An error occurred while updating the single gpt' });
        } else {
            if (error.message.includes('E11000 duplicate key error')) {
                handleApiResponse(res, 400, 'gpt Name must be unique', { error: error.message });
            } else {
                handleApiResponse(res, 500, errorMessage, { error: 'Internal Server Error' });
            }
        }
    }
};

module.exports = UpdateItem;
