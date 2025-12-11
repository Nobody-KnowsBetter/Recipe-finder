import React, { useState, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CameraSearch = () => {
    const fileInputRef = useRef(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleCameraClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setLoading(true);
        const formData = new FormData();
        formData.append('image', file);

        try {
            const res = await axios.post('http://localhost:5000/api/ai/identify-food', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            const dishName = res.data.dishName;
            // Navigate to home with search query
            navigate(`/?search=${encodeURIComponent(dishName)}`);
        } catch (err) {
            console.error("AI Search Failed", err);
            alert("Could not identify dish. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ display: 'inline-block' }}>
            <input
                type="file"
                accept="image/*"
                capture="environment"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleFileChange}
            />
            <button
                onClick={handleCameraClick}
                style={styles.button}
                title="Search by Camera"
            >
                {loading ? 'Analyzing...' : '📷 AI Camera'}
            </button>
        </div>
    );
};

const styles = {
    button: {
        background: 'linear-gradient(45deg, #6d28d9, #9d4edd)',
        color: 'white',
        border: 'none',
        padding: '0.5rem 1rem',
        borderRadius: '20px',
        cursor: 'pointer',
        fontSize: '1rem',
        fontWeight: 'bold',
        marginLeft: '1rem',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
    }
};

export default CameraSearch;
