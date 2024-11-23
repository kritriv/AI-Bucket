const { handleApiResponse } = require('../../modules/responseHandler');
const { list } = require('../../services/gptlist');

// To get All gpt list
const ListAll = async (req, res) => {
    try {
        
        // Destructure result from the list service
        const { gptList , total } = await list(req.query); 
        console.log(gptList)
        // Check if no gpt items were found
        if (!gptList || gptList.length === 0) {
            return handleApiResponse(res, 404, 'gpt not found');
        }

        // Handle successful response
        handleApiResponse(res, 200, 'gpt fetched successfully', {
            data: gptList,
            total: total,
            nbHits: gptList.length, // Update to count the correct list of gpt
        });
    } catch (error) {
        // Handle error response
        handleApiResponse(res, 500, 'An error occurred while fetching the gpt', { error: error.message });
    }
};

module.exports = ListAll;
