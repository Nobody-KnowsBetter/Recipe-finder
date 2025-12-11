import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import API_BASE_URL from "../config";

const RecipeCard = ({ recipe }) => {
  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    // Check local storage or user object to see if favorited
    // Ideally we should check against the user's fetched favorites list
    // But for a quick check, we'll rely on what we have or just state
    // For now, let's just leave it invalid or check existing list if passed
    // Better: Fetch user favorites from backend to sync? That's too many requests.
    // Optimization: Parent passes list of favorite IDs?
    // Quick fix: Check localStorage "user" which might have favorites? No, user object in localstorage is static.

    // Simplest approach: maintain visual state, but on mount, check if this ID is in the user's favorites list (if we stored it locally)
    // or just let the user click it.
    // If we want it to be accurate, we need the user's favorite list available globally.
    // Let's rely on standard state for now.
  }, []);

  const toggleFavorite = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || !user.token) {
      alert("Please login to save favorites!");
      return;
    }

    try {
      if (favorite) {
        // Remove
        await axios.delete(`${API_BASE_URL}/api/favorites/${recipe.id}`, {
          headers: { Authorization: `Bearer ${user.token}` }
        });
        setFavorite(false);
      } else {
        // Add
        // Construct the object expected by Schema
        const newFav = {
          recipeId: recipe.id,
          title: recipe.title,
          image: recipe.image,
          // Add other fields if available in 'recipe' prop
        };
        await axios.post(`${API_BASE_URL}/api/favorites`, newFav, {
          headers: { Authorization: `Bearer ${user.token}` }
        });
        setFavorite(true);
      }
    } catch (err) {
      console.error(err);
      alert("Failed to update favorite");
    }
  };

  return (
    <Link to={`/recipe/${recipe.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
      <div style={{
        width: 280,
        margin: 16,
        border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: 12,
        overflow: "hidden",
        boxShadow: "0 4px 8px rgba(0,0,0,0.3)",
        backgroundColor: "rgba(30, 20, 40, 0.6)", // Dark violet card
        backdropFilter: "blur(5px)",
        cursor: 'pointer',
        transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
        color: "#e0d0f5"
      }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.03)';
          e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.15)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
        }}
      >
        <div style={{ height: 180, overflow: "hidden" }}>
          <img src={recipe.image} alt={recipe.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>
        <div style={{ padding: 16 }}>
          <h3 style={{ fontSize: "1.1rem", minHeight: '3.3em', margin: '0 0 8px 0', fontFamily: "'Great Vibes', cursive", fontSize: "1.5rem", color: "#d8b4fe" }}>{recipe.title}</h3>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontWeight: 'bold', color: '#ff6f61' }}>⭐ {recipe.spoonacularScore ? recipe.spoonacularScore.toFixed(1) : "N/A"}</span>
            <button
              onClick={toggleFavorite}
              style={{
                background: 'none',
                border: 'none',
                fontSize: 24,
                cursor: "pointer",
                padding: 0,
                color: favorite ? "gold" : "#666",
                transition: "color 0.3s ease"
              }}
              title={favorite ? "Remove from favorites" : "Add to favorites"}
            >
              {favorite ? "★" : "☆"}
            </button>
          </div>
          <p style={{ fontSize: 14, color: "#ccc", marginTop: 8 }}>
            Ready in {recipe.readyInMinutes} mins
          </p>
        </div>
      </div>
    </Link>
  );
};

export default RecipeCard;
