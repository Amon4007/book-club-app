import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:5000";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Fetch all book clubs
export const fetchBookClubs = async () => {
  try {
    const response = await api.get("/clubs");
    return response.data;
  } catch (error) {
    console.error("Error fetching book clubs:", error);
    return [];
  }
};

// Join a book club
export const joinClub = async (clubId) => {
  try {
    const response = await api.post(`/club/${clubId}/join`);
    return response.data;
  } catch (error) {
    console.error("Error joining club:", error);
    return null;
  }
};

// Leave a book club
export const leaveClub = async (clubId) => {
  try {
    const response = await api.post(`/club/${clubId}/leave`);
    return response.data;
  } catch (error) {
    console.error("Error leaving club:", error);
    return null;
  }
};

export default api;
