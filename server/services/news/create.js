// const { user, category } = require('../../models');

const { news } = require('../../models');

// const AddCategory = async ({ status, createdby, name, description }) => {
    
const Addnews = async ({ status,title,icon,news_link,website_link}) => {
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

        const addnew = new news({
            status,
            title,
            icon,
            news_link,
            website_link,

        });

        const result = await addnew.save();
        return result;
    } catch (error) {
        throw new Error(`Error occurred while adding News: ${error.message}`);
    }
};

module.exports = Addnews;
