import { View, Image } from "@tarojs/components";
import { useLoad } from "@tarojs/taro";
import BottomTabBar from "@/components/BottomTabBar";
import { Swiper, SwiperItem } from "@tarojs/components";
import "./index.scss";
import { AtTabs, AtTabsPane } from "taro-ui";
import { useEffect, useState } from "react";
import TopNav from "@/components/TopNav";
import Taro from "@tarojs/taro";

const mockImages = [
  {
    key: 1,
    url: "https://bkmksh.oss-accelerate.aliyuncs.com/f2b0e436-69e0-11ef-b2bd-0ad83e4969ec_00001_small.jpeg?OSSAccessKeyId=LTAI5t8GmQec8vxNsiGKcYBT&Expires=317085359729&Signature=0jUiIDYyudsjgMJtjk52NFcQh1g%3D",
    desc: "第一张图片第一张图片第一张图片第一张图片第一张图片第一张图片第一张图片第一张图片",
  },
  {
    key: 1,
    url: "https://bkmksh.oss-accelerate.aliyuncs.com/f2b0e436-69e0-11ef-b2bd-0ad83e4969ec_00000_small.jpeg?OSSAccessKeyId=LTAI5t8GmQec8vxNsiGKcYBT&Expires=317085359888&Signature=bM73%2BTaDTGB1VAZIYin4zqrQNP8%3D",
    desc: "第二张图片第二张图片第二张图片第二张图片第二张图片",
  },
  {
    key: 1,
    url: "https://bkmksh.oss-accelerate.aliyuncs.com/db467fff-6838-11ef-9dc3-329037ae0fb9_00001_small.jpeg?OSSAccessKeyId=LTAI5t8GmQec8vxNsiGKcYBT&Expires=317085177816&Signature=SgNVmPpoQ%2FBLyDIsMAOGGeHOL1I%3D",
    desc: "第三张图片第三张图片第三张图片第三张图片第三张图片第三张图片第三张图片第三张图片第三张图片",
  },
];

const Card = ({}) => (
  <View className="card_wrap">
    <Image
      className="img_wrap"
      src="https://bkmksh.oss-accelerate.aliyuncs.com/db467fff-6838-11ef-9dc3-329037ae0fb9_00000_small.jpeg?OSSAccessKeyId=LTAI5t8GmQec8vxNsiGKcYBT&Expires=317085177816&Signature=B81tkjKhd9v30B1xD2udBFL3TNI%3D"
    />
    <View className="info_wrap">
      <View className="des">
        这是一条咨讯不忘初心、牢记使命地点的主题教育知识学习做党的忠实拥护者和建设者顶顶顶
      </View>
      <View className="date">2024-4-23</View>
    </View>
  </View>
);

export default function Index() {
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <View className="page_view">
      <TopNav title={"资讯"} />
      <View className="news_wrapper">
        <Swiper
          className="swiper_wrap"
          indicatorColor="#999"
          indicatorActiveColor="#333"
          circular
          indicatorDots
          // autoplay
        >
          {mockImages?.map((item) => (
            <SwiperItem>
              <View className="swiper_content">
                <Image src={item?.url} />
              </View>
              {/* <View className="demo-text-1">1</View> */}
            </SwiperItem>
          ))}
        </Swiper>
        <AtTabs
          animated={false}
          current={currentIndex}
          tabList={[
            { title: "关于欣宁" },
            { title: "城市更新" },
            { title: "越界生活" },
          ]}
          onClick={(value) => setCurrentIndex(value)}
        >
          <AtTabsPane current={currentIndex} index={0}>
            <View className="list_wrap">
              <Card />
              <Card />
              <Card />
              <Card />
              <Card />
              <Card />
              <Card />
              <Card />
              <Card />
              <Card />
              <Card />
              <Card />
            </View>
          </AtTabsPane>
          <AtTabsPane current={currentIndex} index={1}>
            <View className="list_wrap">
              <Card />
              <Card />
              <Card />
            </View>
          </AtTabsPane>
          <AtTabsPane current={currentIndex} index={2}>
            <View className="list_wrap">
              <Card />
              <Card />
              <Card />
            </View>
          </AtTabsPane>
        </AtTabs>
        <BottomTabBar currentIndex={3} />
      </View>
    </View>
  );
}
