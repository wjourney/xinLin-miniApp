import { View, Text, Input, Image } from "@tarojs/components";
import Taro, { useLoad } from "@tarojs/taro";
import "./index.scss";
import BottomTabBar from "@/components/BottomTabBar";
import LocationSvg from "@/assets/svg/location.svg";
import DownSvg from "@/assets/svg/down.svg";
import SearchSvg from "@/assets/svg/search.svg";
import MoreSvg from "@/assets/svg/more.svg";
import { Picker } from "@tarojs/components";
import { AtList, AtInput, AtListItem } from "taro-ui";
import { useState } from "react";
import { Swiper, SwiperItem } from "@tarojs/components";

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

const mockBuildings = [
  {
    url: "https://bkmksh.oss-accelerate.aliyuncs.com/db467fff-6838-11ef-9dc3-329037ae0fb9_00000_small.jpeg?OSSAccessKeyId=LTAI5t8GmQec8vxNsiGKcYBT&Expires=317085177816&Signature=B81tkjKhd9v30B1xD2udBFL3TNI%3D",
    text: "锦和越界",
    price: "2.6元/m²/天",
  },
  {
    url: "https://bkmksh.oss-accelerate.aliyuncs.com/db467fff-6838-11ef-9dc3-329037ae0fb9_00000_small.jpeg?OSSAccessKeyId=LTAI5t8GmQec8vxNsiGKcYBT&Expires=317085177816&Signature=B81tkjKhd9v30B1xD2udBFL3TNI%3D",
    text: "锦和越界",
    price: "2.6元/m²/天",
  },
  {
    url: "https://bkmksh.oss-accelerate.aliyuncs.com/db467fff-6838-11ef-9dc3-329037ae0fb9_00000_small.jpeg?OSSAccessKeyId=LTAI5t8GmQec8vxNsiGKcYBT&Expires=317085177816&Signature=B81tkjKhd9v30B1xD2udBFL3TNI%3D",
    text: "锦和越界",
    price: "2.6元/m²/天",
  },
  {
    url: "https://bkmksh.oss-accelerate.aliyuncs.com/db467fff-6838-11ef-9dc3-329037ae0fb9_00000_small.jpeg?OSSAccessKeyId=LTAI5t8GmQec8vxNsiGKcYBT&Expires=317085177816&Signature=B81tkjKhd9v30B1xD2udBFL3TNI%3D",
    text: "锦和越界",
    price: "2.6元/m²/天",
  },
];

const mockPlaces = {
  selector: ["美国", "中国", "巴西", "日本"],
  timeSel: "12:01",
  dateSel: "2018-04-22",
};

export default function Index() {
  // const [currentIndex, setCurrentIndex] = useState(0);
  const [selectPlace, setSelectPlace] = useState("中国");
  const [searchValue, setSearchValue] = useState("");

  const BuildingCard = ({ index }) => (
    <View
      style={{ marginLeft: index === 0 ? 16 : 0 }}
      className="building_card_wrap"
      onClick={() => {
        Taro.navigateTo({
          url: "/pages/Buildings/BuildingDetail/index",
        });
      }}
    >
      <Image src="https://bkmksh.oss-accelerate.aliyuncs.com/db467fff-6838-11ef-9dc3-329037ae0fb9_00000_small.jpeg?OSSAccessKeyId=LTAI5t8GmQec8vxNsiGKcYBT&Expires=317085177816&Signature=B81tkjKhd9v30B1xD2udBFL3TNI%3D" />
      <Text className="location">锦和越界</Text>
      <Text className="price">2.6元/m²/天</Text>
    </View>
  );

  const ProjectCard = ({}) => (
    <View
      className="project_card_wrap"
      onClick={() => {
        Taro.navigateTo({
          url: "/pages/Projects/ProjectDetail/index",
        });
      }}
    >
      <Image src="https://bkmksh.oss-accelerate.aliyuncs.com/db467fff-6838-11ef-9dc3-329037ae0fb9_00000_small.jpeg?OSSAccessKeyId=LTAI5t8GmQec8vxNsiGKcYBT&Expires=317085177816&Signature=B81tkjKhd9v30B1xD2udBFL3TNI%3D" />
      <Text className="location">锦和越界智造局</Text>
      <Text className="price">上海市徐汇区虹梅路110号</Text>
    </View>
  );

  return (
    <View className="home_wrapper">
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
                <Image src={LocationSvg} />
                {selectPlace}
                <Image src={DownSvg} />
              </View>
            </Picker>
          </View>
        </View>
        <View className="search">
          <Input
            type="text"
            placeholder="搜索项目"
            value={searchValue}
            onInput={(target) => setSearchValue(target?.detail?.value)}
          />
          <Image className="searchSvg" src={SearchSvg} />
        </View>
      </View>
      <Swiper
        className="swiper_wrap"
        indicatorColor="#999"
        indicatorActiveColor="#333"
        circular
        indicatorDots
        autoplay
      >
        {mockImages?.map((item) => (
          <SwiperItem>
            <View className="swiper_content">
              <Image src={item?.url} />
            </View>
          </SwiperItem>
        ))}
      </Swiper>
      <View className="buildings_wrap">
        <View className="title_wrap">
          <View className="big_title_wrap">
            <Text className="main_title">推荐房源</Text>
            <Text className="prompt">精选优质房源，尽享优质服务</Text>
          </View>
          <View className="lookMore">
            <Text
              onClick={() =>
                Taro.switchTab({
                  url: "/pages/Buildings/index",
                })
              }
            >
              查看更多
            </Text>
            <Image src={MoreSvg} />
          </View>
        </View>
        <View className="list_wrap">
          {mockBuildings.map((item, index) => (
            <BuildingCard index={index} />
          ))}
          <View
            className="look_more_building"
            onClick={() =>
              Taro.switchTab({
                url: "/pages/Buildings/index",
              })
            }
          >
            <View className="text"> 查看更多</View>
            <Image src={MoreSvg} />
          </View>
        </View>
      </View>
      <View className="projects_wrap">
        <View className="title_wrap">
          <View className="big_title_wrap">
            <Text className="main_title">项目展示</Text>
            <Text className="prompt">优质服务、持续好评、热情款待</Text>
          </View>
          <View
            className="lookMore"
            onClick={() =>
              Taro.switchTab({
                url: "/pages/Projects/index",
              })
            }
          >
            <Text>查看更多</Text>
            <Image src={MoreSvg} />
          </View>
        </View>
        <View className="list_wrap">
          <ProjectCard />
          <ProjectCard />
          <ProjectCard />
          <ProjectCard />
          <View
            className="look_more_project"
            onClick={() =>
              Taro.switchTab({
                url: "/pages/Projects/index",
              })
            }
          >
            查看更多
          </View>
          {/* <BuildingCard /> */}
          {/* <BuildingCard /> */}
          {/* <BuildingCard /> */}
        </View>
      </View>
      <BottomTabBar currentIndex={0} />
    </View>
  );
}
