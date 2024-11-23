const { handleApiResponse } = require('../../modules/responseHandler');
const { update } = require('../../services/blog');
const { idSchema } = require('../../validators/Schemas');

// To Update a Single blog Details
const UpdateItem = async (req, res) => {
    try {
        const id = req.params.id;
        await idSchema.parseAsync({ _id: id });

         // Check if the icon file is provided
         let imageFile = null;
         if (req.files && req.files.image && req.files.image[0]) {
             imageFile = req.files.image[0];
         }

        const updateblog = await update(id, req.body, imageFile);

        if (!updateblog) {
            return handleApiResponse(res, 404, `blog not found with id: ${id} ! Updation unsuccessful`);
        }
        

        handleApiResponse(res, 200, 'blog updated successfully', {
            data: updateblog,
        });
    } catch (error) {
        const errorMessage = error.message.includes('Invalid ID format') ? 'Provide valid Id' : `An error occurred while updating the single blog: ${error.message}`;
        if (errorMessage === 'Provide valid Id') {
            handleApiResponse(res, 400, errorMessage, { error: 'An error occurred while updating the single blog' });
        } else {
            if (error.message.includes('E11000 duplicate key error')) {
                handleApiResponse(res, 400, 'blog Name must be unique', { error: error.message });
            } else {
                handleApiResponse(res, 500, errorMessage, { error: 'Internal Server Error' });
            }
        }
    }
};

module.exports = UpdateItem;
