import React from "react";

const Alert = (props) => {
  const capitalize = (word) => {
    const lowercase = word.toLowerCase();
    return lowercase.charAt(0).toUpperCase() + lowercase.slice(1);
  };
  return (
    <div style={{ height: "50px" }}>
      {props.alert && (
        <div
          className={`alert alert-${props.alert.type} alert-dismissible fade show`}
          role="alert"
        >
          <strong> {capitalize(props.alert.message)} </strong>
        </div>
      )}
    </div>
  );
};

export default Alert;
