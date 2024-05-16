import http from "../utils/http";

export const getArticle = (params) => http.get("articles", { params });

export const getArticleById = (id) => http.get(`articles/${id}`);

export const exportXls = (id) => http.get(`article/${id}/export/json`);
export const exportAllXls = (user_id) =>
    http.get(`/users/${user_id}/articles/export/xls`);
