import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api/url";

export const shortenUrl = async (longUrl) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/shorten`, {
      longUrl: longUrl,
    });
    return response.data;
  } catch (error) {
    console.error("API Error:", error);
    throw error.response?.data || "Network Error: Is the server running?";
  }
};
