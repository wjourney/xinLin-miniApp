import request from "@/api/request"; // 封装的request.js文件的位置

// 获取推荐房源
export const getRecommendBuildings = (city): Promise<any> => {
  return request(`/api/recommend_house?city=${city} `, "GET");
};

// 获取分页房源
export const getBuildings = (params): Promise<any> => {
  const { page, pageSize } = params;
  return request(`/api/houses?page=${page}&size=${pageSize}`, "GET");
};

// 获取房源详情
export const getBuildingDetail = (id): Promise<any> => {
  return request(`/api/house_detail/${id}`, "GET");
};

// 收藏房源
export const collectionBuilding = (body: {
  parkId: number;
  houseId: number;
  like: boolean;
}): Promise<any> => {
  return request(`/api/fav_hourse`, "POST", body);
};

// 预约看房
export const appointBuilding = (body: any): Promise<any> => {
  return request(`/api/reservation`, "POST", body);
};

// 房源筛选项目
export const getBuildingsOptions = (): Promise<any> => {
  return request(`/api/houses_options`, "GET");
};
