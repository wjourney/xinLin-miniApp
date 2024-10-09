import request from "@/api/request"; // 封装的request.js文件的位置

// 获取我的收藏
export const getMyCollection = (): Promise<any> => {
  return request(`/api/fav_list`, "GET");
};

// 获取我的预约
export const getMyReserve = (type?: string): Promise<any> => {
  return request(
    `/api/reservations${type !== "" ? `?confirm=${type}` : ""}`,
    "GET"
  );
};

// 获取我的消息
export const getMessage = (page, pageSize): Promise<any> => {
  return request(`/api/messages?page=${page}&size=${pageSize}`, "GET");
};
