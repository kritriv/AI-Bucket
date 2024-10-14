const { handleApiResponse } = require('../../modules/responseHandler');
const { search } = require('../../services/tool');
const { idSchema } = require('../../validators/Schemas');

// To get Single tool Details
const ReadItems = async (req, res) => {
    try {
        const id = req.params.id;

        // Validate ID using schema
        await idSchema.parseAsync({ _id: id });

        // Fetch tool by ID
        const toolItem = await search(id);

        // If tool not found
        if (!toolItem) {
            return handleApiResponse(res, 404, `tool not found with id: ${id}`);
        }

        // Successfully fetched tool
        handleApiResponse(res, 200, 'tool details fetched successfully', {
            data: toolItem,
            nbHits: 1,
        });

    } catch (error) {
        console.log(error);

        // Custom error message for invalid ID format
        const errorMessage = error.message.includes('Invalid ID format') ? 
            'Please provide a valid ID format' : 
            `An error occurred while fetching the tool: ${error.message}`;

        handleApiResponse(res, error.message.includes('Invalid ID format') ? 400 : 500, errorMessage, { error: 'An error occurred while fetching the tool' });
    }
};

module.exports = ReadItems;
