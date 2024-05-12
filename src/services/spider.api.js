import http from "../utils/http";

export const getSpider = (params) => http.get("spiders", { params });

export const getWebsiteSpider = (params) =>
    http.get("websiteSpider", { params });

export const getWebpageSpider = (params) =>
    http.get("webpageSpider", { params });

export const getSpiderById = (id) => http.get(`spiders/${id}`);

export const runSpiderById = (id, userId) => http.post(`spiders/${id}/run`, { userId });

export const stopSpiderById = (id) => http.post(`spiders/${id}/stop`);

export const updateSpiderBasicSettingById = (params) => http.put(`websiteSpider/{spider_id}/basicSetting`, params);

export const updateSpiderUrlById = (id, url) => http.put(`spiders/${id}?url=${url}&status=Available&is_academic=true`, {
  "keyword_ids": [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40],
  "filetype_ids": []
});

export const deleteSpiderById = (id) => http.delete(`spiders/${id}`);
