import { View, Image, Text, Input, ScrollView } from "@tarojs/components";
import {
  useDidHide,
  useDidShow,
  useLoad,
  useReachBottom,
  useUnload,
} from "@tarojs/taro";
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
import { getProjects, getProjectsOptions } from "@/api/projects";
import { AtLoadMore } from "taro-ui";
import Dropdown from "@/components/Dropdown";
import CheckMark from "@/assets/svg/checkmark.svg";

export default function Index() {
  const [searchValue, setSearchValue] = useState("");
  const inputRef = useRef<any>(null);
  const [isInputFocus, setIsInputFocus] = useState(false);
  const [navHeight, setNavHeight] = useState(0);
  // const [hasNext, setHasNext] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState(false);
  const [projectList, setProjectList] = useState({
    hasNext: false,
    total: 0,
    items: [],
  });
  const [filterOptions, setFilterOptions] = useState([]);
  const dropdownRef = useRef();
  const [selectCity, setSelectCity] = useState("all");
  const [showCity, setShowCity] = useState("全部");
  const pageSize = 20;
  const [areaOptions, setAreaOptions] = useState<any[]>([]);
  const [selectArea, setSelectArea] = useState("");

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

  const getFilterOptionsData = async () => {
    const res = await getProjectsOptions();
    const { code, data } = res;
    if (code === 200) {
      setFilterOptions(data);
      setAreaOptions(data);
      setSelectArea(selectCity === "all" ? "" : "all");
    }
  };

  const getProjectsList = async (
    page,
    pageSize,
    cityValue = "",
    districtNameValue = "",
    searchValue = "",
    isGetMore = false,
  ) => {
    try {
      if (page === 1) {
        setLoading(true);
        Taro.showLoading({
          title: "加载中..",
        });
      }
      const res = await getProjects({
        page,
        pageSize,
        city: cityValue === "all" ? "" : cityValue,
        districtName: districtNameValue === "all" ? "" : districtNameValue,
        searchValue,
      });
      const { code, data = {} } = res || {};
      const { hasNext, list, total } = data;

      if (code === 200) {
        setProjectList((pre) => ({
          hasNext: hasNext,
          total: total,
          items: isGetMore ? [...pre?.items, ...list] : list,
        }));
        if (hasNext) {
          setPage(page + 1);
        }
      }
    } catch (error) {
      console.log("error: ", error);
    } finally {
      if (page === 1) {
        setLoading(false);
        Taro.hideLoading();
      }
    }
  };

  const handleLoadMore = () => {
    if (projectList?.hasNext) {
      getProjectsList(
        page,
        pageSize,
        selectCity,
        selectArea,
        searchValue,
        true,
      );
    }
  };

  const handleFocusInput = () => {
    const from = Taro.getStorageSync("fromPage");
    if (!!from) {
      setTimeout(() => {
        setIsInputFocus(true);
      }, 100); // 确保视图更新，时间可以调整
    }
  };

  const handleConfirm = async () => {
    // setShowCity(selectCity === "all" ? "全部" : selectCity);
    console.log("ddwsad", selectCity, selectArea);
    if (selectCity === "all" && selectArea === "") {
      getProjectsList(
        page,
        pageSize,
        selectCity,
        selectArea,
        searchValue,
        false,
      );
      setShowCity("全部");
    } else if (selectCity === "all" && selectArea !== "") {
      getProjectsList(page, pageSize, selectArea, "", searchValue, false);
      setShowCity(selectArea);
    } else if (selectCity !== "all" && selectArea === "all") {
      setShowCity(selectCity);
      getProjectsList(
        page,
        pageSize,
        selectCity,
        selectArea,
        searchValue,
        false,
      );
    } else {
      setShowCity(selectArea);
      getProjectsList(
        page,
        pageSize,
        selectCity,
        selectArea,
        searchValue,
        false,
      );
    }
  };

  useEffect(() => {
    getProjectsList(page, pageSize, selectCity, selectArea, searchValue, false);
    getFilterOptionsData();
  }, []);

  useEffect(() => {
    if (selectCity === "all") {
      console.log(
        "ddwq",
        filterOptions?.map((item: any) => item?.name),
      );
      setAreaOptions(filterOptions);
    } else {
      setAreaOptions(
        filterOptions?.find((item: any) => item?.name === selectCity)?.children,
      );
      setSelectArea("all");
    }
  }, [selectCity]);

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

  // if (loading) {
  //   return null;
  // }

  return (
    <View className="page_view" catchMove>
      <TopNav title={"找项目"} />
      <View className="project_wrapper">
        <View className="searchWrap">
          <View className="choose_place">
            <View className="page_section">
              <Dropdown ref={dropdownRef}>
                <Dropdown.Item
                  // title={selectCity === "all" ? "全部" : showCity}
                  title={showCity}
                  key={1}
                >
                  <View className="dropdown_wrap" style={{ height: 240 }}>
                    <View className="project_wrap">
                      <View className="city_item_wrap">
                        <View
                          style={{
                            background: "all" === selectCity ? "white" : "",
                            color: "all" === selectCity ? "#2772F3" : "",
                          }}
                          className="item"
                          onClick={() => {
                            setSelectCity("all");
                            setSelectArea("");
                          }}
                        >
                          全部
                        </View>
                        {filterOptions?.map((item: any) => (
                          <View
                            style={{
                              background:
                                item?.name === selectCity ? "white" : "",
                              color: item?.name === selectCity ? "#2772F3" : "",
                            }}
                            className="item"
                            onClick={() => {
                              setSelectCity(item?.name);
                              setSelectArea("");
                            }}
                          >
                            {item?.name}
                          </View>
                        ))}
                      </View>
                      <View className="project_item_wrap">
                        {selectCity !== "all" && (
                          <View
                            style={{
                              background: "all" === selectArea ? "white" : "",
                              color: "all" === selectArea ? "#2772F3" : "",
                            }}
                            onClick={() => setSelectArea("all")}
                            className="item_warp"
                          >
                            <View
                              className="text"
                              style={{
                                color: "all" === selectArea ? "#2772F3" : "",
                              }}
                            >
                              全部
                            </View>
                            {"all" === selectArea && <Image src={CheckMark} />}
                          </View>
                        )}
                        {areaOptions?.map((item: any) => (
                          <View
                            style={{
                              background:
                                item?.name === selectArea ? "white" : "",
                              color: item?.name === selectArea ? "#2772F3" : "",
                            }}
                            onClick={() => setSelectArea(item?.name)}
                            className="item_warp"
                          >
                            <View
                              className="text"
                              style={{
                                color:
                                  item?.name === selectArea ? "#2772F3" : "",
                              }}
                            >
                              {item?.name}
                            </View>
                            {item?.name === selectArea && (
                              <Image src={CheckMark} />
                            )}
                          </View>
                        ))}
                      </View>

                      <View></View>
                    </View>
                    <View className="btn_wrap">
                      <View className="rest">重置</View>
                      <View
                        className="confirm"
                        onClick={() => {
                          dropdownRef?.current?.close();
                          handleConfirm();
                        }}
                      >
                        确认
                      </View>
                    </View>
                  </View>
                </Dropdown.Item>
              </Dropdown>
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
            <Image
              className="searchSvg"
              src={SearchSvg}
              onClick={() => {
                console.log("ffff", searchValue);
                getProjectsList(
                  page,
                  pageSize,
                  selectCity,
                  selectArea,
                  searchValue,
                  false,
                );
              }}
            />
          </View>
          <View className="mode_wrap">
            <Image
              className="mode_wrap_img"
              src={MapMode}
              onClick={() =>
                Taro.navigateTo({
                  url: "/pages/ProjectMap/index",
                })
              }
            />
            <View className="mode_text">地图模式</View>
          </View>
        </View>
        <ScrollView
          className="list_wrap"
          id={"scroll-views"}
          onScrollToLower={handleLoadMore}
          lowerThreshold={100}
          scrollY={true}
          style={{
            height:
              Taro.getSystemInfoSync()?.screenHeight - navHeight - 16 - 38,
          }}
        >
          {projectList?.items?.map((item) => (
            <ProjectCard projectItem={item} />
          ))}
          {projectList?.hasNext ? (
            <AtLoadMore
              style={{
                marginTop: 12,
                display: "flex",
                justifyContent: "center",
                fontSize: 13,
              }}
              status={"loading"}
              loadingText="正在加载..."
            />
          ) : (
            <View style={{ height: 34 }}></View>
          )}
        </ScrollView>
      </View>
      <BottomTabBar currentIndex={2} />
    </View>
  );
}
