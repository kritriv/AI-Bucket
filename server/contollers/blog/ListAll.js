const { handleApiResponse } = require('../../modules/responseHandler');
const { list } = require('../../services/blog');

// To get All blog list
const ListAll = async (req, res) => {
    try {
        
        // Destructure result from the list service
        const { blogList , total } = await list(req.query); 
        console.log(blogList)
        // Check if no blog items were found
        if (!blogList || blogList.length === 0) {
            return handleApiResponse(res, 404, 'blog not found');
        }

        // Handle successful response
        handleApiResponse(res, 200, 'blog fetched successfully', {
            data: blogList,
            total: total,
            nbHits: blogList.length, // Update to count the correct list of blog
        });
    } catch (error) {
        // Handle error response
        handleApiResponse(res, 500, 'An error occurred while fetching the blog', { error: error.message });
    }
};

module.exports = ListAll;
