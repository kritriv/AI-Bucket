const { news } = require('../../models');
const { ObjectId } = require('mongodb');

const Singlenews = async (id) => {
    try {
        const filter = { _id: new ObjectId(id) };
        const result = await news.findOne(filter)
       
        return result;
    } catch (error) {
        throw new Error(`Error occurred while retrieving single news: ${error.message}`);
    }
};

module.exports = Singlenews;
