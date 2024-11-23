const { handleApiResponse } = require('../../modules/responseHandler');
const { search, remove } = require('../../services/Category');
const { idSchema } = require('../../validators/Schemas');

// To Delete a Single Category
const RemoveItem = async (req, res) => {
    try {
        const id = req.params.id;
        await idSchema.parseAsync({ _id: id }); // Validate ID format

        const DeletedCategory = await search(id);

        if (!DeletedCategory) {
            return handleApiResponse(res, 404, `Category not found with id: ${id}! Deletion unsuccessful`);
        }

        const DeletedCategoryRes = await remove(id);

        handleApiResponse(res, 200, 'Category deleted successfully', {
            deleted: {
                id: DeletedCategoryRes._id,
                name: DeletedCategoryRes.name,
                description: DeletedCategoryRes.description,
                icon: DeletedCategoryRes.icon,
            },
        });
    } catch (error) {
        console.error(error); // Log the error for debugging

        const errorMessage = error.message.includes('Invalid ID format') 
            ? 'Use a valid ID format' 
            : `An error occurred while deleting the category: ${error.message}`;

        handleApiResponse(res, error.message.includes('Invalid ID format') ? 400 : 500, errorMessage);
    }
};

module.exports = RemoveItem;
