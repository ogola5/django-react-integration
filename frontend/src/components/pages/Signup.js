import { useState } from 'react';
import "../styles/signup.css";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    business_name: '',
    business_owner: '',
    business_categories: '',
    nationality: '',
    contact: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/api/users/', formData);
      setFormData({
        email: '',
        username: '',
        business_name: '',
        business_owner: '',
        business_categories: '',
        nationality: '',
        contact: '',
        password: '',
      });
      navigate('/login');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="email">Email:</label>
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <label htmlFor="username">Username:</label>
      <input
        type="text"
        name="username"
        value={formData.username}
        onChange={handleChange}
        required
      />
      <label htmlFor="business_name">Business Name:</label>
      <input
        type="text"
        name="business_name"
        value={formData.business_name}
        onChange={handleChange}
        required
      />
      <label htmlFor="business_owner">Business Owner:</label>
      <input
        type="text"
        name="business_owner"
        value={formData.business_owner}
        onChange={handleChange}
        required
      />
      <label htmlFor="business_categories">Business Categories:</label>
      <input
        type="text"
        name="business_categories"
        value={formData.business_categories}
        onChange={handleChange}
        required
      />
      <label htmlFor="nationality">Nationality:</label>
      <input
        type="text"
        name="nationality"
        value={formData.nationality}
        onChange={handleChange}
        required
      />
      <label htmlFor="contact">Contact:</label>
      <input
        type="text"
        name="contact"
        value={formData.contact}
        onChange={handleChange}
        required
      />
      <label htmlFor="password">Password:</label>
      <input
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        required
      />
      <button type="submit">Signup</button>
    </form>
  );
};

export default Signup;



