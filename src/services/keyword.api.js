import http from "../utils/http";

export const getKeyword = (params) => http.get("keywords", { params });

export const createKeyword = (keyword) =>
    http.post("keywords", null, {
        params: {
            name: keyword,
        },
    });

export const updateKeyword = ({ id, keyword }) =>
    http.put(`keywords/${id}`, null, {
        params: {
            name: keyword,
        },
    });

export const deleteKeyword = (id) => http.delete(`keywords/${id}`);
