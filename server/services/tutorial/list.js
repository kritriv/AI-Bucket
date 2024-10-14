const { tutorial } = require('../../models'); // Correct the import path
const { limitOffsetPageNumber } = require('../../utils/pagination');

const Viewtutorial = async ({ id, status, createdby, title, link, sort, select, page, size }) => {
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
        if (link) {
            queryObject.link = { $regex: new RegExp(link, 'i') };
        }

        // ======== Sort, Select =======
        let apiData = tutorial.find(queryObject);
        let ObjCount = await tutorial.countDocuments(queryObject);
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
        const tutorialList = await apiData.exec();
        return { tutorialList, total: ObjCount };
    } catch (error) {
        throw new Error('An error occurred while fetching tutorial: ' + error.message);
    }
};

module.exports = Viewtutorial;
