import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import API_BASE_URL from "../config";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    try {
      // Use configured API URL
      const res = await axios.post(`${API_BASE_URL}/api/auth/register`, {
        username,
        email,
        password,
      });
      // Automatically log them in or ask to login. Let's redirect to login.
      navigate("/login");
    } catch (err) {
      console.error(err);
      const errorMessage = err.response?.data || err.message || "Something went wrong!";
      setError(errorMessage);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>Create Account</h2>
        <p style={styles.subtitle}>Join us and save your favorite recipes!</p>

        {error && <div style={styles.error}>{typeof error === 'string' ? error : 'Registration failed'}</div>}

        <form onSubmit={handleRegister} style={styles.form}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={styles.input}
            required
          />
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
            required
          />

          <button type="submit" style={styles.submitBtn}>
            Register
          </button>
        </form>

        <p style={styles.loginText}>
          Already have an account?{" "}
          <Link to="/login" style={styles.loginLink}>
            Log In here
          </Link>
        </p>
      </div>
    </div>
  );
};

const styles = {
  page: {
    minHeight: "calc(100vh - 64px)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    // Violet theme handled by global body style, but we can ensure transparency if needed
    padding: "1rem",
  },
  card: {
    background: "rgba(255, 255, 255, 0.1)", // Glassmorphism
    backdropFilter: "blur(10px)",
    padding: "2rem",
    borderRadius: 16,
    boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
    border: "1px solid rgba(255, 255, 255, 0.18)",
    maxWidth: 400,
    width: "100%",
    textAlign: "center",
    color: "#fff",
  },
  title: {
    marginBottom: 8,
    fontSize: "3rem",
    fontWeight: "400",
    color: "#d8b4fe",
  },
  subtitle: {
    marginBottom: 24,
    fontSize: "1.1rem",
    color: "#e0d0f5",
    fontFamily: "'Poppins', sans-serif"
  },
  error: {
    backgroundColor: "rgba(255, 0, 0, 0.2)",
    color: "#ffdddd",
    padding: "0.5rem",
    borderRadius: 6,
    marginBottom: 16,
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  input: {
    padding: "0.75rem 1rem",
    fontSize: "1rem",
    borderRadius: 8,
    border: "1px solid rgba(255,255,255,0.2)",
    backgroundColor: "rgba(255,255,255,0.05)",
    color: "#fff",
    outline: "none",
    width: "100%",
    boxSizing: 'border-box',
    background: "rgba(0, 0, 0, 0.4)",
    color: "white"
  },
  submitBtn: {
    backgroundColor: "#6d28d9",
    color: "#fff",
    padding: "0.75rem",
    borderRadius: 8,
    border: "none",
    fontWeight: "700",
    fontSize: "1.1rem",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
  loginText: {
    marginTop: 16,
    fontSize: "0.9rem",
    color: "#ccc",
  },
  loginLink: {
    color: "#d8b4fe",
    fontWeight: "600",
    textDecoration: "none",
  },
};

export default Register;
