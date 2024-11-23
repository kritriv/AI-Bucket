const { handleApiResponse } = require('../../modules/responseHandler');
const { search } = require('../../services/event');
const { idSchema } = require('../../validators/Schemas');

// To get Single event Details
const ReadItems = async (req, res) => {
    try {
        const id = req.params.id;

        // Validate ID using schema
        await idSchema.parseAsync({ _id: id });

        // Fetch event by ID
        const eventItem = await search(id);

        // If event not found
        if (!eventItem) {
            return handleApiResponse(res, 404, `event not found with id: ${id}`);
        }

        // Successfully fetched event
        handleApiResponse(res, 200, 'event details fetched successfully', {
            data: eventItem,
            nbHits: 1,
        });

    } catch (error) {
        console.log(error);

        // Custom error message for invalid ID format
        const errorMessage = error.message.includes('Invalid ID format') ? 
            'Please provide a valid ID format' : 
            `An error occurred while fetching the event: ${error.message}`;

        handleApiResponse(res, error.message.includes('Invalid ID format') ? 400 : 500, errorMessage, { error: 'An error occurred while fetching the news' });
    }
};

module.exports = ReadItems;
