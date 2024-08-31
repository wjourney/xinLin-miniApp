import { useEffect, useState } from "react";
import Taro from "@tarojs/taro";
import { AtTabBar } from "taro-ui";
import { View, Image, Text, WebView } from "@tarojs/components";
import "./index.scss";

const TopNavBar: React.FC = () => {
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

  useEffect(() => {
    setNavHeight(getNavHeight());
  }, []);

  return (
    <View
      className="navbar_wrap"
      style={{
        height: navHeight,
      }}
    >
      <Image
        className="logo"
        src="https://bkmksh.oss-cn-shanghai.aliyuncs.com/assets/inspiration/logoWithTitle.png"
      />
    </View>
  );
};

export default TopNavBar;
