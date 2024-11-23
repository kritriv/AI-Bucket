const { handleApiResponse } = require('../../modules/responseHandler');
const { create } = require('../../services/listing');
// To Add a new to listing list
const CreateItem = async (req, res) => {
    try {
        console.log(req.body);
        console.log(req.files);

        if(!req.body.name){
            return handleApiResponse(res, 400, 'Listing name is required.');
        }
        if(!req.files || !req.files.icon){
            return handleApiResponse(res, 400, 'Icon image is required.');
        }

        //Extract  the 'icon' file path
        const icon = req.files.icon[0];

        const listingData = {
            ...req.body,
            icon
        };


        const listing = await create(listingData);

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
