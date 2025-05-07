import React, { useState, useEffect } from "react";

const RecipeCard = ({ recipe }) => {
  // Check if recipe is already in favorites
  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    const favs = JSON.parse(localStorage.getItem("favorites") || "[]");
    setFavorite(favs.some(fav => fav.id === recipe.id));
  }, [recipe.id]);

  const toggleFavorite = () => {
    const favs = JSON.parse(localStorage.getItem("favorites") || "[]");
    if (favorite) {
      // Remove from favorites
      const newFavs = favs.filter(fav => fav.id !== recipe.id);
      localStorage.setItem("favorites", JSON.stringify(newFavs));
      setFavorite(false);
    } else {
      // Add to favorites
      favs.push(recipe);
      localStorage.setItem("favorites", JSON.stringify(favs));
      setFavorite(true);
    }
    // Optionally, you can dispatch an event or use context to update Navbar count
    window.dispatchEvent(new Event("favoritesUpdated"));
  };

  return (
    <div style={{
      width: 280,
      margin: 16,
      border: "1px solid #ccc",
      borderRadius: 12,
      overflow: "hidden",
      boxShadow: "0 2px 8px #eee",
      backgroundColor: "#fff"
    }}>
      <div style={{ height: 160, overflow: "hidden" }}>
        <img src={recipe.image} alt={recipe.title} style={{ width: "100%", objectFit: "cover" }} />
      </div>
      <div style={{ padding: 12 }}>
        <h3 style={{ fontSize: "1.1rem" }}>{recipe.title}</h3>
        <div>
          <span>⭐ {recipe.spoonacularScore ? recipe.spoonacularScore.toFixed(1) : "N/A"}</span>
          <button
            onClick={toggleFavorite}
            style={{
              float: "right",
              background: favorite ? "gold" : "#eee",
              border: "none",
              borderRadius: "50%",
              width: 32,
              height: 32,
              fontSize: 18,
              cursor: "pointer",
              transition: "background-color 0.3s ease"
            }}
            title={favorite ? "Remove from favorites" : "Add to favorites"}
          >
            {favorite ? "★" : "☆"}
          </button>
        </div>
        <p style={{ fontSize: 14, color: "#555" }}>
          {recipe.summary ? recipe.summary.replace(/<[^>]+>/g, '').slice(0, 80) + "..." : ""}
        </p>
      </div>
    </div>
  );
};

export default RecipeCard;
