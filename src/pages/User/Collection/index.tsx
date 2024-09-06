import { View, Text, Image } from "@tarojs/components";
import { useLoad } from "@tarojs/taro";
import BottomTabBar from "@/components/BottomTabBar";
import "./index.scss";
import { useEffect } from "react";
import Taro from "@tarojs/taro";

export default function Index() {
  useEffect(() => {
    Taro.setNavigationBarTitle({ title: "我的收藏" });
  }, []);

  const Card = ({}) => (
    <View className="card_wrap">
      <Image
        className="img_wrap"
        src="https://bkmksh.oss-accelerate.aliyuncs.com/db467fff-6838-11ef-9dc3-329037ae0fb9_00000_small.jpeg?OSSAccessKeyId=LTAI5t8GmQec8vxNsiGKcYBT&Expires=317085177816&Signature=B81tkjKhd9v30B1xD2udBFL3TNI%3D"
      />
      <View className="info_wrap">
        <View className="location">衡山路8号｜4楼</View>
        <View className="area">面积：1000m²</View>
        <View className="price">5.5/m²/天</View>
      </View>
      <Image
        className="collection"
        src={require("@/assets/svg/heart_love.svg")}
      />
    </View>
  );

  return (
    <View className="user_collection_wrapper">
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
    </View>
  );
}
