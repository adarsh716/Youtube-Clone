import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { login, register } from "../../actions/auth";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Login.css";
import { useNavigate } from 'react-router-dom'; // Import useNavigate

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Use useNavigate instead of history
  const [isActive, setIsActive] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });

  const handleRegisterClick = () => {
    setIsActive(true);
  };

  const handleLoginClick = () => {
    setIsActive(false);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(login(formData));
      toast.success("Login successful!");
      navigate("/"); // Use navigate instead of history.push
    } catch (error) {
      // If login fails, show a toast with an error message
      toast.error("Login failed. Please check your credentials.");
    }
  };

  const handleFormSubmitRegister = async (e) => {
    e.preventDefault();
    try {
      await dispatch(register(formData));
      toast.success("Registration successful!");
    } catch (error) {
      // If registration fails, show a toast with an error message
      toast.error("Registration failed. Please try again.");
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className={`container ${isActive ? "active" : ""}`} id="container">
      <div className="form-container sign-up">
        <form onSubmit={handleFormSubmitRegister}>
          <h1>Create Account</h1>
          <input type="text" placeholder="Name" name="name" value={formData.name} onChange={handleChange} />
          <input type="email" placeholder="Email" name="email" value={formData.email} onChange={handleChange} />
          <input type="password" placeholder="Password" name="password" value={formData.password} onChange={handleChange} />
          <button type="submit">Sign Up</button>
        </form>
      </div>
      <div className="form-container sign-in">
        <form onSubmit={handleFormSubmit}>
          <h1>Sign In</h1>
          <input type="email" placeholder="Email" name="email" value={formData.email} onChange={handleChange} />
          <input type="password" placeholder="Password" name="password" value={formData.password} onChange={handleChange} />
          <button type="submit">Sign In</button>
        </form>
      </div>
      <div className="toggle-container">
        <div className="toggle">
          <div className="toggle-panel toggle-left">
            <h1>Welcome Back!</h1>
            <p>Enter your personal details to use all site features</p>
            <button
              className={`hidden ${isActive ? "" : "active"}`}
              onClick={handleLoginClick}
              id="login"
            >
              Sign In
            </button>
          </div>
          <div className="toggle-panel toggle-right">
            <h1>Hello, Friend!</h1>
            <p>Register with your personal details to use all site features</p>
            <button
              className={`hidden ${isActive ? "active" : ""}`}
              onClick={handleRegisterClick}
              id="register"
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
      {/* Toast container for displaying messages */}
      <ToastContainer />
    </div>
  );
}

export default Login;
