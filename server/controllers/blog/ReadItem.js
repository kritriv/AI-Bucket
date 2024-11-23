const { handleApiResponse } = require('../../modules/responseHandler');
const { search } = require('../../services/blog');
const { idSchema } = require('../../validators/Schemas');

// To get Single blog Details
const ReadItems = async (req, res) => {
    try {
        const id = req.params.id;

        // Validate ID using schema
        await idSchema.parseAsync({ _id: id });

        // Fetch blog by ID
        const blogItem = await search(id);

        // If blog not found
        if (!blogItem) {
            return handleApiResponse(res, 404, `blog not found with id: ${id}`);
        }

        // Successfully fetched blog
        handleApiResponse(res, 200, 'blog details fetched successfully', {
            data: blogItem,
            nbHits: 1,
        });

    } catch (error) {
        console.log(error);

        // Custom error message for invalid ID format
        const errorMessage = error.message.includes('Invalid ID format') ? 
            'Please provide a valid ID format' : 
            `An error occurred while fetching the blog: ${error.message}`;

        handleApiResponse(res, error.message.includes('Invalid ID format') ? 400 : 500, errorMessage, { error: 'An error occurred while fetching the blog' });
    }
};

module.exports = ReadItems;
