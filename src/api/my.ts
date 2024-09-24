import request from "@/api/request"; // 封装的request.js文件的位置

// 获取我的预约
export const getMyReserves = (params): Promise<any> => {
  const { page, pageSize, confirm } = params;
  return request(
    `/api/reservations?confirm=${confirm}&page=${page}&size=${pageSize}`,
    "GET"
  );
};

// 获取我的收藏
export const getMyCollection = (): Promise<any> => {
  // const { page, pageSize, confirm } = params;
  return request(`/api/fav_list`, "GET");
};

// 获取
export const getNews = (body: any): Promise<any> => {
  return request(`/api/schedule`, "POST", body);
};
