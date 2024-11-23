const { listing } = require('../../models');
const { handleApiResponse } = require('../../modules/responseHandler');
const {search , remove} = require('../../services/tutorial');
const { idSchema } = require('../../validators/Schemas');

// To Delete a Single tutorial Details
const RemoveItem = async (req,res)=>{
    try{
        const id = req.params.id;
         await idSchema.parseAsync({ _id: id });
         const Deletetutorial = await search(id);
        if (!Deletetutorial){
            return handleApiResponse(res,404,`Tutorial not found with id: ${id} ! Deletion unsuccessful`);
        }
        const DeletetutorialRes = await remove(id);

        const formattedDeletedtutorial = {
            id: DeletetutorialRes._id,
            title: DeletetutorialRes.title,
            link: DeletetutorialRes.link,
            tool: DeletetutorialRes.tool,
            // listing: DeletetutorialRes.listing
        }

        handleApiResponse(res,200,'tutorial deleted successful',
            {Deleted: formattedDeletedtutorial,
            });
        }catch (error){
            const errorMessage = error.message.includes('Invalid ID format')? 'Use a Proper Id' : `An error occurred while deleting the tutorial: ${error.message}`;
            handleApiResponse(res, error.message.includes('Invalid ID format') ? 400 : 500, errorMessage, { error: 'Internal Server Error' });
        }
    };
    
    module.exports = RemoveItem;
    