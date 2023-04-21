import React, { useState } from 'react';
import axios from 'axios';
import '../styles/payment.css';

function Payment() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Send a POST request to the Django API to create a new user
    try {
      const response = await axios.post('http://127.0.0.1:8000/backend/api/signup/', {
        firstname: firstName,
        lastname: lastName,
        username: username,
        password: password,
      });
      console.log(response);
      // Clear the form fields
      setFirstName('');
      setLastName('');
      setUsername('');
      setPassword('');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        First Name:
        <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
      </label>
      <br />
      <label>
        Last Name:
        <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
      </label>
      <br />
      <label>
        Username:
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      </label>
      <br />
      <label>
        Password:
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      <br />
      <button type="submit">Register</button>
    </form>
  );
}

export default Payment;


