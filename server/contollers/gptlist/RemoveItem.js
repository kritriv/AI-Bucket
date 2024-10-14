const { handleApiResponse } = require('../../modules/responseHandler');
const {search , remove} = require('../../services/gptlist');
const { idSchema } = require('../../validators/Schemas');

// To Delete a Single gpt Details
const RemoveItem = async (req,res)=>{
    try{
        const id = req.params.id;
         await idSchema.parseAsync({ _id: id });
         const Deletegpt = await search(id);
        if (!Deletegpt){
            return handleApiResponse(res,404,`gpt not found with id: ${id} ! Deletion unsuccessful`);
        }
        const DeletegptRes = await remove(id);

        const formattedDeletedgpt = {
            id: DeletegptRes._id,
            name: DeletegptRes.name,
            topic: DeletegptRes.topic,
            description: DeletegptRes.description,
            website_link: DeletegptRes.website_link,
        }

        handleApiResponse(res,200,'gpt deleted successful',
            {Deleted: formattedDeletedgpt,
            });
        }catch (error){
            const errorMessage = error.message.includes('Invalid ID format')? 'Use a Proper Id' : `An error occurred while deleting the gpt: ${error.message}`;
            handleApiResponse(res, error.message.includes('Invalid ID format') ? 400 : 500, errorMessage, { error: 'Internal Server Error' });
        }
    };
    
    module.exports = RemoveItem;
    