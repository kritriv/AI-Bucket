const { handleApiResponse } = require('../../modules/responseHandler');
const { update } = require('../../services/news');
const { idSchema } = require('../../validators/Schemas');

// To Update a Single news Details
const UpdateItem = async (req, res) => {
    try {
        const id = req.params.id;
        await idSchema.parseAsync({ _id: id });

        if (!id) {
            return handleApiResponse(res, 400, 'Category ID is required.');
        }

        // Check if the icon file is provided
        let iconFile = null;
        if (req.files && req.files.icon && req.files.icon) {
            iconFile = req.files.icon;
        }

        // Update category with the new data and the icon file (if provided)
        const updateNewsData = await update(id, req.body, iconFile);
        const News = await update(id, updateNewsData);

        if (!News) {
            return handleApiResponse(res, 404, `News not found with id: ${id} ! Updation unsuccessful`);
        }
        
        handleApiResponse(res, 200, 'News updated successfully', {
            data: News,
        });
    } catch (error) {
        const errorMessage = error.message.includes('Invalid ID format') ? 'Provide valid Id' : `An error occurred while updating the single News: ${error.message}`;
        if (errorMessage === 'Provide valid Id') {
            handleApiResponse(res, 400, errorMessage, { error: 'An error occurred while updating the single News' });
        } else {
            if (error.message.includes('E11000 duplicate key error')) {
                handleApiResponse(res, 400, 'News Name must be unique', { error: error.message });
            } else {
                handleApiResponse(res, 500, errorMessage, { error: 'Internal Server Error' });
            }
        }
    }
};

module.exports = UpdateItem;
