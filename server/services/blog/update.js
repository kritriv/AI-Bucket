const {blog } = require('../../models');
const { ObjectId } = require('mongodb');
const { deleteFiles } = require('../../utils/fileUtils');

const UpdateNew = async (id, updateblogData, imageFile) => {
    try {
        console.log('Updating blog with ID:', id);
        console.log('Update data:', updateblogData);
        
        // Check for valid ObjectId
        if (!ObjectId.isValid(id)) {
            throw new Error('Invalid blog ID format');
        }
        // Fetch the current blog using the objectId
        const currentblog = await blog.findById(id);
        if (!currentblog) {
            throw new Error('blog not found');
        }

        // Handle blog file replacement if provided
        if (imageFile) {
            // Remove old blog file if it exists
            await deleteFiles(path.join(__dirname,'../../../uploads/blog',currentblog.image.filename));
        }

            // Update the new blog's path and filename
            updateblogData.image = {
                path: imageFile.path,       // Full path where the file is stored
                filename: imageFile.filename // The filename assigned by multer
            };
        // const filter = { _id: new ObjectId(id) };

        // Update the blog
        const result = await blog.findByIdAndUpdate(id, updateblogData, {
            new: true,
            runValidators: true, // Ensures validation rules are applied
        });

        // Check if New was found and updated
        if (!result) {
            throw new Error('Blog not found');
        }

        console.log('Updated Blog:', result); // Log the updated New
        return result;
    } catch (error) {
        throw new Error(`Error occurred while updating Blog: ${error.message}`);
    }
};

module.exports = UpdateNew;
