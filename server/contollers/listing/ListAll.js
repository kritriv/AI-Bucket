const { handleApiResponse } = require('../../modules/responseHandler');
const { list } = require('../../services/listing');

// To get All listing list
const ListAll = async (req, res) => {
    try {
        
        // Destructure result from the list service
        const { listingList , total } = await list(req.query); 
        console.log(listingList)
        // Check if no listing items were found
        if (!listingList || listingList.length === 0) {
            return handleApiResponse(res, 404, 'listing not found');
        }

        // Handle successful response
        handleApiResponse(res, 200, 'listing fetched successfully', {
            data: listingList,
            total: total,
            nbHits: listingList.length, // Update to count the correct list of listing
        });
    } catch (error) {
        // Handle error response
        handleApiResponse(res, 500, 'An error occurred while fetching the listing', { error: error.message });
    }
};

module.exports = ListAll;
