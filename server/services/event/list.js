const { event } = require('../../models'); // Correct the import path
const { limitOffsetPageNumber } = require('../../utils/pagination');
const mongoose = require('mongoose');

const Viewevent = async ({ id, status, createdby, name, link, location, date, sort, select, page, size }) => {
    try {
        const queryObject = {};
        
        // ======= Filters Queries =======
        if (id && mongoose.Types.ObjectId.isValid(id)) {
            queryObject._id = id;
        }
        if (status !== undefined) {
            queryObject.status = status.toLowerCase() === 'true';
        }
        if (createdby) {
            queryObject.createdby = createdby;
        }
        if (name) {
            queryObject.name = { $regex: new RegExp(name, 'i') };
        }
        if (link) {
            queryObject.link = { $regex: new RegExp(link, 'i') };
        }
        if (location) {
            queryObject.location = { $regex: new RegExp(location, 'i') };
        }
        if (date) {
            const parsedDate = new Date(date);
            if (!isNaN(parsedDate)) {
                queryObject.date = parsedDate;
            }
        }

        // ======== Sort, Select =======
        let apiData = event.find(queryObject);
        const ObjCount = await event.countDocuments(queryObject);

        if (sort) {
            const sortFix = sort.replace(',', ' ');
            apiData = apiData.sort(sortFix);
        } else {
            apiData = apiData.sort({ createdAt: -1 });
        }
        if (select) {
            const selectFix = select.split(',').join(' ');
            apiData = apiData.select(selectFix);
        }

        // ===== Pagination and Limits =====
        const { limit, offset } = limitOffsetPageNumber(page, size);
        apiData = apiData.skip(offset).limit(limit);

        // Execute the query
        const eventList = await apiData.exec();
        return { eventList, total: ObjCount };
    } catch (error) {
        throw new Error('An error occurred while fetching events: ' + error.message);
    }
};

module.exports = Viewevent;
