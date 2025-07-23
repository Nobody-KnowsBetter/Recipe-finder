import React, { useEffect, useState } from "react";
import axios from "axios";
import RecipeCard from "./RecipeCard";
import Pagination from "./Pagination";


const RecipeSection = ({ title, query }) => {
  const [recipes, setRecipes] = useState([]);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  useEffect(() => {
    let cancel;
    const fetchRecipes = async () => {
      try {
        const offset = (page - 1) * 10;
        const url = `https://api.spoonacular.com/recipes/complexSearch?${query}&number=10&offset=${offset}&addRecipeInformation=true&apiKey=${process.env?.REACT_APP_SPOONACULAR}`;
        const res = await axios.get(url, { cancelToken: new axios.CancelToken(c => cancel = c) });
        console.log(res.data)
        setRecipes(res.data.results);
        setTotalResults(res.data.totalResults || 0);
      } catch (err) {
        if (axios.isCancel(err)) return;
        setRecipes([]);
      }
    };
    fetchRecipes();
    return () => cancel && cancel();
  }, [query, page]);

  if (!recipes.length) return null;

  return (
    <section style={{ margin: "2rem 0" }}>
      <h2 style={{ marginLeft: "2rem" }}>{title}</h2>
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
        {recipes.map(recipe => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
      {totalResults > 10 && (
        <Pagination
          currentPage={page}
          totalPages={Math.ceil(totalResults / 10)}
          onPageChange={setPage}
        />
      )}
    </section>
  );
};

export default RecipeSection;
