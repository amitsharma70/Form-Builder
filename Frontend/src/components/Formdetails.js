// src/components/FormDetails.js
import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import authService from "../services/authService";
import axios from "axios";
import "./FormDetails.css";

const FormDetails = () => {
    const { id } = useParams(); // Get the form ID from the URL
    const [form, setForm] = useState(null);
    const [editing, setEditing] = useState(false);
    const [formData, setFormData] = useState({});
    const history = useHistory();

    useEffect(() => {
        const fetchForm = async () => {
            try {
                const token = authService.getToken();
                const response = await axios.get(`http://localhost:5000/api/form/${id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setForm(response.data.form);
                setFormData({
                    title: response.data.form.title,
                    description: response.data.form.description,
                    fields: response.data.form.fields,
                });
            } catch (error) {
                console.error("Error fetching form:", error);
            }
        };

        fetchForm();
    }, [id]);

    const handleEdit = async () => {
        try {
            const token = authService.getToken();
            await axios.put(`http://localhost:5000/api/form/${id}`, formData, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setEditing(false);
            alert("Form updated successfully");
        } catch (error) {
            console.error("Error updating form:", error);
        }
    };

    const handleDelete = async () => {
        try {
            const token = authService.getToken();
            await axios.delete(`http://localhost:5000/api/form/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            alert("Form deleted successfully");
            history.push("/myforms");
        } catch (error) {
            console.error("Error deleting form:", error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    if (!form) return <p className="loading">Loading...</p>;

    return (
        <div className="form-details-container">
            <h1 className="form-details-title">Form Details</h1>
            {editing ? (
                <div className="form-edit-section">
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className="form-input"
                        placeholder="Form Title"
                    />
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="form-textarea"
                        placeholder="Form Description"
                    />
                    <button onClick={handleEdit} className="form-button save-button">Save</button>
                </div>
            ) : (
                <div className="form-view-section">
                    <h3 className="form-view-title">{form.title}</h3>
                    <p className="form-view-description">{form.description}</p>
                </div>
            )}
            <div className="form-actions">
                <button onClick={() => setEditing(!editing)} className="form-button edit-button">
                    {editing ? "Cancel" : "Edit"}
                </button>
                <button onClick={handleDelete} className="form-button delete-button">Delete</button>
            </div>
        </div>
    );
};

export default FormDetails;
