import axios from "axios";
const api_base_url = import.meta.env.VITE_API_BASE_URL;

export const loginUser = async (data) => {
  const response = await axios.post(`${api_base_url}/login`, data, {
    withCredentials: true,
  });
  return response.data;
};
