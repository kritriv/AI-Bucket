const { handleApiResponse } = require('../../modules/responseHandler');
const { list } = require('../../services/tutorial');

// To get All tutorial list
const ListAll = async (req, res) => {
    try {
        
        // Destructure result from the list service
        const { tutorialList , total } = await list(req.query); 
        console.log(tutorialList)
        // Check if no tutorial items were found
        if (!tutorialList || tutorialList.length === 0) {
            return handleApiResponse(res, 404, 'Tutorial not found');
        }

        // Handle successful response
        handleApiResponse(res, 200, 'Tutorial fetched successfully', {
            data: tutorialList,
            total: total,
            nbHits: tutorialList.length, // Update to count the correct list of tutorial
        });
    } catch (error) {
        // Handle error response
        handleApiResponse(res, 500, 'An error occurred while fetching the tutorial', { error: error.message });
    }
};

module.exports = ListAll;
