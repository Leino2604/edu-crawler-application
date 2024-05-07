import http from "../utils/http";

export const getKeyword = (params) => http.get("keywords", { params });
