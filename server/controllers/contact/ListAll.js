const { handleApiResponse } = require('../../modules/responseHandler');
const { list } = require('../../services/contact');

// To get All contact list
const ListAll = async (req, res) => {
    try {
        
        // Destructure result from the list service
        const { contactList , total } = await list(req.query); 
        console.log(contactList)
        // Check if no contact items were found
        if (!contactList || contactList.length === 0) {
            return handleApiResponse(res, 404, 'contact not found');
        }

        // Handle successful response
        handleApiResponse(res, 200, 'contact fetched successfully', {
            data: contactList,
            total: total,
            nbHits: contactList.length, // Update to count the correct list of contact
        });
    } catch (error) {
        // Handle error response
        handleApiResponse(res, 500, 'An error occurred while fetching the contact', { error: error.message });
    }
};

module.exports = ListAll;
