import { View, Text, Image, Button, Input } from "@tarojs/components";
import { useLoad } from "@tarojs/taro";
import BottomTabBar from "@/components/BottomTabBar";
import "./index.scss";
import TopNav from "@/components/TopNav";
import { login, getUserInfo } from "@/api/user";
import { useEffect, useState } from "react";
import Taro from "@tarojs/taro";
import { AtFloatLayout } from "taro-ui";
import EditSvg from "@/assets/svg/edit.svg";

export default function Index() {
  // const [currentIndex, setCurrentIndex] = useState(0);

  const [userInfo, setUserInfo] = useState<any>();
  const [userAvatar, setUserAvatar] = useState("");
  const [username, setUsername] = useState("");
  const [visible, setVisible] = useState(false);

  const getUserInfoData = async () => {
    const res = await getUserInfo();
    const { code, data } = res;
    if (code === 200) {
      setUserInfo(data);
    } else {
    }
  };

  // 获取用户头像
  const handleGetUserMoreInfo = () => {
    Taro.getUserInfo({
      success: function (res) {
        const userInfo = res.userInfo;
        setUserAvatar(userInfo.avatarUrl);
        setUsername(userInfo.nickName);
      },
    });
  };

  useEffect(() => {
    getUserInfoData();
    handleGetUserMoreInfo();
  }, []);

  useEffect(() => {
    getUserInfoData();
  }, []);

  // 监听用户输入并更新状态
  const handleInput = (e) => {
    setUsername(e.target.value); // 更新username
  };

  return (
    <View className="page_view">
      <TopNav title={"个人信息"} hasBack={true} />
      <View className="user_detail_wrapper">
        <View className="menu_wrap">
          <View className="menu_item">
            <View className="label">个人头像</View>
            <View className="value">
              <Image className="avatar" src={userAvatar} />
            </View>
          </View>
          <View className="menu_item">
            <View className="label">昵称</View>
            <Input
              className="input-field"
              value={username}
              onInput={handleInput}
            />
            <Image className="edit_svg" src={EditSvg} />
          </View>
          <View className="menu_item">
            <View className="label">手机</View>
            <View className="value">{userInfo?.phone}</View>
          </View>
        </View>
        <View className="btn_wrap">保存</View>
      </View>
      {/* <AtFloatLayout
        isOpened={visible}
        // isOpened={true}
        className="login-phone-modal"
        onClose={() => {
          setVisible(false);
        }}
      >
        <View className="modal-content">
          <View className="logo">
          </View>
          <Button
            className="btn"
          >
            手机号快捷登录
          </Button>
        </View>
      </AtFloatLayout> */}
    </View>
  );
}
