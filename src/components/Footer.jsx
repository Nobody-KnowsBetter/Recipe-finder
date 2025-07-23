import React from "react";

const Footer = () => (
  <footer style={{ background: "#222", color: "#fff", textAlign: "center", padding: "1rem" }}>
    &copy; {new Date().getFullYear()} RecipeFinder | Powered by Newton School of Technology
  </footer>
);

export default Footer;
