const { handleApiResponse } = require('../../modules/responseHandler');
const { update } = require('../../services/Category');
const { idSchema } = require('../../validators/Schemas');
// Assuming 'icon' is the field name for the file upload
const UpdateItem = async (req, res) => {
    try {
        console.log('Request body:', req.body);
        console.log('Request files:', req.files);

        const id = req.params.id;
        await idSchema.parseAsync({ _id: id });


        // Validate required fields
        if (!id) {
            return handleApiResponse(res, 400, 'Category ID is required.');
        }

        // Check if the icon file is provided
        let iconFile = null;
        if (req.files && req.files.icon && req.files.icon[0]) {
            iconFile = req.files.icon[0];
        }

        // Update category with the new data and the icon file (if provided)
        const updatedCategory = await update(id, req.body, iconFile);

        // Send success response
        return handleApiResponse(res, 200, 'Category updated successfully', {
            data: updatedCategory,
        });
    } catch (error) {
        console.error('Error updating category:', error);

        // Handle specific error cases
        if (error.message.includes('Category not found')) {
            return handleApiResponse(res, 404, 'Category not found');
        }
        if (error.message.includes('Invalid Category ID format')) {
            return handleApiResponse(res, 400, 'Invalid Category ID format');
        }

        // Default error handling
        return handleApiResponse(res, error.status || 500, error.message || 'Internal server error');
    }
};

module.exports = UpdateItem;
