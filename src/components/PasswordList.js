import React from "react";

import "./PasswordList.css";

const PasswordList = (props) => {
  return (
    <div className="previous-passwords">
      <h3>Previous Passwords</h3>
      <ul>
        {props.passwordList.slice(0, 5).map((password, index) => (
          <li key={index}>{password}</li>
        ))}
      </ul>
    </div>
  );
};

export default PasswordList;
