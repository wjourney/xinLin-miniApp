import { View, Text, Image } from "@tarojs/components";
import { useLoad } from "@tarojs/taro";
import BottomTabBar from "@/components/BottomTabBar";
import "./index.scss";
import MyMessage from "@/assets/svg/myMessage.svg";
import MyReserve from "@/assets/svg/myReserve.svg";
import myCollection from "@/assets/svg/myCollection.svg";
import AboutUs from "@/assets/svg/aboutUs.svg";
import LeftArrow from "@/assets/svg/leftArrow.svg";
import Taro from "@tarojs/taro";
import TopNav from "@/components/TopNav";
import MoreSvg from "@/assets/svg/more.svg";
import { useEffect, useState } from "react";
import { login, getUserInfo } from "@/api/user";

const items = [
  {
    label: "我的消息",
    value: "myMessage",
    icon: MyMessage,
    handleCLick: () => {
      Taro.navigateTo({
        url: "/pages/User/Message/index",
      });
    },
  },
  {
    label: "我的预约",
    value: "MyReserve",
    icon: MyReserve,
    handleCLick: () => {
      Taro.navigateTo({
        url: "/pages/User/Reserve/index",
      });
    },
  },
  {
    label: "我的收藏",
    value: "myCollection",
    icon: myCollection,
    handleCLick: () => {
      Taro.navigateTo({
        url: "/pages/User/Collection/index",
      });
    },
  },
  {
    label: "关于我们",
    value: "aboutUs",
    icon: AboutUs,
    handleCLick: () => {
      Taro.navigateTo({
        url: "/pages/User/AboutUs/index",
      });
    },
  },
];

export default function Index() {
  // const [currentIndex, setCurrentIndex] = useState(0);
  // const [userInfo, setUserInfo] = useState<any>();
  const [userAvatar, setUserAvatar] = useState("");
  const [username, setUsername] = useState("");

  // 获取用户手机号
  // const getUserInfoData = async () => {
  //   const res = await getUserInfo();
  //   const { code, data } = res;
  //   if (code === 200) {
  //     setUserInfo(data);
  //   } else {
  //   }
  // };

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
    // getUserInfoData();
    handleGetUserMoreInfo();
  }, []);

  return (
    <View className="page_view">
      <TopNav title={"我的"} />
      <View className="user_wrapper">
        <View
          className="avatar_warp"
          onClick={() =>
            Taro.navigateTo({
              url: "/pages/User/UserDetails/index",
            })
          }
        >
          <Image className="avatar" src={userAvatar} />
          <Text className="username">{username}</Text>
          <Image className="more" src={MoreSvg} />
        </View>
        <View className="menu_warp">
          {items.map((item) => (
            <View className="menu_item" onClick={item.handleCLick}>
              <View className="title_wrap">
                <Image style={{ width: 18, height: 18 }} src={item.icon} />
                <Text className="title">{item.label}</Text>
              </View>
              <Image style={{ width: 28, height: 28 }} src={LeftArrow} />
            </View>
          ))}
        </View>
      </View>
      <BottomTabBar currentIndex={4} />
    </View>
  );
}
