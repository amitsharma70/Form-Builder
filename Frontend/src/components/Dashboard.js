import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom"; // Import useHistory from react-router-dom for v5
import AuthContext from "../context/AuthContext";
import ApplicationForm from "./ApplicationForm";
import ApplicationList from "./ApplicationList";
import ApplicationCard from "./ApplicationCard";
import './dashbord.css';
import axios from "axios";

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [applications, setApplications] = useState([]);
  const history = useHistory(); // Initialize useHistory to navigate programmatically

  useEffect(() => {
    const fetchApplications = async () => {
      if (user && user.token) {
        try {
          const response = await axios.get("http://localhost:5000/api/applications/", {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          });
          setApplications(response.data);
        } catch (error) {
          console.error("Error fetching applications:", error);
        }
      }
    };

    if (user) {
      fetchApplications();
    }
  }, [user]);

  if (!user) return <div>Please login to access the dashboard.</div>;

  return (
    <div className="dashboard-container">
      <h2>Welcome, {user.name}</h2>

      {/* Display different content based on role */}
      {user.role === "initiator" && (
        <div>
          <h3>Your Applications</h3>
          <div className="applications-list">
            {applications.map((application) => (
              <ApplicationCard key={application._id} application={application} />
            ))}
          </div>
          <button
            className="new-application-button"
            onClick={() => history.push("/application-form")} // Use history.push() to navigate to the form
          >
            Create New Application
          </button>
        </div>
      )}

      {["reviewer", "approver"].includes(user.role) && (
        <div>
          <h3>All Applications</h3>
          <ApplicationList applications={applications} />
        </div>
      )}
    </div>
  );
};

export default Dashboard;
