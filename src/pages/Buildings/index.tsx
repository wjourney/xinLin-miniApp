import { useEffect, useRef, useState } from "react";
import { View, Text, Image, Button, ScrollView } from "@tarojs/components";
import { useLoad } from "@tarojs/taro";
import BottomTabBar from "@/components/BottomTabBar";
import "./index.scss";
import BuildingCard from "@/components/BuildingCard";
import Dropdown from "@/components/Dropdown";
import { AtTag } from "taro-ui";
import TopNav from "@/components/TopNav";
import Taro from "@tarojs/taro";
import CheckMark from "@/assets/svg/checkmark.svg";
import React from "react";
import VirtualList from "@tarojs/components-advanced/dist/components/virtual-list";
import { AtLoadMore, AtFloatLayout } from "taro-ui";
import {
  getBuildings,
  getBuildingDetail,
  getBuildingsOptions,
} from "@/api/buildings";

const mockPlace = [
  "全部",
  "上海市",
  "杭州市",
  "南京市",
  "北京市",
  "武汉市",
  "南京市2",
  "南京市23",
  "南京市222",
  "南京市12",
];

const mockAreas = [
  "全部",
  "青浦区",
  "徐汇区",
  "静安区",
  "宝山区",
  "闵行区",
  "徐汇区2",
  "徐汇区23",
  "徐汇区21",
  "徐汇区2221",
  "徐汇区124",
];

const mockProjects = [
  "项目1",
  "项目2",
  "项目3",
  "项目4",
  "项目5",
  "项目6",
  "项目7",
  "项目8",
  "项目9",
];

const mockPrices = ["1-3", "2-6", "7-13", "14-34", "35-39"];
const mockAcreage = ["0-100", "100-300", "300-600", "600-1200", "1200-1700"];

enum BusinessType {
  all = "全部",
  office = "办公",
  business = "商业",
}

export default function Index() {
  const dropdownRef = useRef();
  const [navHeight, setNavHeight] = useState(0);
  const [selectCity, setSelectCity] = useState("全部");
  const [selectArea, setSelectArea] = useState("全部");
  const [selectProject, setSelectProject] = useState("项目1");
  const [selectBusinessType, setSelectBusinessType] = useState("all");
  const [selectPrice, setSelectPrice] = useState("1-3");
  const [selectAcreage, setSelectAcreage] = useState("0-100");
  const [loading, setLoading] = useState(false);
  // const [listData, setListData] = useState<any>([]);
  // const [hasNext, setHasNext] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [buildingList, setBuildingList] = useState({
    hasNext: false,
    total: 0,
    items: [],
  });
  const [filterOptions, setFilterOptions] = useState();

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

  const getBuildingsList = async () => {
    try {
      if (page === 1) {
        setLoading(true);
        Taro.showLoading({
          title: "加载中..",
        });
      }
      const res = await getBuildings({
        page,
        pageSize: 20,
      });
      const { code, data = {} } = res || {};
      const { hasNext, data: list, total = 0 } = data;
      if (code === 200) {
        setBuildingList((pre) => ({
          hasNext: hasNext,
          total: total,
          items: [...pre?.items, ...list],
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

  const getFilterOptionsData = async () => {
    const res = await getBuildingsOptions();
  };

  const handleLoadMore = () => {
    if (buildingList?.hasNext) {
      getBuildingsList();
    }
  };

  useEffect(() => {
    setNavHeight(getNavHeight());
    getBuildingsList();
    getFilterOptionsData();
  }, []);

  const updateListAfterCollect = (id, liked) => {
    const newData = buildingList?.items?.map((item: any) => {
      if (item?.id === id) {
        return {
          ...item,
          liked: liked,
        };
      } else {
        return item;
      }
    });
    setBuildingList((pre: any) => ({
      ...pre,
      items: newData,
    }));
  };

  return (
    <View className="page_view">
      <TopNav title={"房源"} />
      <View className="buildings_wrapper">
        <Dropdown ref={dropdownRef}>
          <Dropdown.Item title="全部项目" key={1}>
            <View className="dropdown_wrap" style={{ height: 240 }}>
              <View className="project_wrap">
                <View className="city_item_wrap">
                  {mockPlace?.map((item) => (
                    <View
                      style={{
                        background: item === selectCity ? "white" : "",
                        color: item === selectCity ? "#4BA8E6" : "",
                      }}
                      className="item"
                      onClick={() => setSelectCity(item)}
                    >
                      {item}
                    </View>
                  ))}
                </View>
                <View className="area_item_wrap">
                  {mockAreas?.map((item) => (
                    <View
                      style={{
                        background: item === selectArea ? "white" : "",
                        color: item === selectArea ? "#4BA8E6" : "",
                      }}
                      onClick={() => setSelectArea(item)}
                      className="item"
                    >
                      {item}
                    </View>
                  ))}
                </View>
                <View className="project_item_wrap">
                  {mockProjects?.map((item) => (
                    <View
                      style={{
                        background: item === selectProject ? "white" : "",
                        color: item === selectProject ? "#4BA8E6" : "",
                      }}
                      onClick={() => setSelectProject(item)}
                      className="item_warp"
                    >
                      <Text> {item}</Text>
                      {item === selectProject && <Image src={CheckMark} />}
                    </View>
                  ))}
                </View>
                <View></View>
              </View>
              <View className="btn_wrap">
                <View className="rest">重置</View>
                <View
                  className="confirm"
                  onClick={() => dropdownRef?.current?.close()}
                >
                  确认
                </View>
              </View>
            </View>
          </Dropdown.Item>
          <Dropdown.Item title="业态" key={2}>
            <View className="dropdown_wrap" style={{ height: 162 }}>
              <View className="business_wrap">
                {Object.entries(BusinessType)?.map(([value, label], index) => (
                  <View
                    className="item"
                    onClick={() => setSelectBusinessType(value)}
                    style={{
                      borderBottom:
                        index === Object.entries(BusinessType)?.length - 1
                          ? "none"
                          : "",
                      color: value === selectBusinessType ? "#4BA8E6" : "",
                    }}
                  >
                    {label}
                  </View>
                ))}

                {/* <View className="item">商业</View>
                <View className="item" style={{ borderBottom: "none" }}>
                  办公
                </View> */}
              </View>
              <View className="btn_wrap">
                <View className="rest">重置</View>
                <View
                  className="confirm"
                  onClick={() => dropdownRef?.current?.close()}
                >
                  确认
                </View>
              </View>
            </View>
          </Dropdown.Item>
          <Dropdown.Item title="价格" key={3}>
            <View className="dropdown_wrap" style={{ height: 162 }}>
              <View className="price_wrap">
                {mockPrices?.map((item) => (
                  <View
                    className="tag"
                    style={{
                      background:
                        item === selectPrice ? "rgb(223, 235, 241)" : "",
                      color: item === selectPrice ? "#4BA8ED" : "",
                    }}
                    onClick={() => setSelectPrice(item)}
                  >{`${item}元/㎡/天`}</View>
                ))}
              </View>
              <View className="btn_wrap">
                <View className="rest">重置</View>
                <View
                  className="confirm"
                  onClick={() => dropdownRef?.current?.close()}
                >
                  确认
                </View>
              </View>
            </View>
          </Dropdown.Item>
          <Dropdown.Item title="面积" key={4}>
            <View className="dropdown_wrap" style={{ height: 162 }}>
              <View className="area_wrap">
                {mockAcreage?.map((item) => (
                  <View
                    style={{
                      background:
                        item === selectAcreage ? "rgb(223, 235, 241)" : "",
                      color: item === selectAcreage ? "#4BA8ED" : "",
                    }}
                    onClick={() => setSelectAcreage(item)}
                    className="tag"
                  >{`${item}㎡`}</View>
                ))}
              </View>
              <View className="btn_wrap">
                <View className="rest">重置</View>
                <View
                  className="confirm"
                  onClick={() => dropdownRef?.current?.close()}
                >
                  确认
                </View>
              </View>
            </View>
          </Dropdown.Item>
        </Dropdown>
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
          {buildingList?.items?.map((item) => (
            <BuildingCard
              buildingItem={item}
              refreshFn={updateListAfterCollect}
            />
          ))}
          {buildingList?.hasNext ? (
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
          ) : null}
        </ScrollView>
      </View>
      <BottomTabBar currentIndex={1} />
    </View>
  );
}
