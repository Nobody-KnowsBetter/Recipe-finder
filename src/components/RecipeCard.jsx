import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const RecipeCard = ({ recipe }) => {
  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    const favs = JSON.parse(localStorage.getItem("favorites") || "[]");
    setFavorite(favs.some(fav => fav.id === recipe.id));
  }, [recipe.id]);

  
  const toggleFavorite = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const favs = JSON.parse(localStorage.getItem("favorites") || "[]");
    if (favorite) {
      const newFavs = favs.filter(fav => fav.id !== recipe.id);
      localStorage.setItem("favorites", JSON.stringify(newFavs));
      setFavorite(false);
    } else {
      favs.push(recipe);
      localStorage.setItem("favorites", JSON.stringify(favs));
      setFavorite(true);
    }
    window.dispatchEvent(new Event("favoritesUpdated"));
  };

  return (
    <Link to={`/recipe/${recipe.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <div style={{
          width: 280,
          margin: 16,
          border: "1px solid #ddd",
          borderRadius: 12,
          overflow: "hidden",
          boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
          backgroundColor: "#fff",
          cursor: 'pointer',
          transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
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
            <h3 style={{ fontSize: "1.1rem", minHeight: '3.3em', margin: '0 0 8px 0' }}>{recipe.title}</h3>
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
                  color: favorite ? "gold" : "#ccc",
                  transition: "color 0.3s ease"
                }}
                title={favorite ? "Remove from favorites" : "Add to favorites"}
              >
                {favorite ? "★" : "☆"}
              </button>
            </div>
            <p style={{ fontSize: 14, color: "#555", marginTop: 8 }}>
              Ready in {recipe.readyInMinutes} mins
            </p>
          </div>
        </div>
    </Link>
  );
};

export default RecipeCard;
