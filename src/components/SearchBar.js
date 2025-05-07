import React, { useState } from "react";

const SearchBar = ({ setSearchResults }) => {
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      setSearchResults({ query: `query=${encodeURIComponent(query)}` });
    }
  };

  return (
    <form onSubmit={handleSearch} style={{ textAlign: "center", margin: "2rem 0" }}>
      <input
        type="text"
        placeholder="Search for recipes..."
        value={query}
        onChange={e => setQuery(e.target.value)}
        style={{ width: "60%", padding: "0.5rem", fontSize: "1rem" }}
      />
      <button type="submit" style={{ marginLeft: 10, padding: "0.5rem 1rem" }}>Search</button>
    </form>
  );
};

export default SearchBar;
