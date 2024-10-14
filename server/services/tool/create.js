const { tool, listing } = require('../../models');
const mongoose = require('mongoose');

const Addtool = async (reqbody) => {
    try {
        // Validate the listing as a valid ObjectId
        const listingId = reqbody.listing; // Ensure you're getting the listingId from reqbody
        if (!mongoose.Types.ObjectId.isValid(listingId)) {
            throw new Error('Invalid listing ID format');
        }

        // Check if the listing exists in the database
        const existingListing = await listing.findById(listingId);
        console.log('Checking for existing listing:', existingListing); // Log for debugging

        if (!existingListing) {
            throw new Error('Listing not found');
        }

        // Create the new tool
        const newTool = await tool.create({
            name: reqbody.name,
            icon: reqbody.icon,
            shortDescription: reqbody.shortDescription,
            toolUrl: reqbody.toolUrl,
            image: reqbody.image,
            listing: listingId, // Use the validated listingId here
            Subscription: reqbody.Subscription,
            verified: reqbody.verified,
            featured: reqbody.featured,
            like: reqbody.like,
            rating: reqbody.rating,
            blog: {
                heading: reqbody.blog.heading,
                body: reqbody.blog.body
            },
            popularity: reqbody.popularity,
            social: reqbody.social,
            status: reqbody.status
        });

        console.log('New Tool:', newTool); // Log the created tool object

        return newTool; // Return the new tool
    } catch (error) {
        console.error('Error in Addtool function:', error); // Log specific errors
        throw new Error(`Error occurred while adding tool: ${error.message}`);
    }
};

module.exports = Addtool;
