const { blog } = require('../../models');
const { deleteFiles } = require('../../utils/fileUtils');

const Addblog = async ({ status,title,image,body}) => {
    try {
        // const existingUser = await User.findById(createdby);

        // if (!existingUser) {
        //     throw new Error('User not found');
        // }
        if (!title || !body) {
            throw new Error('Title and body are required');
        }

        // Create a new blog entry
        const addNewBlog = new blog({
            status,
            title,
            image:{
                path:image.path,
                filename:image.filename,
            }, // Ensure this is structured correctly (path and filename if necessary)
            body,
        });

        // Save the blog entry to the database
        const result = await addNewBlog.save();
        return result;
    } catch (error) {
        await deleteFiles(path.join(__dirname,'../../../uploads/blog',image.filename));
        console.error('Error adding blog:', error.message); // Log the error for debugging
        throw new Error(`Error occurred while adding blog: ${error.message}`);
    }
};

module.exports = Addblog;