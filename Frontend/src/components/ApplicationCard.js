import React from "react";
import './ApplicationCard.css';

const ApplicationCard = ({ application }) => {
  return (
    <div className="application-card">
      <h4>{application.title}</h4>
      <p>{application.description}</p>
      <p>Status: {application.status}</p>
      <button className="view-button">View Details</button>
    </div>
  );
};

export default ApplicationCard;
