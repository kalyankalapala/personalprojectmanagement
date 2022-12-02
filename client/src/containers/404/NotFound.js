import React from "react";
import "./notfound.css";
import { Link } from "react-router-dom";
const NotFound = () => {
  return (
    <section>
      <div className="lost-container">
        <h1>404 - Page not found</h1>
        <h2>The page you requested cannot be found</h2>
        <Link to="/" className="btn btn-medium btn-success">
          Back
        </Link>
      </div>
    </section>
  );
};

export default NotFound;
