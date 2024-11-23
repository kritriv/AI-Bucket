const fs = require('fs').promises;
const path = require('path');
const { tool, listing } = require('../../models');
const { ObjectId } = require('mongodb');
const {deleteFiles}= require('../../utils/fileUtils');

const Updatetool = async (id, updatetoolData) => {
    try {
        console.log('Updating tool with ID:', id);
        console.log('Update data:', updatetoolData);

        // Validate tool ID format
        if (!ObjectId.isValid(id)) {
            throw new Error('Invalid tool ID format');
        }

        // Find the existing tool before updating
        const existingTool = await tool.findById(id);
        if (!existingTool) {
            throw new Error('Tool not found with the provided ID');
        }

        // Validate and check listing(s)
        if (updatetoolData.listingid) {
            const listingIds = Array.isArray(updatetoolData.listingid) ? updatetoolData.listingid : [updatetoolData.listingid];

            for (const listingId of listingIds) {
                if (!ObjectId.isValid(listingId)) {
                    throw new Error(`Invalid listing ID format: ${listingId}`);
                }

                const listingExists = await listing.findById(listingId);
                if (!listingExists) {
                    throw new Error(`Listing not found for ID: ${listingId}`);
                }
            }
            // Set listing as array if multiple or single value
            updatetoolData.listingid = listingIds;
        }

        // File paths for existing images and icons
        const existingImagePaths = Array.isArray(existingTool.image)
            ? existingTool.image.map(img => path.join(__dirname, '../../../uploads/tool', img.filename))
            : [path.join(__dirname, '../../../uploads/tool', existingTool.image.filename)];

        const existingIconPaths = Array.isArray(existingTool.icon)
            ? existingTool.icon.map(icon => path.join(__dirname, '../../../uploads/tool', icon.filename))
            : [path.join(__dirname, '../../../uploads/tool', existingTool.icon.filename)];

            console.log(existingIconPaths)
            console.log(existingImagePaths);
        // Delete previous image(s) and icon(s) only if new ones are provided
        if (updatetoolData.image) {
            try {
                await deleteFiles(existingImagePaths);
            } catch (deleteError) {
                console.error(`Error deleting existing images: ${deleteError.message}`);
            }
        }

        if (updatetoolData.icon) {
            try {
                await deleteFiles(existingIconPaths);
            } catch (deleteError) {
                console.error(`Error deleting existing icons: ${deleteError.message}`);
            }
        }

        // Update the tool in the database
        const updatedTool = await tool.findByIdAndUpdate(id, updatetoolData, {
            new: true,
            runValidators: true,
        });

        console.log('Updated tool:', updatedTool);
        return updatedTool;

    } catch (error) {
        console.error(`Error occurred while updating tool: ${error.message}`);

        // Attempt to rollback file deletions in case of update failure
        try {
            if (updatetoolData.image) {
                await deleteFiles(updatetoolData.image.map(img => path.join(__dirname, '../../../uploads/tool', img.filename)));
            }
            if (updatetoolData.icon) {
                await deleteFiles(updatetoolData.icon.map(icon => path.join(__dirname, '../../../uploads/tool', icon.filename)));
            }
        } catch (rollbackError) {
            console.error(`Error during rollback of file deletions: ${rollbackError.message}`);
        }

        throw new Error(`Error occurred while updating tool: ${error.message}`);
    }
};

module.exports = Updatetool;
