const { handleApiResponse } = require('../../modules/responseHandler');
const { search } = require('../../services/gptlist');
const { idSchema } = require('../../validators/Schemas');

// To get Single gpt Details
const ReadItems = async (req, res) => {
    try {
        const id = req.params.id;

        // Validate ID using schema
        await idSchema.parseAsync({ _id: id });

        // Fetch gpt by IDF
        const gptItem = await search(id);

        // If gpt not found
        if (!gptItem) {
            return handleApiResponse(res, 404, `Gpt not found with id: ${id}`);
        }

        // Successfully fetched gpt
        handleApiResponse(res, 200, 'Gpt details fetched successfully', {
            data: gptItem,
            nbHits: 1,
        });

    } catch (error) {
        console.log(error);

        // Custom error message for invalid ID format
        const errorMessage = error.message.includes('Invalid ID format') ? 
            'Please provide a valid ID format' : 
            `An error occurred while fetching the gpt: ${error.message}`;

        handleApiResponse(res, error.message.includes('Invalid ID format') ? 400 : 500, errorMessage, { error: 'An error occurred while fetching the gpt' });
    }
};

module.exports = ReadItems;
