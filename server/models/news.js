const mongoose = require("mongoose");

const newsSchema = new mongoose.Schema({
    status: {
        type: Boolean,
        required: true,
        default:true
    },
    title: {
        type: String,
        required: true,
        unique: true,
    },
    icon: {
        path: String,
        filename: String,
        // Required for storing the path to the uploaded image
    },
    news_link: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function (value) {
                return /^(ftp|http|https):\/\/[^ "]+$/.test(value);
            },
            message: 'Invalid URL format'
        }
    },
    website_link: {
        type: String,
        required: true,
        validate: {
            validator: function (value) {
                return /^(ftp|http|https):\/\/[^ "]+$/.test(value);
            },
            message: 'Invalid URL format'
        }
    },
}, { timestamps: true });

// Indexes
newsSchema.index({ title: 1 }); // unique index already applied
newsSchema.index({ news_link: 1 }); // unique index already applied
newsSchema.index({ status: 1, title: 1 }); // compound index
newsSchema.index({ createdAt: -1 }); // index for sorting by date

module.exports = mongoose.model("news", newsSchema);
