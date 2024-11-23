const { handleApiResponse } = require('../../modules/responseHandler');
const { list } = require('../../services/Category');

// To get All categories list
const ListAll = async (req, res) => {
    try {
        // Optional: Validate query parameters here if needed
        const { categories, total } = await list(req.query);
        
        if (!categories || categories.length === 0) {
            return handleApiResponse(res, 404, 'No categories found.');
        }

        handleApiResponse(res, 200, 'categories fetched successfully', {
            data: categories,
            total: total,
            nbHits: categories.length,
        });
    } catch (error) {
        handleApiResponse(res, 500, 'An error occurred while fetching the categories', { error: error.message });
    }
};

module.exports = ListAll;
