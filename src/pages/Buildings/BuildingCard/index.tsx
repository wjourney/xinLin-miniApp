import { useLoad } from "@tarojs/taro";
import BottomTabBar from "@/components/BottomTabBar";
import { View, Text, Image } from "@tarojs/components";
import "./index.scss";
import Taro from "@tarojs/taro";
import { useEffect, useState } from "react";
import { getUserInfo } from "@/api/user";
import Login from "@/components/Login";
import { getBuildingDetail, collectionBuilding } from "@/api/buildings";

export default function Index({ buildingItem }) {
  // const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoginVisible, setIsLoginVisible] = useState(false);

  const handleCollectHouse = async () => {
    const res = await getUserInfo();
    if (res.code === 200 && !!res?.data?.isBindPhone) {
      const result = await collectionBuilding({
        parkId: buildingItem?.parkId,
        houseId: buildingItem?.id,
        like: !buildingItem?.liked,
      });
      const { code, data } = result;
      if (code === 200) {
        Taro.showToast({
          title: buildingItem?.liked ? "取消收藏成功" : "收藏成功",
          icon: "none",
        });
      }
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
      <Image className="img_wrap" src={buildingItem?.thumbnail} />
      <View className="info_wrap">
        <View className="location">衡山路8号｜4楼</View>
        <View className="area">1000m²</View>
        <View className="price">
          <Text style={{ color: "#AE1D23", fontWeight: 500 }}>
            {buildingItem?.price}
          </Text>
          <Text>/m²/天</Text>
        </View>
      </View>
      <Image
        onClick={(event) => {
          handleCollectHouse();
          event?.stopPropagation();
        }}
        className="collection"
        src={require(buildingItem?.liked
          ? "@/assets/svg/heart_love.svg"
          : "@/assets/svg/heart_notLove.svg")}
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
