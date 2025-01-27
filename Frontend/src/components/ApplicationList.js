import React, { useEffect, useState } from "react";
import axios from "axios";
import './applist.css';

const ApplicationList = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch applications when component is mounted
  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/api/applications/");
        setApplications(data);
      } catch (error) {
        console.error("Error fetching applications:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchApplications();
  }, []);

  // Handle application status update
  const handleStatusUpdate = async (applicationId, newStatus, remark) => {
    try {
      const { data } = await axios.put(
        `http://localhost:5000/api/applications/${applicationId}`,
        { status: newStatus, remark }
      );
      setApplications((prevApps) =>
        prevApps.map((app) =>
          app._id === applicationId ? { ...app, status: data.status } : app
        )
      );
    } catch (error) {
      console.error("Error updating application status:", error);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h3>Applications</h3>
      {applications.length === 0 ? (
        <p>No applications to display.</p>
      ) : (
        applications.map((app) => (
          <div key={app._id} style={{ marginBottom: "1rem", border: "1px solid #ddd", padding: "1rem" }}>
            <p><strong>Details:</strong> {app.details}</p>
            <p><strong>Status:</strong> {app.status}</p>
            <p><strong>Reviewer Status:</strong> {app.reviewerStatus}</p>
            <p><strong>Approver Status:</strong> {app.approverStatus}</p>

            {/* Display remarks */}
            <div>
              <strong>Remarks: </strong>
              {app.reviewerRemarks && app.reviewerRemarks.map((r, index) => (
                <div key={index}>
                  <p>{r.comment} (by {r.reviewer} - {r.role})</p>
                </div>
              ))}
              {app.approverRemarks && app.approverRemarks.map((r, index) => (
                <div key={index}>
                  <p>{r.comment} (by {r.reviewer} - {r.role})</p>
                </div>
              ))}
            </div>

            {/* Show status update form for reviewer/approver */}
            {(app.status === "Pending" || app.status === "Under Review") && (
              <div>
                <h4>Update Status</h4>
                <button onClick={() => handleStatusUpdate(app._id, "Approved", "Reviewed and approved")}>
                  Approve
                </button>
                <button onClick={() => handleStatusUpdate(app._id, "Rejected", "Rejected due to...")}>
                  Reject
                </button>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default ApplicationList;
