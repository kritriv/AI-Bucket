const { handleApiResponse } = require('../../modules/responseHandler');
const { list } = require('../../services/event');

// To get All event list
const ListAll = async (req, res) => {
    try {
        
        // Destructure result from the list service
        const { eventList , total } = await list(req.query); 
        console.log(eventList)
        // Check if no event items were found
        if (!eventList || eventList.length === 0) {
            return handleApiResponse(res, 404, 'event not found');
        }

        // Handle successful response
        handleApiResponse(res, 200, 'event fetched successfully', {
            data: eventList,
            total: total,
            nbHits: eventList.length, // Update to count the correct list of event
        });
    } catch (error) {
        // Handle error response
        handleApiResponse(res, 500, 'An error occurred while fetching the event', { error: error.message });
    }
};

module.exports = ListAll;
