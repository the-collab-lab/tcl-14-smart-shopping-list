import React from 'react';
import './input.css';

const Input = ({ attribute, handleChange, param }) => {
  return (
    <div>
      <input
        id={attribute.id}
        name={attribute.name}
        placeholder={attribute.placeholder}
        type={attribute.type}
        onChange={(e) => handleChange(e.target.value)}
        className={param ? 'input-error' : 'form-control'}
      />
    </div>
  );
};

export default Input;
