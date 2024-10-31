import request from "@/api/request"; // 封装的request.js文件的位置

// 获取推荐资讯
export const getRecommendNews = (): Promise<any> => {
  return request(`/api/recommend_news `, "GET");
};

// 获取分页资讯
export const getNews = (category): Promise<any> => {
  return request(`/api/news?category=${category}`, "GET");
};

// 首页推荐banner
export const getBanners = (from): Promise<any> => {
  return request(`/api/banners?category=${from}`, "GET");
};
