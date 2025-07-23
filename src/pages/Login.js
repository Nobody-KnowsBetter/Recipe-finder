import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Login = ({ setUser }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (username.trim() && password.trim()) {
      setUser({ username });
      navigate("/");
    } else {
      setError("Please enter username and password.");
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>Welcome Back!</h2>
        <p style={styles.subtitle}>Log in to discover delicious recipes</p>
        {error && <div style={styles.error}>{error}</div>}
        <form onSubmit={handleLogin} style={styles.form}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={styles.input}
            autoFocus
          />
          <div style={{ position: "relative", width: "100%" }}>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ ...styles.input, paddingRight: 40 }}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={styles.showPassBtn}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? "" : ""}
            </button>
          </div>

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
    minHeight: "calc(100vh - 64px)", // Adjust if navbar height changes
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)",
    padding: "1rem",
  },
  card: {
    background: "#fff",
    padding: "2rem",
    borderRadius: 16,
    boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
    maxWidth: 400,
    width: "100%",
    textAlign: "center",
  },
  title: {
    marginBottom: 8,
    fontSize: "2rem",
    fontWeight: "700",
    color: "#333",
  },
  subtitle: {
    marginBottom: 24,
    fontSize: "1.1rem",
    color: "#666",
  },
  error: {
    backgroundColor: "#ffdddd",
    color: "#d8000c",
    padding: "0.5rem",
    borderRadius: 6,
    marginBottom: 16,
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    alignItems: "center",
    marginRight: "2.5rem",
    // marginLeft: "2rem",
    // padding: "0 1rem",
  },
  input: {
    padding: "0.75rem 1rem",
    fontSize: "1rem",
    borderRadius: 8,
    border: "1px solid #ccc",
    outline: "none",
    transition: "border-color 0.3s ease",
    width: "100%",
  },
  showPassBtn: {
    position: "absolute",
    right: 10,
    top: "50%",
    transform: "translateY(-50%)",
    background: "none",
    border: "none",
    cursor: "pointer",
    fontSize: "1.25rem",
    color: "#888",
  },
  submitBtn: {
    backgroundColor: "#ff6f61",
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
    color: "#555",
  },
  registerLink: {
    color: "#ff6f61",
    fontWeight: "600",
    textDecoration: "none",
  },
};

export default Login;
