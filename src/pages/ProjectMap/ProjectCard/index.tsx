import { View, Image, Text } from "@tarojs/components";
import { useLoad } from "@tarojs/taro";
import BottomTabBar from "@/components/BottomTabBar";
import { useEffect } from "react";
import "./index.scss";
import Taro from "@tarojs/taro";
import LocationSvg from "@/assets/svg/location.svg";

export default function Index({ item }) {
  useEffect(() => {
    Taro.setNavigationBarTitle({ title: "我的收藏" });
  }, []);

  return (
    <View
      className="project_map_card_wrap"
      onClick={() => {
        Taro.navigateTo({
          url: `/pages/Projects/ProjectDetail/index?id=${item?.id}`,
        });
      }}
    >
      <Image className="img_wrap" src={item?.thumbnail} mode="aspectFill" />
      <View className="info_wrap">
        <View className="location">{item?.parkName} </View>
        <View className="area">
          {item?.districtName}
          {item?.address}
        </View>
        <View className="price">
          <Image src={LocationSvg} />
          <Text>徐汇区</Text>
        </View>
      </View>
    </View>
  );
}
