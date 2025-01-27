import React, { useState, useEffect } from "react";
import axios from "axios";
import "./PublicForms.css"; // Import CSS file

const PublicForms = () => {
  const [forms, setForms] = useState([]);
  const [selectedForm, setSelectedForm] = useState(null);
  const [responses, setResponses] = useState({});

  useEffect(() => {
    const fetchForms = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/form/public");
        setForms(response.data.forms);
      } catch (error) {
        console.error("Error fetching forms:", error);
      }
    };

    fetchForms();
  }, []);

  const handleResponseChange = (fieldId, value) => {
    setResponses((prev) => ({ ...prev, [fieldId]: value }));
  };

  const handleSubmitResponse = async (formId) => {
    try {
      const payload = {
        formId,
        responses: Object.entries(responses).map(([fieldId, value]) => ({
          fieldId,
          value,
        })),
      };

      console.log("Submitting response payload:", payload);

      const response = await axios.post(
        `http://localhost:5000/api/form/${formId}/responses`,
        payload
      );
      alert("Response submitted successfully");
      setSelectedForm(null); // Reset selected form
      setResponses({}); // Reset responses
    } catch (error) {
      console.error("Error submitting response:", error);
    }
  };

  return (
    <div className="public-forms">
      <h1 className="forms-heading">Available Forms</h1>
      <div className="forms-container">
        {forms.map((form) => (
          <div className="form-card" key={form._id}>
            <h3 className="form-title">{form.title}</h3>
            <p className="form-description">{form.description}</p>
            <button
              className="respond-button"
              onClick={() => setSelectedForm(form)}
            >
              Respond to this form
            </button>
          </div>
        ))}
      </div>

      {selectedForm && (
        <div className="response-form">
          <h2 className="response-heading">Respond to {selectedForm.title}</h2>
          {selectedForm.fields.map((field) => (
            <div className="response-field" key={field._id}>
              <label>{field.label}</label>
              <input
                type={field.type}
                className="response-input"
                onChange={(e) => handleResponseChange(field._id, e.target.value)}
              />
            </div>
          ))}
          <button
            className="submit-button"
            onClick={() => handleSubmitResponse(selectedForm._id)}
          >
            Submit Response
          </button>
        </div>
      )}
    </div>
  );
};

export default PublicForms;
