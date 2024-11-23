const { category, listing, tutorial, tool } = require('../../models');
const { ObjectId } = require('mongodb');
const path = require('path');
const { deleteFiles } = require('../../utils/fileUtils'); // Utility for deleting files

const DeleteCategory = async (id) => {
    try {
        // Check if the category exists before deletion
        const existingCategory = await category.findById(id);
        if (!existingCategory) {
            throw new Error(`Category with id ${id} not found`);
        }

        // Delete the category's icon file if it exists
        if (existingCategory.icon) {
            const categoryIconPath = path.join(__dirname, '../../../uploads/category', existingCategory.icon.filename);
            await deleteFiles([categoryIconPath]); // Delete category icon
        }

        // Retrieve all listings associated with the category
        const listings = await listing.find({ category: id });
        const listingIds = listings.map(listing => listing._id);

        // For each listing, check if there are associated tools and tutorials
        for (const listingDoc of listings) {
            // Delete listing's icon file if it exists
            if (listingDoc.icon) {
                const listingIconPath = path.join(__dirname, '../../../uploads/listing', listingDoc.icon.filename);
                await deleteFiles([listingIconPath]);
            }

            // Find tools associated with the listing
            const tools = await tool.find({ listingid: listingDoc._id });
            for (const toolDoc of tools) {
                // Check if the tool is associated with listings from other categories
                const otherAssociatedListings = await listing.find({
                    _id: { $in: toolDoc.listingid },
                    category: { $ne: id } // Belongs to a different category
                });

                // If the tool is not associated with any listings outside the deleted category, delete it
                if (otherAssociatedListings.length === 0) {
                    // Delete tool's icon and image files if they exist
                    if (toolDoc.icon) {
                        const toolIconPaths = toolDoc.icon.map(icon =>
                            path.join(__dirname, '../../../uploads/tool', icon.filename)
                        );
                        await deleteFiles(toolIconPaths);
                    }
                    if (toolDoc.image) {
                        const toolImagePaths = toolDoc.image.map(image =>
                            path.join(__dirname, '../../../uploads/tool', image.filename)
                        );
                        await deleteFiles(toolImagePaths);
                    }

                    // Delete associated tutorials from the database
                    await tutorial.deleteMany({ tool: toolDoc._id });

                    // Delete the tool from the database
                    await tool.findByIdAndDelete(toolDoc._id);
                }
            }
        }

        // Delete associated listings from the database
        await listing.deleteMany({ category: id });

        // Finally, delete the category from the database
        const result = await category.findByIdAndDelete(id);

        return result;
    } catch (error) {
        throw new Error(`Error occurred while deleting category: ${error.message}`);
    }
};

module.exports = DeleteCategory;
