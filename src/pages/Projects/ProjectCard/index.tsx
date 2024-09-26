import { View, Image, Text } from "@tarojs/components";
import { useLoad } from "@tarojs/taro";
import BottomTabBar from "@/components/BottomTabBar";
import { useEffect } from "react";
import "./index.scss";
import Taro from "@tarojs/taro";
import LocationSvg from "@/assets/svg/location.svg";

export default function Index({ projectItem }) {
  useEffect(() => {
    Taro.setNavigationBarTitle({ title: "我的收藏" });
  }, []);

  return (
    <View
      className="project_card_wrap"
      onClick={() => {
        Taro.navigateTo({
          url: `/pages/Projects/ProjectDetail/index?id=${projectItem?.id}`,
        });
      }}
    >
      <Image className="img_wrap" src={projectItem?.thumbnail} />
      <View className="info_wrap">
        <View className="location">{projectItem?.parkName}</View>
        <View className="area">
          {projectItem?.city}
          {projectItem?.districtName}
          {projectItem?.address}
        </View>
        <View className="price">
          <Image src={LocationSvg} />
          <Text>{projectItem?.districtName}</Text>
        </View>
      </View>
    </View>
  );
}
