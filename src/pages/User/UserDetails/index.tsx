import { View, Text, Image } from "@tarojs/components";
import { useLoad } from "@tarojs/taro";
import BottomTabBar from "@/components/BottomTabBar";
import "./index.scss";
import MyMessage from "@/assets/svg/myMessage.svg";
import MyReserve from "@/assets/svg/myReserve.svg";
import myCollection from "@/assets/svg/myCollection.svg";
import AboutUs from "@/assets/svg/aboutUs.svg";
import Logout from "@/assets/svg/logout.svg";
import LeftArrow from "@/assets/svg/leftArrow.svg";
import TopNav from "@/components/TopNav";
import { login, getUserInfo } from "@/api/user";
import { useEffect, useState } from "react";

export default function Index() {
  // const [currentIndex, setCurrentIndex] = useState(0);

  const [userInfo, setUserInfo] = useState<any>();

  const getUserInfoData = async () => {
    const res = await getUserInfo();
    const { code, data } = res;
    if (code === 200) {
      setUserInfo(data);
    } else {
    }
  };

  useEffect(() => {
    getUserInfoData();
  }, []);

  return (
    <View className="page_view">
      <TopNav title={"个人信息"} hasBack={true} />
      <View className="user_detail_wrapper">
        <View className="menu_wrap">
          <View className="menu_item">
            <View className="label">个人头像</View>
            <View className="value">
              <Image
                className="avatar"
                src={
                  "https://bkmksh.oss-accelerate.aliyuncs.com/f2b0e436-69e0-11ef-b2bd-0ad83e4969ec_00001_small.jpeg?OSSAccessKeyId=LTAI5t8GmQec8vxNsiGKcYBT&Expires=317085359729&Signature=0jUiIDYyudsjgMJtjk52NFcQh1g%3D"
                }
              />
            </View>
          </View>
          <View className="menu_item">
            <View className="label">昵称</View>
            <View className="value">{userInfo?.username}</View>
          </View>
          <View className="menu_item">
            <View className="label">手机</View>
            <View className="value">{userInfo?.phone}</View>
          </View>
        </View>
        <View className="btn_wrap">保存</View>
      </View>
    </View>
  );
}
