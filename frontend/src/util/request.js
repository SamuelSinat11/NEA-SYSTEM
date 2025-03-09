import axios from "axios";

const base_url = "http://localhost:8081/api/";

export const request = async (url = "", method = "get", data = {}) => {
  try {
    const response = await axios({
      url: base_url + url,
      method: method,
      data: data,
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.data; // Only return useful data
  } catch (error) {
    console.error("API Request Error:", error.response || error.message);
    return error.response?.data || { error: "API request failed" };
  }
};