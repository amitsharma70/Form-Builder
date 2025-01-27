const Form = require('../models/Form');
const Response = require('../models/Response');

// Create a new form
exports.createForm = async (req, res) => {
    try {
        const { title, description, fields } = req.body;
        const createdBy = req.user.id; // Assuming user ID is available in req.user

        const newForm = new Form({ title, description, fields, createdBy });
        await newForm.save();

        res.status(201).json({ message: 'Form created successfully', form: newForm });
    } catch (error) {
        res.status(500).json({ message: 'Error creating form', error });
    }
};

// Get form by ID
exports.getFormById = async (req, res) => {
    try {
        const { id } = req.params; // Get form ID from request parameters
        const userId = req.user.id; // Assuming user ID is available in req.user

        const form = await Form.findById(id);

        // Check if the form exists
        if (!form) {
            return res.status(404).json({ message: 'Form not found' });
        }

        // Check if the user is authorized to access the form
        if (form.createdBy.toString() !== userId) {
            return res.status(403).json({ message: 'Unauthorized access to form' });
        }

        res.status(200).json({ form });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching form', error });
    }
};


// Get all forms
// Get all forms without authentication
exports.getAllForms = async (req, res) => {
    try {
        // Fetch all forms from the database
        const forms = await Form.find({}, { createdBy: 0 }); // Exclude the `createdBy` field for privacy
        res.json({ forms });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching forms', error });
    }
};


// Get all forms by a user
exports.getFormsByUser = async (req, res) => {
    try {        

        const userId = req.user.id; // Assuming user ID is available in req.user
        console.log(userId);
        const forms = await Form.find({ createdBy: userId });
        res.status(200).json({ forms });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user forms', error });
    }
};

// Update a form
exports.updateForm = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        const updatedForm = await Form.findByIdAndUpdate(id, updates, { new: true });
        if (!updatedForm) return res.status(404).json({ message: 'Form not found' });

        res.status(200).json({ message: 'Form updated successfully', form: updatedForm });
    } catch (error) {
        res.status(500).json({ message: 'Error updating form', error });
    }
};

// Delete a form
exports.deleteForm = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedForm = await Form.findByIdAndDelete(id);
        if (!deletedForm) return res.status(404).json({ message: 'Form not found' });

        res.status(200).json({ message: 'Form deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting form', error });
    }
};

// Get all responses for a specific form
// Submit a response to a form without authentication
exports.getResponsesByForm = async (req, res) => {
    try {
        const { formId, responses } = req.body;

        // Check if the form exists
        const form = await Form.findById(formId);
        if (!form) {
            return res.status(404).json({ message: 'Form not found' });
        }

        // Create a new response
        const newResponse = new Response({ formId, responses });
        await newResponse.save();

        res.status(201).json({ message: 'Response submitted successfully', response: newResponse });
    } catch (error) {
        res.status(500).json({ message: 'Error submitting response', error });
    }
};


// Controller to handle submitting responses
exports.submitResponse = async (req, res) => {
    const { formId } = req.params; // Get formId from URL
    const { responses } = req.body; // Get responses from request body

    try {
        // Validate the form ID
        const form = await Form.findById(formId);
        if (!form) {
            return res.status(404).json({ message: 'Form not found' });
        }

        // Validate responses against the form's fields
        const errors = [];
        form.fields.forEach((field) => {
            if (field.required && !responses.find((r) => r.fieldId === field._id.toString())) {
                errors.push(`Field "${field.label}" is required.`);
            }
        });

        if (errors.length > 0) {
            return res.status(400).json({ message: 'Validation errors', errors });
        }

        // Save the response to the database
        const response = new Response({
            formId,
            responses,
        });

        await response.save();

        res.status(201).json({ message: 'Response submitted successfully', response });
    } catch (error) {
        console.error('Error submitting response:', error);
        res.status(500).json({ message: 'Error submitting response', error });
    }
};

;