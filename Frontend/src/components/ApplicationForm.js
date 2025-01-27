import React, { useState } from "react";
import axios from "axios";
import './appform.css';

const ApplicationForm = ({ user }) => { // Ensure user is passed down as a prop, or use context
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [position, setPosition] = useState("");
  const [details, setDetails] = useState("");
  const [cv, setCv] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Creating FormData object to send the application details and file
    const formData = new FormData();
    formData.append("details", details); // Use the state variable "details"
    formData.append("cv", cv);           // Use the state variable "cv"

    try {
      // Sending the request with the Authorization header
      const response = await axios.post(
        "http://localhost:5000/api/applications", 
        formData,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,  // Add the token here, make sure it's available
            "Content-Type": "multipart/form-data"   // Important for sending files
          },
        }
      );
      console.log("Application submitted:", response.data);
    } catch (error) {
      console.error("Error submitting application:", error);
    }
  };

  return (
    <div className="application-form-container">
      <h2>Job Application</h2>
      <form onSubmit={handleSubmit} className="application-form">
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Position Applied For"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
          required
        />
        <textarea
          placeholder="Why do you want this job?"
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          required
        />
        <input
          type="file"
          onChange={(e) => setCv(e.target.files[0])}
          required
        />
        <button type="submit">Submit Application</button>
      </form>
    </div>
  );
};

export default ApplicationForm;
