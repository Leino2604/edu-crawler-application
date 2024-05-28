import http from "../utils/http";

export const getUser = (params) => http.get("users", { params });

export const getUserById = (id) => http.get(`users/${id}`);

export const addUser = (body) =>
    http.post(
        "https://edu-crawler-application-be.onrender.com/api/admin/addUser",
        body
    );

export const editUser = (body) => http.put(`users/${body.user_id}`, body);

export const deleteUser = (id) => http.delete(`users/${id}`);

export const getArticleByUserId = (params) =>
    http.delete(`users/${params.id}/articles`, { params });
export const getSpiderByUserId = (params) =>
    http.delete(`users/${params.id}/spiders`, { params });
