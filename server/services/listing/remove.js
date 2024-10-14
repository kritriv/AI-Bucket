const { listing } = require('../../models');

const Deletelisting = async (id) => {
    try {
        // Find and delete the listing by its ID
        const result = await listing.findByIdAndDelete(id);

        // Check if the listing exists
        if (!result) {
            throw new Error('Listing not found');
        }

        // Uncomment and adapt this section if you need to delete associated products and sub-products
        // const products = await Product.find({ listing: result._id });
        // for (const product of products) {
        //     await SubProduct.deleteMany({ _id: { $in: product.sub_products } });
        //     await Specification.deleteMany({ sub_product: { $in: product.sub_products } });
        // }
        // await Product.deleteMany({ listing: result._id });

        return result ;
    } catch (error) {
        throw new Error(`Error occurred while deleting listing: ${error.message}`);
    }
};

module.exports = Deletelisting;
