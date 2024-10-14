const { handleApiResponse } = require('../../modules/responseHandler');
const {search , remove} = require('../../services/blog');
const { idSchema } = require('../../validators/Schemas');

// To Delete a Single blog Details
const RemoveItem = async (req,res)=>{
    try{
        const id = req.params.id;
         await idSchema.parseAsync({ _id: id });
         const Deleteblog = await search(id);
        if (!Deleteblog){
            return handleApiResponse(res,404,`blog not found with id: ${id} ! Deletion unsuccessful`);
        }
        const DeleteblogRes = await remove(id);

        const formattedDeletedblog = {
            id: DeleteblogRes._id,
            title: DeleteblogRes.title,
            image: DeleteblogRes.image,
            body: DeleteblogRes.body,
        }

        handleApiResponse(res,200,'blog deleted successful',
            {Deleted: formattedDeletedblog,
            });
        }catch (error){
            const errorMessage = error.message.includes('Invalid ID format')? 'Use a Proper Id' : `An error occurred while deleting the blog: ${error.message}`;
            handleApiResponse(res, error.message.includes('Invalid ID format') ? 400 : 500, errorMessage, { error: 'Internal Server Error' });
        }
    };
    
    module.exports = RemoveItem;
    