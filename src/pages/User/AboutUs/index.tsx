import { View, Text, Image } from "@tarojs/components";
import { useLoad } from "@tarojs/taro";
import BottomTabBar from "@/components/BottomTabBar";
import "./index.scss";
import Taro from "@tarojs/taro";
import { useEffect } from "react";
import TopNav from "@/components/TopNav";

export default function Index() {
  useEffect(() => {
    Taro.setNavigationBarTitle({ title: "关于我们" });
  }, []);

  return (
    <View className="page_view">
      <TopNav title={"关于我们"} hasBack={true} />
      <View className="about_us_wrapper">
        <View className="title">东方MOD+</View>
        <View className="content">
          半岛1919产业园前身分别是建于1919年的大中华纱厂和1920年华丰纱厂，建国后改称为上海第八棉纺织厂，是纺织鼎盛时期的“万人大厂”。2008年转型成为创意园区,以近百年保存完整的老厂房、老建筑为基础，将独特的工业资源与科技、时尚、艺术、文化等元素紧密结合。
          园区分为东、西二片区，目前对外运营的是西区，西区总占地面积为6.3万平方米，可出租面积5.7万平，集聚了一批人工智能、新材料、工业设计、电子商务类的高新技术企业。东区，正在进行转型开发，
          项目占地面积72亩，总建筑面积16.4万平方米，主要建设科研总部办公、标准办公、生活配套等多功能科创综合园区，未来半岛将形成“时尚+科技”产业高地。
        </View>
      </View>
    </View>
  );
}
