import axios from "axios";
import { createSearchParams } from "react-router-dom";

const headers = {
  headers: {
    "x-rapidapi-host": "wft-geo-db.p.rapidapi.com",
    "x-rapidapi-key": process.env.REACT_APP_SECRET_KEY,
  },
};

export const fetchPlaces = async (payload) => {
  const queryParams = createSearchParams(payload).toString();
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_BASE_URL}?${queryParams}`,
      headers
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export default {
  fetchPlaces,
};
