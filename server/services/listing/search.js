const { listing } = require('../../models');
const { ObjectId } = require('mongodb');

const Singlelisting = async (id) => {
    try {
        const filter = { _id: new ObjectId(id) };
        const result = await listing.findOne(filter)
        // .populate('products').exec();
        return result;
    } catch (error) {
        throw new Error(`Error occurred while retrieving single Productlisting: ${error.message}`);
    }
};

module.exports = Singlelisting;
