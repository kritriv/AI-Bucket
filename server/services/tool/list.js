const { tool } = require('../../models');
const { limitOffsetPageNumber } = require('../../utils/pagination');

const Viewtool = async ({ id, status, createdby, name, ListingName, sort, select, page, size }) => {
    try {
        const queryObject = {};

        // ======= Filters Queries =======
        if (id) {
            queryObject._id = id;
        }
        if (status !== undefined) {
            queryObject.status = status.toLowerCase() === 'true'; // Convert status to boolean
        }
        if (createdby) {
            queryObject.createdby = createdby;
        }
        if (name) {
            queryObject.name = { $regex: new RegExp(name, 'i') }; // Case-insensitive search for tool name
        }

        // ======== Filter by Listing Name ========
        if (ListingName) {
            queryObject['listingid.name'] = { $regex: new RegExp(ListingName, 'i') }; // Filter by listing name (populated)
        }

        // ======== Sort, Select ========
        let apiData = tool.find(queryObject).populate('listingid', 'name'); // Populate listing to access name field

        const ObjCount = await tool.countDocuments(queryObject); // Count total results

        // Sorting logic
        if (sort) {
            const sortFix = sort.replace(',', ' '); // Handle multiple sorting fields
            apiData = apiData.sort(sortFix);
        } else {
            apiData = apiData.sort({ createdAt: -1 }); // Default sort by creation date
        }

        // Selecting specific fields
        if (select) {
            const selectFix = select.split(',').join(' '); // Convert comma-separated fields to space-separated
            apiData = apiData.select(selectFix);
        }

        // ===== Pagination and limits =====
        const { limit, offset } = limitOffsetPageNumber(page, size);
        apiData = apiData.skip(offset).limit(limit); // Apply pagination

        // Execute query
        const toolList = await apiData.exec(); 
        return { toolList, total: ObjCount };
    } catch (error) {
        throw new Error('An error occurred while fetching Product tools: ' + error.message);
    }
};

module.exports = Viewtool;
