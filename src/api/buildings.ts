import request from "@/api/request"; // 封装的request.js文件的位置

// 获取所有事件
export const getTodoEvent = (): Promise<any> => {
  return request(`/api/schedule`, "GET");
};

// 添加待办
export const addTodo = (body: any): Promise<any> => {
  return request(`/api/schedule`, "POST", body);
};
