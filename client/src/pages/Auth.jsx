import React, { useState } from 'react'
import axios from "axios"
import {useNavigate} from "react-router-dom"

export default function Auth() {
  return (
    <div className="auth">
      <Login />
      <Register />
    </div>
  )
}

const Login = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3001/auth/login",{
        username,
        password,
      });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Form 
    action="Login"
    username={username}
    setUsername={setUserName}
    password={password}
    setPassword={setPassword}
    handleAction={handleRegister}
    />
  )
}

const Register = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:3001/auth/register",{
        username,
        password,
      });
      console.log("User created successfully!");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Form 
    action="Register"
    username={username}
    setUsername={setUserName}
    password={password}
    setPassword={setPassword}
    handleAction={handleRegister}
    />
  )
}

const Form = ({ action, username, setUsername, password, setPassword, handleAction }) => {
  return (
    <div className="form-container">
      <form className="form" onSubmit={handleAction}>
        <h2>{action}</h2>
        <div>
          <label htmlFor="username" className="username-label">Username:</label>
          <input
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password" className="password-label">Password:</label>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">{action}</button>
      </form>
    </div>
  )
}