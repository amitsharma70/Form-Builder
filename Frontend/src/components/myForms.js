import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import authService from "../services/authService";
import axios from "axios";

const MyForms = () => {
    const [forms, setForms] = useState([]);
    const history = useHistory();

    useEffect(() => {
        const fetchForms = async () => {
            try {
                const token = authService.getToken();
                const response = await axios.get("http://localhost:5000/api/form/user", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                console.log(response);
                
                setForms(response.data.forms);
            } catch (error) {
                console.error("Error fetching forms:", error);
            }
        };

        fetchForms();
    }, []);

    const handleViewFormDetails = (formId) => {
        history.push(`/form/${formId}`);
    };

    return (
        <div>
            <h1>My Forms</h1>
            <div>
                {forms.length > 0 ? (
                    forms.map((form) => (
                        <div key={form._id}>
                            <h3>{form.title}</h3>
                            <p>{form.description}</p>
                            <button onClick={() => handleViewFormDetails(form._id)}>
                                View Form
                            </button>
                        </div>
                    ))
                ) : (
                    <p>No forms created yet.</p>
                )}
            </div>
        </div>
    );
};

export default MyForms;
