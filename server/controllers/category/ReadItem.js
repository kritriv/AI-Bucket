const { handleApiResponse } = require('../../modules/responseHandler');
const { search } = require('../../services/Category');
const { idSchema } = require('../../validators/Schemas');

// To get Single Category Details
const ReadItems = async (req, res) => {
    try {
        const id = req.params.id;
        await idSchema.parseAsync({ _id: id });  // Validate ID format

        const Category = await search(id);

        if (!Category) {
            return handleApiResponse(res, 404, `Category not found with id: ${id}`);
        }
      
        handleApiResponse(res, 200, 'Category details fetched successfully', {
            data: Category,
            nbHits: 1,
        });
    } catch (error) {
        console.error(error); // Log the error for debugging

        const errorMessage = error.message.includes('Invalid ID format') 
            ? 'Use a valid ID format' 
            : `An error occurred while fetching the category: ${error.message}`;

        handleApiResponse(res, error.message.includes('Invalid ID format') ? 400 : 500, errorMessage);
    }
};

module.exports = ReadItems;
