import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const Login = ({ setUser }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      // Use local server URL, assuming proxy or direct CORS
      const res = await axios.post("http://localhost:5000/api/auth/login", { username, password });
      setUser(res.data);
      localStorage.setItem("user", JSON.stringify(res.data)); // Persist login
      navigate("/");
    } catch (err) {
      setError(err.response?.data || "Something went wrong!");
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>Welcome Back!</h2>
        <p style={styles.subtitle}>Log in to discover delicious recipes</p>

        {error && <div style={styles.error}>{typeof error === 'string' ? error : 'Login failed'}</div>}

        <form onSubmit={handleLogin} style={styles.form}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
            Log In
          </button>
        </form>

        <p style={styles.registerText}>
          Don't have an account?{" "}
          <Link to="/register" style={styles.registerLink}>
            Register here
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
    // Violet-Blackish Theme Background is already in index.css, mostly this overlay will be transparent or matching
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
    fontSize: "3rem", // Great Vibes is smaller, needs size
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
    boxSizing: 'border-box'
  },
  submitBtn: {
    backgroundColor: "#6d28d9", // Violet button
    color: "#fff",
    padding: "0.75rem",
    borderRadius: 8,
    border: "none",
    fontWeight: "700",
    fontSize: "1.1rem",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
  registerText: {
    marginTop: 16,
    fontSize: "0.9rem",
    color: "#ccc",
  },
  registerLink: {
    color: "#d8b4fe",
    fontWeight: "600",
    textDecoration: "none",
  },
};

export default Login;
