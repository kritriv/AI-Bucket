const { listing } = require('../../models');
const { limitOffsetPageNumber } = require('../../utils/pagination');

const Viewlisting = async ({ id, status, createdby, name, categoryName, sort, select, page, size }) => {
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
            queryObject.name = { $regex: new RegExp(name, 'i') }; // Case-insensitive search for listing name
        }

        // ======== Handle auto-populated category filter ========
        if (categoryName) {
            queryObject['category.name'] = { $regex: new RegExp(categoryName, 'i') }; // Filter by category name
        }

        // ======== Sort, Select ========
        let apiData = listing.find(queryObject); // No need to populate as auto-populate is already applied

        const ObjCount = await listing.countDocuments(queryObject); // Count total results

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
        const listingList = await apiData.exec(); 
        console.log(listingList);
        return { listingList, total: ObjCount };
    } catch (error) {
        throw new Error('An error occurred while fetching Product listings: ' + error.message);
    }
};

module.exports = Viewlisting;
