// RegistrationForm.js
import React, { useReducer } from 'react';
import { reducer, initialState } from './reducer';

const RegistrationForm = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { step, formData, isSubmitted, errors } = state;

  const validateStep = () => {
    const newErrors = {};
    if (step === 1) {
      if (!formData.name) newErrors.name = 'Name is required';
      if (!formData.email) newErrors.email = 'Email is required';
    }
    if (step === 2) {
      if (!formData.username) newErrors.username = 'Username is required';
      if (!formData.password) newErrors.password = 'Password is required';
    }
    dispatch({ type: 'SET_ERRORS', errors: newErrors });
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) dispatch({ type: 'NEXT_STEP' });
  };

  const handlePrevious = () => dispatch({ type: 'PREVIOUS_STEP' });

  const handleSubmit = () => dispatch({ type: 'SUBMIT_FORM' });

  const handleChange = (e) => {
    dispatch({
      type: 'UPDATE_FIELD',
      field: e.target.name,
      value: e.target.value
    });
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <>
            <h2>Step 1: Personal Details</h2>
            <input name="name" placeholder="Name" value={formData.name} onChange={handleChange} />
            {errors.name && <p>{errors.name}</p>}
            <input name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
            {errors.email && <p>{errors.email}</p>}
            <button onClick={handleNext}>Next</button>
          </>
        );
      case 2:
        return (
          <>
            <h2>Step 2: Account Details</h2>
            <input name="username" placeholder="Username" value={formData.username} onChange={handleChange} />
            {errors.username && <p>{errors.username}</p>}
            <input name="password" type="password" placeholder="Password" value={formData.password} onChange={handleChange} />
            {errors.password && <p>{errors.password}</p>}
            <button onClick={handlePrevious}>Back</button>
            <button onClick={handleNext}>Next</button>
          </>
        );
      case 3:
        return (
          <>
            <h2>Step 3: Review & Submit</h2>
            <pre>{JSON.stringify(formData, null, 2)}</pre>
            <button onClick={handlePrevious}>Back</button>
            <button onClick={handleSubmit}>Submit</button>
          </>
        );
      default:
        return <h2>Unknown Step</h2>;
    }
  };

  return (
    <div>
      <h1>Multi-Step Registration</h1>
      <p>Step {step} of 3</p>
      {isSubmitted ? (
        <div>
          <h2>Form Submitted Successfully!</h2>
          <button onClick={() => dispatch({ type: 'RESET_FORM' })}>Reset</button>
        </div>
      ) : (
        renderStep()
      )}
    </div>
  );
};

export default RegistrationForm;