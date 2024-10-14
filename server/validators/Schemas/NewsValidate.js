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

    icon: z
        .string({
            invalid_type_error: 'Icon must be a string',
            required_error: 'Icon is required!',
        }),

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
