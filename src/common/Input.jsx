import React from "react";

const Input = ({ name, label, value, onChange, errors, type }) => {
  return (
    <div className="form-group">
      {label ? <label htmlFor={name}>{label}</label> : null}
      <input
        value={value}
        onChange={onChange}
        name={name}
        type={type}
        className="form-control"
        placeholder={`Enter ${name}`}
      />
      {errors && <div className="alert alert-danger">{errors}</div>}
    </div>
  );
};

export default Input;
