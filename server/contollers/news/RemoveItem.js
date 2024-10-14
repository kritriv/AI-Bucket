const { handleApiResponse } = require('../../modules/responseHandler');
const {search , remove} = require('../../services/news');
const { idSchema } = require('../../validators/Schemas');

// To Delete a Single news Details
const RemoveItem = async (req,res)=>{
    try{
        const id = req.params.id;
         await idSchema.parseAsync({ _id: id });
         const Deletenews = await search(id);
        if (!Deletenews){
            return handleApiResponse(res,404,`news not found with id: ${id} ! Deletion unsuccessful`);
        }
        const DeleteNewsRes = await remove(id);

        const formattedDeletednews = {
            id: DeleteNewsRes._id,
            title: DeleteNewsRes.title,
            icon: DeleteNewsRes.icon,
            news_link: DeleteNewsRes.news_link,
            website_link: DeleteNewsRes.website_link,
        }

        handleApiResponse(res,200,'News deleted successful',
            {Deleted: formattedDeletednews,
            });
        }catch (error){
            const errorMessage = error.message.includes('Invalid ID format')? 'Use a Proper Id' : `An error occurred while deleting the News: ${error.message}`;
            handleApiResponse(res, error.message.includes('Invalid ID format') ? 400 : 500, errorMessage, { error: 'Internal Server Error' });
        }
    };
    
    module.exports = RemoveItem;
    