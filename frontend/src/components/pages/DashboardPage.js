import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/dashboard.css";

function DashboardPage() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/dashboard22/").then((response) => {
      setData(response.data);
    });
  }, []);

  return (
    <div className="container">
      <h1 className="title">Dashboard</h1>
      {Array.isArray(data) &&
        data.map((item) => (
          <div key={item.id} className="item">
            <p className="name">{item.name}</p>
            <p className="description">{item.description}</p>
          </div>
        ))}
    </div>
  );
}

export default DashboardPage;



