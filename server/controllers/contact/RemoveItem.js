const { handleApiResponse } = require('../../modules/responseHandler');
const {search , remove} = require('../../services/contact');
const { idSchema } = require('../../validators/Schemas');

// To Delete a Single contact Details
const RemoveItem = async (req,res)=>{
    try{
        const id = req.params.id;
         await idSchema.parseAsync({ _id: id });
         const Deletecontact = await search(id);
        if (!Deletecontact){
            return handleApiResponse(res,404,`contact not found with id: ${id} ! Deletion unsuccessful`);
        }
        const DeletecontactRes = await remove(id);

        const formattedDeletedcontact = {
            id: DeletecontactRes._id,
            name: DeletecontactRes.name,
            email:DeletecontactRes.email,
            company_name: DeletecontactRes.company_name,
            mobile_no: DeletecontactRes.moblie_no,
            reason: DeletecontactRes.reason,
            message: DeletecontactRes.message,
        }

        handleApiResponse(res,200,'contact deleted successful',
            {Deleted: formattedDeletedcontact,
            });
        }catch (error){
            const errorMessage = error.message.includes('Invalid ID format')? 'Use a Proper Id' : `An error occurred while deleting the contact: ${error.message}`;
            handleApiResponse(res, error.message.includes('Invalid ID format') ? 400 : 500, errorMessage, { error: 'Internal Server Error' });
        }
    };
    
    module.exports = RemoveItem;
    