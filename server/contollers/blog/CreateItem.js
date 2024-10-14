const { handleApiResponse } = require('../../modules/responseHandler');
const { create } = require('../../services/blog');
// To Add a new to blog list
const CreateItem = async (req, res) => {
    try {
        console.log(req.body);
        const blog = await create(req.body);

        handleApiResponse(res, 201, 'blog added successfully', {
            data: blog,
        });
    } catch (error) {
        if (error.message.includes('blog with this name already exists')) {
            handleApiResponse(res, 400, 'blog with this name already exists');
        } else if (error.message.includes('ObjectId failed' && 'User')) {
            handleApiResponse(res, 404, 'User not found', { error: error.message });
        } else {
            handleApiResponse(res, error.status || 500, error.message || 'Internal server error');
        }
    }
};

module.exports = CreateItem;
