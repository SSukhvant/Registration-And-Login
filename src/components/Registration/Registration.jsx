import React, { useState } from 'react';
import './Registration.css';

const Registration = () => {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    errors: {
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    let errors = values.errors;

    switch (name) {
      case 'name':
        errors.name = value.length < 1 ? 'Name is required!' : '';
        break;
      case 'email':
        errors.email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? '' : 'Email is invalid';
        break;
      case 'password':
        errors.password = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(value) ? '' : 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character';
        break;
      case 'confirmPassword':
        errors.confirmPassword = value !== values.password ? 'Passwords do not match' : '';
        break;
      default:
        break;
    }

    setValues({
      ...values,
      [name]: value,
      errors
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (formValid(values.errors)) {
      alert(JSON.stringify(values, null, 2));
    } else {
      alert('Please fill out the form correctly');
    }
  };

  const formValid = (errors) => {
    let valid = true;
    Object.values(errors).forEach((val) => val.length > 0 && (valid = false));
    Object.values(values).forEach((val) => val === '' && (valid = false));
    return valid;
  };

  return (
    <div className='container'>
    <form onSubmit={handleSubmit}>
    <h3>Registration Form</h3>
      <div className='form-input'>
        <label htmlFor="name">Name:</label>
        <input type="text" name="name" placeholder='Enter name' value={values.name} onChange={handleChange} />
        {values.errors.name.length > 0 && <span>{values.errors.name}</span>}
      </div>
      <div className='form-input'>
        <label htmlFor="email">Email:</label>
        <input type="email" name="email" placeholder='Enter email' value={values.email} onChange={handleChange} />
        {values.errors.email.length > 0 && <span>{values.errors.email}</span>}
      </div>
      <div className='form-input'>
        <label htmlFor="password">Password:</label>
        <input type="password" name="password" placeholder='Enter password' value={values.password} onChange={handleChange} />
        
      </div>
      {values.errors.password.length > 0 && <span>{values.errors.password}</span>}
      <div className='form-input'>
        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input type="text" name="confirmPassword" placeholder='Confirm password' value={values.confirmPassword} onChange={handleChange} />
        {values.errors.confirmPassword.length > 0 && <span>{values.errors.confirmPassword}</span>}
      </div>
      <div className='submit-btn'>
      <button type="submit" disabled={!formValid(values.errors)}>Submit</button>
      </div>
    </form>
    </div>
  );
};

export default Registration;
