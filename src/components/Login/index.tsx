import { PropsWithChildren, useEffect, useState } from "react";
import { AtFloatLayout } from "taro-ui";
import "./index.scss";
import {
  View,
  Image,
  Button,
  BaseEventOrig,
  ButtonProps,
} from "@tarojs/components";
import { handleLogin } from "@/utils";
import { login, getPhoneNum } from "@/api/user";
import Taro from "@tarojs/taro";

const Login: React.FC<
  PropsWithChildren<{
    visible: boolean;
    setVisible: (visible) => void;
    // handleLogin?: (status) => void;
    confirms?: (cm) => void;
    handleFn?: () => void;
  }>
> = ({ visible, setVisible, confirms, handleFn }) => {
  const handleGetPhoneNumber = async (
    e: BaseEventOrig<ButtonProps.onGetPhoneNumberEventDetail>
  ) => {
    const iv = e.detail.iv;
    const encryptedData = e.detail.encryptedData;

    console.log("fff", e.detail);
    if (!iv || !encryptedData) {
      Taro.showToast({ title: "获取手机号失败", icon: "none" });
      return;
    }

    Taro.login({
      success: async (result) => {
        console.log("result", result);

        if (result.code) {
          const res = await login(result.code);
          const { code, data } = res;

          if (code === 200) {
            const { info, token } = data || {};
            Taro.setStorageSync("token", token);
            // if (info.phone_authorized) {
            // handleGetUserInfo();
            // }
            const result = await getPhoneNum({
              encryptedData,
              iv,
            });
            const { code, data: resData } = result;
            if (code === 200) {
              handleFn();
            }
          }
        } else {
          console.log("登录失败！" + result.errMsg);
        }
      },
    });
  };
  const handleBtnClick = async (event) => {
    // onClick?.(event);
  };

  return (
    <AtFloatLayout
      isOpened={visible}
      // isOpened={true}
      className="login-phone-modal"
      // onClose={() => {
      //   setVisible(false);
      // }}
    >
      <View className="modal-content">
        <View className="logo">
          {/* <Image className="img" src={Logo} /> */}欣宁招商
        </View>
        <Button
          className="btn"
          openType="getPhoneNumber"
          // onGetPhoneNumber={(phoneInfo) => {
          //   console.log("ff", phoneInfo);
          //   handleLogin();
          // }}
          onClick={handleBtnClick}
          onGetPhoneNumber={handleGetPhoneNumber}
        >
          手机号快捷登录
        </Button>
        {/* <Button
          className="not-login"
          openType="getPhoneNumber"
          // onGetPhoneNumber={(phoneInfo) => {
          //   console.log("ff", phoneInfo);
          //   handleLogin();
          // }}
          onClick={handleBtnClick}
          onGetPhoneNumber={handleGetPhoneNumber}
        >
          暂不登陆
        </Button> */}
      </View>
    </AtFloatLayout>
  );
};

export default Login;