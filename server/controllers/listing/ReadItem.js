const { handleApiResponse } = require('../../modules/responseHandler');
const { search } = require('../../services/listing');
const { idSchema } = require('../../validators/Schemas');

// To get Single listing Details
const ReadItems = async (req, res) => {
    try {
        const id = req.params.id;

        // Validate ID using schema
        await idSchema.parseAsync({ _id: id });

        // Fetch listing by ID
        const listingItem = await search(id);

        // If listing not found
        if (!listingItem) {
            return handleApiResponse(res, 404, `listing not found with id: ${id}`);
        }

        // Successfully fetched listing
        handleApiResponse(res, 200, 'listing details fetched successfully', {
            data: listingItem,
            nbHits: 1,
        });

    } catch (error) {
        console.log(error);

        // Custom error message for invalid ID format
        const errorMessage = error.message.includes('Invalid ID format') ? 
            'Please provide a valid ID format' : 
            `An error occurred while fetching the listing: ${error.message}`;

        handleApiResponse(res, error.message.includes('Invalid ID format') ? 400 : 500, errorMessage, { error: 'An error occurred while fetching the listing' });
    }
};

module.exports = ReadItems;
