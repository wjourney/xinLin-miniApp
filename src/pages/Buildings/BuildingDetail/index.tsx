import { View, Image, Text, Input, Textarea } from "@tarojs/components";
import { useLoad } from "@tarojs/taro";
import BottomTabBar from "@/components/BottomTabBar";
import { useEffect } from "react";
import Taro from "@tarojs/taro";
import "./index.scss";
import LocationSvg from "@/assets/svg/location.svg";
import { AtTag, AtAvatar, AtDivider, AtTextarea } from "taro-ui";
import MoreSvg from "@/assets/svg/more.svg";
import TopNav from "@/components/TopNav";

export default function Index() {
  // useEffect(() => {
  //   Taro.setNavigationBarTitle({ title: "房源详情" });
  // }, []);

  return (
    <View className="page_view">
      <TopNav title={"房源详情"} hasBack={true} />
      <View className="build_detail_wrap">
        <View className="img_wrap">
          <Image src="https://bkmksh.oss-accelerate.aliyuncs.com/db467fff-6838-11ef-9dc3-329037ae0fb9_00000_small.jpeg?OSSAccessKeyId=LTAI5t8GmQec8vxNsiGKcYBT&Expires=317085177816&Signature=B81tkjKhd9v30B1xD2udBFL3TNI%3D" />
        </View>
        <View className="building_name">这是房子名字｜3楼｜160m</View>
        <View className="building_location">
          <Text> 浙江省杭州市上水城区110号</Text>

          <Image src={LocationSvg} />
        </View>
        <View className="tag_wrap">
          <AtTag>采光好</AtTag>
          <AtTag>户型方正</AtTag>
          <AtTag>电梯旁</AtTag>
        </View>
        <View className="building_info">
          <View className="info_item">
            {/* <View className="info_item" style={{ borderRight: "solid #E6E6E6" }}> */}
            <View className="value">160</View>
            <View className="label">面积</View>
          </View>
          <View className="info_item">
            <View className="value">3</View>
            <View className="label">楼层</View>
          </View>
          <View className="info_item">
            <View className="value">2.4</View>
            <View className="label">价格</View>
          </View>
          <View className="info_item">
            <View className="value">8</View>
            <View className="label">物业费</View>
          </View>
          <View className="info_item">
            <View className="value">精装</View>
            <View className="label">装修水平</View>
          </View>
          <View className="info_item">
            <View className="value">3.6m</View>
            <View className="label">标准层层高</View>
          </View>
        </View>

        <View style={{ marginTop: 16 }} className="diver_wrap"></View>
        <View className="investment_consultant">
          <View className="title">招商顾问</View>
          <View className="avatar_wrap">
            <Image
              className="avatar"
              src="https://bkmksh.oss-accelerate.aliyuncs.com/db467fff-6838-11ef-9dc3-329037ae0fb9_00000_small.jpeg?OSSAccessKeyId=LTAI5t8GmQec8vxNsiGKcYBT&Expires=317085177816&Signature=B81tkjKhd9v30B1xD2udBFL3TNI%3D"
            />
            <View className="name_and_phone_wrap">
              <Text className="name">刘亦菲</Text>
              <Text className="phone">19934287003</Text>
            </View>
            <View className="call_img"></View>
          </View>
          <View className="phone_num">招商中心：400-232-2323</View>
        </View>
        <View style={{ marginTop: 16 }} className="diver_wrap"></View>
        <View className="belong_project">
          <View className="title">所属项目</View>
          <View className="project_wrap">
            <Text className="">锦和越界锦绣工坊</Text>
            <Image src={MoreSvg} />
          </View>
        </View>
        <View style={{ marginTop: 16 }} className="diver_wrap"></View>
        <View className="else_info">
          <View className="title">其他信息</View>
          <View className="text_wrap" />
        </View>
        <View
          className="btn_wrap"
          onClick={() => {
            Taro.navigateTo({
              url: "/pages/Buildings/ReserveBuilding/index",
            });
          }}
        >
          <View className="btn">预约看房</View>
        </View>
      </View>
    </View>
  );
}
