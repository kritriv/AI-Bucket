// const { ProductCategory, Product, SubProduct, Specification } = require('../../models');
const {tutorial} = require('../../models');
const { ObjectId } = require('mongodb');
const Deletetutorial = async (id) => {
    try {
        const filter = { _id: new ObjectId(id) };
        const result = await tutorial.findByIdAndDelete(filter);
       
        return result;
    } catch (error) {
        throw new Error(`Error occurred while deleting tutorial: ${error.message}`);
    }
};

module.exports = Deletetutorial;
