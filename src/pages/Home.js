import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
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
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const search = params.get("search");
    if (search) {
      setSearchResults({ query: `query=${search}` });
    }
  }, [location.search]);

  return (
    <div style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}>
      { }
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
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center"
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

      { }
      {searchResults ? (
        <RecipeSection
          title={`Search Results for "${decodeURIComponent(searchResults.query.replace("query=", ""))}"`}
          query={searchResults.query}
          isSearch
          searchResults={searchResults}
        />
      ) : (
        <>
          { }
          <RecipeSection title="Mostly Viewed Recipes" query="sort=popularity" />

          { }
          <RecipeSection title="Top Rated Recipes" query="sort=healthiness" />

          { }
          { }
        </>
      )}

      { }
      <div style={{ height: 60 }} />
    </div>
  );
};

export default Home;
