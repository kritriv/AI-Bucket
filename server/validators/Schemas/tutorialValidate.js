const z = require('zod');

const tutorialSchema = z.object({
    status: z
        .boolean({
            invalid_type_error: 'Status must be a boolean',
        })
        .optional(),

    title: z
        .string({
            invalid_type_error: 'Title must be a string',
            required_error: 'Title is required!',
        }),

    link: z
        .string({
            invalid_type_error: 'Link must be a string',
            required_error: 'Link is required!',
        })
        .refine((value) => /^(ftp|http|https):\/\/[^ "]+$/.test(value), {
            message: 'Invalid URL format for link',
        }),

    tool: z
        .string({
            invalid_type_error: 'Tool must be a string',
        })
        .refine((value) => value.length === 24, {
            message: 'Invalid ObjectId format for tool',
        })
        .optional(),

    listing: z
        .array(z.string().refine((value) => value.length === 24, {
            message: 'Each listing must be a valid ObjectId',
        }))
        .optional(),
});

module.exports = { tutorialSchema };
