const z = require('zod');

const categorySchema = z.object({
    status: z
        .boolean({
            invalid_type_error: 'Category status must be a boolean.',
        })
        .optional(), // Status is optional

    name: z
        .string({
            invalid_type_error: 'Category title must be a string.',
            required_error: 'Category title is required.',
        })
        .min(1, 'Category title cannot be empty.') // Ensure title is not empty
        .max(100, 'Category title must not exceed 100 characters.'), // Optional length constraint

    description: z
        .string({
            invalid_type_error: 'Category description must be a string.',
            required_error: 'Category description is required.',
        })
        .optional(), // Make description optional if you want to allow empty descriptions

    icon: z.object({
        path: z.string().min(1, { message: "Path is required and must be a non-empty string" }), // Ensure the path is a non-empty string
        filename: z.string().min(1, { message: "Filename is required and must be a non-empty string" }) // Ensure the filename is a non-empty string
    }).optional(),
});

module.exports = { categorySchema };
