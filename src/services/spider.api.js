import http from "../utils/http";

export const getSpider = (params) => http.get("spiders", { params });

export const getWebsiteSpider = (params) =>
    http.get("websiteSpider", { params });

export const getWebpageSpider = (params) =>
    http.get("webpageSpider", { params });

export const getSpiderById = (id) => http.get(`spiders/${id}`);

export const runSpiderById = (id, userId) => http.post(`spiders/${id}/run`, { userId });

export const stopSpiderById = (id) => http.post(`spiders/${id}/stop`);
