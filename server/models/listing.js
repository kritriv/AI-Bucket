const mongoose = require("mongoose");
const autopopulate = require('mongoose-autopopulate'); // Import autopopulate plugin

const listingSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Listing name is required!'],
        trim: true, // To remove any extra spaces
    },
    description: {
        type: String,
        required: [true, 'Listing description is required!'],
        trim: true,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "category",
        required: [true, 'Category reference is required!'], // Ensure category is linked
        autopopulate: { select: 'name _id' }, // Auto-populate and select only 'name' and '_id'
    },
    status: {
        type: Boolean,
        default: false,
    }
}, { timestamps: true }); // Add timestamps to track createdAt and updatedAt

// Enable the autopopulate plugin
listingSchema.plugin(autopopulate);

module.exports = mongoose.model("listing", listingSchema);
