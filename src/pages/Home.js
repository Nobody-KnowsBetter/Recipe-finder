import React, { useState } from "react";
import SearchBar from "../components/SearchBar";
import RecipeSection from "../components/RecipeSection";

const categories = [
  { title: "Italian", query: "cuisine=italian" },
  { title: "Vegan", query: "diet=vegan" },
  { title: "Desserts", query: "type=dessert" },
  { title: "Breakfast", query: "type=breakfast" },
  { title: "Healthy", query: "diet=healthy" },
  { title: "Quick & Easy", query: "maxReadyTime=20" },
  { title: "Gluten Free", query: "intolerances=gluten" },
];

const Home = () => {
  const [searchResults, setSearchResults] = useState(null);

  return (
    <div style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}>
      {/* Hero Section */}
      <section
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1350&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          color: "white",
          padding: "5rem 2rem",
          textAlign: "center",
          borderRadius: "0 0 50% 50% / 20% 20% 80% 80%",
          boxShadow: "inset 0 0 0 1000px rgba(0,0,0,0.5)",
          marginBottom: "3rem",
        }}
      >
        <h1 style={{ fontSize: "3rem", marginBottom: "1rem", fontWeight: "900", textShadow: "2px 2px 6px rgba(0,0,0,0.7)" }}>
          Discover Delicious Recipes
        </h1>
        <p style={{ fontSize: "1.25rem", marginBottom: "2rem", fontWeight: "500", textShadow: "1px 1px 4px rgba(0,0,0,0.6)" }}>
          Search, explore, and enjoy your favorite dishes from around the world.
        </p>
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <SearchBar setSearchResults={setSearchResults} />
        </div>
      </section>

      {/* Search Results Section */}
      {searchResults ? (
        <RecipeSection
          title={`Search Results for "${decodeURIComponent(searchResults.query.replace("query=", ""))}"`}
          query={searchResults.query}
          isSearch
          searchResults={searchResults}
        />
      ) : (
        <>
          {/* Mostly Viewed */}
          <RecipeSection title="🔥 Mostly Viewed Recipes" query="sort=popularity" />

          {/* Top Rated */}
          <RecipeSection title="⭐ Top Rated Recipes" query="sort=healthiness" />

          {/* Category Sections */}
          <div style={{ padding: "0 1rem" }}>
            <h2 style={{ textAlign: "center", margin: "3rem 0 1rem" }}>
              Explore by Category
            </h2>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                gap: "1.5rem",
              }}
            >
              {categories.map((cat) => (
                <div
                  key={cat.title}
                  style={{
                    flex: "1 1 280px",
                    maxWidth: 280,
                    borderRadius: 12,
                    overflow: "hidden",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                    backgroundColor: "#fff",
                    cursor: "pointer",
                    transition: "transform 0.3s ease",
                  }}
                  onClick={() => setSearchResults({ query: cat.query })}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "scale(1.05)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
                  }}
                >
                  <img
                    src={`https://source.unsplash.com/featured/?${cat.title},food`}
                    alt={cat.title}
                    style={{ width: "100%", height: 160, objectFit: "cover" }}
                  />
                  <div style={{ padding: "1rem", textAlign: "center" }}>
                    <h3 style={{ margin: 0, color: "#333" }}>{cat.title}</h3>
                    <p style={{ color: "#666", fontSize: "0.9rem", marginTop: 4 }}>
                      Click to explore {cat.title.toLowerCase()} recipes
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Footer spacing */}
      <div style={{ height: 60 }} />
    </div>
  );
};

export default Home;
