const { blog } = require('../../models');
const { ObjectId } = require('mongodb');

const Singleblog = async (id) => {
    try {
        const filter = { _id: new ObjectId(id) };
        const result = await blog.findOne(filter)
       
        return result;
    } catch (error) {
        throw new Error(`Error occurred while retrieving single blog: ${error.message}`);
    }
};

module.exports = Singleblog;
