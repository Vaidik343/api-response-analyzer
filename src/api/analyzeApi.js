import axios from "axios";

export default async function analyzeApi(payload) {
  const apiUrl = import.meta.env.VITE_BACKEND_API;
  console.log("🚀 ~ analyzeApi ~ apiUrl:", apiUrl)

  if (!apiUrl) {
    throw new Error("Backend API URL is not defined");
  }

  const response = await axios.post(apiUrl, payload);
  console.log("🚀 ~ analyzeApi ~ response:", response)
  return response.data;
}
