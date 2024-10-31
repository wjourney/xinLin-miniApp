import request from "@/api/request"; // 封装的request.js文件的位置

// 登陆
export const login = (wxCode: string): Promise<any> => {
  return request(`/api/code2session?code=${wxCode}`, "GET");
};

// 手机号登陆
export const getPhoneNum = (body: {
  encryptedData: string;
  iv: string;
}): Promise<any> => {
  return request(`/api/authPhone`, "POST", body);
};

// 获取用户信息
export const getUserInfo = (): Promise<any> => {
  return request(`/api/me`, "GET");
};

// 修改用户信息
export const updateUser = (body): Promise<any> => {
  return request(`/api/update_me`, "PUT", body);
};
