import http from "../utils/http";

export const createUser = (body) => http.post("users", body);

export const getUser = () => http.get("users");

export const getUserById = (id) => http.get(`users/${id}`);

export const deleteUser = (id) => http.delete(`users/${id}`);
