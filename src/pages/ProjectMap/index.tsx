import {
  View,
  Image,
  Map,
  Text,
  Input,
  Swiper,
  SwiperItem,
} from "@tarojs/components";
import { useLoad } from "@tarojs/taro";
import BottomTabBar from "@/components/BottomTabBar";
import { useEffect, useState } from "react";
import "./index.scss";
import Taro from "@tarojs/taro";
import MapMode from "@/assets/svg/mapMode.svg";
import { Picker } from "@tarojs/components";
import DownSvg from "@/assets/svg/down.svg";
import SearchSvg from "@/assets/svg/search.svg";
import BlueLocationSvg from "@/assets/svg/location-blue.svg";
import TopNav from "@/components/TopNav";
import LocationSvg from "@/assets/svg/location.svg";
import ProjectCard from "@/pages/ProjectMap/ProjectCard";
import clsx from "clsx";
import ListMode from "@/assets/svg/listMode.svg";
import { getMapProjects } from "@/api/projects";

const mockPlaces = {
  selector: ["杭州", "上海", "武汉", "北京"],
  timeSel: "12:01",
  dateSel: "2018-04-22",
};

export default function Index() {
  const [selectPlace, setSelectPlace] = useState("上海");
  const [searchValue, setSearchValue] = useState("");
  const [activeKey, setActiveKey] = useState("");
  const [navHeight, setNavHeight] = useState(0);
  const [screenHeight, setScreenHeight] = useState(0);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [projectList, setProjectList] = useState([]);
  const [listData, setListData] = useState([]);

  const getNavHeight = () => {
    // 获取系统信息
    const systemInfo = Taro.getSystemInfoSync();
    // console.log("ffff", systemInfo?.screenHeight);
    setScreenHeight(systemInfo?.screenHeight); //屏幕高度

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

  const getProjectsList = async () => {
    const res = await getMapProjects();
    const { code, data } = res || {};

    if (code === 200) {
      setListData(data);
      // if (hasNext) {
      //   setPage(page + 1);
      // }
    }
  };

  const handleSwiperChange = (e) => {
    setCurrentIdx(e.detail.current);
    console.log("fdfdsf", listData?.[e.detail.current]);
  };

  useEffect(() => {
    setNavHeight(getNavHeight());
    getProjectsList();
  }, []);

  console.log("dd", listData?.[currentIdx]?.longitude);
  return (
    <View className="projectMap_page_view">
      <TopNav title={"找项目"} hasBack={true} />
      <View className="project_map_wrapper">
        <View className="select_wrap">
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
          <View className="mode_wrap">
            <View className="mode_wrap_img">
              <Image
                style={{ height: 20, width: 20 }}
                src={ListMode}
                onClick={() =>
                  Taro.switchTab({
                    url: "/pages/Projects/index",
                  })
                }
              />
            </View>
            <View className="mode_text">列表模式</View>
          </View>
        </View>
        <View className="map_wrap">
          <Map
            // ref={mapRef} // 显示用户当前位置
            longitude={listData?.[currentIdx]?.longitude} //中心经度
            latitude={listData?.[currentIdx]?.latitude} //中心纬度
            scale={16} //缩放
            style={{
              width: "100%",
              height: screenHeight - navHeight - 32 - 24,
            }}
            onError={(err) => console.log(err)}
            className="map"
            markers={[
              {
                id: 1, // 标记的唯一 ID
                latitude: listData?.[currentIdx]?.latitude, // 标记的纬度
                longitude: listData?.[currentIdx]?.longitude, // 标记的经度
                title: listData?.[currentIdx]?.parkName, // 标记的标题
                iconPath: "/path/to/icon.png", // 自定义标记图标路径
                width: 20, // 图标宽度
                height: 28, // 图标高度
              },
            ]}
          />
        </View>
        <Swiper
          className="project_map_swiper"
          // autoplay
          circular
          previousMargin={"60rpx"}
          nextMargin="60rpx"
          onChange={handleSwiperChange}
        >
          {listData?.map((item, index) => (
            <SwiperItem className="swiper_item" style={{ marginRight: 12 }}>
              <View
                className={`swiper_wrap" ${
                  index === currentIdx ? "active" : ""
                } ,
                `}
              >
                <ProjectCard item={item} />
              </View>
            </SwiperItem>
          ))}

          {/* <SwiperItem>
            <View
              className={clsx("swiper__wrap", {
                // active: currentIdx === index,
              })}
            >
              <ProjectCard />
            </View>
          </SwiperItem>
          <SwiperItem>
            <View
              className={clsx("swiper__wrap", {
                // active: currentIdx === index,
              })}
            >
              <ProjectCard />
            </View>
          </SwiperItem> */}
        </Swiper>
      </View>
    </View>
  );
}
