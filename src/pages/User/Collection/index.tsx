import { View, Text, Image } from "@tarojs/components";
import { useLoad } from "@tarojs/taro";
import BottomTabBar from "@/components/BottomTabBar";
import "./index.scss";
import { useEffect } from "react";
import Taro from "@tarojs/taro";
import TopNav from "@/components/TopNav";
import CollectionCard from "@/pages/User/Collection/CollectionCard";

const mockData = [];

export default function Index() {
  useEffect(() => {
    Taro.setNavigationBarTitle({ title: "我的收藏" });
  }, []);

  return (
    <View className="page_view">
      <TopNav title={"我的收藏"} hasBack={true} />
      {mockData?.length === 0 ? (
        <View className="no_collection_wrap">
          <Image src={require("@/assets/images/no-collection.png")} />
          <View className="text">暂无收藏</View>
        </View>
      ) : (
        <View className="user_collection_wrapper">
          <CollectionCard />
          <CollectionCard />
          <CollectionCard />
          <CollectionCard />
          <CollectionCard />
          <CollectionCard />
          <CollectionCard />
          <CollectionCard />
        </View>
      )}
    </View>
  );
}
