import React, { useEffect, useState } from 'react'

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
  const [isValid, setIsValid] = useState(false);

  const handleChange = (e) => {
    const {name, value} = e.target;
    setValues({...values, [name]: value})
  }

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const handleFormValidation = () => {
    let errors = {...values.errors};
    let isValid = true;
    if(!values.name){
        errors.name = "Name is required!";
        isValid = false;
    }

    if(!values.email){
        errors.email = "Email is required!";
        isValid = false;
    } else if(!/\S+@\S+\.\S+/.test(values.email)){
        errors.email = "Email is invalid!";
        isValid = false;
    }

    if(!values.password){
        errors.password = "Password is required!";
        isValid = false;
    } else if(!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}/.test(values.password)){
        errors.password = "Password must contain at least one uppercase letter, one number, and one special character";
        isValid = false;
    }
    if(!values.confirmPassword){
        errors.confirmPassword = "Confirm password is required!";
        isValid = false;
    } else if(values.password !== values.confirmPassword){
        errors.confirmPassword = "Password do not match!";
        isValid = false;
    }
    setValues({ ...values, errors: errors });
    setIsValid(isValid)
    return isValid;
  }

  return (
    <div className='container'>
    <form onSubmit={handleSubmit}>
    <div className='form-input'>
    <label>Name:</label>
    <input type="text" placeholder="Enter name" name="name" value={values.name} onChange={handleChange}/>
    {values.errors.name && <span>{values.errors.name}</span>}
    </div>

    <div className='form-input'>
    <label>Email:</label>
    <input type="email" placeholder="Enter email" name="email" value={values.email} onChange={handleChange}/>
    {values.errors.email && <span>{values.errors.email}</span>}
    </div>

    <div className='form-input'>
    <label>Password:</label>
    <input type="text" placeholder="Enter password" name="password" value={values.password} onChange={handleChange}/>
    {values.errors.password && <span>{values.errors.password}</span>}
    </div>

    <div className='form-input'>
    <label>Confirm Password:</label>
    <input type="text" placeholder="Confirm password" name="confirmPassword" value={values.confirmPassword} onChange={handleChange}/>
    {values.errors.confirmPassword && <span>{values.errors.confirmPassword}</span>}
    </div>
    
    <div className='submit-btn'>
    <button type='button' disabled={!isValid}>Submit</button>
    </div>
    </form>
    </div>
  )
}

export default Registration