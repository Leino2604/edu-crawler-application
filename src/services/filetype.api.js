import http from "../utils/http";

export const getFileType = (params) => http.get("filetypes", { params });

export const addFileType = (type) =>
    http.post("filetypes", null, {
        params: {
            name: type,
        },
    });

export const editFileType = ({ id, type }) =>
    http.put(`filetypes/${id}`, null, {
        params: {
            name: type,
        },
    });

export const deleteFileType = (id) => http.delete(`filetypes/${id}`);
