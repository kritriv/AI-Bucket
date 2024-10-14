// const { user, category } = require('../../models');

const { tutorial } = require('../../models');


    
const Addtutorial = async ({ status,title,link,tool}) => {
    try {
        // const existingUser = await User.findById(createdby);

        // if (!existingUser) {
        //     throw new Error('User not found');
        // }

        const addtutorial = new tutorial({
            status,
            title,
            link,
            tool,

        });

        const result = await addtutorial.save();
        return result;
    } catch (error) {
        throw new Error(`Error occurred while adding Tutorial : ${error.message}`);
    }
};

module.exports = Addtutorial;
