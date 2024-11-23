const { contact } = require('../../models'); // Correct the import path
const { limitOffsetPageNumber } = require('../../utils/pagination');

const Viewcontact = async ({ id, status, createdby, name, email, company_name, sort, select, page, size }) => {
    try {
        const queryObject = {};
        
        // ======= Filters Queries =======
        if (id) {
            queryObject._id = id;
        }
        if (status !== undefined) {
            queryObject.status = status.toLowerCase() === 'true' ? 'active' : 'inactive'; // Filter based on status
        }
        if (createdby) {
            queryObject.createdby = createdby;
        }
        if (name) {
            queryObject.name = { $regex: new RegExp(name, 'i') }; // Filter by name with case-insensitive regex
        }
        if (email) {
            queryObject.email = { $regex: new RegExp(email, 'i') }; // Filter by email
        }
        if (company_name) {
            queryObject.company_name = { $regex: new RegExp(company_name, 'i') }; // Filter by company name
        }

        // ======== Sort, Select =======
        let apiData = contact.find(queryObject);
        let ObjCount = await contact.countDocuments(queryObject);
        
        if (sort) {
            let sortFix = sort.replace(',', ' ');
            apiData = apiData.sort(sortFix);
        } else {
            apiData = apiData.sort({ createdAt: -1 }); // Default sort by createdAt in descending order
        }
        
        if (select) {
            let selectFix = select.split(',').join(' ');
            apiData = apiData.select(selectFix); // Select specific fields
        }

        // ===== Pagination and Limits =====
        const { limit, offset } = limitOffsetPageNumber(page, size);
        apiData = apiData.skip(offset).limit(limit);

        // Execute the query
        const contactList = await apiData.exec();
        return { contactList, total: ObjCount };
    } catch (error) {
        throw new Error('An error occurred while fetching contact: ' + error.message);
    }
};

module.exports = Viewcontact;
