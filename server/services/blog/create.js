// const { user, category } = require('../../models');

const { blog } = require('../../models');

// const AddCategory = async ({ status, createdby, name, description }) => {
    
const Addblog = async ({ status,title,image,body}) => {
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

        const addnew = new blog({
            status,
            title,
            image,
            body,

        });

        const result = await addnew.save();
        return result;
    } catch (error) {
        throw new Error(`Error occurred while adding blog: ${error.message}`);
    }
};

module.exports = Addblog;
