import Taro from "@tarojs/taro";

export const handleLogin = () => {
  return new Promise<number>(async (resolve) => {
    const result = await Taro.login();
    console.log("ddd", result);
    if (result.code) {
      // const res = await login({ code: result.code });
      // const { code, data } = res;
      // const { token } = data || {};
      // if (code === 0 && token) {
      //   Taro.setStorageSync("token", token);
      //   resolve(200);
      // }
    } else {
      resolve(-1);
      console.log("登录失败！" + result.errMsg);
    }
  });
};
