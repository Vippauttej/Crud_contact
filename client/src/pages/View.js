import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "./View.css";

const View = () => {
  const [user, setUser] = useState({});

  const { id } = useParams();
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/remove/${id}`)
      .then((resp) => setUser({ ...resp.data[0] }));
  }, [id]);

  return (
    <div style={{ marginTop: "150px" }}>
      <div className="card">
        <div className="container">
          <strong>ID:</strong>
          <span>{id}</span>
          <br />
          <strong>Name:</strong>
          <span>{user.name}</span>
          <br />
          <strong>Email:</strong>
          <span>{user.email}</span>
          <br />
          <strong>Contact:</strong>
          <span>{user.contact}</span>
          <br />
          <br />
          <Link to="/">
            <div className="btn btn-wait">Go Back</div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default View;
