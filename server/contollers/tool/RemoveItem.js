const { handleApiResponse } = require('../../modules/responseHandler');
const { search, remove } = require('../../services/tool');
const { idSchema } = require('../../validators/Schemas');

// To Delete a Single Tool
const RemoveItem = async (req, res) => {
    try {
        const id = req.params.id;
        
        // Validate the ID
        await idSchema.parseAsync({ _id: id });

        // Check if the tool exists
        const Deletetool = await search(id);
        if (!Deletetool) {
            return handleApiResponse(res, 404, `Tool not found with ID: ${id}. Deletion unsuccessful.`);
        }

        // Remove the tool
        const DeletetoolRes = await remove(id);

        // Format the response for the deleted tool
        const formattedDeletedtool = {
            id: DeletetoolRes._id,
            name: DeletetoolRes.name,
            description: DeletetoolRes.description,
            listing: DeletetoolRes.listing,
            icon: DeletetoolRes.icon,
            toolUrl: DeletetoolRes.toolUrl,
            verified: DeletetoolRes.verified,
            featured: DeletetoolRes.featured,
            like: DeletetoolRes.like,
            rating: DeletetoolRes.rating
        };

        // Send success response
        handleApiResponse(res, 200, 'Tool deleted successfully', {
            Deleted: formattedDeletedtool
        });

    } catch (error) {
        const errorMessage = error.message.includes('Invalid ID format') ? 'Use a Proper Id' : `An error occurred while deleting the tool: ${error.message}`;
        handleApiResponse(res, error.message.includes('Invalid ID format') ? 400 : 500, errorMessage, { error: 'Internal Server Error' });
    }
};

module.exports = RemoveItem;
