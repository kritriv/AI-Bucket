const mongoose = require('mongoose');
const { transformToJSON } = require('../utils/mongooseUtils');

const categorySchema = new mongoose.Schema({
    status: {
        type: Boolean,
        default: true
    },
    name: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 100
    },
    description: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 500
    },
    icon: {
        path: String,
        filename: String,
    },
}, { timestamps: true });

// Static method for checking uniqueness
categorySchema.statics.isNameUnique = async function(name, id) {
    const existingCategory = await this.findOne({ name });
    return !existingCategory || existingCategory._id.equals(id);
};

// Convert to JSON and add custom field `id`
transformToJSON(categorySchema, 'id');

module.exports = mongoose.model("category", categorySchema);
