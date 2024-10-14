const { handleApiResponse } = require('../../modules/responseHandler');
const { create } = require('../../services/tool');
// To Add a new to tool list
const CreateItem = async (req, res) => {
    try {
        // console.log(req.body);
        const tool = await create(req.body);

        handleApiResponse(res, 201, 'tool added successfully', {
            data: tool,
        });
    } catch (error) {
        if (error.message.includes('tool with this name already exists')) {
            handleApiResponse(res, 400, 'tool with this name already exists');
        } else if (error.message.includes('ObjectId failed' && 'User')) {
            handleApiResponse(res, 404, 'User not found', { error: error.message });
        } else {
            handleApiResponse(res, error.status || 500, error.message || 'Internal server error');
        }
    }
};

module.exports = CreateItem;
