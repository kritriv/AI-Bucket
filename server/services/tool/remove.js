const { tool } = require('../../models');

const Deletetool = async (id) => {
    try {
        // Find the tool by ID and delete it
        const result = await tool.findByIdAndDelete(id);

        // If no tool is found with the given ID
        if (!result) {
            throw new Error('Tool not found with the provided ID');
        }

        // Return the result of the deletion
        return result;
    } catch (error) {
        throw new Error(`Error occurred while deleting tool: ${error.message}`);
    }
};

module.exports = Deletetool;
