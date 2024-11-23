const { handleApiResponse } = require('../../modules/responseHandler');
const { search } = require('../../services/tutorial');
const { idSchema } = require('../../validators/Schemas');

// To get Single tutorial Details
const ReadItems = async (req, res) => {
    try {
        const id = req.params.id;

        // Validate ID using schema
        await idSchema.parseAsync({ _id: id });

        // Fetch tutorial by ID
        const tutorialItem = await search(id);

        // If tutorial not found
        if (!tutorialItem) {
            return handleApiResponse(res, 404, `tutorial not found with id: ${id}`);
        }

        // Successfully fetched tutorial
        handleApiResponse(res, 200, 'tutorial details fetched successfully', {
            data: tutorialItem,
            nbHits: 1,
        });

    } catch (error) {
        console.log(error);

        // Custom error message for invalid ID format
        const errorMessage = error.message.includes('Invalid ID format') ? 
            'Please provide a valid ID format' : 
            `An error occurred while fetching the tutorial: ${error.message}`;

        handleApiResponse(res, error.message.includes('Invalid ID format') ? 400 : 500, errorMessage, { error: 'An error occurred while fetching the tutorial' });
    }
};

module.exports = ReadItems;
