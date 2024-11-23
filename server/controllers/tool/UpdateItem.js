const { handleApiResponse } = require('../../modules/responseHandler');
const { update } = require('../../services/tool');
const { idSchema } = require('../../validators/Schemas');

const UpdateItem = async (req, res) => {
    try {
        const id = req.params.id;
        await idSchema.parseAsync({ _id: id }); // Ensure valid ID format

        const updateData = req.body;
        const { icon, image } = req.files || {};

        // If icon or image files are provided, format them as arrays of file paths
        if (icon) {
            updateData.icon = icon.map(file => ({ path: file.path, filename: file.filename }));
        }
        if (image) {
            updateData.image = image.map(file => ({ path: file.path, filename: file.filename }));
        }
        // Proceed with the update operation in the database
        const tool = await update(id, updateData);

        if (!tool) {
            return handleApiResponse(res, 404, `Tool not found with id: ${id}! Update unsuccessful.`);
        }

        handleApiResponse(res, 200, 'Tool updated successfully', { data: tool });

    } catch (error) {
        const errorMessage = error.message.includes('Invalid ID format') 
            ? 'Provide a valid ID' 
            : error.message.includes('E11000 duplicate key error') 
                ? 'Tool name must be unique' 
                : `An error occurred while updating the tool: ${error.message}`;

        const statusCode = errorMessage === 'Provide a valid ID' || errorMessage === 'Tool name must be unique' ? 400 : 500;
        handleApiResponse(res, statusCode, errorMessage, { error: 'Internal Server Error' });
    }
};

module.exports = UpdateItem;
