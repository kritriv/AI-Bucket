const mongoose = require("mongoose");
const autopopulate = require('mongoose-autopopulate');
const { transformToJSON } = require('../utils/mongooseUtils');

const tutorialSchema = new mongoose.Schema({
    status: {
        type: Boolean,
        default: true,
    },
    title: {
        type: String,
        required: true,
        unique: true,
    },      
    link: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function (value) {
                return /^(ftp|http|https):\/\/[^ "]+$/.test(value);
            },
            message: 'Invalid URL format for tutorial link',
        },
    },
    tool: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "tool",
        autopopulate: {select: 'name _id icon listing'},  // Enable autopopulate for tool reference
    },
    // listing: [{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "listing",
    //     // autopopulate: true,  // Enable autopopulate for listing array
    // }],
}, { timestamps: true });

// Adding indexes
tutorialSchema.index({ title: 1 });
tutorialSchema.index({ link: 1 });
tutorialSchema.index({ tool: 1 });
// tutorialSchema.index({ listing: 1 });

// Enable autopopulate plugin
tutorialSchema.plugin(autopopulate);

// Optionally, you can enable JSON transformation
transformToJSON(tutorialSchema, 'id');

module.exports = mongoose.model("tutorial", tutorialSchema);
