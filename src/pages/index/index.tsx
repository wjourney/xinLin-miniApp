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
import { useEffect, useState } from "react";
import { Swiper, SwiperItem } from "@tarojs/components";
import TopNav from "@/components/TopNav";
import { getRecommendProjects } from "@/api/projects";
import { getRecommendBuildings } from "@/api/buildings";
import { getBanners } from "@/api/news";

const mockPlaces = {
  selector: ["杭州", "上海", "武汉", "北京"],
  timeSel: "12:01",
  dateSel: "2018-04-22",
};

export default function Index() {
  // const [currentIndex, setCurrentIndex] = useState(0);
  const [selectPlace, setSelectPlace] = useState("上海");
  const [searchValue, setSearchValue] = useState("");
  const [recommendProjects, setRecommendProjects] = useState([]);
  const [recommendBuildings, setRecommendBuildings] = useState([]);
  const [bannersData, setBannersData] = useState([]);

  const getBannersData = async () => {
    const res = await getBanners("home");
    const { code, data } = res;
    if (code === 200) {
      setBannersData(data);
    }
  };

  const handleGetRecommendProjects = async () => {
    const res = await getRecommendProjects("上海市");
    const { code, data } = res;
    if (code === 200) {
      setRecommendProjects(data);
    }
  };

  const handleGetRecommendBuildings = async () => {
    const res = await getRecommendBuildings("上海市");
    const { code, data } = res;
    if (code === 200) {
      setRecommendBuildings(data);
    }
  };

  useEffect(() => {
    handleGetRecommendProjects();
    handleGetRecommendBuildings();
    getBannersData();
  }, []);

  const BuildingCard = ({ buildingItem, index }) => (
    <View
      style={{ marginLeft: index === 0 ? 16 : 0 }}
      className="index_building_card_wrap"
      onClick={() => {
        Taro.navigateTo({
          url: `/pages/Buildings/BuildingDetail/index?id=${buildingItem?.id}`,
        });
      }}
    >
      <Image src={buildingItem?.thumbnail} />
      <Text className="location">{`${buildingItem?.parkName}｜${buildingItem?.floor}｜${buildingItem?.totalArea}m²`}</Text>
      <Text className="price">{buildingItem?.price}元/m²/天</Text>
    </View>
  );

  const ProjectCard = ({ projectItem }) => (
    <View
      className="project_card_wrap"
      onClick={() => {
        Taro.navigateTo({
          url: `/pages/Projects/ProjectDetail/index?id=${projectItem?.id}`,
        });
      }}
    >
      <Image src={projectItem?.thumbnail} />
      <Text className="location">{projectItem?.parkName}</Text>
      <Text className="price">{`${projectItem?.districtName}${projectItem?.address}`}</Text>
    </View>
  );

  return (
    <View className="page_view">
      <TopNav title={"首页"} />
      <View className="home_wrapper">
        <View className="searchWrap">
          <View className="choose_place">
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
          <View className="search">
            <Input
              type="text"
              placeholder="搜索项目"
              value={searchValue}
              onFocus={() => {
                Taro.setStorageSync("fromPage", "home");
                Taro.switchTab({
                  url: `/pages/Projects/index`,
                  // complete: () => Taro.setStorageSync("fromPage", "home"),
                });
              }}
              // onInput={(target) => setSearchValue(target?.detail?.value)}
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
          {bannersData?.map((item: any) => (
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
                更多
              </Text>
              <Image src={MoreSvg} />
            </View>
          </View>
          <View className="list_wrap">
            {recommendBuildings?.map((item, index) => (
              <BuildingCard index={index} buildingItem={item} />
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
              <Text>更多</Text>
              <Image src={MoreSvg} />
            </View>
          </View>
          <View className="list_wrap">
            {recommendProjects?.map((item) => (
              <ProjectCard projectItem={item} />
            ))}
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
          </View>
        </View>
      </View>
      <BottomTabBar currentIndex={0} />
    </View>
  );
}
