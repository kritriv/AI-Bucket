const { tool } = require('../../models');
const { ObjectId } = require('mongodb');

const Singletool = async (id) => {
    try {
        const filter = { _id: new ObjectId(id) };
        const result = await tool.findOne(filter)
        // .populate('products').exec();
        return result;
    } catch (error) {
        throw new Error(`Error occurred while retrieving single Producttool: ${error.message}`);
    }
};

module.exports = Singletool;
