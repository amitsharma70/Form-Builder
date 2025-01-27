// models/Form.js
const mongoose = require('mongoose');

const formSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    fields: [
        {
            label: { type: String, required: true },
            type: { type: String, enum: ['text', 'dropdown', 'checkbox', 'radio'], required: true },
            options: [String], // For dropdown, checkbox, or radio buttons
            required: { type: Boolean, default: false },
        }
    ],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Form', formSchema);

