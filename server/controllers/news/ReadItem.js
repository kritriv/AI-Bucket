const { handleApiResponse } = require('../../modules/responseHandler');
const { search } = require('../../services/news');
const { idSchema } = require('../../validators/Schemas');

// To get Single News Details
const ReadItems = async (req, res) => {
    try {
        const id = req.params.id;

        // Validate ID using schema
        await idSchema.parseAsync({ _id: id });

        // Fetch news by ID
        const newsItem = await search(id);

        // If news not found
        if (!newsItem) {
            return handleApiResponse(res, 404, `News not found with id: ${id}`);
        }

        // Successfully fetched news
        handleApiResponse(res, 200, 'News details fetched successfully', {
            data: newsItem,
            nbHits: 1,
        });

    } catch (error) {
        console.log(error);

        // Custom error message for invalid ID format
        const errorMessage = error.message.includes('Invalid ID format') ? 
            'Please provide a valid ID format' : 
            `An error occurred while fetching the news: ${error.message}`;

        handleApiResponse(res, error.message.includes('Invalid ID format') ? 400 : 500, errorMessage, { error: 'An error occurred while fetching the news' });
    }
};

module.exports = ReadItems;
