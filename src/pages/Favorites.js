import React, { useEffect, useState } from "react";
import axios from "axios";
import RecipeCard from "../components/RecipeCard";
import API_BASE_URL from "../config";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const favs = JSON.parse(localStorage.getItem("favorites") || "[]");
    setFavorites(favs);
    const fetchFavorites = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user?.token) return;

        const res = await axios.get(`${API_BASE_URL}/api/favorites`, {
          headers: { Authorization: `Bearer ${user.token}` }
        });
        setFavorites(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchFavorites();
  }, []);

  return (
    <div style={styles.page}>
      <h2 style={styles.title}>Your Favorite Recipes</h2>
      {loading ? (
        <p style={{ color: '#fff' }}>Loading...</p>
      ) : favorites.length === 0 ? (
        <p style={{ color: '#ddd' }}>No favorites yet. Go explore!</p>
      ) : (
        <div style={styles.grid}>
          {favorites.map((recipe) => (
            // Adapting RecipeCard props if necessary. Assuming RecipeCard takes 'recipe' object.
            // Our backend stores { recipeId, title, image, ... }
            // We might need to map it back to what RecipeCard expects, likely { id: recipeId, ... }
            <RecipeCard key={recipe.recipeId} recipe={{ ...recipe, id: recipe.recipeId }} />
          ))}
        </div>
      )}
    </div>
  );
};

const styles = {
  page: {
    padding: "2rem",
    minHeight: "80vh",
    textAlign: "center",
  },
  title: {
    fontSize: "3rem",
    marginBottom: "2rem",
    color: "#d8b4fe", // Light violet
  },
  grid: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "2rem",
  },
};

export default Favorites;
