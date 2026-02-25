import axios from "axios";

// ✅ CREATE INSTANCE
const apiUrl = axios.create({
  baseURL : "https://foodzy-backend-express.vercel.app"
});

// ✅ REQUEST INTERCEPTOR (Attach Token)
apiUrl.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ RESPONSE INTERCEPTOR (Handle Token Expiry)
apiUrl.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn("Token expired or invalid");

      localStorage.removeItem("token");

      window.location.href = "/login"; // redirect to login
    }

    return Promise.reject(error);
  }
);

export default apiUrl;
