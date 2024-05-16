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

export const updateSpiderUrlById = (id, url, keyword, filetype) => http.put(`spiders/${id}?url=${url}&status=Available&is_academic=true`, {
  "keyword_ids": keyword,
  "filetype_ids": filetype
});

export const updateWebpageSpiderCrawlRulesById = (id, params) => 
  http.put(`webpageSpider/${id}/crawlRules`, params.map((crawlRulesData, index) => ({
    "id": index + 1,
    "tag": crawlRulesData.tag,
    "HTMLClassName": crawlRulesData.HTMLClassName,
    "HTMLIDName": crawlRulesData.HTMLIDName,
    "ChildCrawlRuleID": 0
  })));

  export const updateWebsiteSpiderSubfolderById = (id, params) => 
    http.put(`websiteSpider/${id}/subfolder`, params.subfolders.map((subfoldersData) => ({
      "url": subfoldersData.url,
      "crawlRules": subfoldersData.crawlRules.map((crawlRulesData, index) => ({
        "id": index + 1,
        "tag": crawlRulesData.tag,
        "HTMLClassName": crawlRulesData.HTMLClassName,
        "HTMLIDName": crawlRulesData.HTMLIDName,
        "ChildCrawlRuleID": 0
      })),
      "searchRules": subfoldersData.searchRules.map((crawlRulesData, index) => ({
        "id": index + 1,
        "tag": crawlRulesData.tag,
        "HTMLClassName": crawlRulesData.HTMLClassName,
        "HTMLIDName": crawlRulesData.HTMLIDName,
        "ChildCrawlRuleID": 0
      })),
    })));

export const deleteSpiderById = (id) => http.delete(`spiders/${id}`);

export const createWebsiteSpider = (userId, params) => http.post(`websiteSpider`, {
  "url": params.url,
  "delay": params.delay,
  "graphdeep": params.graphdeep,
  "maxThread": params.maxThread,
  "keyword": params.keyword,
  "filetype": params.filetype,
  "subfolders": params.subfolders.map((subfoldersData) => ({
    "url": subfoldersData.url,
    "crawlRules": subfoldersData.crawlRules.map((crawlRulesData, index) => ({
      "id": index + 1,
      "tag": crawlRulesData.tag,
      "HTMLClassName": crawlRulesData.HTMLClassName,
      "HTMLIDName": crawlRulesData.HTMLIDName,
      "ChildCrawlRuleID": 0
    })),
    "searchRules": subfoldersData.searchRules.map((crawlRulesData, index) => ({
      "id": index + 1,
      "tag": crawlRulesData.tag,
      "HTMLClassName": crawlRulesData.HTMLClassName,
      "HTMLIDName": crawlRulesData.HTMLIDName,
      "ChildCrawlRuleID": 0
    })),
  })),
  "createdBy": userId
});

export const createWebpageSpider = (userId, params) => http.post(`webpageSpider`, {
  "url": params.url,
  "keyword": params.keyword,
  "filetype": params.filetype,
  "crawlRules": params.subfolders[0].crawlRules.map((crawlRulesData, index) => ({
    "id": index + 1,
    "tag": crawlRulesData.tag,
    "HTMLClassName": crawlRulesData.HTMLClassName,
    "HTMLIDName": crawlRulesData.HTMLIDName,
    "ChildCrawlRuleID": 0
  })),
  "createdBy": userId
});

export const getWebpageSpiderCrawlRulesById = (id) => http.get(`webpageSpider/${id}/crawl_rule`);

export const getWebsiteSpiderCrawlRulesById = (id) => http.get(`websiteSpider/${id}/crawlRules`);

export const getWebsiteSpiderSearchRulesById = (id) => http.get(`websiteSpider/${id}/searchRules`);
