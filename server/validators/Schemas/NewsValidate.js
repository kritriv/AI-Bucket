const z = require('zod');

const newsSchema = z.object({
    status: z
        .boolean({
            invalid_type_error: 'News status must be a boolean',
        })
        .optional(),

    title: z
        .string({
            invalid_type_error: 'News title must be a string',
            required_error: 'News title is required!',
        }),

    icon:z.object({
        path: z.string().min(1, { message: "Path is required and must be a non-empty string" }), // Ensure the path is a non-empty string
        filename: z.string().min(1, { message: "Filename is required and must be a non-empty string" }) // Ensure the filename is a non-empty string
    }).optional(),

    news_link: z
        .string({
            invalid_type_error: 'News link must be a string',
            required_error: 'News link is required!',
        })
        .refine((value) => /^(ftp|http|https):\/\/[^ "]+$/.test(value), {
            message: 'Invalid URL format for news link',
        }),

    website_link: z
        .string({
            invalid_type_error: 'Website link must be a string',
            required_error: 'Website link is required!',
        })
        .refine((value) => /^(ftp|http|https):\/\/[^ "]+$/.test(value), {
            message: 'Invalid URL format for website link',
        }),
});

module.exports = { newsSchema };
