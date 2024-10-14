const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
    status: {
        type: Boolean,
        default: true,
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true,
        validate: {
            validator: function(value) {
                return /^(ftp|http|https):\/\/[^ "]+$/.test(value);
            },
            message: 'Invalid URL format for event link',
        }
    },
    location: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
}, { timestamps: true });

// Add a compound index to enforce uniqueness across name, link, and location
eventSchema.index({ name: 1, link: 1, location: 1 }, { unique: true });

module.exports = mongoose.model("event", eventSchema);
