const z = require('zod');

const blogSchema = z.object({
    status: z
        .boolean({
            invalid_type_error: 'Blog status must be a boolean',
        })
        .optional(),

    title: z
        .string({
            invalid_type_error: 'Blog title must be a string',
            required_error: 'Blog title is required!',
        }),

    image: z.object({
        path: z.string().min(1, { message: "Path is required and must be a non-empty string" }), // Ensure the path is a non-empty string
        filename: z.string().min(1, { message: "Filename is required and must be a non-empty string" }) // Ensure the filename is a non-empty string
    }).optional(),

    body: z
        .string({
            invalid_type_error: 'Blog body must be a string',
            required_error: 'Blog body is required!',
        }),
});

module.exports = { blogSchema };
