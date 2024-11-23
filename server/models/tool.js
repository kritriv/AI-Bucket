const mongoose = require("mongoose");
const autoPopulate = require('mongoose-autopopulate');

const toolSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true, // Remove any extra spaces
    },
    icon: [{
            path: String,
            filename: String,
            // Required for storing the path to the uploaded image
        }],
    shortDescription: {
        type: String,
        required: true,
        maxLength: 300,
    },
    toolUrl: {
        type: String,
        required: true,
        unique: true,
    },
    image:[ {
        path: String,
        filename: String,
        // Required for storing the path to the uploaded image
    }],
    listingid: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "listing",
        autopopulate: { select: '_id name category' } // Auto-populate with specific fields
    }],
    Subscription: {
        type: String,
        enum: ['Free', 'Freemium', 'Premium'], // Consistent enum values
        required: true,
    },
    verified: {
        type: Boolean,
        default: false,
    },
    featured: {
        type: Boolean,
        default: false,
    },
    like: {
        type: Number,
        default: 0,
    },
    rating: {
        type: Number,
        default: 0,
        min: 0,
        max: 5,
    },
    blog: {
        heading: {
            type: String,
            required: true,
        },
        body: {
            type: String,
            required: true,
        }
    },
    popularity: {
        type: Boolean,
        default: false,
    },
    social: {
        instagram: String,
        linkedin: String,
        twitter: String,
        facebook: String,
        github: String,
    },
    status: {
        type: Boolean,
        default: false,
    }
}, { timestamps: true }); // Add timestamps for createdAt and updatedAt

// Apply auto-populate plugin
toolSchema.plugin(autoPopulate);

module.exports = mongoose.model("tool", toolSchema);
