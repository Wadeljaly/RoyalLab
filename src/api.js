// Central API configuration
// In development: uses VITE_API_URL from .env.local = http://localhost:5000
// In production:  uses VITE_API_URL from .env.production = your deployed backend URL
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default API_URL;
