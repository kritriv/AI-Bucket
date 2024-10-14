// const { user, category } = require('../../models');

const {category} = require('../../models');

// const AddCategory = async ({ status, createdby, name, description }) => {
    
const AddCategory = async ({ status,name,description ,icon}) => {
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

        const newCategory = new category({
            status,
            name,
            description,
            icon,
        });

        const result = await category(newCategory).save();
        return result;
    } catch (error) {
        throw new Error(`Error occurred while adding ProductCategory: ${error.message}`);
    }
};

module.exports = AddCategory;
