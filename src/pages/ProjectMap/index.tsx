import { View, Image, Text, Input } from "@tarojs/components";
import { useLoad } from "@tarojs/taro";
import BottomTabBar from "@/components/BottomTabBar";
import { useEffect, useState } from "react";
import "./index.scss";
import ProjectCard from "./ProjectCard";
import Taro from "@tarojs/taro";
import MapMode from "@/assets/svg/mapMode.svg";
import { Picker } from "@tarojs/components";
import DownSvg from "@/assets/svg/down.svg";
import SearchSvg from "@/assets/svg/search.svg";
import BlueLocationSvg from "@/assets/svg/location-blue.svg";
import TopNav from "@/components/TopNav";
import LocationSvg from "@/assets/svg/location.svg";

const mockPlaces = {
  selector: ["美国", "中国", "巴西", "日本"],
  timeSel: "12:01",
  dateSel: "2018-04-22",
};

export default function Index() {
  const [selectPlace, setSelectPlace] = useState("中国");
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    Taro.setNavigationBarTitle({ title: "我的收藏" });
  }, []);

  return (
    <View className="page_view">
      <TopNav title={"找项目"} hasBack={true} />
      <View className="project_wrapper">
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
        </View>
        <View className=""></View>
      </View>
    </View>
  );
}
