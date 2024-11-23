// const { user, category } = require('../../models');

const { gptlist } = require('../../models');

// const AddCategory = async ({ status, createdby, name, description }) => {
    
const Addgpt = async ({ status, name, topic, description, website_link}) => {
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

        const addgpt = new gptlist({
            status,
            name,
            topic,
            description,
            website_link,

        });
        console.log(addgpt);

        const result = await addgpt.save();
        return result;
    } catch (error) {
        throw new Error(`Error occurred while adding gpt in the list: ${error.message}`);
    }
};

module.exports = Addgpt;
