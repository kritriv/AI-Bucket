const { handleApiResponse } = require('../../modules/responseHandler');
const { search, remove } = require('../../services/listing');
const { idSchema } = require('../../validators/Schemas');

// To Delete a Single listing Details
const RemoveItem = async (req, res) => {
    try {
        const id = req.params.id;
        await idSchema.parseAsync({ _id: id });

        const Deletelisting = await search(id);
        if (!Deletelisting) {
            return handleApiResponse(res, 404, `Listing not found with id: ${id}! Deletion unsuccessful`);
        }

        const DeletelistingRes = await remove(id);

        const formattedDeletedlisting = {
            id: DeletelistingRes._id,
            name: DeletelistingRes.name,
            description: DeletelistingRes.description,
            category: DeletelistingRes.category,
        };

        handleApiResponse(res, 200, 'Listing deleted successfully', {
            Deleted: formattedDeletedlisting,
        });
    } catch (error) {
        const errorMessage = error.message.includes('Invalid ID format')
            ? 'Use a Proper Id'
            : `An error occurred while deleting the listing: ${error.message}`;
        handleApiResponse(res, error.message.includes('Invalid ID format') ? 400 : 500, errorMessage, {
            error: 'Internal Server Error',
        });
    }
};

module.exports = RemoveItem;
