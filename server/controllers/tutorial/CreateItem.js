const { handleApiResponse } = require('../../modules/responseHandler');
const { create } = require('../../services/tutorial');
// To Add a new to tutorial list
const CreateItem = async (req, res) => {
    try {
        console.log(req.body);
        const tutorial = await create(req.body);

        handleApiResponse(res, 201, 'tutorial added successfully', {
            data: tutorial,
        });
    } catch (error) {
        if (error.message.includes('tutorial with this name already exists')) {
            handleApiResponse(res, 400, 'tutorial with this name already exists');
        } else if (error.message.includes('ObjectId failed' && 'User')) {
            handleApiResponse(res, 404, 'User not found', { error: error.message });
        } else {
            handleApiResponse(res, error.status || 500, error.message || 'Internal server error');
        }
    }
};

module.exports = CreateItem;
