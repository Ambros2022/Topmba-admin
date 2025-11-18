import React, { useState } from 'react';

const PasswordInput = ({ id, label, placeholder }) => {
  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisibility = () => {
    setPasswordShown(!passwordShown);
  };

  return (
    <div className="mb-3">
      <label htmlFor={id} className="form-label">{label}</label>
      <div className="input-group">
        <input
          type={passwordShown ? 'text' : 'password'}
          className="form-control"
          id={id}
          placeholder={placeholder} style={{ borderRight: 0 }}
        />
        <button
          type="button"
          className="btn btn-eye"
          onClick={togglePasswordVisibility}
          aria-label="Toggle password visibility"
        >
          <i className={`bi ${passwordShown ? 'bi-eye-slash' : 'bi-eye'}`}></i>
        </button>
      </div>
    </div>
  );
};

export default PasswordInput;
