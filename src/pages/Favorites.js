import React, { useEffect, useState } from "react";
import RecipeCard from "../components/RecipeCard";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const favs = JSON.parse(localStorage.getItem("favorites") || "[]");
    setFavorites(favs);
  }, []);

  if (favorites.length === 0)
    return (
      <div style={{ textAlign: "center", marginTop: 50 }}>
        <h2>No favorites yet!</h2>
        <p>Start adding your favorite recipes by clicking the star icon.</p>
      </div>
    );

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Your Favorite Recipes</h2>
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
        {favorites.map(recipe => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </div>
  );
};

export default Favorites;
