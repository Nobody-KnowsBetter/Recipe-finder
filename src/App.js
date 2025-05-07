import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";


function App() {
  const [user, setUser] = React.useState(null);

  return (
    <Router>
      <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <Navbar user={user} setUser={setUser} />
        <main style={{ flex: 1, minHeight: "80vh" }}>
          <Routes>
            <Route path="/" element={user ? <Home /> : <Navigate to="/login" />} />
            <Route path="/login" element={<Login setUser={setUser} />} />
            <Route path="/register" element={<Register setUser={setUser} />} />
            <Route path="/favorites" element={user ? <Favorites /> : <Navigate to="/login" />} />

          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
