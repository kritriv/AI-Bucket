const { handleApiResponse } = require('../../modules/responseHandler');
const { create } = require('../../services/news');
// To Add a new to news list
const CreateItem = async (req, res) => {
    try {
       
        console.log(req.files);
        // Validate required fields
        if (!req.body.title) {
            return handleApiResponse(res, 400, 'News title is required.');
        }
        // if(!req.body.news_link){
        //     return handleApiResponse(res, 400, 'News Link is required')
        // }
        
        // if(!req.body.news_link){
        //     return handleApiResponse(res, 400, 'News Link is required')
        if (!req.files || !req.files.icon) {
            return handleApiResponse(res, 400, 'Icon image is required.');
        }

        // Extract the 'icon' file path
        const icon = req.files.icon[0];
    

        // Prepare category data, merging body data with the uploaded file path
        const newsData = {
            ...req.body,
            icon // Only store the icon path
        };


        const news = await create(newsData);

        handleApiResponse(res, 201, 'news added successfully', {
            data: news,
        });
    } catch (error) {
        if (error.message.includes('news with this name already exists')) {
            handleApiResponse(res, 400, 'news with this name already exists');
        } else if (error.message.includes('ObjectId failed' && 'User')) {
            handleApiResponse(res, 404, 'User not found', { error: error.message });
        } else {
            handleApiResponse(res, error.status || 500, error.message || 'Internal server error');
        }
    }
};

module.exports = CreateItem;
