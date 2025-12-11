// Logic to determine the API URL based on the environment
// In Vercel, we will set REACT_APP_API_URL environment variable.
// Locally, it will default to localhost:5001.

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001';

export default API_BASE_URL;
