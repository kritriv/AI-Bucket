const { handleApiResponse } = require('../../modules/responseHandler');
const { update } = require('../../services/blog');
const { idSchema } = require('../../validators/Schemas');

// To Update a Single blog Details
const UpdateItem = async (req, res) => {
    try {
        const id = req.params.id;
        await idSchema.parseAsync({ _id: id });

        const updateblogData = req.body;
        const blog = await update(id, updateblogData);

        if (!blog) {
            return handleApiResponse(res, 404, `blog not found with id: ${id} ! Updation unsuccessful`);
        }
        

        handleApiResponse(res, 200, 'blog updated successfully', {
            data: blog,
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
