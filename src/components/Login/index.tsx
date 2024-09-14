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
import { login } from "@/api/user";
import Taro from "@tarojs/taro";

const Login: React.FC<
  PropsWithChildren<{
    visible: boolean;
    setVisible: (visible) => void;
    // handleLogin?: (status) => void;
    confirms?: (cm) => void;
  }>
> = ({ visible, setVisible, confirms }) => {
  const handleGetPhoneNumber = async (
    e: BaseEventOrig<ButtonProps.onGetPhoneNumberEventDetail>
  ) => {
    Taro.login({
      success: async (result) => {
        console.log("result", result);
        if (result.code) {
          const res = await login(result.code);
          const { code, data } = res;
          const { info, token } = data || {};
          if (code === 0 && token) {
            Taro.setStorageSync("token", token);
            // if (info.phone_authorized) {
            // handleGetUserInfo();
            // }
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
      className="login-phone-modal"
      // onClose={() => {
      //   setVisible(false);
      // }}
    >
      <View className="modal-content">
        <View className="modal-content-logo">
          {/* <Image className="img" src={Logo} /> */}欣宁招商
        </View>
        <Button
          className="modal-content-button"
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
      </View>
    </AtFloatLayout>
  );
};

export default Login;
