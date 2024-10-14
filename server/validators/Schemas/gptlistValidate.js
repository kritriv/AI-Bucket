const z = require('zod');

const gptListSchema = z.object({
    status: z
        .boolean({
            invalid_type_error: 'Status must be a boolean',
        })
        .optional(),

    name: z
        .string({
            invalid_type_error: 'Name must be a string',
            required_error: 'Name is required!',
        }),

    topic: z
        .string({
            invalid_type_error: 'Topic must be a string',
            required_error: 'Topic is required!',
        }),

    description: z
        .string({
            invalid_type_error: 'Description must be a string',
            required_error: 'Description is required!',
        }),

    website_link: z
        .string({
            invalid_type_error: 'Link must be a string',
            required_error: 'Link is required!',
        })
        .refine((value) => /^(ftp|http|https):\/\/[^ "]+$/.test(value), {
            message: 'Invalid URL format for link',
        }),
});

module.exports = { gptListSchema };
