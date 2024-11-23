const { news } = require('../../models'); // Correct the import path
const gptlist = require('../../models/gptlist');
const { limitOffsetPageNumber } = require('../../utils/pagination');

const Viewgpt = async ({ id, status, createdby, name, website_link, sort, select, page, size }) => {
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
            queryObject.name = { $regex: new RegExp(name, 'i') }; // Use title instead of name
        }
        if (website_link) {
            queryObject.website_link = { $regex: new RegExp(website_link, 'i') };
        }

        // ======== Sort, Select =======
        let apiData = gptlist.find(queryObject);
        let ObjCount = await gptlist.countDocuments(queryObject);
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
        const gptList = await apiData.exec();
        return { gptList, total: ObjCount };
    } catch (error) {
        throw new Error('An error occurred while fetching gptList ' + error.message);
    }
};

module.exports = Viewgpt;
