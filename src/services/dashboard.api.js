import http from "../utils/http";

export const getTotalRunTime = () => http.get("dashboard/totalRunTime");
export const getTotalRunTime7Days = () =>
    http.get("dashboard/totalRunTime/7days");
export const getTotalArticle = () => http.get("dashboard/totalArticle");
export const getTotalArticle7Days = () =>
    http.get("dashboard/totalArticle/7days");
export const getTotalGoodCrawl = () => http.get("dashboard/totalGoodCrawl");
export const getTotalBadCrawl = () => http.get("dashboard/totalBadCrawl");
export const getStatus = () => http.get("dashboard/allSpiderRunningStatus");
export const getTop10 = () => http.get("dashboard/top10spider");
