const z = require('zod');

const eventSchema = z.object({
    status: z
        .boolean({
            invalid_type_error: 'Event status must be a boolean',
        })
        .optional(),

    name: z
        .string({
            invalid_type_error: 'Event title must be a string',
            required_error: 'Event title is required!',
        }),

    description: z
        .string({
            invalid_type_error: 'Description must be a string',
            required_error: 'Description is required!',
        }),

    link: z
        .string({
            invalid_type_error: 'Event link must be a string',
            required_error: 'Event link is required!',
        })
        .refine((value) => /^(ftp|http|https):\/\/[^ "]+$/.test(value), {
            message: 'Invalid URL format for event link',
        }),

    location: z
        .string({
            invalid_type_error: 'Location must be a string',
            required_error: 'Location is required!',
        }),

    date: z
        .string({
            invalid_type_error: 'Date must be a string',
            required_error: 'Date is required!',
        })
        .refine((value) => /^\d{4}-\d{2}-\d{2}$/.test(value), {
            message: 'Date must be in the format YYYY-MM-DD',
        })
        .refine((value) => !isNaN(new Date(value).getTime()), {
            message: 'Invalid date value',
        }),
});

module.exports = { eventSchema };
