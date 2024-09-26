import Taro from "@tarojs/taro";

const url_all = {
  DEV: "https://www.shmod.cn", // 开发
  PRO: "https://www.shmod.cn", // 生产
};

let BASEURL = url_all["DEV"]; // 调整当前环境

/*
 * 全局请求封装
 * @param path 请求路径
 * @param method 请求类型(GET/POST/DELETE等)
 * @oaram data 请求体数据
 * @param loading 请求未完成是是否显示加载中，默认为true
 */
export default (
  path = "",
  method:
    | "OPTIONS"
    | "GET"
    | "HEAD"
    | "POST"
    | "PUT"
    | "DELETE"
    | "TRACE"
    | "CONNECT",
  data = {},
  loading = true
) => {
  // 获取存储token
  const token = Taro.getStorageSync("token");

  if (loading) {
    Taro.showLoading({
      title: "加载中",
      mask: true,
    });
  }
  //根据token进行调用函数
  if (token != "") {
    return tokenRequest(path, method, data, loading, token);
  } else {
    return noTokenRequest(path, method, data, loading);
  }
};

// 无token时发送请求函数
function noTokenRequest(
  path: string,
  method:
    | "OPTIONS"
    | "GET"
    | "HEAD"
    | "POST"
    | "PUT"
    | "DELETE"
    | "TRACE"
    | "CONNECT",
  data: any,
  loading: boolean
) {
  return new Promise((resolve, reject) => {
    Taro.request({
      url: BASEURL + path,
      method: method,
      data,
      success(response) {
        console.log(response.data);
        resolve(response.data);
      },
      fail(err) {
        Taro.showToast({
          icon: "none",
          title: "服务响应失败",
        });
        console.error(err);
        reject(err);
      },
      complete() {
        Taro.hideLoading();
      },
    });
  });
}

// 有token时发送请求函数
function tokenRequest(
  path: string,
  method:
    | "OPTIONS"
    | "GET"
    | "HEAD"
    | "POST"
    | "PUT"
    | "DELETE"
    | "TRACE"
    | "CONNECT",
  data: any,
  loading: boolean,
  token: string
) {
  return new Promise((resolve, reject) => {
    Taro.request({
      url: BASEURL + path,
      method: method,
      data,
      header: {
        Cookie: `token=${token}`,
      },
      success(response) {
        console.log("%c响应拦截：", " background:green", response);
        if (response.statusCode === 40101) {
          // logout()
        }
        console.log(response.data);
        resolve(response.data);
      },
      fail(err) {
        Taro.showToast({
          icon: "none",
          title: "服务响应失败",
        });
        console.error(err);
        reject(err);
      },
      complete() {
        Taro.hideLoading();
      },
    });
  });
}
