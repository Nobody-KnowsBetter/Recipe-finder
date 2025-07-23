import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';


const RecipeDetail = () => {
   
    const { id } = useParams(); 
    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    
    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                setLoading(true);
               
                const apiKey = process.env.REACT_APP_SPOONACULAR || 'YOUR_FALLBACK_API_KEY';
                const response = await axios.get(
                    `https://api.spoonacular.com/recipes/${id}/information?apiKey=${apiKey}`
                );
                setRecipe(response.data);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching recipe details:", err);
                setError('Could not fetch recipe details. Please check your API key or try again later.');
                setLoading(false);
            }
        };

        if (id) {
            fetchRecipe();
        }
    }, [id]);

    if (loading) {
        return <div style={styles.container}>Loading recipe...</div>;
    }

    if (error) {
        return <div style={styles.container}>{error}</div>;
    }


    if (!recipe) {
        return <div style={styles.container}>Recipe not found.</div>;
    }


    return (
        <div style={styles.container}>
            <h1 style={styles.title}>{recipe.title}</h1>
            <img src={recipe.image} alt={recipe.title} style={styles.image} />
            
            <div style={styles.details}>
                <span><strong>Ready in:</strong> {recipe.readyInMinutes} minutes</span>
                <span><strong>Servings:</strong> {recipe.servings}</span>
                <span><strong>Health Score:</strong> {recipe.healthScore}%</span>
            </div>

            <div style={styles.section}>
                <h2 style={styles.sectionTitle}>Summary</h2>
                {}
                <p style={styles.summary} dangerouslySetInnerHTML={{ __html: recipe.summary }}></p>
            </div>

            <div style={styles.section}>
                <h2 style={styles.sectionTitle}>Ingredients</h2>
                <ul style={styles.list}>
                    {recipe.extendedIngredients.map((ingredient) => (
                        <li key={ingredient.id}>{ingredient.original}</li>
                    ))}
                </ul>
            </div>

            <div style={styles.section}>
                <h2 style={styles.sectionTitle}>Instructions</h2>
                {}
                <div style={styles.instructions} dangerouslySetInnerHTML={{ __html: recipe.instructions }}></div>
            </div>
        </div>
    );
};


const styles = {
    container: {
        maxWidth: '800px',
        margin: '2rem auto',
        padding: '2rem',
        backgroundColor: '#fff',
        borderRadius: '12px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    },
    title: {
        textAlign: 'center',
        marginBottom: '1.5rem',
        color: '#333',
    },
    image: {
        width: '100%',
        height: 'auto',
        borderRadius: '12px',
        marginBottom: '1.5rem',
    },
    details: {
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1rem',
        marginBottom: '2rem',
        backgroundColor: '#f8f9fa',
        padding: '1rem',
        borderRadius: '8px',
    },
    section: {
        marginBottom: '2rem',
    },
    sectionTitle: {
        borderBottom: '3px solid #ff6f61',
        paddingBottom: '0.5rem',
        marginBottom: '1rem',
        color: '#ff6f61',
    },
    summary: {
        lineHeight: '1.6',
        color: '#555',
    },
    list: {
        listStylePosition: 'inside',
        paddingLeft: '0',
    },
    instructions: {
        lineHeight: '1.7',
        color: '#333',
    }
};

export default RecipeDetail;
