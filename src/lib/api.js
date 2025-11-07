import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api", // your backend URL
  withCredentials: true, // for cookie/session-based auth
});

// Admin login
export const adminLogin = (data) => API.post("/admin/login", data);

// Get all workspaces
export const getWorkspaces = () => API.get("/workspaces");

// Add new workspace (admin only)
export const addWorkspace = (data, token) =>
  API.post("/workspaces", data, {
    headers: { Authorization: `Bearer ${token}` },
  });

// Delete workspace
export const deleteWorkspace = (id, token) =>
  API.delete(`/workspaces/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
