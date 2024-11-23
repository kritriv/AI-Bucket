const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
    status: {
        type: Boolean,
        default: false,
    },
    title: {
        type: String,
        required: true,  // Corrected spelling
        unique: true,    // Added unique constraint
    },
    image: {
        path:String,
        filename:String,// Corrected spelling
    },
    body: {
        type: String,
        required: true,  // Corrected spelling
    },
    
}, { timestamps: true }); // Enable timestamps

module.exports = mongoose.model("blog", blogSchema);
