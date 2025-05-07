import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ user, setUser }) => {
  const navigate = useNavigate();

  const [favCount, setFavCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const favs = JSON.parse(localStorage.getItem("favorites") || "[]");
    setFavCount(favs.length);
  }, []);

  useEffect(() => {
    // Apply dark mode class to body
    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [darkMode]);

  const handleLogout = () => {
    setUser(null);
    navigate("/login");
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
      setMenuOpen(false);
    }
  };

  return (
    <nav style={styles.nav}>
      <div style={styles.logoSection}>
        <Link to="/" style={styles.logo}>
          🍽️ RecipeFinder
        </Link>
        <button
          style={styles.menuButton}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          ☰
        </button>
      </div>

      <div style={{ ...styles.navLinks, ...(menuOpen ? styles.navLinksOpen : {}) }}>
        <form onSubmit={handleSearchSubmit} style={styles.searchForm}>
          <input
            type="text"
            placeholder="Search recipes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={styles.searchInput}
          />
          <button type="submit" style={styles.searchButton}>🔍</button>
        </form>

        {user ? (
          <>
            <Link to="/favorites" style={styles.favoritesLink}>
              Favorites
              {favCount > 0 && (
                <span style={styles.favBadge}>{favCount}</span>
              )}
            </Link>

            <div style={styles.profileDropdown}>
              <button style={styles.profileButton} onClick={() => setMenuOpen(false)}>
                {user.username} ▼
              </button>
              <div style={styles.dropdownContent}>
                <Link to="/profile" onClick={() => setMenuOpen(false)}>Profile</Link>
                <Link to="/favorites" onClick={() => setMenuOpen(false)}>Favorites</Link>
                <button onClick={handleLogout} style={styles.logoutButton}>Logout</button>
              </div>
            </div>

            <button
              onClick={() => setDarkMode(!darkMode)}
              style={styles.darkModeToggle}
              title="Toggle dark mode"
            >
              {darkMode ? "🌞" : "🌙"}
            </button>
          </>
        ) : (
          <>
            <Link to="/login" style={styles.link} onClick={() => setMenuOpen(false)}>Login</Link>
            <Link to="/register" style={styles.link} onClick={() => setMenuOpen(false)}>Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

const styles = {
  nav: {
    background: "#333",
    color: "#fff",
    padding: "0.75rem 1rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
    position: "sticky",
    top: 0,
    zIndex: 1000,
  },
  logoSection: {
    display: "flex",
    alignItems: "center",
  },
  logo: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: "1.5rem",
    textDecoration: "none",
  },
  menuButton: {
    fontSize: "1.5rem",
    background: "none",
    border: "none",
    color: "#fff",
    marginLeft: "1rem",
    cursor: "pointer",
    display: "none",
  },
  navLinks: {
    display: "flex",
    alignItems: "center",
    gap: "1rem",
  },
  navLinksOpen: {
    display: "block",
    width: "100%",
    marginTop: "0.5rem",
  },
  searchForm: {
    display: "flex",
    alignItems: "center",
  },
  searchInput: {
    padding: "0.3rem 0.5rem",
    borderRadius: "4px 0 0 4px",
    border: "none",
    fontSize: "1rem",
  },
  searchButton: {
    padding: "0.3rem 0.6rem",
    borderRadius: "0 4px 4px 0",
    border: "none",
    cursor: "pointer",
    backgroundColor: "#ff6f61",
    color: "#fff",
  },
  favoritesLink: {
    position: "relative",
    color: "#fff",
    textDecoration: "none",
    fontWeight: "600",
  },
  favBadge: {
    position: "absolute",
    top: "-6px",
    right: "-10px",
    background: "red",
    borderRadius: "50%",
    padding: "2px 6px",
    fontSize: "0.75rem",
    fontWeight: "bold",
    color: "white",
  },
  profileDropdown: {
    position: "relative",
    display: "inline-block",
  },
  profileButton: {
    background: "none",
    border: "none",
    color: "#fff",
    fontWeight: "600",
    cursor: "pointer",
    padding: "0.3rem 0.6rem",
  },
  dropdownContent: {
    display: "none",
    position: "absolute",
    backgroundColor: "#444",
    minWidth: "140px",
    boxShadow: "0px 8px 16px 0px rgba(0,0,0,0.2)",
    zIndex: 1,
    borderRadius: 4,
    marginTop: 4,
  },
  logoutButton: {
    background: "none",
    border: "none",
    color: "#fff",
    padding: "0.5rem 1rem",
    width: "100%",
    textAlign: "left",
    cursor: "pointer",
  },
  darkModeToggle: {
    marginLeft: "1rem",
    background: "none",
    border: "none",
    color: "#fff",
    fontSize: "1.25rem",
    cursor: "pointer",
  },
  link: {
    color: "#fff",
    textDecoration: "none",
    fontWeight: "600",
  },
};

// Dropdown show/hide with hover using React state
// For simplicity, add this small enhancement:
export default Navbar;
