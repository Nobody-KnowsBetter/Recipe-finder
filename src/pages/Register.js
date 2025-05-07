import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = ({ setUser }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    if (username && password) {
      setUser({ username });
      navigate("/");
    } else {
      setError("Please enter username and password.");
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "2rem auto", padding: 20, border: "1px solid #ccc", borderRadius: 8 }}>
      <h2>Register</h2>
      {error && <div style={{ color: "red" }}>{error}</div>}
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          style={{ width: "100%", margin: "1rem 0" }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          style={{ width: "100%", margin: "1rem 0" }}
        />
        <button type="submit" style={{ width: "100%" }}>Register</button>
      </form>
      <div style={{ marginTop: 10 }}>
        <span>Already have an account? </span>
        <a href="/login">Login</a>
      </div>
    </div>
  );
};

export default Register;
