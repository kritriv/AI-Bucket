const { handleApiResponse } = require('../../modules/responseHandler');
const { create } = require('../../services/blog');
// To Add a new to blog list
const CreateItem = async (req, res) => {
    try {
        console.log('Request Body:', req.body);
        console.log('Uploaded Files:', req.files);

        // Make sure to include the uploaded file data in the request body if necessary
        const blogData = {
            ...req.body,
            image: req.files?.image ? req.files.image[0] : null, // Assuming you're using Multer to handle file uploads
        };

        const blog = await create(blogData);

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
