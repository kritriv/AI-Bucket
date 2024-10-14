const { handleApiResponse } = require('../../modules/responseHandler');
const { update } = require('../../services/tool');
const { idSchema } = require('../../validators/Schemas');

// To Update a Single tool Details
const UpdateItem = async (req, res) => {
    try {
        const id = req.params.id;
        await idSchema.parseAsync({ _id: id });

        const updatetoolData = req.body;
        const tool = await update(id, updatetoolData);

        if (!tool) {
            return handleApiResponse(res, 404, `tool not found with id: ${id} ! Updation unsuccessful`);
        }
        

        handleApiResponse(res, 200, 'tool updated successfully', {
            data: tool,
        });
    } catch (error) {
        const errorMessage = error.message.includes('Invalid ID format') ? 'Provide valid Id' : `An error occurred while updating the single tool: ${error.message}`;
        if (errorMessage === 'Provide valid Id') {
            handleApiResponse(res, 400, errorMessage, { error: 'An error occurred while updating the single tool' });
        } else {
            if (error.message.includes('E11000 duplicate key error')) {
                handleApiResponse(res, 400, 'tool Name must be unique', { error: error.message });
            } else {
                handleApiResponse(res, 500, errorMessage, { error: 'Internal Server Error' });
            }
        }
    }
};

module.exports = UpdateItem;
