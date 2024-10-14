const { contact } = require('../../models');
const { ObjectId } = require('mongodb');

const Singlecontact = async (id) => {
    try {
        const filter = { _id: new ObjectId(id) };
        const result = await contact.findOne(filter)
       
        return result;
    } catch (error) {
        throw new Error(`Error occurred while retrieving single contact: ${error.message}`);
    }
};

module.exports = Singlecontact;
