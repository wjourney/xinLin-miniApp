import {
  View,
  Image,
  Text,
  Input,
  Textarea,
  Swiper,
  SwiperItem,
} from "@tarojs/components";
import { useLoad } from "@tarojs/taro";
import BottomTabBar from "@/components/BottomTabBar";
import { useEffect, useState } from "react";
import Taro from "@tarojs/taro";
import "./index.scss";
import LocationSvg from "@/assets/svg/location_gray.svg";
import Collection from "@/assets/svg/heart_love.svg";
import { AtTag, AtAvatar, AtDivider, AtTextarea } from "taro-ui";
import MoreSvg from "@/assets/svg/more.svg";
import TopNav from "@/components/TopNav";
import { getBuildingDetail, collectionBuilding } from "@/api/buildings";
import { login, getUserInfo } from "@/api/user";
import Login from "@/components/Login";

export default function Index() {
  const router = Taro.getCurrentInstance()?.router;
  const params: any = router?.params;
  const [detailData, setDetailData] = useState<any>();
  const [isLoginVisible, setIsLoginVisible] = useState(false);

  const getBuildingDetailData = async () => {
    const { id } = params;
    const res = await getBuildingDetail(id);
    const { code, data } = res;
    if (code === 200) {
      setDetailData(data);
    }
  };

  useEffect(() => {
    getBuildingDetailData();
  }, []);

  const handlePhone = (phoneNum) => {
    Taro.makePhoneCall({
      phoneNumber: phoneNum,
    });
  };

  // const handleCollectHouse = async () => {
  //   const res = await collectionBuilding({
  //     parkId: detailData?.parkId,
  //     houseId: detailData?.id,
  //     like: !detailData?.liked,
  //   });
  //   const { code, data } = res;
  //   if (code === 200) {
  //     Taro.showToast({
  //       title: detailData?.liked ? "取消收藏成功" : "收藏成功",
  //       icon: "none",
  //     });
  //     const { id } = params;
  //     getBuildingDetailData(id);
  //   }
  // };

  const handleCollectHouse = async () => {
    const res = await getUserInfo();
    if (res.code === 200 && !!res?.data?.isBindPhone) {
      const result = await collectionBuilding({
        parkId: detailData?.parkId,
        houseId: detailData?.id,
        like: !detailData?.liked,
      });
      const { code, data } = result;
      if (code === 200) {
        Taro.showToast({
          title: detailData?.liked ? "取消收藏成功" : "收藏成功",
          icon: "none",
        });
        getBuildingDetailData();
        // refreshFn(detailData?.id, !detailData?.liked);
      }
    } else {
      setIsLoginVisible(true);
    }
  };
  return (
    <View className="page_view">
      <TopNav title={"房源详情"} hasBack={true} />
      <View className="build_detail_wrap">
        {/* <View className="img_wrap">
          <Image src="https://bkmksh.oss-accelerate.aliyuncs.com/db467fff-6838-11ef-9dc3-329037ae0fb9_00000_small.jpeg?OSSAccessKeyId=LTAI5t8GmQec8vxNsiGKcYBT&Expires=317085177816&Signature=B81tkjKhd9v30B1xD2udBFL3TNI%3D" />
        </View> */}
        <Swiper
          className="swiper_wrap"
          indicatorColor="#999"
          indicatorActiveColor="#333"
          circular
          indicatorDots
          autoplay
        >
          {detailData?.sliderPics?.map((item: any) => (
            <SwiperItem>
              <View className="swiper_content">
                <Image src={item} />
              </View>
            </SwiperItem>
          ))}
        </Swiper>
        <View className="building_name">
          {detailData?.parkName}｜{detailData?.floor}楼｜{detailData?.area}㎡
        </View>
        <View className="building_location">
          <Text>
            {detailData?.city}
            {detailData?.districtName}
            {detailData?.address}
          </Text>
        </View>
        <View className="tag__and_action_wrap">
          <View className="tag_wrap">
            {detailData?.labels?.map((item) => (
              <AtTag>{item}</AtTag>
            ))}
          </View>
          <View className="action_wrap">
            <Image src={LocationSvg} />
            <Image
              onClick={handleCollectHouse}
              src={require(detailData?.liked
                ? "@/assets/svg/heart_love.svg"
                : "@/assets/svg/heart_notLove.svg")}
            />
          </View>
        </View>
        <View className="building_info">
          <View className="info_item">
            {/* <View className="info_item" style={{ borderRight: "solid #E6E6E6" }}> */}
            <View className="value">{detailData?.area}</View>
            <View className="label">面积(m²)</View>
          </View>
          <View className="info_item">
            <View className="value">{detailData?.floor}</View>
            <View className="label">楼层(层)</View>
          </View>
          <View className="info_item">
            <View className="value">{detailData?.price}</View>
            <View className="label">价格(元/m²/天)</View>
          </View>
          <View className="info_item">
            <View className="value">{detailData?.wuyeFee}</View>
            <View className="label">物业费(元/m²/天)</View>
          </View>
          <View className="info_item">
            <View className="value">{detailData?.zhxiu}</View>
            <View className="label">装修水平</View>
          </View>
          <View className="info_item">
            <View className="value">{detailData?.floorHeight}</View>
            <View className="label">层高</View>
          </View>
        </View>

        <View style={{ paddingTop: 16 }} className="diver_wrap"></View>
        <View className="investment_consultant">
          <View className="title">招商顾问</View>
          <View className="avatar_wrap">
            <Image
              className="avatar"
              src={detailData?.managers?.[0]?.avatarUrl}
            />
            <View className="name_and_phone_wrap">
              <Text className="name">
                {detailData?.managers?.[0]?.userName}
              </Text>
              <Text className="phone">{detailData?.managers?.[0]?.phone}</Text>
            </View>
            <View
              className="call_img"
              onClick={() => handlePhone(detailData?.managers?.[0]?.phone)}
            >
              <Image src={require("@/assets/svg/phone.svg")} />
            </View>
          </View>
          <View className="phone_num">
            <View>招商中心：</View>
            <View className="phone">400-232-2323</View>
          </View>
        </View>
        <View style={{ paddingTop: 16 }} className="diver_wrap"></View>
        <View
          className="belong_project"
          onClick={() =>
            Taro.navigateTo({
              url: `/pages/Projects/ProjectDetail/index?id=${detailData?.parkId}`,
            })
          }
        >
          <View className="title">所属项目</View>
          <View className="project_wrap">
            <Text className="">{detailData?.parkName}</Text>
            <Image src={MoreSvg} />
          </View>
        </View>
        <View style={{ paddingTop: 16 }} className="diver_wrap"></View>
        <View className="else_info">
          <View className="title">详细信息</View>
          <View className="text_wrap">{detailData?.detail}</View>
        </View>
        <View
          className="btn_wrap"
          onClick={() => {
            Taro.navigateTo({
              url: `/pages/Buildings/ReserveBuilding/index?houseId=${detailData?.id}&parkId=${detailData?.parkId}`,
            });
          }}
        >
          <View className="btn">预约看房</View>
        </View>
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
