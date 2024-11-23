const { handleApiResponse } = require('../../modules/responseHandler');
const { create } = require('../../services/tool');
// const { deleteFiles } = require('../../utils/fileUtils');
// To Add a new to tool list
const CreateItem = async (req, res) => {
    try {
    //     console.log(req.body);
    //     console.log(req.files);
        // Validate required fields
        if (!req.body.name) {
            return handleApiResponse(res, 400, 'Tool name is required.');
        }
        if (!req.files || !req.files.icon || !req.files.image) {
            return handleApiResponse(res, 400, 'Icon or image is required.');
        }

        // Extract the 'icon' and 'image' file path
        const icon = req.files.icon;
        const image = req.files.image;
        
        // Prepare tool data, merging body data with the uploaded file path
        const toolData = {
            ...req.body,
            icon,image // Only store the icon path
        };
        const newTool = await create(toolData);

        handleApiResponse(res, 201, 'tool added successfully', {
            data: newTool,
        });
    } catch (error) {

        if (error.message.includes('tool with this name already exists')) {
            handleApiResponse(res, 400, 'tool with this name already exists');
        } else if (error.message.includes('ObjectId failed' && 'User')) {
            handleApiResponse(res, 404, 'User not found', { error: error.message });
        }
         else {
            handleApiResponse(res, error.status || 500, error.message || 'Internal server error');
        }
    }
};

module.exports = CreateItem;
