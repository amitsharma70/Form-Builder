const mongoose = require('mongoose');


const responseSchema = new mongoose.Schema({
    formId: { type: mongoose.Schema.Types.ObjectId, ref: 'Form', required: true },
    responses: [
        {
            fieldId: { type: String, required: true },
            value: mongoose.Schema.Types.Mixed, // Can be String, Boolean, Array, etc.
        }
    ],
    submittedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Response', responseSchema);