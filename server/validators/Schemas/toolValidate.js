const z = require('zod');

const toolSchema = z.object({
    status: z
        .boolean({
            invalid_type_error: 'Tool status must be a boolean',
        })
        .optional(), // Status is optional

    name: z
        .string({
            invalid_type_error: 'Tool name must be a string',
            required_error: 'Tool name is required!',
        })
        .min(1, 'Tool name must not be empty') // Ensure name is not empty
        .max(100, 'Tool name must not exceed 100 characters'), // Optional max length

    icon: z
        .string({
            invalid_type_error: 'Icon must be a string',
            required_error: 'Icon is required!',
        })
        .url('Icon must be a valid URL'), // Assuming the icon is a URL

    shortDescription: z
        .string({
            invalid_type_error: 'Short description must be a string',
            required_error: 'Short description is required!',
        })
        .max(300, 'Short description must not exceed 300 characters'), // Limit the description length

    toolUrl: z
        .string({
            invalid_type_error: 'Tool URL must be a string',
            required_error: 'Tool URL is required!',
        })
        .url('Tool URL must be a valid URL'), // Validate URL format

    image: z
        .string({
            invalid_type_error: 'Image must be a string',
            required_error: 'Image is required!',
        })
        .url('Image must be a valid URL'), // Assuming the image is a URL

    listing: z
        .string({
            invalid_type_error: 'Listing ID must be a string',
            required_error: 'Listing ID is required!',
        })
        .regex(/^[0-9a-fA-F]{24}$/, {
            message: 'Invalid listing ID format', // Validates ObjectId format
        }),

    Subscription: z
        .enum(['Free', 'freemium', 'Premium'], {
            invalid_type_error: 'Subscription must be one of: Free, freemium, Premium',
        }),

    verified: z
        .boolean()
        .optional(), // Verified status is optional

    featured: z
        .boolean()
        .optional(), // Featured status is optional

    like: z
        .number()
        .min(0, 'Likes must be a non-negative number') // Ensure non-negative
        .default(0), // Default value for likes

    rating: z
        .number()
        .min(0, 'Rating must be at least 0') // Ensure rating is within range
        .max(5, 'Rating must not exceed 5') // Ensure rating is within range
        .default(0), // Default value for rating

    blog: z.object({
        heading: z
            .string({
                invalid_type_error: 'Blog heading must be a string',
                required_error: 'Blog heading is required!',
            }),
        body: z
            .string({
                invalid_type_error: 'Blog body must be a string',
                required_error: 'Blog body is required!',
            }),
    }),

    popularity: z
        .boolean()
        .default(false), // Default value for popularity

    social: z.object({
        insta: z.string().optional(),
        linkedin: z.string().optional(),
        twitter: z.string().optional(), // Fixed typo from "tweeter"
        facebook: z.string().optional(),
        github: z.string().optional(),
    }).optional(), // Social fields are optional

});

module.exports = { toolSchema };
