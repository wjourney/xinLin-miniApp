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
  return (
    <View className="page_view">
      <TopNav title={"项目详情"} hasBack={true} />
      <View className="build_detail_wrap">
        <View className="img_wrap">
          <Image src="https://bkmksh.oss-accelerate.aliyuncs.com/db467fff-6838-11ef-9dc3-329037ae0fb9_00000_small.jpeg?OSSAccessKeyId=LTAI5t8GmQec8vxNsiGKcYBT&Expires=317085177816&Signature=B81tkjKhd9v30B1xD2udBFL3TNI%3D" />
        </View>
        <View className="building_name">这是房子名字｜3楼｜160m</View>
        <View className="building_location">
          <Text> 浙江省杭州市上水城区110号</Text>

          <Image src={LocationSvg} />
        </View>
        <View className="building_info">
          <View className="info_item">
            <View className="value">2.3-2.4</View>
            <View className="label">价格(元/m/天)</View>
          </View>
          <View className="info_item">
            <View className="value">3</View>
            <View className="label">面积(m)</View>
          </View>
        </View>
        <View className="desc_wrap">
          <View className="business_price"></View>
          <View className="office_price"></View>
          <View className="desc">
            这是描述信息这是描述信息这是描述信息这是描述信息这是描述信息这是描述信息这是描述信息这是描述信息这是描述信息这是描述信息这是描述信息这是描述信息这是描述信息这是描述信息这是描述信息这是描述信息这是描述信息
          </View>
          <View className="label_value">
            <Text className="label">样式：</Text>
            <Text className="value">别墅式、花园式创意园区</Text>
          </View>
          <View className="label_value">
            <Text className="label">样式：</Text>
            <Text className="value">别墅式、花园式创意园区</Text>
          </View>
          <View className="label_value">
            <Text className="label">样式：</Text>
            <Text className="value">别墅式、花园式创意园区</Text>
          </View>
          <View className="label_value">
            <Text className="label">样式：</Text>
            <Text className="value">别墅式、花园式创意园区</Text>
          </View>
          <View className="label_value">
            <Text className="label">样式：</Text>
            <Text className="value">别墅式、花园式创意园区</Text>
          </View>
        </View>
        <View style={{ marginTop: 16 }} className="diver_wrap"></View>
        <View className="investment_consultant">
          <View className="title">招商顾问</View>
          <View className="avatar_wrap">
            <View className="avatar_card">
              <Image
                className="avatar"
                src="https://bkmksh.oss-accelerate.aliyuncs.com/db467fff-6838-11ef-9dc3-329037ae0fb9_00000_small.jpeg?OSSAccessKeyId=LTAI5t8GmQec8vxNsiGKcYBT&Expires=317085177816&Signature=B81tkjKhd9v30B1xD2udBFL3TNI%3D"
              />
              <Text className="name">刘亦菲(办公)</Text>
            </View>
            <View className="call_img"></View>
          </View>
          <View className="phone_num">周边配套：400-232-2323</View>
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
        <View className="btn_wrap">
          <View className="business">招商资讯</View>
          <View className="reserve">预约看房</View>
        </View>
      </View>
    </View>
  );
}
