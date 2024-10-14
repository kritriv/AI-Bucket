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

    image: z
        .string({
            invalid_type_error: 'Image must be a string',
            required_error: 'Image is required!',
        }),

    body: z
        .string({
            invalid_type_error: 'Blog body must be a string',
            required_error: 'Blog body is required!',
        }),
});

module.exports = { blogSchema };
