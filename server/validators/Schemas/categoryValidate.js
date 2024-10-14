const z = require('zod');

const categorySchema = z.object({
    status: z
        .boolean({
            invalid_type_error: 'category status must be a boolean',
        })
        .optional(), // Status is optional

    name: z
        .string({
            invalid_type_error: 'category title must be a string',
            required_error: 'category title is required!',
        }),

    description: z
        .string({
            invalid_type_error: 'category description must be a string', // Updated message for clarity
            required_error: 'category description is required!',
        }),

    icon: z
        .string({
            invalid_type_error: 'Icon must be a string',
            required_error: 'Icon is required!',
        }),
});

module.exports = { categorySchema };
