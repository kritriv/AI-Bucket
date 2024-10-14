const mongoose = require('mongoose');
// const Schema = mongoose.Schema;
// const autopopulate = require('mongoose-autopopulate');
const { transformToJSON } = require('../utils/mongooseUtils');

const category = new mongoose.Schema({
    status:{
        type:Boolean,
        default:true
    },
    // createdby: {
    //     type: mongoose.Schema.ObjectId,
    //     ref: 'user',
    //     required: true,
    //     autopopulate: { select: '_id username' },
    // },
    name:{
        type: String,
        unique: true,
        required:true,
        
    },
    description:{
        type:String,
        required:true
    },
    icon:{
        type:String,
        required: true,
    },
    // listing: [{ type: Schema.Types.ObjectId, ref: 'listing' }],
   },
   { timestamps: true },
);

// Static method for checking uniqueness
category.statics.isNameUnique = async function(name, id) {
    const existingCategory = await this.findOne({ name });
    return !existingCategory || existingCategory._id.equals(id);
};

// Pre-save hook to validate uniqueness
category.pre('save', async function(next) {
    const isUnique = await this.constructor.isNameUnique(this.name, this._id);
    if (!isUnique) {
        return next(new Error('Category with this name already exists'));
    }
    next();
});


// category.plugin(autopopulate);
transformToJSON(category, 'id');

module.exports = mongoose.model("category",category);