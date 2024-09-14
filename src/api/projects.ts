import request from "@/api/request"; // 封装的request.js文件的位置

// 登陆
export const login = (wxCode: string): Promise<any> => {
  return request(`/api/miniapp/code2session?code=${wxCode}`, "GET");
};

// 获取用户信息
export const getUserinfo = (): Promise<any> => {
  return request(`/api/miniapp`, "GET");
};
