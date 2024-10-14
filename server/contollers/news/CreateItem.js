const { handleApiResponse } = require('../../modules/responseHandler');
const { create } = require('../../services/news');
// To Add a new to news list
const CreateItem = async (req, res) => {
    try {
        console.log(req.body);
        const news = await create(req.body);

        handleApiResponse(res, 201, 'news added successfully', {
            data: news,
        });
    } catch (error) {
        if (error.message.includes('news with this name already exists')) {
            handleApiResponse(res, 400, 'news with this name already exists');
        } else if (error.message.includes('ObjectId failed' && 'User')) {
            handleApiResponse(res, 404, 'User not found', { error: error.message });
        } else {
            handleApiResponse(res, error.status || 500, error.message || 'Internal server error');
        }
    }
};

module.exports = CreateItem;
