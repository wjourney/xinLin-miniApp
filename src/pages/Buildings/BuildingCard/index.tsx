import { useLoad } from "@tarojs/taro";
import BottomTabBar from "@/components/BottomTabBar";
import { View, Text, Image } from "@tarojs/components";
import "./index.scss";
import Taro from "@tarojs/taro";
import { useEffect, useState } from "react";
import { getUserInfo } from "@/api/user";
import Login from "@/components/Login";

export default function Index() {
  // const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoginVisible, setIsLoginVisible] = useState(false);

  const handleCollectBuildings = async () => {
    const res = await getUserInfo();
    if (res.code === 200 && !!res?.data?.isBindPhone) {
      // Taro.switchTab({ url: indexToUrl[value] });
    } else {
      setIsLoginVisible(true);
    }
  };

  return (
    <View
      className="building_card_wrap"
      onClick={() => {
        Taro.navigateTo({
          url: "/pages/Buildings/BuildingDetail/index",
        });
      }}
    >
      <Image
        className="img_wrap"
        src="https://bkmksh.oss-accelerate.aliyuncs.com/db467fff-6838-11ef-9dc3-329037ae0fb9_00000_small.jpeg?OSSAccessKeyId=LTAI5t8GmQec8vxNsiGKcYBT&Expires=317085177816&Signature=B81tkjKhd9v30B1xD2udBFL3TNI%3D"
      />
      <View className="info_wrap">
        <View className="location">衡山路8号｜4楼</View>
        <View className="area">1000m²</View>
        <View className="price">
          <Text style={{ color: "#AE1D23", fontWeight: 500 }}>5.5</Text>
          <Text>/m²/天</Text>
        </View>
      </View>
      <Image
        onClick={(event) => {
          handleCollectBuildings();
          event?.stopPropagation();
        }}
        className="collection"
        src={require("@/assets/svg/heart_love.svg")}
      />
      <Login
        visible={isLoginVisible}
        setVisible={setIsLoginVisible}
        // handleFn={() => {
        //   Taro.switchTab({ url: indexToUrl[4] });
        //   setIsLoginVisible(false);
        // }}
      />
    </View>
  );
}
