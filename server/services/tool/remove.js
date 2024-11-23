const { tool, listing, tutorial } = require('../../models'); // Adjust models as necessary
const fs = require('fs');
const path = require('path');
const {deleteFiles} = require("../../utils/fileUtils");
const Deletetool = async (id) => {
    try {
        // Find the tool by ID
        const result = await tool.findById(id);

        // If no tool is found with the given ID
        if (!result) {
            throw new Error('Tool not found with the provided ID');
        }

        // // Remove any associated listings from this tool
        // if (result.listing && result.listing.length) {
        //     await listing.updateMany(
        //         { _id: { $in: result.listing } },
        //         { $pull: { tool: id } } // Adjust if reverse link exists
        //     );
        // }
        // Cascade update: remove tool references from tutorials
        tutorialDelete=await tutorial.deleteMany(
            { tool: id },
        );
        console.log(`${tutorialDelete.deletedCount} tutorials were deleted.`);
        
        // Check if documents were deleted or not
        if (tutorialDelete.deletedCount === 0) {
            console.log("No tutorials found with the specified criteria.");
        }

        // Delete associated icon files if they exist
        if (result.icon) {
            const iconPaths = result.icon.map(file => path.join(__dirname, '../../../uploads/tool', file.filename));
            await deleteFiles(iconPaths);
        }
        
        if (result.image) {
            const imagePaths = result.image.map(file => path.join(__dirname, '../../../uploads/tool', file.filename));
            await deleteFiles(imagePaths);
        }
        // Delete the tool itself
        await tool.findByIdAndDelete(id);

        // Return the deleted result
        return result;
    } catch (error) {
        throw new Error(`Error occurred while deleting tool: ${error.message}`);
    }
};

module.exports = Deletetool;
