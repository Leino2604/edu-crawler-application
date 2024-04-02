import http from "../utils/http";

export const getArticle = (params) => http.get("articles", { params });

export const getArticleById = (id) => http.get(`articles/${id}`);
