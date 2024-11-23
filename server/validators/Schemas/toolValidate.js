const z = require('zod');

const toolSchema = z.object({
    status: z.boolean({
        invalid_type_error: 'Tool status must be a boolean',
    }).optional().default(false), // Default to `false` if not provided

    name: z.string({
        invalid_type_error: 'Tool name must be a string',
        required_error: 'Tool name is required!',
    }).min(1, 'Tool name must not be empty').max(100, 'Tool name must not exceed 100 characters'),

    icon: z.array(
        z.object({
            path: z.string().min(1, { message: "Path is required and must be a non-empty string" }),
            filename: z.string().min(1, { message: "Filename is required and must be a non-empty string" })
        })
    ).optional(), // Optional array of objects
    
    shortDescription: z.string({
        invalid_type_error: 'Short description must be a string',
        required_error: 'Short description is required!',
    }).max(300, 'Short description must not exceed 300 characters'),

    toolUrl: z.string({
        invalid_type_error: 'Tool URL must be a string',
        required_error: 'Tool URL is required!',
    }).url('Tool URL must be a valid URL'),

    image: z.array(
        z.object({
            path: z.string().min(1, { message: "Path is required and must be a non-empty string" }),
            filename: z.string().min(1, { message: "Filename is required and must be a non-empty string" })
        })
    ).optional(), // Optional array of objects
    listingid: z
    .union([
        z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid ObjectID format"),
        z.array(z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid ObjectID format"))
    ])
    .transform((val) => Array.isArray(val) ? val : [val]) // Convert single to array if needed
    .optional(),
    
    Subscription: z.enum(['Free', 'Freemium', 'Premium'], {
        invalid_type_error: 'Subscription must be one of: Free, Freemium, Premium',
    }),

    verified: z.boolean().optional().default(false),
    featured: z.boolean().optional().default(false),

    like: z.number().min(0, 'Likes must be a non-negative number').default(0),

    rating: z.number().min(0, 'Rating must be at least 0').max(5, 'Rating must not exceed 5').default(0),

    blog: z.object({
        heading: z.string({
            invalid_type_error: 'Blog heading must be a string',
            required_error: 'Blog heading is required!',
        }),
        body: z.string({
            invalid_type_error: 'Blog body must be a string',
            required_error: 'Blog body is required!',
        }),
    }),

    popularity: z.boolean().default(false),

    social: z.object({
        insta: z.string().url({ message: 'Instagram link must be a valid URL' }).optional(),
        linkedin: z.string().url({ message: 'LinkedIn link must be a valid URL' }).optional(),
        twitter: z.string().url({ message: 'Twitter link must be a valid URL' }).optional(),
        facebook: z.string().url({ message: 'Facebook link must be a valid URL' }).optional(),
        github: z.string().url({ message: 'GitHub link must be a valid URL' }).optional(),
    }).optional(),
});

module.exports = { toolSchema };
