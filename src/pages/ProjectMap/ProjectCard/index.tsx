import { View, Image, Text } from "@tarojs/components";
import { useLoad } from "@tarojs/taro";
import BottomTabBar from "@/components/BottomTabBar";
import { useEffect } from "react";
import "./index.scss";
import Taro from "@tarojs/taro";
import LocationSvg from "@/assets/svg/location.svg";

export default function Index() {
  useEffect(() => {
    Taro.setNavigationBarTitle({ title: "我的收藏" });
  }, []);

  return (
    <View
      className="project_card_wrap"
      onClick={() => {
        Taro.navigateTo({
          url: "/pages/Projects/ProjectDetail/index",
        });
      }}
    >
      <Image
        className="img_wrap"
        src="https://bkmksh.oss-accelerate.aliyuncs.com/db467fff-6838-11ef-9dc3-329037ae0fb9_00000_small.jpeg?OSSAccessKeyId=LTAI5t8GmQec8vxNsiGKcYBT&Expires=317085177816&Signature=B81tkjKhd9v30B1xD2udBFL3TNI%3D"
      />
      <View className="info_wrap">
        <View className="location">杭州锦和大厦</View>
        <View className="area">浙江省杭州市上城区西湖路999</View>
        <View className="price">
          <Image src={LocationSvg} />
          <Text>徐汇区</Text>
        </View>
      </View>
    </View>
  );
}
