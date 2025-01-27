import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import authService from "../services/authService";
import axios from "axios";

const FormResponses = () => {
    const { formId } = useParams();
    const [responses, setResponses] = useState([]);

    useEffect(() => {
        const fetchResponses = async () => {
            try {
                const token = authService.getToken();
                const { data } = await axios.get(`http://localhost:5000/api/form/${formId}/responses`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setResponses(data);
            } catch (error) {
                console.error("Error fetching responses", error);
            }
        };

        fetchResponses();
    }, [formId]);

    return (
        <div>
            <h1>Form Responses</h1>
            {responses.length === 0 ? (
                <p>No responses yet.</p>
            ) : (
                <ul>
                    {responses.map((response, index) => (
                        <li key={index}>
                            {response.responses.map((field) => (
                                <div key={field.fieldId}>
                                    <strong>{field.fieldId}:</strong> {field.value}
                                </div>
                            ))}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default FormResponses;
