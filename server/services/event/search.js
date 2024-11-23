const { event } = require('../../models');
const { ObjectId } = require('mongodb');

const Singleevent = async (id) => {
    try {
        const filter = { _id: new ObjectId(id) };
        const result = await event.findOne(filter)
       
        return result;
    } catch (error) {
        throw new Error(`Error occurred while retrieving single event: ${error.message}`);
    }
};

module.exports = Singleevent;
