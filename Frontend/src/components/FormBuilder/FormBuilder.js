// src/components/FormBuilder/FormBuilder.js
import React, { useState } from 'react';
import api from '../../services/api';
import './FormBuilder.css'; // Importing the external CSS file

const FormBuilder = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [fields, setFields] = useState([]);
  const [newField, setNewField] = useState({ label: '', type: 'text', required: false });

  const addField = () => {
    setFields([...fields, newField]);
    setNewField({ label: '', type: 'text', required: false });
  };

  const createForm = async () => {
    try {
      await api.post('http://localhost:5000/api/form/', { title, description, fields });
      alert('Form created');
      setTitle('');
      setDescription('');
      setFields([]);
    } catch (error) {
      alert('Failed to create form');
    }
  };

  return (
    <div className="form-builder">
      <h2 className="form-builder-title">Create a Form</h2>
      <input
        type="text"
        placeholder="Form Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="form-input"
      />
      <textarea
        placeholder="Form Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="form-textarea"
      ></textarea>

      <div className="add-field-section">
        <h3 className="section-title">Add Field</h3>
        <input
          type="text"
          placeholder="Label"
          value={newField.label}
          onChange={(e) => setNewField({ ...newField, label: e.target.value })}
          className="form-input"
        />
        <select
          value={newField.type}
          onChange={(e) => setNewField({ ...newField, type: e.target.value })}
          className="form-select"
        >
          <option value="text">Text</option>
          <option value="dropdown">Dropdown</option>
          <option value="checkbox">Checkbox</option>
          <option value="radio">Radio</option>
        </select>
        <label className="required-label">
          <input
            type="checkbox"
            checked={newField.required}
            onChange={(e) => setNewField({ ...newField, required: e.target.checked })}
            className="required-checkbox"
          />
          Required
        </label>
        <button onClick={addField} className="add-field-button">Add Field</button>
      </div>

      <div className="form-preview">
        <h3 className="section-title">Form Preview</h3>
        {fields.map((field, index) => (
          <div key={index} className="preview-field">
            <p>
              {field.label} ({field.type}) {field.required && <span className="required-asterisk">*</span>}
            </p>
          </div>
        ))}
      </div>

      <button onClick={createForm} className="create-form-button">Create Form</button>
    </div>
  );
};

export default FormBuilder;
