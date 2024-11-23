const { handleApiResponse } = require('../../modules/responseHandler');
const { create } = require('../../services/gptlist');
// To Add a new to gpt list
const CreateItem = async (req, res) => {
    try {
       
        const gpt = await create(req.body);

        handleApiResponse(res, 201, 'gpt added successfully', {
            data: gpt,
        });
    } catch (error) {
        if (error.message.includes('gpt with this name already exists')) {
            handleApiResponse(res, 400, 'gpt with this name already exists');
        } else if (error.message.includes('ObjectId failed' && 'User')) {
            handleApiResponse(res, 404, 'User not found', { error: error.message });
        } else {
            handleApiResponse(res, error.status || 500, error.message || 'Internal server error');
        }
    }
};

module.exports = CreateItem;
