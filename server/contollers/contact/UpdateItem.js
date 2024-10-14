const { handleApiResponse } = require('../../modules/responseHandler');
const { update } = require('../../services/contact');
const { idSchema } = require('../../validators/Schemas');

// To Update a Single contact Details
const UpdateItem = async (req, res) => {
    try {
        const id = req.params.id;
        await idSchema.parseAsync({ _id: id });

        const updatecontactData = req.body;
        const contact = await update(id, updatecontactData);

        if (!contact) {
            return handleApiResponse(res, 404, `contact not found with id: ${id} ! Updation unsuccessful`);
        }
        

        handleApiResponse(res, 200, 'contact updated successfully', {
            data: contact,
        });
    } catch (error) {
        const errorMessage = error.message.includes('Invalid ID format') ? 'Provide valid Id' : `An error occurred while updating the single contact: ${error.message}`;
        if (errorMessage === 'Provide valid Id') {
            handleApiResponse(res, 400, errorMessage, { error: 'An error occurred while updating the single contact' });
        } else {
            if (error.message.includes('E11000 duplicate key error')) {
                handleApiResponse(res, 400, 'contact Name must be unique', { error: error.message });
            } else {
                handleApiResponse(res, 500, errorMessage, { error: 'Internal Server Error' });
            }
        }
    }
};

module.exports = UpdateItem;
