import http from "../utils/http";

export const getArticle = (params) => http.get("articles", { params });

export const getArticleById = (id) => http.get(`articles/${id}`);

export const exportXls = (id) => http.get(`article/${id}/export/json`);

export const exportAllXls = ({ page, articlePerPage }) =>
    http.get(`/article/export/json`, {
        params: {
            page: page,
            article_per_page: articlePerPage,
        },
    });

export const deleteArticle = (id) => http.delete(`article/${id}`);
