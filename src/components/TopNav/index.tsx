import { View, Text, Input, Image } from "@tarojs/components";
import Taro, { useLoad } from "@tarojs/taro";
import "./index.scss";
import { Picker } from "@tarojs/components";
import { AtList, AtInput, AtListItem } from "taro-ui";
import { useEffect, useState } from "react";
import { Swiper, SwiperItem } from "@tarojs/components";
import BackSvg from "@/assets/svg/back.svg";

export default function Index({
  title,
  hasBack = false,
  backFn = () => {
    Taro.navigateBack();
  },
}) {
  const [navHeight, setNavHeight] = useState<number>();
  const [statusBarHeight, setStatusBarHeight] = useState<number>();

  useEffect(() => {
    // 获取系统信息
    const systemInfo = Taro.getSystemInfoSync();

    // 获取状态栏信息
    const menuButtonInfo = Taro.getMenuButtonBoundingClientRect(); //胶囊相关信息

    if (!systemInfo?.statusBarHeight) return;
    const statusBarHeight = systemInfo?.statusBarHeight || 0;
    setStatusBarHeight(statusBarHeight);
    const height =
      menuButtonInfo.height +
      (menuButtonInfo.top - statusBarHeight) * 2 +
      statusBarHeight;
    setNavHeight(height);
  }, []);

  return (
    <View
      className="top_nav_wrap"
      style={{
        height: navHeight,
        paddingTop: statusBarHeight,
        // ...style,
      }}
    >
      {hasBack && (
        <View className="back_wrap" onClick={() => backFn()}>
          <Image src={BackSvg} />
        </View>
      )}

      <Text> {title}</Text>
    </View>
  );
}
