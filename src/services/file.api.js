import http from "../utils/http";

export const getFile = (params) => http.get("files", { params });

export const deleteFile = (id) => http.delete(`files/${id}`);
