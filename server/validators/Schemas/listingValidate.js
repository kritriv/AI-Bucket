const z = require('zod');

const listingSchema = z.object({
    status: z
        .boolean({
            invalid_type_error: 'Listing status must be a boolean',
        })
        .optional(), // Status is optional

    name: z
        .string({
            invalid_type_error: 'Listing title must be a string',
            required_error: 'Listing title is required!',
        }),

    description: z
        .string({
            invalid_type_error: 'Listing description must be a string', // Updated message for clarity
            required_error: 'Listing description is required!',
        }),

    category: z
        .string({
            invalid_type_error: 'Category must be a string',
            required_error: 'Category is required!',
        })
        .regex(/^[0-9a-fA-F]{24}$/, {
            message: 'Invalid category ID format',
        }), // Ensures that the category ID is a valid ObjectId format
});

module.exports = { listingSchema };
