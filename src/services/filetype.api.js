import http from "../utils/http";

export const getFileType = (params) => http.get("filetypes", { params });
