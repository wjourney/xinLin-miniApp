import { View, Text, Image } from "@tarojs/components";
import { useLoad } from "@tarojs/taro";
import BottomTabBar from "@/components/BottomTabBar";
import "./index.scss";
import { useEffect, useState } from "react";
import Taro from "@tarojs/taro";
import { AtTabs, AtTabsPane } from "taro-ui";
import TopNav from "@/components/TopNav";
import Calendar from "@/assets/svg/calendar.svg";
import ReserveHome from "@/assets/svg/reserve-home.svg";
import ReserveLocation from "@/assets/svg/reserve-location.svg";
import ReservePhone from "@/assets/svg/reserve-phone.svg";

export default function Index({ reserveType }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    Taro.setNavigationBarTitle({ title: "我的预约" });
  }, []);

  return (
    <View className="card_wrap">
      <View className="title_wrap">
        <Image src={Calendar} />
        <View className="title">8/24（周六）21:40</View>
        {/* <View className={`tag ${reserveType}`}>待确认</View> */}
      </View>
      <View className="divider"></View>
      <View className="info_wrap">
        <View className="item">
          <Image src={ReserveHome} />
          <Text>锦和越界智造局｜5-6F｜锦和越界智造局</Text>
        </View>
        <View className="item">
          <Image src={ReserveLocation} />
          <Text>上海市黄浦区虹梅路1900号</Text>
        </View>
        <View className="item">
          <Image src={ReservePhone} />
          <Text>小红 1992382133</Text>
        </View>
      </View>
    </View>
  );
}
