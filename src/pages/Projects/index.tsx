import { View, Image, Text, Input } from "@tarojs/components";
import { useDidHide, useDidShow, useLoad, useUnload } from "@tarojs/taro";
import BottomTabBar from "@/components/BottomTabBar";
import { useEffect, useRef, useState } from "react";
import "./index.scss";
import ProjectCard from "./ProjectCard";
import Taro from "@tarojs/taro";
import MapMode from "@/assets/svg/mapMode.svg";
import { Picker } from "@tarojs/components";
import DownSvg from "@/assets/svg/down.svg";
import SearchSvg from "@/assets/svg/search.svg";
import BlueLocationSvg from "@/assets/svg/location-blue.svg";
import TopNav from "@/components/TopNav";

const mockPlaces = {
  selector: ["美国", "中国", "巴西", "日本"],
  timeSel: "12:01",
  dateSel: "2018-04-22",
};

export default function Index() {
  const [selectPlace, setSelectPlace] = useState("中国");
  const [searchValue, setSearchValue] = useState("");
  const inputRef = useRef<any>(null);
  const [isInputFocus, setIsInputFocus] = useState(false);
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

  const handleFocusInput = () => {
    const from = Taro.getStorageSync("fromPage");
    if (!!from) {
      setTimeout(() => {
        setIsInputFocus(true);
      }, 100); // 确保视图更新，时间可以调整
    }
  };

  useLoad(() => {
    setNavHeight(getNavHeight());
    Taro.setNavigationBarTitle({ title: "我的收藏" });
    handleFocusInput();
  });

  useDidShow(() => {
    handleFocusInput();
  });

  useUnload(() => {
    Taro.removeStorageSync("fromPage");
    setIsInputFocus(false);
  });

  useDidHide(() => {
    Taro.removeStorageSync("fromPage");
    setIsInputFocus(false);
  });

  return (
    <View className="page_view">
      <TopNav title={"项目"} />
      <View className="project_wrapper">
        <View className="searchWrap">
          <View className="choose_place">
            <View className="page_section">
              <Picker
                mode="selector"
                range={mockPlaces.selector}
                onChange={(target) =>
                  setSelectPlace(mockPlaces?.selector?.[target.detail.value])
                }
              >
                <View className="select_location_wrap">
                  {selectPlace}
                  <Image src={DownSvg} />
                </View>
              </Picker>
            </View>
          </View>
          <View className="search">
            <Input
              id="searchInput"
              focus={isInputFocus}
              type="text"
              ref={inputRef}
              placeholder="搜索项目"
              value={searchValue}
              onInput={(target) => setSearchValue(target?.detail?.value)}
              onBlur={() => setIsInputFocus(false)} // 当输入框失焦时将 focus 置为 false
            />
            <Image className="searchSvg" src={SearchSvg} />
          </View>
          <Image
            className="mode_wrap_img"
            src={MapMode}
            onClick={() =>
              Taro.navigateTo({
                url: "/pages/ProjectMap/index",
              })
            }
          />
        </View>
        <View
          className="list_wrap"
          style={{
            height:
              Taro.getSystemInfoSync()?.screenHeight - navHeight - 16 - 38,
          }}
        >
          <ProjectCard />
          <ProjectCard />
          <ProjectCard />
          <ProjectCard />
          <ProjectCard />
          <ProjectCard />
          <ProjectCard />
          <ProjectCard />
        </View>
      </View>
      <BottomTabBar currentIndex={2} />
    </View>
  );
}
