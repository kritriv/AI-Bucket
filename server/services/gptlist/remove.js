// const { ProductCategory, Product, SubProduct, Specification } = require('../../models');
const {gptlist} = require('../../models');
const { ObjectId } = require('mongodb');
const Deletegpt = async (id) => {
    try {
        const filter = { _id: new ObjectId(id) };
        const result = await gptlist.findByIdAndDelete(filter);
        // const products = await Product.find({ category: result._id });

        // for (const product of products) {
        //     await SubProduct.deleteMany({ _id: { $in: product.sub_products } });

        //     await Specification.deleteMany({ sub_product: { $in: product.sub_products } });
        // }

        // await Product.deleteMany({ category: result._id });

        return result;
    } catch (error) {
        throw new Error(`Error occurred while deleting gpt: ${error.message}`);
    }
};

module.exports = Deletegpt;
