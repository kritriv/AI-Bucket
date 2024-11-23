const { handleApiResponse } = require('../../modules/responseHandler');
const { list } = require('../../services/news');

// To get All news list
const ListAll = async (req, res) => {
    try {
        
        // Destructure result from the list service
        const { newsList , total } = await list(req.query); 
        console.log(newsList)
        // Check if no news items were found
        if (!newsList || newsList.length === 0) {
            return handleApiResponse(res, 404, 'News not found');
        }

        // Handle successful response
        handleApiResponse(res, 200, 'News fetched successfully', {
            data: newsList,
            total: total,
            nbHits: newsList.length, // Update to count the correct list of news
        });
    } catch (error) {
        // Handle error response
        handleApiResponse(res, 500, 'An error occurred while fetching the news', { error: error.message });
    }
};

module.exports = ListAll;
