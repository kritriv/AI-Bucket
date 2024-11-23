// const { user, category } = require('../../models');

const { news } = require('../../models');
const { deleteFiles } = require('../../utils/fileUtils');
const path = require("path");
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
            icon:{ path: icon.path,
                filename: icon.filename,
             },
            news_link,
            website_link,

        });

        const result = await addnew.save();
        return result;
    } catch (error) {
        if(icon){
            await deleteFiles(path.join(__dirname,'../../../uploads/news',icon.filename));
        }
        throw new Error(`Error occurred while adding News: ${error.message}`);
    }
};

module.exports = Addnews;
