import request from "@/api/request"; // 封装的request.js文件的位置

// 获取推荐项目
export const getRecommendProjects = (city): Promise<any> => {
  return request(`/api/recommend_parks?city=${city}`, "GET");
};

// 获取分页项目
export const getProjects = (params): Promise<any> => {
  const { page, pageSize, city, districtName, searchValue } = params;
  return request(
    `/api/parks?page=${page}&size=${pageSize}&parkName=${searchValue}&city=${
      city || ""
    }&districtName=${districtName || ""}`,
    "GET"
  );
};

// 获取项目详情
export const getProjectDetail = (id): Promise<any> => {
  return request(`/api/park_detail/${id}`, "GET");
};

// 项目筛选项目
export const getProjectsOptions = (): Promise<any> => {
  return request(`/api/park_options`, "GET");
};

// 获取项目地图
export const getMapProjects = (): Promise<any> => {
  return request(`/api/park/map`, "GET");
};
