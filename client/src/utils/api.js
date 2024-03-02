import axios from "axios";

export const API = "http://localhost:1200";

export const deleteData = (endpoint) => {
  try {
    const response = axios.delete(API + endpoint);
    return response;
  } catch (error) {
    return error.response;
  }
};
export const postData = async (endpoint, data) => {
  console.log("IN POST DATA", data);
  try {
    const response = await axios.post(`${API + endpoint}`, data);
    return response;
  } catch (error) {
    return error.response;
  }
};
