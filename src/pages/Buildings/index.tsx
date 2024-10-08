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
import Login from "@/components/Login";

const pricesOptions = ["1-3", "3-5", "5-6", "6-8", "8-10", "10"];
const acreageOptions = [
  "0-100",
  "101-200",
  "201-400",
  "401-600",
  "601-1000",
  "1000",
];

enum BusinessType {
  all = "全部",
  office = "办公",
  business = "商业",
}

// 获取所有项目
const getAllProjects = (data: any[]) => {
  const result: { name?: string; id?: string }[] = [];
  const traverse = (children) => {
    children.forEach((child) => {
      // 如果有 name 和 id，则添加到结果
      if (child.name && child.id) {
        result.push({ name: child.name, id: child.id });
      }
      // 递归处理子节点
      if (child.children) {
        traverse(child.children);
      }
    });
  };
  data.forEach((item) => {
    traverse(item.children);
  });
  return result;
};

// 获取指定城市的所有项目
const getCityAllProjects = (data: any[], selectCity) => {
  const result: { name: string; id: string }[] = [];
  const traverse = (children) => {
    children.forEach((child) => {
      if (child.name && child.id) {
        result.push({ name: child.name, id: child.id });
      }
      if (child.children) {
        traverse(child.children);
      }
    });
  };
  const cityItem = data.find((item) => item.city === selectCity);
  if (cityItem) {
    traverse(cityItem.children);
  }
  return result;
};

// 根据所选城市和所选的多个区域，找到对应项目
const getCityAndAreasProjects = (
  data,
  selectCity: string,
  selectAreas: string[]
) => {
  const result: { name: string; id: string }[] = [];

  // 查找选定城市
  const cityItem = data.find((item) => item.city === selectCity);

  // 如果找到城市，遍历其子区域
  if (cityItem) {
    cityItem.children.forEach((child) => {
      // 检查子区域是否在选择的区域中
      if (selectAreas.includes(child.districtName || "")) {
        child.children?.forEach((item) => {
          // 确保 name 和 id 存在
          if (item.name && item.id) {
            result.push({ name: item.name, id: item.id });
          }
        });
      }
    });
  } else {
    console.warn(`City "${selectCity}" not found in the data.`);
  }
  return result;
};

export default function Index() {
  const dropdownRef = useRef();
  const [navHeight, setNavHeight] = useState(0);
  const [selectCity, setSelectCity] = useState("all");

  const [areaOptions, setAreaOptions] = useState<any[]>([]); // 选完城市后，区域选项
  const [selectAreas, setSelectAreas] = useState<string | string[]>(); // 选择区域，可以有多个

  const [projectOptions, setProjectOptions] = useState<any[]>([]); // 选完城市后，项目选项，由所有区域拼接而来
  const [selectProjectId, setSelectProjectId] = useState(""); // 所选项目id

  const [selectBusinessType, setSelectBusinessType] = useState(
    BusinessType.all
  );
  const [selectPrice, setSelectPrice] = useState(""); //
  const [selectAcreage, setSelectAcreage] = useState(""); // 面积
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState<number>(1);
  const [buildingList, setBuildingList] = useState({
    hasNext: false,
    total: 0,
    items: [],
  });
  const [filterOptions, setFilterOptions] = useState([]);
  const [selectCityIndex, setSelectCityIndex] = useState(0);
  const [selectDistrictIndex, setSelectDistrictIndex] = useState(0);
  const [isLoginVisible, setIsLoginVisible] = useState(false);

  // const [ selectCityIndex, setSelectCityIndex] = useState(0)

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

  const getBuildingsList = async (isGetMore = false) => {
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
        parkId: selectProjectId,
        businessType:
          selectBusinessType === BusinessType.all
            ? ""
            : selectBusinessType === BusinessType.business
            ? "SY"
            : "BG",
        area: selectAcreage,
        price: selectPrice,
      });
      const { code, data = {} } = res || {};
      const { hasNext, list, total = 0 } = data;
      if (code === 200) {
        setBuildingList((pre) => ({
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

  const getFilterOptionsData = async () => {
    const res = await getBuildingsOptions();
    const { code, data } = res;
    if (code === 200) {
      setFilterOptions(data);
    }
  };

  const handleLoadMore = () => {
    if (buildingList?.hasNext) {
      getBuildingsList(true);
    }
  };

  useEffect(() => {
    setNavHeight(getNavHeight());
    getBuildingsList(false);
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
  useEffect(() => {
    if (selectCity === "all") {
      setAreaOptions([]);
      setProjectOptions(getAllProjects(filterOptions));
    } else {
      const updateAreaOptions = filterOptions?.find(
        (item: any) => item?.city === selectCity
      )?.children;
      setAreaOptions(updateAreaOptions);

      if (selectAreas === undefined) {
        setProjectOptions([]);
      } else if (selectAreas === "all") {
        setProjectOptions(getCityAllProjects(filterOptions, selectCity));
      } else {
        const updateProjectOptions = getCityAndAreasProjects(
          filterOptions,
          selectCity,
          selectAreas
        );

        console.log(
          "updateProjectOptions",
          filterOptions,
          selectCity,
          selectAreas,
          updateProjectOptions
        );
        setProjectOptions(updateProjectOptions);
      }

      // setProjectOptions(getAllProjects(updateProjectOptions));
    }
  }, [selectCity, selectAreas, filterOptions]);

  const handleConfirm = async () => {
    getBuildingsList(false);
  };

  return (
    <View className="page_view">
      <BottomTabBar currentIndex={1} />
      <TopNav title={"房源"} />
      <View className="buildings_wrapper">
        <Dropdown ref={dropdownRef}>
          <Dropdown.Item title="全部项目" key={1}>
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
                      setSelectProjectId("");
                    }}
                  >
                    全部
                  </View>
                  {filterOptions?.map((item: any) => (
                    <View
                      style={{
                        background: item.city === selectCity ? "white" : "",
                        color: item.city === selectCity ? "#2772F3" : "",
                      }}
                      className="item"
                      onClick={() => {
                        setSelectCity(item?.city);
                        setSelectProjectId("");
                      }}
                    >
                      {item?.city}
                    </View>
                  ))}
                </View>
                {selectCity !== "all" && (
                  <View className="area_item_wrap">
                    <View
                      style={{
                        background: "all" === selectAreas ? "white" : "",
                        color: "all" === selectAreas ? "#2772F3" : "",
                      }}
                      onClick={() => {
                        setSelectAreas("all");
                        setSelectProjectId("");
                      }}
                      className="item"
                    >
                      全部
                    </View>
                    {areaOptions?.map((item) => (
                      <View
                        style={{
                          background: !!selectAreas?.includes(item.districtName)
                            ? "white"
                            : "",
                          color: !!selectAreas?.includes(item.districtName)
                            ? "#2772F3"
                            : "",
                        }}
                        onClick={() => {
                          setSelectAreas((pre: string[] | string) => {
                            if (pre === "all" || pre === undefined) {
                              return [item?.districtName];
                            } else {
                              return pre?.includes(item?.districtName)
                                ? pre?.filter(
                                    (item1) => item1 !== item?.districtName
                                  )
                                : [...pre, item?.districtName];
                            }
                          });
                          setSelectProjectId("");
                        }}
                        className="item"
                      >
                        {item?.districtName}
                      </View>
                    ))}
                  </View>
                )}
                <View className="project_item_wrap">
                  {projectOptions?.map((item) => (
                    <View
                      style={{
                        background: item?.id === selectProjectId ? "white" : "",
                        color: item?.id === selectProjectId ? "#2772F3" : "",
                      }}
                      onClick={() => setSelectProjectId(item?.id)}
                      className="item_warp"
                    >
                      <View
                        style={{
                          color: item?.id === selectProjectId ? "#2772F3" : "",
                        }}
                        className="text"
                      >
                        {item?.name}
                      </View>
                      {item?.id === selectProjectId && (
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
                      color: value === selectBusinessType ? "#2772F3" : "",
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
          <Dropdown.Item title="价格" key={3}>
            <View className="dropdown_wrap" style={{ height: 162 }}>
              <View className="price_wrap">
                {pricesOptions?.map((item, index) => (
                  <View
                    className="tag"
                    style={{
                      border: item === selectPrice ? "solid #2772F3 1px" : "",
                      color: item === selectPrice ? "#2772F3" : "",
                    }}
                    onClick={() => setSelectPrice(item)}
                  >
                    {index === pricesOptions?.length - 1
                      ? `${item}元/㎡/天以上`
                      : `${item}元/㎡/天`}
                  </View>
                ))}
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
          <Dropdown.Item title="面积" key={4}>
            <View className="dropdown_wrap" style={{ height: 162 }}>
              <View className="area_wrap">
                {acreageOptions?.map((item, index) => (
                  <View
                    style={{
                      border: item === selectAcreage ? "solid #2772F3 1px" : "",
                      color: item === selectAcreage ? "#2772F3" : "",
                    }}
                    onClick={() => setSelectAcreage(item)}
                    className="tag"
                  >
                    {index === pricesOptions?.length - 1
                      ? `${item}㎡以上`
                      : `${item}㎡`}
                  </View>
                ))}
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
        <ScrollView
          className="building_list_wrap"
          id={"scroll-views"}
          onScrollToLower={handleLoadMore}
          lowerThreshold={100}
          scrollY={true}
          style={{
            height:
              Taro.getSystemInfoSync()?.screenHeight - navHeight - 16 - 38,
          }}
        >
          {buildingList?.items?.length === 0 ? (
            <View className="no_reserve_wrap">
              <Image src={require("@/assets/images/no-reserve.png")} />
              <View className="text">暂无数据</View>
            </View>
          ) : (
            buildingList?.items?.map((item) => (
              <BuildingCard
                buildingItem={item}
                refreshFn={updateListAfterCollect}
                isLoginVisible={isLoginVisible}
                setIsLoginVisible={setIsLoginVisible}
              />
            ))
          )}

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
          ) : (
            <View style={{ height: 34 }}></View>
          )}
        </ScrollView>
      </View>
      <Login
        visible={isLoginVisible}
        setVisible={setIsLoginVisible}
        // handleFn={() => {
        //   Taro.switchTab({ url: indexToUrl[4] });
        //   setIsLoginVisible(false);
        // }}
      />
    </View>
  );
}
