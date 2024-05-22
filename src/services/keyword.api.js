import http from "../utils/http";

export const getKeyword = (params) => http.get("keywords", { params });

export const addKeyword = (keyword) =>
    http.post("keywords", null, {
        params: {
            name: keyword,
        },
    });

export const editKeyword = ({ id, keyword }) =>
    http.put(`keywords/${id}`, null, {
        params: {
            name: keyword,
        },
    });

export const deleteKeyword = (id) => http.delete(`keywords/${id}`);
