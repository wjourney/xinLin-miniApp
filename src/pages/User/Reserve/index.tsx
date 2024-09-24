import { View, Text, Image } from "@tarojs/components";
import { useLoad } from "@tarojs/taro";
import "./index.scss";
import { useEffect, useState } from "react";
import Taro from "@tarojs/taro";
import { AtTabs, AtTabsPane } from "taro-ui";
import TopNav from "@/components/TopNav";
import ReserveCard from "@/pages/User/Reserve/ReserveCard";
import { getMyCollection } from "@/api/my";

export const reserveType = {
  0: "待确认",
  1: "待看房",
  2: "已看房",
  3: "已作废",
};
// {mockData?.length === 0 ? (
//   <View className="no_message_wrap">
//     <Image src={require("@/assets/images//no-message.png")} />
//     <View className="text">暂无收藏</View>
//   </View>
const mockData = [];

export default function Index() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [listData, setListData] = useState();
  useEffect(() => {
    Taro.setNavigationBarTitle({ title: "我的预约" });
  }, []);

  // const getCollectionData = async () => {
  //   const res = await getMyCollection();
  //   const { code, data } = res;
  //   if (code === 200) {
  //     setListData(data);
  //   }
  // };

  // useEffect(() => {
  //   getCollectionData();
  // }, []);

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
            { title: "已作废" },
          ]}
          onClick={(value) => setCurrentIndex(value)}
        >
          <AtTabsPane current={currentIndex} index={0}>
            {mockData?.length === 0 ? (
              <View className="no_reserve_wrap">
                <Image src={require("@/assets/images/no-reserve.png")} />
                <View className="text">暂无预约</View>
              </View>
            ) : (
              <View className="list_wrap">
                <ReserveCard reserveType={1} />
                <ReserveCard reserveType={1} />
                <ReserveCard reserveType={1} />
                <ReserveCard reserveType={1} />
                <ReserveCard reserveType={1} />
                <ReserveCard reserveType={1} />
              </View>
            )}
          </AtTabsPane>
          <AtTabsPane current={currentIndex} index={1}>
            <View className="list_wrap">
              <ReserveCard reserveType={1} />
              <ReserveCard reserveType={1} />
              <ReserveCard reserveType={1} />
              <ReserveCard reserveType={1} />
              <ReserveCard reserveType={1} />
              <ReserveCard reserveType={1} />
            </View>
          </AtTabsPane>
          <AtTabsPane current={currentIndex} index={2}>
            <View className="list_wrap">
              <ReserveCard reserveType={1} />
              <ReserveCard reserveType={1} />
              <ReserveCard reserveType={1} />
            </View>
          </AtTabsPane>
          <AtTabsPane current={currentIndex} index={3}>
            <View className="list_wrap">
              <ReserveCard reserveType={1} />
              <ReserveCard reserveType={1} />
              <ReserveCard reserveType={1} />
              <ReserveCard reserveType={1} />
            </View>
          </AtTabsPane>
          <AtTabsPane current={currentIndex} index={4}>
            <View className="list_wrap">
              <ReserveCard reserveType={1} />
              <ReserveCard reserveType={1} />
              <ReserveCard reserveType={1} />
            </View>
          </AtTabsPane>
        </AtTabs>
      </View>
    </View>
  );
}
