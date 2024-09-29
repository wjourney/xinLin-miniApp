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
import { get } from "http";

function getWeekDay(dateStr) {
  const days = ["日", "一", "二", "三", "四", "五", "六"];
  return `星期${days[new Date(dateStr).getUTCDay()]}`;
}

export default function Index({ reserveType, item }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    Taro.setNavigationBarTitle({ title: "我的预约" });
  }, []);

  return (
    <View
      className="card_wrap"
      onClick={() => {
        if (!!item?.houseId) {
          Taro.navigateTo({
            url: `/pages/Buildings/BuildingDetail/index?id=${item?.houseId}`,
          });
        } else {
          Taro.navigateTo({
            url: `/pages/Projects/ProjectDetail/index?id=${item?.parkId}`,
          });
        }
      }}
    >
      <View className="title_wrap">
        <Image src={Calendar} />
        <View className="title">
          {new Date(item?.reservTime)?.toISOString()?.split("T")[0]}（
          {getWeekDay(item?.reservTime)}）
          {new Date(item?.reservTime).toISOString().slice(11, 16)}
        </View>
        {/* <View className={`tag ${reserveType}`}>待确认</View> */}
      </View>
      <View className="divider"></View>
      <View className="info_wrap">
        <View className="item">
          <Image src={ReserveHome} />
          <Text>
            {item?.parkName}
            {!!item?.floor ? `｜${item?.floor}楼` : ""}
          </Text>
        </View>
        <View className="item">
          <Image src={ReserveLocation} />
          <Text>{item?.address}</Text>
        </View>
        <View className="item">
          <Image src={ReservePhone} />
          <Text>
            {item?.manager} {item?.contact}
          </Text>
        </View>
      </View>
    </View>
  );
}
