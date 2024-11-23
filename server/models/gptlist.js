const mongoose = require("mongoose");

const gptlist = new mongoose.Schema({
    status: {
        type: Boolean,
        required: true,
        default:true,
    },
    name: {
        type: String,
        required: true,
        unique: true
    },
    topic: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    website_link: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function (value) {
                return /^(ftp|http|https):\/\/[^ "]+$/.test(value);
            },
            message: 'Invalid URL format for link',
        }
    }
}, { timestamps: true }); // Adds createdAt and updatedAt fields automatically

module.exports = mongoose.model("gptlist", gptlist);
