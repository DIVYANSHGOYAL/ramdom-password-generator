import React from "react";
import "./Alert.css";

const Alert = ({ message, onClose }) => {
  return (
    <div className="alert-overlay">
      <div className="alert-box">
        <p className="alert-message">{message}</p>
        <button className="alert-close" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default Alert;
