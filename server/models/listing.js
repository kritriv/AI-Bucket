const mongoose = require("mongoose");
const autoPopulate = require('mongoose-autopopulate');
const path = require("path");
const {deleteFiles} = require("../utils/fileUtils");
const Tool = require("./tool");
const Tutorial = require("./tutorial"); 
const listingSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Listing name is required!'],
        trim: true,
        unique:true,
    },
    description: {
        type: String,
        required: [true, 'Listing description is required!'],
        trim: true,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "category",
        required: [true, 'Category reference is required!'],
        autopopulate: { select: 'name _id' },
    },
    icon: {
        path: String,
        filename: String,
    },
    status: {
        type: Boolean,
        default: false,
    }
}, { timestamps: true });

// Enable autopopulate plugin
listingSchema.plugin(autoPopulate);


// Static method for checking uniqueness
listingSchema.statics.isNameUnique = async function(name, id) {
    const existingListing = await this.findOne({ name });
    return !existingListing || existingListing._id.equals(id);
};
listingSchema.index({ name: 1 }, { unique: true });
    


module.exports = mongoose.model("listing", listingSchema);
