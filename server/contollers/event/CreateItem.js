const { handleApiResponse } = require('../../modules/responseHandler');
const { create } = require('../../services/event');
// To Add a new to event list
const CreateItem = async (req, res) => {
    try {
        console.log(req.body);
        const event = await create(req.body);

        handleApiResponse(res, 201, 'event added successfully', {
            data: event,
        });
    } catch (error) {
        if (error.message.includes('event with this name already exists')) {
            handleApiResponse(res, 400, 'event with this name already exists');
        } else if (error.message.includes('ObjectId failed' && 'User')) {
            handleApiResponse(res, 404, 'User not found', { error: error.message });
        } else {
            handleApiResponse(res, error.status || 500, error.message || 'Internal server error');
        }
    }
};

module.exports = CreateItem;
