const { blog } = require('../../models'); // Correct the import path
const { limitOffsetPageNumber } = require('../../utils/pagination');

const Viewblog = async ({ id, status, createdby, title, sort, select, page, size }) => {
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
        if (title) {
            queryObject.title = { $regex: new RegExp(title, 'i') }; // Use title instead of name
        }

        // ======== Sort, Select =======
        let apiData = blog.find(queryObject);
        let ObjCount = await blog.countDocuments(queryObject);
        if (sort) {
            let sortFix = sort.replace(',', ' ');
            apiData = apiData.sort(sortFix);
        } else {
            apiData = apiData.sort({ createdAt: -1 });
        }
        if (select) {
            let selectFix = select.split(',').join(' ');
            apiData = apiData.select(selectFix);
        }

        // ===== Pagination and Limits =====
        const { limit, offset } = limitOffsetPageNumber(page, size);
        apiData = apiData.skip(offset).limit(limit);

        // Execute the query
        const blogList = await apiData.exec();
        return { blogList, total: ObjCount };
    } catch (error) {
        throw new Error('An error occurred while fetching blog: ' + error.message);
    }
};

module.exports = Viewblog;
