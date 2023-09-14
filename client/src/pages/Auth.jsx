import React, { useState } from 'react'
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { useCookies } from "react-cookie"

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
  const [errMsg, setErrMsg] = useState("");

  const [cookies, setCookies] = useCookies(["access_token"])

  const navigate = useNavigate();

  const handleLogin = async (e) => {

    e.preventDefault();

    if (!username || !password) {
      setErrMsg("Username and password are required.");
      return;
    }

    try {

      const response = await axios.post("http://localhost:3001/auth/login", {
        username,
        password,
      });
      
      setCookies("access_token", response.data.token);
      window.localStorage.setItem("userID", response.data.userId);

      navigate("/");

    } catch (error) {

      setErrMsg(error.response.data.error);

    }
  }

  return (
    <Form
      action="Login"
      errMsg={errMsg}
      username={username}
      setUsername={setUserName}
      password={password}
      setPassword={setPassword}
      handleAction={handleLogin}
    />
  )
}

const Register = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const handleRegister = async (e) => {

    e.preventDefault();

    if (!username || !password) {
      setErrMsg("Username and password are required.");
      return;
    }

    try {

      const result = await axios.post("http://localhost:3001/auth/register", {
        username,
        password,
      });

      setErrMsg(result.data.message);

    } catch (error) {

      setErrMsg(error.response.data.error);

    }

    console.log("Email: ", username);
    console.log("Password: ", password);

    setUserName("");
    setPassword("");

  }

  return (
    <Form
      action="Register"
      errMsg={errMsg}
      username={username}
      setUsername={setUserName}
      password={password}
      setPassword={setPassword}
      handleAction={handleRegister}
    />
  )
}

const Form = ({ action, errMsg, username, setUsername, password, setPassword, handleAction }) => {
  return (
    <div className="form-container">
      <form className="form" onSubmit={handleAction}>
        <h2>{action}</h2>
        {errMsg && <p>{errMsg}</p>}
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