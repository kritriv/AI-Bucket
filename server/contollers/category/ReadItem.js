const { handleApiResponse } = require('../../modules/responseHandler');
const { search } = require('../../services/Category');
const { idSchema } = require('../../validators/Schemas');

// To get Single ProductCategory Details
const ReadItems = async (req, res) => {
    try {
        const id = req.params.id;
        await idSchema.parseAsync({ _id: id });
        const Category = await search(id);

        if (!Category) {
            return handleApiResponse(res, 404, `Category not found with id: ${id}`);
        }
        // const formattedCategory = {
        //     id: ProductCategory._id,
        //     status: ProductCategory.status,
        //     createdby: ProductCategory.createdby ? ProductCategory.createdby.username : null,
        //     name: ProductCategory.name,
        //     description: ProductCategory.description,
        //     products: ProductCategory.products.map((product) => ({
        //         id: product._id,
        //         name: product.name,
        //     })),
        // };

        handleApiResponse(res, 200, 'Product Category details fetched successfully', {
            data: Category,
            nbHits: 1,
        });
    } catch (error) {
        console.log(error);
        const errorMessage = error.message.includes('Invalid ID format') ? 'Use a Proper Id' : `An error occurred while fetching the Category: ${error.message}`;
        handleApiResponse(res, error.message.includes('Invalid ID format') ? 400 : 500, errorMessage, { error: 'An error occurred while fetching the Category' });
    }
};

module.exports = ReadItems;
