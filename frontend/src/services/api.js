const BASE_URL = "http://localhost:3000/api";

const getToken = () => localStorage.getItem("token");

const request = async (endpoint, method = "GET", body = null, isFormData = false) => {
  const headers = {
    Authorization: getToken() ? `Bearer ${getToken()}` : "",
  };

  if (!isFormData) {
    headers["Content-Type"] = "application/json";
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    method,
    headers,
    body: body ? (isFormData ? body : JSON.stringify(body)) : null,
    credentials: "include",
  });

  const data = await response.json();

  if (!response.ok) {
    const error = new Error(data.error || "Request failed");

    // 👇 attach extra info
    error.status = response.status;
    error.data = data;

    throw error;
  }
  return data;
};

export default request;
