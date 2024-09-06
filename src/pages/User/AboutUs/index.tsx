import { View, Text, Image } from "@tarojs/components";
import { useLoad } from "@tarojs/taro";
import BottomTabBar from "@/components/BottomTabBar";
import "./index.scss";
import Taro from "@tarojs/taro";
import { useEffect } from "react";

export default function Index() {
  useEffect(() => {
    Taro.setNavigationBarTitle({ title: "关于我们" });
  }, []);

  return (
    <View className="about_us_wrapper">
      <View className="content">
        这里是欣宁招商的介绍这里是欣宁招商的介绍这里是欣宁招商的介绍这里是欣宁招商的介绍这里是欣宁招商的介绍这里是欣宁招商的介绍这里是欣宁招商的介绍这里是欣宁招商的介绍这里是欣宁招商的介绍这里是欣宁招商的介绍这里是欣宁招商的介绍这里是欣宁招商的介绍这里是欣宁招商的介绍这里是欣宁招商的介绍这里是欣宁招商的介绍这里是欣宁招商的介绍这里是欣宁招商的介绍这里是欣宁招商的介绍这里是欣宁招商的介绍这里是欣宁招商的介绍这里是欣宁招商的介绍这里是欣宁招商的介绍这里是欣宁招商的介绍这里是欣宁招商的介绍这里是欣宁招商的介绍
      </View>
    </View>
  );
}
