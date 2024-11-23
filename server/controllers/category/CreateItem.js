const { handleApiResponse } = require('../../modules/responseHandler');
const { create } = require('../../services/Category');

// To Add a Category to Category list
const CreateItem = async (req, res) => {
    try {
        console.log(req.body);
        console.log(req.files);
        // Validate required fields
        if (!req.body.name) {
            return handleApiResponse(res, 400, 'Category name is required.');
        }
        if (!req.files || !req.files.icon) {
            return handleApiResponse(res, 400, 'Icon image is required.');
        }

        // Extract the 'icon' file path
        const icon = req.files.icon[0];
    

        // Prepare category data, merging body data with the uploaded file path
        const categoryData = {
            ...req.body,
            icon // Only store the icon path
        };

        // Call service to create category with the provided data
        const category = await create(categoryData);

        // Respond with success
        return handleApiResponse(res, 201, 'Category added successfully', {
            data: category,
        });
    } catch (error) {
        console.error('Error creating category:', error); // Log the error for debugging
        
        // Handle specific error cases
        if (error.message.includes('Category with this name already exists')) {
            return handleApiResponse(res, 400, 'Category with this name already exists');
        }
        if (error.message.includes('ObjectId failed')) {
            return handleApiResponse(res, 404, 'User not found', { error: error.message });
        }

        // Default error handling
        return handleApiResponse(res, error.status || 500, error.message || 'Internal server error');
    }
};

module.exports = CreateItem;
