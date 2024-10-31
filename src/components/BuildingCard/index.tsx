import { useLoad } from "@tarojs/taro";
import BottomTabBar from "@/components/BottomTabBar";
import { View, Text, Image } from "@tarojs/components";
import "./index.scss";
import Taro from "@tarojs/taro";
import { useEffect, useState } from "react";
import { getUserInfo } from "@/api/user";
import Login from "@/components/Login";
import { getBuildingDetail, collectionBuilding } from "@/api/buildings";

export default function Index({
  buildingItem,
  refreshFn,
  isLoginVisible,
  setIsLoginVisible,
  from,
}) {
  // const [currentIndex, setCurrentIndex] = useState(0);
  // const [isLoginVisible, setIsLoginVisible] = useState(false);

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
          duration: 3000,
        });
        if (from === "collection") {
          refreshFn();
        } else {
          refreshFn(buildingItem?.id, !buildingItem?.liked);
        }
      }
    } else {
      setIsLoginVisible(true);
    }
  };

  return (
    <View
      className="building_card_wrap"
      onClick={(event) => {
        event.stopPropagation();
        if (!isLoginVisible) {
          Taro.navigateTo({
            url: `/pages/Buildings/BuildingDetail/index?id=${buildingItem?.id}`,
          });
        }
      }}
    >
      <Image
        className="building_item_img_wrap"
        src={buildingItem?.thumbnail}
        mode="aspectFill"
      />
      <View className="info_wrap">
        <View className="location">
          {`${buildingItem?.parkName}｜${buildingItem?.floor}楼`}
        </View>
        <View className="area">{buildingItem?.totalArea}m²</View>
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
        mode="aspectFill"
        className="collection"
        src={require(buildingItem?.liked
          ? "@/assets/svg/heart_love.svg"
          : "@/assets/svg/heart_notLove.svg")}
      />
    </View>
  );
}
