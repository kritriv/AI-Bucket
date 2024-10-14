const { handleApiResponse } = require('../../modules/responseHandler');
const { list } = require('../../services/Category');

// To get All Categorys list
const ListAll = async (req, res) => {
    try {
        console.log(req.query)
        const { Categories, total } = await list(req.query);
        if (!Categories || Categories.length === 0) {
            return handleApiResponse(res, 404, 'Category not found');
        }


        handleApiResponse(res, 200, 'Categories fetched successfully', {
            data: Categories,
            total: total,
            nbHits: Categories.length,
        });
    } catch (error) {
        handleApiResponse(res, 500, 'An error occurred while fetching the Categories', { error: error.message });
    }
};

module.exports = ListAll;
