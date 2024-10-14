const { handleApiResponse } = require('../../modules/responseHandler');
const { create } = require('../../services/Category');
// To Add a Category to Categorys list
const CreateItem = async (req, res) => {
    try {
        console.log(req.body);
        const Category = await create(req.body);

        handleApiResponse(res, 201, 'Category added successfully', {
            data: Category,
        });
    } catch (error) {
        if (error.message.includes('Category with this name already exists')) {
            handleApiResponse(res, 400, 'Category with this name already exists');
        } else if (error.message.includes('ObjectId failed' && 'User')) {
            handleApiResponse(res, 404, 'User not found', { error: error.message });
        } else {
            handleApiResponse(res, error.status || 500, error.message || 'Internal server error');
        }
    }
};

module.exports = CreateItem;
