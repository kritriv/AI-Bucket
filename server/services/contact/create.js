const { contact } = require('../../models');


const Addcontact = async ({ name, email, company_name, mobile_no, reason, message, status }) => {
    try {
    

        // Create a new contact document
        const addcontact = new contact({
            name: name.trim(),
            email: email.trim(),
            company_name: company_name ? company_name.trim() : undefined,
            mobile_no,
            reason,
            message,
            status,
        });

        // Save to the database
        const result = await addcontact.save();
        return result;
    } catch (error) {
        throw new Error(`Error occurred while adding contact: ${error.message}`);
    }
};

module.exports = Addcontact;
