import request from "@/api/request"; // 封装的request.js文件的位置

// 获取推荐项目
export const getRecommendProjects = (): Promise<any> => {
  return request(`/api/parks? `, "GET");
};

// 获取分页项目
export const getProjects = (body: any): Promise<any> => {
  return request(`/api/schedule`, "GET");
};

// 获取项目详情
export const getProjectDetail = (body: any): Promise<any> => {
  return request(`/api/schedule`, "GET");
};
