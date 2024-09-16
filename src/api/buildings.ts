import request from "@/api/request"; // 封装的request.js文件的位置

// 获取推荐房源
export const getRecommendBuildings = (): Promise<any> => {
  return request(`/api/recommend_house `, "GET");
};

// 获取分页房源
export const getBuildings = (params): Promise<any> => {
  return request(`/api/schedule`, "GET");
};

// 获取房源详情
export const getBuildingDetail = (params): Promise<any> => {
  return request(`/api/schedule`, "GET");
};

// 收藏房源
export const collectionBuilding = (body: any): Promise<any> => {
  return request(`/api/schedule`, "POST", body);
};

// 预约看房
export const appointBuilding = (body: any): Promise<any> => {
  return request(`/api/schedule`, "POST", body);
};
