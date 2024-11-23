const { category } = require('../../models');
const { limitOffsetPageNumber } = require('../../utils/pagination');

const ViewCategory = async ({ id, status, createdby, name, sort, select, page, size }) => {
    try {
        const queryObject = {};
        
        // ======= Filters Queries =======
        if (id) {
            queryObject._id = id;
        }
        if (status !== undefined) {
            queryObject.status = status.toLowerCase() === 'true';
        }
        if (createdby) {
            queryObject.createdby = createdby;
        }
        if (name) {
            queryObject.name = { $regex: new RegExp(name, 'i') }; // Case-insensitive search
        }

        // ======== Short, Select ======
        let apiData = category.find(queryObject);
        const totalCount = await category.countDocuments(queryObject);
        console.log(totalCount);
        if (sort) {
            const sortFix = sort.replace(',', ' ');
            apiData = apiData.sort(sortFix);
        } else {
            apiData = apiData.sort({ createdAt: -1 }); // Default sorting
        }

        if (select) {
            const selectFix = select.split(',').join(' ');
            apiData = apiData.select(selectFix);
        }

        // ===== Pagination and limits ====
        const { limit, offset } = limitOffsetPageNumber(page, size);
        apiData = apiData.skip(offset).limit(limit);

        const categories = await apiData.exec();
        return { categories , total: totalCount };
    } catch (error) {
        throw new Error(`An error occurred while fetching categories: ${error.message}`);
    }
};

module.exports = ViewCategory;
