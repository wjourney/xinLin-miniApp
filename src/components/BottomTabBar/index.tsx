import { useState } from "react";
import Taro from "@tarojs/taro";
import { AtTabBar } from "taro-ui";
import "./index.scss";
import Home from "@/assets/svg/home.svg";
import HomeBlue from "@/assets/svg/home-blue.svg";
import Buildings from "@/assets/svg/buildings.svg";
import BuildingsBlue from "@/assets/svg/buildings-blue.svg";
import Project from "@/assets/svg/project.svg";
import ProjectBlue from "@/assets/svg/project-blue.svg";
import News from "@/assets/svg/news.svg";
import NewsBlue from "@/assets/svg/news-blue.svg";
import User from "@/assets/svg/user.svg";
import UserBlue from "@/assets/svg/user-blue.svg";

interface IBottomTabBarProps {
  currentIndex: number;
}

const indexToUrl = {
  0: "/pages/index/index",
  1: "/pages/Buildings/index",
  2: "/pages/Projects/index",
  3: "/pages/News/index",
  4: "/pages/User/index",
};

const BottomTabBar: React.FC<IBottomTabBarProps> = ({ currentIndex }) => {
  const handleClick = (value) => {
    Taro.switchTab({ url: indexToUrl[value] });
  };

  const tabList = [
    { title: "首页", image: currentIndex === 0 ? HomeBlue : Home },
    { title: "房源", image: currentIndex === 1 ? BuildingsBlue : Buildings },
    { title: "项目", image: currentIndex === 2 ? ProjectBlue : Project },
    { title: "资讯", image: currentIndex === 3 ? NewsBlue : News },
    { title: "我的", image: currentIndex === 4 ? UserBlue : User },
  ];

  return (
    <AtTabBar
      fixed
      color="#999999"
      // selectedColor="#5E469F"
      iconSize={24}
      fontSize={12}
      tabList={tabList}
      onClick={handleClick}
      current={currentIndex}
    />
  );
};

export default BottomTabBar;
