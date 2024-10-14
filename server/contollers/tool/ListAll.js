const { handleApiResponse } = require('../../modules/responseHandler');
const { list } = require('../../services/tool');

// To get All tool list
const ListAll = async (req, res) => {
    try {
        
        // Destructure result from the list service
        const { toolList , total } = await list(req.query); 
        console.log(toolList)
        // Check if no tool items were found
        if (!toolList || toolList.length === 0) {
            return handleApiResponse(res, 404, 'tool not found');
        }

        // Handle successful response
        handleApiResponse(res, 200, 'tool fetched successfully', {
            data: toolList,
            total: total,
            nbHits: toolList.length, // Update to count the correct list of tool
        });
    } catch (error) {
        // Handle error response
        handleApiResponse(res, 500, 'An error occurred while fetching the tool', { error: error.message });
    }
};

module.exports = ListAll;
