const { handleApiResponse } = require('../../modules/responseHandler');
const { create } = require('../../services/contact');

const CreateItem = async (req, res) => {
    try {
        // Logging request body for development/debugging purposes
        console.log(req.body);

        // Create the contact
        const contact = await create(req.body);

        // Handle successful response
        handleApiResponse(res, 201, 'Contact added successfully', {
            data: contact,
        });
    } catch (error) {
        // Check if the error is a duplicate contact name error
        if (error.message.includes('Contact with this name already exists')) {
            handleApiResponse(res, 400, 'Contact with this name already exists');
        }
        // Check if the error involves an invalid ObjectId related to the User
        else if (error.message.includes('ObjectId failed') && error.message.includes('User')) {
            handleApiResponse(res, 404, 'User not found', { error: error.message });
        }
        // Generic error handler
        else {
            handleApiResponse(res, error.status || 500, error.message || 'Internal server error');
        }
    }
};

module.exports = CreateItem;
