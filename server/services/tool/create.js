const { tool, listing } = require('../../models');
const mongoose = require('mongoose');
const path = require("path");
const {deleteFiles} = require("../../utils/fileUtils");
const Addtool = async (reqbody) => {
    const {
        name,
        icon = [],
        shortDescription,
        toolUrl,
        image = [],
        listingid,
        Subscription,
        verified = false,
        featured = false,
        like = 0,
        rating = 0,
        blog = {},
        popularity = false,
        social = {},
        status = false,
    } = reqbody;
    let uploadedIconPaths = [];
    let uploadedImagePaths = [];
    try {
        if (icon) {
            // Store paths to delete in case of error
            uploadedIconPaths = icon.map(img => path.join(__dirname, '../../../uploads/tool', img.filename));
        }
        

        if (image) {
            // Store paths to delete in case of error
            uploadedImagePaths = image.map(img => path.join(__dirname, '../../../uploads/tool', img.filename));
        }

        let listingIds = Array.isArray(listingid) ? listingid : [listingid];
        listingIds = listingIds.filter(id => mongoose.Types.ObjectId.isValid(id));

        if (listingIds.length === 0) throw new Error('Invalid listing ID(s) format');
        
        // Fetch all listings that match the given IDs
        const listingsExist = await listing.find({_id:{$in:listingIds}});
        console.log(listingsExist);
        // Check if the number of listings fetched matches the input listingIds
        if (listingsExist.length !== listingIds.length) throw new Error('One or more listings not found');
        
        // Prepare tool data
        const toolData = {
            name,
            shortDescription,
            toolUrl,
            listingid: listingIds,
            Subscription,
            verified,
            featured,
            like: parseInt(like),
            rating: parseFloat(rating),
            popularity,
            social,
            status,
        };

            toolData.icon = icon.map(img => ({ path: img.path, filename: img.filename }));
            toolData.image = image.map(img => ({ path: img.path, filename: img.filename }));
        
        // Handle `blog` data
        if (blog && blog.heading && blog.body) {
            toolData.blog = { heading: blog.heading, body: blog.body };
        } else if (!blog || !blog.heading || !blog.body) {
            throw new Error("Blog heading and body are required");
        }

        // Create and save the new tool
        const newTool = await tool.create(toolData);
        return newTool;
    } catch (error) {
        
        console.error('Error in Addtool function:', error);
        // Delete any files that were uploaded before the error
        await deleteFiles([...uploadedIconPaths, ...uploadedImagePaths])

        throw new Error(`Error occurred while adding tool: ${error.message}`);
    }
};

module.exports = Addtool;
