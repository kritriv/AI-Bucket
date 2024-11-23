const { handleApiResponse } = require('../../modules/responseHandler');
const {search , remove} = require('../../services/event');
const { idSchema } = require('../../validators/Schemas');

// To Delete a Single event Details
const RemoveItem = async (req,res)=>{
    try{
        const id = req.params.id;
         await idSchema.parseAsync({ _id: id });
         const Deleteevent = await search(id);
        if (!Deleteevent){
            return handleApiResponse(res,404,`event not found with id: ${id} ! Deletion unsuccessful`);
        }
        const DeleteeventRes = await remove(id);

        const formattedDeletedevent = {
            id: DeleteeventRes._id,
            name: DeleteeventRes.name,
            description: DeleteeventRes.description,
            link: DeleteeventRes.link,
            location: DeleteeventRes.location,
            date: DeleteeventRes.date,
        }

        handleApiResponse(res,200,'event deleted successful',
            {Deleted: formattedDeletedevent,
            });
        }catch (error){
            const errorMessage = error.message.includes('Invalid ID format')? 'Use a Proper Id' : `An error occurred while deleting the event: ${error.message}`;
            handleApiResponse(res, error.message.includes('Invalid ID format') ? 400 : 500, errorMessage, { error: 'Internal Server Error' });
        }
    };
    
    module.exports = RemoveItem;
    