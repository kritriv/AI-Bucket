const { gptlist } = require('../../models');
const { ObjectId } = require('mongodb');

const Singlegpt = async (id) => {
    try {
        const filter = { _id: new ObjectId(id) };
        const result = await gptlist.findOne(filter)
       
        return result;
    } catch (error) {
        throw new Error(`Error occurred while retrieving single gpt: ${error.message}`);
    }
};

module.exports = Singlegpt;
