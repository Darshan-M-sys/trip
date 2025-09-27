import React, { useEffect, useState } from "react";
import axios from "axios";
import "./visitor.css";

const VisitorList = () => {
  const [visitors, setVisitors] = useState([]);

  useEffect(() => {
    const fetchVisitors = async () => {
      try {
        const response = await axios.get("http://localhost:5000/visitor");
        setVisitors(response.data.data);
      } catch (err) {
        console.error("Error fetching visitors:", err);
      }
    };
    fetchVisitors();
  }, []);

  return (
    <div className="visit visitors">
      {visitors.length === 0 ? (
        <p>No visitors uploaded yet.</p>
      ) : (
        visitors.map((visitor, index) => (
          <div key={index} className="visitor-container">
            <img src={visitor.image_url} alt={visitor.username} />
            <div>
              <h1>{visitor.username}</h1>
              <p>{visitor.experience}</p>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default VisitorList;
