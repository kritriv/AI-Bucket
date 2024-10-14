// const { user, category } = require('../../models');

const { event } = require('../../models');

// const AddCategory = async ({ status, createdby, name, description }) => {
    
const Addevent = async ({ status, name, description, link, location, date}) => {
    try {
        // const existingUser = await User.findById(createdby);

        // if (!existingUser) {
        //     throw new Error('User not found');
        // }

        // const newCategory = new category({
        //     status,
        //     createdby,
        //     name,
        //     description,
        // });
        date = new Date(date);
        const addnew = new event({
            status,
            name,
            description,
            link,
            location,
            date,

        });

        const result = await addnew.save();
        return result;
    } catch (error) {
        throw new Error(`Error occurred while adding event: ${error.message}`);
    }
};

module.exports = Addevent;
