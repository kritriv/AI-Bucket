const { handleApiResponse } = require('../../modules/responseHandler');
const { search } = require('../../services/contact');
const { idSchema } = require('../../validators/Schemas');

// To get Single contact Details
const ReadItems = async (req, res) => {
    try {
        const id = req.params.id;

        // Validate ID using schema
        await idSchema.parseAsync({ _id: id });

        // Fetch contact by ID
        const contactItem = await search(id);

        // If contact not found
        if (!contactItem) {
            return handleApiResponse(res, 404, `contact not found with id: ${id}`);
        }

        // Successfully fetched contact
        handleApiResponse(res, 200, 'contact details fetched successfully', {
            data: contactItem,
            nbHits: 1,
        });

    } catch (error) {
        console.log(error);

        // Custom error message for invalid ID format
        const errorMessage = error.message.includes('Invalid ID format') ? 
            'Please provide a valid ID format' : 
            `An error occurred while fetching the contact: ${error.message}`;

        handleApiResponse(res, error.message.includes('Invalid ID format') ? 400 : 500, errorMessage, { error: 'An error occurred while fetching the contact' });
    }
};

module.exports = ReadItems;
