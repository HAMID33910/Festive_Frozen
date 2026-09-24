const API_URL = import.meta.env.VITE_API_URL || (window.location.hostname === "localhost" ? 
    "http://localhost:3001" : 
    "https://festive-frozen.up.railway.app");

export { API_URL };