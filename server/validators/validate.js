const { handleApiResponse } = require('../modules/responseHandler');

const validate = (schema) => async (req, res, next) => {
    try {
        const parsedBody = await schema.parseAsync(req.body);
        req.body = parsedBody;
        next();
    } catch (err) {
        console.error('Validation errors:', err.errors); // Log the errors for debugging
        let message = 'Validation error';
        
        if (err.errors && err.errors.length > 0) {
            const detailedErrors = err.errors.map(e => ({
                field: e.path.join('.'), // Create a dotted path for the field
                message: e.message
            }));
            return handleApiResponse(res, 400, detailedErrors); // Return detailed errors
        }
        
        handleApiResponse(res, 400, message);
    }
};

module.exports = validate;
