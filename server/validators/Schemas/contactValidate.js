const z = require('zod');

const contactSchema = z.object({
    name: z
        .string({
            invalid_type_error: 'Name must be a string',  
            required_error: 'Name is required!',         
        }),
    email: z
        .string({
            invalid_type_error: 'Email must be a string',
            required_error: 'Email is required!',
        })
        .email('Invalid email format'), // Ensures valid email format
    company_name: z
        .string({
            invalid_type_error: 'Company name must be a string',
        })
        .optional(),  // Made it optional as it is not always required
    mobile_no: z
        .string({
            invalid_type_error: 'Mobile number must be a string',
            required_error: 'Mobile number is required!',
        })
        .regex(/^\+?[0-9]{10,15}$/, 'Invalid mobile number format'),  // Validates mobile number format
    reason: z
        .string({
            invalid_type_error: 'Reason must be a string',
            required_error: 'Reason is required!',
        })
        .refine(val => ['Support', 'Partnerships', 'Feedback', 'Sales', 'Press', 'Other'].includes(val), {
            message: 'Invalid reason value',
        }),  // Restricts the allowed values for reason
    message: z
        .string({
            invalid_type_error: 'Message must be a string',  
            required_error: 'Message is required!',
        }),
    status: z
        .string({
            invalid_type_error: 'Status must be a string',
            required_error: 'Status is required!',
        })
        .refine(val => ['pending', 'initiate', 'active', 'inactive'].includes(val), {
            message: 'Invalid status value',
        })  // Restricts the allowed values for status
});

module.exports = { contactSchema };
