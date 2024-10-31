import { View, Image, WebView } from "@tarojs/components";
import { useLoad } from "@tarojs/taro";
import BottomTabBar from "@/components/BottomTabBar";
import { Swiper, SwiperItem } from "@tarojs/components";
import "./index.scss";
import { AtTabs, AtTabsPane } from "taro-ui";
import { useEffect, useState } from "react";
import TopNav from "@/components/TopNav";
import Taro from "@tarojs/taro";
import { getRecommendNews, getNews } from "@/api/news";
import { getBanners } from "@/api/news";

export default function Index() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [recommendNewsData, setRecommendNewsData] = useState([]);
  const [newsData, setNewsData] = useState([]);

  const getRecommendNewsData = async () => {
    const res = await getBanners("news");
    const { code, data } = res;
    if (code === 200) {
      setRecommendNewsData(data);
    }
  };

  const getNewsData = async (category) => {
    const param = category == 1 ? 2 : category;
    const res = await getNews(param);
    const { code, data } = res;
    if (code === 200) {
      setNewsData(data);
    }
  };

  useEffect(() => {
    getRecommendNewsData();
    getNewsData(currentIndex + 1);
  }, []);

  const handleNavigate = (url) => {
    Taro.navigateTo({
      url: `/pages/webview/index?url=${encodeURIComponent(url)}`,
    });
  };

  const Card = ({ newsItem }) => (
    <View className="card_wrap" onClick={() => handleNavigate(newsItem?.url)}>
      <Image className="img_wrap" src={newsItem?.image} mode="aspectFill" />
      <View className="info_wrap">
        <View className="des">{newsItem?.title}</View>
        <View className="date">
          {new Date(newsItem?.updatedAt)?.toISOString()?.split("T")[0]}
        </View>
      </View>
    </View>
  );

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
          {recommendNewsData?.map((item: any) => (
            <SwiperItem>
              <View className="swiper_content">
                <Image src={item?.url} mode="aspectFill" />
              </View>
              {/* <View className="demo-text-1">1</View> */}
            </SwiperItem>
          ))}
        </Swiper>
        <AtTabs
          animated={false}
          current={currentIndex}
          tabList={[
            { title: "城市热点" },
            { title: "园区服务" },
            { title: "园区荣誉" },
          ]}
          onClick={(value) => {
            setCurrentIndex(value);
            getNewsData(value + 1);
          }}
        >
          <AtTabsPane current={currentIndex} index={0}>
            <View className="news_list_wrap">
              {newsData?.map((item) => (
                <Card newsItem={item} />
              ))}
              <View style={{ height: 34 }}></View>
            </View>
          </AtTabsPane>
          <AtTabsPane current={currentIndex} index={1}>
            <View className="news_list_wrap">
              {newsData?.map((item) => (
                <Card newsItem={item} />
              ))}
              <View style={{ height: 34 }}></View>
            </View>
          </AtTabsPane>
          <AtTabsPane current={currentIndex} index={2}>
            <View className="news_list_wrap">
              {newsData?.map((item) => (
                <Card newsItem={item} />
              ))}
              <View style={{ height: 34 }}></View>
            </View>
          </AtTabsPane>
        </AtTabs>
        <BottomTabBar currentIndex={3} />
      </View>
    </View>
  );
}
