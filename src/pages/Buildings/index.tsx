import { useEffect, useRef, useState } from "react";
import { View, Text, Image, Button } from "@tarojs/components";
import { useLoad } from "@tarojs/taro";
import BottomTabBar from "@/components/BottomTabBar";
import "./index.scss";
import BuildingCard from "./BuildingCard";
import Dropdown from "@/components/Dropdown";
import { AtTag } from "taro-ui";
import TopNav from "@/components/TopNav";
import Taro from "@tarojs/taro";

const mockPlace = [
  "全部",
  "上海市",
  "杭州市",
  "南京市",
  "北京市",
  "武汉市",
  "南京市",
];

const mockProjects = [
  "全部",
  "项目1",
  "项目2",
  "项目3",
  "项目4",
  "项目5",
  "项目6",
  "项目7",
  "项目8",
  "项目9",
];

export default function Index() {
  // const [currentIndex, setCurrentIndex] = useState(0);
  const dropdownRef = useRef();

  const [navHeight, setNavHeight] = useState(0);

  const getNavHeight = () => {
    // 获取系统信息
    const systemInfo = Taro.getSystemInfoSync();
    // 获取胶囊信息
    const menuButtonInfo = Taro.getMenuButtonBoundingClientRect();

    // 状态栏高度 获取不到的情况给通用的44  图中的1
    const statusBarHeight = systemInfo.statusBarHeight ?? 44;

    // 状态栏到胶囊的间距 图中的2
    const menuButtonStatusBarGap = menuButtonInfo.top - statusBarHeight;

    // 导航栏高度 = 状态栏到胶囊的间距（胶囊距上距离-状态栏高度） * 2 + 胶囊高度 + 状态栏高度   1+ 2 + 2 + 3
    const navBarHeight =
      menuButtonStatusBarGap * 2 + menuButtonInfo.height + statusBarHeight;

    return navBarHeight;
  };
  console.log("navHeight", navHeight);
  useEffect(() => {
    setNavHeight(getNavHeight());
  }, []);

  return (
    <View className="page_view">
      <TopNav title={"房源"} />
      <View className="buildings_wrapper">
        <Dropdown ref={dropdownRef}>
          <Dropdown.Item title="全部项目" key={1}>
            <View className="dropdown_wrap" style={{ height: 240 }}>
              <View className="project_wrap">
                <View className="city_item_wrap">
                  <View className="item">上海市</View>
                  <View className="item">上海市</View>
                  <View className="item">上海市</View>
                </View>
                <View className="area_item_wrap">
                  <View className="item">徐汇区</View>
                  <View className="item">青浦区</View>
                  <View className="item">嘉定区</View>
                </View>
                <View className="project_item_wrap">
                  <View className="item">衡山路8号</View>
                  <View className="item">衡山路8号</View>
                  <View className="item">衡山路8号</View>
                </View>
                <View></View>
              </View>
              <View className="btn_wrap">
                <View className="rest">重置</View>
                <View className="confirm">确认</View>
              </View>
            </View>
          </Dropdown.Item>
          <Dropdown.Item title="业态" key={2}>
            <View className="dropdown_wrap" style={{ height: 162 }}>
              <View className="business_wrap">
                <View className="item">全部</View>
                <View className="item">商业</View>
                <View className="item" style={{ borderBottom: "none" }}>
                  办公
                </View>
              </View>
              <View className="btn_wrap">
                <View className="rest">重置</View>
                <View className="confirm">确认</View>
              </View>
            </View>
          </Dropdown.Item>
          <Dropdown.Item title="价格" key={3}>
            <View className="dropdown_wrap" style={{ height: 162 }}>
              <View className="price_wrap">
                <AtTag>1-3元/㎡/天</AtTag>
                <AtTag>1-3元/㎡/天</AtTag>
                <AtTag>1-3元/㎡/天</AtTag>
                <AtTag>1-3元/㎡/天</AtTag>
                <AtTag>1-3元/㎡/天</AtTag>
                <AtTag>1-3元/㎡/天</AtTag>
              </View>

              <View className="btn_wrap">
                <View className="rest">重置</View>
                <View className="confirm">确认</View>
              </View>
            </View>
          </Dropdown.Item>
          <Dropdown.Item title="面积" key={4}>
            <View className="dropdown_wrap" style={{ height: 162 }}>
              <View className="area_wrap">
                <AtTag>0-100㎡</AtTag>
                <AtTag>0-100㎡</AtTag>
                <AtTag>0-100㎡</AtTag>
                <AtTag>0-100㎡</AtTag>
                <AtTag>0-100㎡</AtTag>
                <AtTag>0-100㎡</AtTag>
              </View>
              <View className="btn_wrap">
                <View className="rest">重置</View>
                <View className="confirm">确认</View>
              </View>
            </View>
          </Dropdown.Item>
        </Dropdown>
        <View
          className="list_wrap"
          style={{
            height:
              Taro.getSystemInfoSync()?.screenHeight - navHeight - 16 - 38,
          }}
        >
          <BuildingCard />
          <BuildingCard />
          <BuildingCard />
          <BuildingCard />
          <BuildingCard />
          <BuildingCard />
          <BuildingCard />
          <BuildingCard />
          <BuildingCard />
          <BuildingCard />
        </View>
      </View>
      <BottomTabBar currentIndex={1} />
    </View>
  );
}
