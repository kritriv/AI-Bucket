const { handleApiResponse } = require('../../modules/responseHandler');
const { create } = require('../../services/listing');
// To Add a new to listing list
const CreateItem = async (req, res) => {
    try {
        // console.log(req.body);
        const listing = await create(req.body);

        handleApiResponse(res, 201, 'listing added successfully', {
            data: listing,
        });
    } catch (error) {
        if (error.message.includes('listing with this name already exists')) {
            handleApiResponse(res, 400, 'listing with this name already exists');
        } else if (error.message.includes('ObjectId failed' && 'User')) {
            handleApiResponse(res, 404, 'User not found', { error: error.message });
        } else {
            handleApiResponse(res, error.status || 500, error.message || 'Internal server error');
        }
    }
};

module.exports = CreateItem;
