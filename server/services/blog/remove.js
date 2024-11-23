// const { ProductCategory, Product, SubProduct, Specification } = require('../../models');
const {blog} = require('../../models');
const { ObjectId } = require('mongodb');
const Deleteblog = async (id) => {
    try {
        const filter = { _id: new ObjectId(id) };
        const result = await blog.findByIdAndDelete(filter);
        return result;
    } catch (error) {
        throw new Error(`Error occurred while deleting blog: ${error.message}`);
    }
};

module.exports = Deleteblog;
