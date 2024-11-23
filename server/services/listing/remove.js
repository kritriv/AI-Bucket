const { tool, tutorial, listing } = require('../../models');  // Assuming you have a listing model
const { deleteFiles } = require('../../utils/fileUtils'); // Helper function for file deletion
const { ObjectId } = require('mongodb');
const path = require('path');

// Main function to delete a listing and handle cascading deletions
const deletelisting = async (id) => {
    try {
        const listingDoc = await listing.findById(id);
        if (!listingDoc) throw new Error(`listing not found with id: ${id}`);

        // Step 1: Find tools associated with this listing
        const toolsWithlisting = await tool.find({ listingid: listingDoc._id }, '_id listingid icon image');
        const toolsToDelete = []; // tools to fully delete
        const toolIconPaths = [];
        const toolImagePaths = [];

        for (const tool of toolsWithlisting) {
            if (tool.listingid.length === 1) {
                // tool has only this listing, so delete tool and collect file paths
                toolsToDelete.push(tool._id);
                toolIconPaths.push(...tool.icon.map(icon => path.join(__dirname, '../../../uploads/tool', icon.filename)));
                toolImagePaths.push(...tool.image.map(img => path.join(__dirname, '../../../uploads/tool', img.filename)));
            } else {
                // tool has multiple listings, so just remove the reference
                await tool.updateOne(
                    { _id: tool._id },
                    { $pull: { listingid: listingDoc._id } }
                );
            }
        }
        const iconFilePath = path.join(__dirname, '../../../uploads/listing', listingDoc.icon.filename);

        // Step 2: Delete tools with only one listingid
        if (toolsToDelete.length > 0) {
            await tool.deleteMany({ _id: { $in: toolsToDelete } });
        }

        // // Step 3: Handle tutorials associated with the tools we deleted
        // const tutorialsToDelete = await tutorial.find({ tool: { $in: toolsToDelete } }, 'image');
        // const tutorialImagePaths = tutorialsToDelete
        //     .map(tutorial => tutorial.image.map(img => path.join(__dirname, '../../../uploads/tutorial', img.filename)))
        //     .flat();
        
        await tutorial.deleteMany({ tool: { $in: toolsToDelete } });

        // Step 4: Delete all collected files
        await deleteFiles([...toolIconPaths, ...toolImagePaths, iconFilePath ]);

        // Step 5: Finally, delete the listing itself
        const result = await listing.findByIdAndDelete(id);

        return result;
    } catch (error) {
        throw new Error(`Error occurred while deleting listing: ${error.message}`);
    }
};

module.exports = deletelisting;