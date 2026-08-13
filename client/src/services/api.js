import axios from "axios";

// import.meta.env.MODE is built into Vite. 
// It is "development" when running locally, and "production" on Render.
const isDevelopment = import.meta.env.MODE === "development";

const api = axios.create({
    baseURL: isDevelopment ? "http://localhost:5000/api" : "/api",
    withCredentials: true
});

export default api;