import { useState } from "react";
import Taro from "@tarojs/taro";
import { AtTabBar } from "taro-ui";
import "./index.scss";

const tabList = [
  { title: "日历", iconType: "calendar" },
  { title: "日程", iconType: "playlist" },
  { title: "黄历", iconType: "edit" },
];

interface IBottomTabBarProps {
  currentIndex: number;
}

const indexToUrl = {
  0: "/pages/index/index",
  1: "/pages/Schedule/index",
  2: "/pages/Almanac/index",
};

const BottomTabBar: React.FC<IBottomTabBarProps> = ({ currentIndex }) => {
  const handleClick = (value) => {
    Taro.switchTab({ url: indexToUrl[value] });
  };

  return (
    <AtTabBar tabList={tabList} onClick={handleClick} current={currentIndex} />
  );
};

export default BottomTabBar;
