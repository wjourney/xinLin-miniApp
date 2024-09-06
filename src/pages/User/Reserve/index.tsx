import { View, Text, Image } from "@tarojs/components";
import { useLoad } from "@tarojs/taro";
import BottomTabBar from "@/components/BottomTabBar";
import "./index.scss";
import { useEffect, useState } from "react";
import Taro from "@tarojs/taro";
import { AtTabs, AtTabsPane } from "taro-ui";
import TopNav from "@/components/TopNav";

export default function Index() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    Taro.setNavigationBarTitle({ title: "我的预约" });
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
    <View className="page_view">
      <TopNav title={"我的预约"} hasBack={true} />
      <View className="reserve_collection__wrapper">
        <AtTabs
          animated={false}
          current={currentIndex}
          tabList={[
            { title: "全部" },
            { title: "待确认" },
            { title: "待看房" },
            { title: "已看房" },
            { title: "已确认" },
          ]}
          onClick={(value) => setCurrentIndex(value)}
        >
          <AtTabsPane current={currentIndex} index={0}>
            weew
          </AtTabsPane>
          <AtTabsPane current={currentIndex} index={1}>
            rtrt
          </AtTabsPane>
          <AtTabsPane current={currentIndex} index={2}>
            yty
          </AtTabsPane>
          <AtTabsPane current={currentIndex} index={3}>
            标签页三的内容
          </AtTabsPane>
          <AtTabsPane current={currentIndex} index={4}>
            标签页三的内容
          </AtTabsPane>
        </AtTabs>
      </View>
    </View>
  );
}
