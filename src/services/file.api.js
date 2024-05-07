import http from "../utils/http";

export const getFile = (params) => http.get("files", { params });
