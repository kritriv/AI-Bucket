const { tutorial } = require('../../models');
const { ObjectId } = require('mongodb');

const Singletutorial = async (id) => {
    try {
        const filter = { _id: new ObjectId(id) };
        const result = await tutorial.findOne(filter)
       
        return result;
    } catch (error) {
        throw new Error(`Error occurred while retrieving single tutorial: ${error.message}`);
    }
};

module.exports = Singletutorial;
