const mongoose = require("mongoose");
const validator = require('validator'); // Import validator if using improved email validation

const contact = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true, // Optional to trim extra spaces
    },
    email: {
        type: String,
        required: true,
        trim: true, // Optional to trim extra spaces
        validate: {
            validator: function (v) {
                return validator.isEmail(v); // Use validator for email validation
            },
            message: props => `${props.value} is not a valid email address!`
        }
    },
    company_name: {
        type: String,
        trim: true, // Optional to trim extra spaces
    },
    mobile_no: {
        type: String, // Changed to String to support full number format including country codes
        required: true,
        validate: {
            validator: function (v) {
                return /^\+?[0-9\s-]+$/.test(v); // Updated regex for mobile number validation
            },
            message: props => `${props.value} is not a valid mobile number!`
        }
    },
    reason: {
        type: String,
        enum: ['Support', 'Partnerships', 'Feedback', 'Sales', 'Press', 'Other'],
        required: true
    },
    message: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['pending', 'initiate', 'active', 'inactive'], // Fixed typo from 'initate' to 'initiate'
        default: 'pending',
    }
}, { timestamps: true });

module.exports = mongoose.model("contact", contact);
