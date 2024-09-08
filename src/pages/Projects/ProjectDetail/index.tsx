import { View, Image, Text, Map, Input, Textarea } from "@tarojs/components";
import { useLoad } from "@tarojs/taro";
import BottomTabBar from "@/components/BottomTabBar";
import { useEffect, useRef, useState } from "react";
import Taro from "@tarojs/taro";
import "./index.scss";
import LocationSvg from "@/assets/svg/location.svg";
import { AtTag, AtAvatar, AtDivider, AtTextarea } from "taro-ui";
import MoreSvg from "@/assets/svg/more.svg";
import TopNav from "@/components/TopNav";
import { AtModal, AtModalHeader, AtModalContent, AtModalAction } from "taro-ui";

export default function Index() {
  const [isSelectConsultantModalVisible, setIsSelectConsultantModalVisible] =
    useState(false);
  const mapRef = useRef(null);

  const ConsultantCard = ({}) => (
    <View
      className="avatar_card"
      onClick={() => setIsSelectConsultantModalVisible(true)}
    >
      <Image
        className="avatar"
        src="https://bkmksh.oss-accelerate.aliyuncs.com/db467fff-6838-11ef-9dc3-329037ae0fb9_00000_small.jpeg?OSSAccessKeyId=LTAI5t8GmQec8vxNsiGKcYBT&Expires=317085177816&Signature=B81tkjKhd9v30B1xD2udBFL3TNI%3D"
      />
      <Text className="name">刘亦菲(办公)</Text>
    </View>
  );

  // 标记点
  const markers = [
    {
      id: 0,
      latitude: 30.572269,
      longitude: 104.066541,
      title: "成都",
      width: 20,
      height: 20,
    },
  ];

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
          <View className="label_value_wrap">
            <View className="label_value">
              <Text className="label">楼层数：</Text>
              <Text className="value">18层</Text>
            </View>
            <View className="label_value">
              <Text className="label">标准层层高：</Text>
              <Text className="value">4.2-6.5</Text>
            </View>
          </View>
        </View>
        <View style={{ paddingTop: 16 }} className="diver_wrap"></View>
        <View className="investment_consultant">
          <View className="title">招商顾问</View>
          <View className="avatar_wrap">
            <ConsultantCard />
            <ConsultantCard />
            <ConsultantCard />
            <ConsultantCard />
            <ConsultantCard />
            <ConsultantCard />
            <ConsultantCard />
            {/* <View className="avatar_card">
              <Image
                className="avatar"
                src="https://bkmksh.oss-accelerate.aliyuncs.com/db467fff-6838-11ef-9dc3-329037ae0fb9_00000_small.jpeg?OSSAccessKeyId=LTAI5t8GmQec8vxNsiGKcYBT&Expires=317085177816&Signature=B81tkjKhd9v30B1xD2udBFL3TNI%3D"
              />
              <Text className="name">刘亦菲(办公)</Text>
            </View> */}
            <View className="call_img"></View>
          </View>
          <View className="phone_num">招商中心：400-232-2323</View>
        </View>
        <View style={{ paddingTop: 16 }} className="diver_wrap"></View>
        <View className="zhoubianpeitao">
          <View className="title">周边配套</View>
          <View className="zhoubian">
            <Map
              ref={mapRef} // 显示用户当前位置
              longitude={104.066541} //中心经度
              latitude={30.572269} //中心纬度
              scale={16} //缩放
              // markers={markers} //标记点
              // polyline={polyline} //路线
              // onTap={handleTap} //用户选择位置
              style={{ width: "100%", height: 200 }}
              onError={(err) => console.log(err)}
            />
          </View>
        </View>
        {/* <View style={{ marginTop: 16 }} className="diver_wrap"></View> */}
        <View className="btn_wrap">
          <View className="business">招商资讯</View>
          <View className="reserve">预约看房</View>
        </View>
      </View>
      <AtModal
        onClose={() => setIsSelectConsultantModalVisible(false)}
        onCancel={() => setIsSelectConsultantModalVisible(false)}
        // onConfirm={this.handleConfirm}
        isOpened={isSelectConsultantModalVisible}
      >
        <View className="modal_content">
          <View className="avatar_and_name_phone">
            <Image
              className="avatar"
              src="https://bkmksh.oss-accelerate.aliyuncs.com/db467fff-6838-11ef-9dc3-329037ae0fb9_00000_small.jpeg?OSSAccessKeyId=LTAI5t8GmQec8vxNsiGKcYBT&Expires=317085177816&Signature=B81tkjKhd9v30B1xD2udBFL3TNI%3D"
            />
            <View className="name_and_phone">
              <Text className="name">刘亦菲</Text>
              <Text className="phone">12287382231</Text>
            </View>
          </View>
          <View className="btn_wrap">
            <View className="consult">电话咨询</View>
            <View className="reserve">预约看房</View>
          </View>
        </View>
      </AtModal>
    </View>
  );
}
