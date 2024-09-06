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
      <TopNav title={"我的消息"} hasBack={true} />
      <View className="about_us_wrapper">
        <View className="content">
          这里是欣宁招商的介绍这里是欣宁招商的介绍这里是欣宁招商的介绍这里是欣宁招商的介绍这里是欣宁招商的介绍这里是欣宁招商的介绍这里是欣宁招商的介绍这里是欣宁招商的介绍这里是欣宁招商的介绍这里是欣宁招商的介绍这里是欣宁招商的介绍这里是欣宁招商的介绍这里是欣宁招商的介绍这里是欣宁招商的介绍这里是欣宁招商的介绍这里是欣宁招商的介绍这里是欣宁招商的介绍这里是欣宁招商的介绍这里是欣宁招商的介绍这里是欣宁招商的介绍这里是欣宁招商的介绍这里是欣宁招商的介绍这里是欣宁招商的介绍这里是欣宁招商的介绍这里是欣宁招商的介绍
        </View>
      </View>
    </View>
  );
}
