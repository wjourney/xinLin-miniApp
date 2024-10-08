import {
  View,
  Image,
  Text,
  Map,
  Input,
  Textarea,
  Swiper,
  SwiperItem,
} from "@tarojs/components";
import { useLoad, useShareAppMessage } from "@tarojs/taro";
import BottomTabBar from "@/components/BottomTabBar";
import { useEffect, useRef, useState } from "react";
import Taro from "@tarojs/taro";
import "./index.scss";
import LocationSvg from "@/assets/svg/location.svg";
import { AtTag, AtAvatar, AtDivider, AtTextarea } from "taro-ui";
import MoreSvg from "@/assets/svg/more.svg";
import TopNav from "@/components/TopNav";
import { AtModal, AtModalHeader, AtModalContent, AtModalAction } from "taro-ui";
import { getProjectDetail } from "@/api/projects";
import Login from "@/components/Login";
import { login, getUserInfo } from "@/api/user";

export default function Index() {
  const [isSelectConsultantModalVisible, setIsSelectConsultantModalVisible] =
    useState(false);
  const [selectConsultant, setSelectConsultant] = useState();
  const [isLoginVisible, setIsLoginVisible] = useState(false);
  const [modalType, setModalType] = useState("phone");

  const [isAppointBuildingVisible, setIsAppointBuildingVisible] =
    useState(false);
  const router = Taro.getCurrentInstance()?.router;
  const params: any = router?.params;
  const { id: parkId } = params;
  const [detailData, setDetailData] = useState<any>();

  const getBuildingDetailData = async (id) => {
    const res = await getProjectDetail(id);
    const { code, data } = res;
    if (code === 200) {
      setDetailData(data);
    }
  };

  useEffect(() => {
    const { id } = params;
    getBuildingDetailData(id);
  }, []);

  useShareAppMessage(() => {
    const token = Taro.getStorageSync("token");

    return {
      title: detailData?.name,
      path: `/pages/Projects/ProjectDetail/index?id=${parkId}`,
    };
  });

  useEffect(() => {
    // console.log("taskStatus: ", taskStatus);
    // if (taskStatus === statusState.SUCCESS) {
    Taro.showShareMenu({
      withShareTicket: true,
      showShareItems: ["shareAppMessage", "shareTimeline"],
      success: (res) => {
        console.log("showShareMenu-success: ", res);
      },
      fail: (error) => {
        console.log("showShareMenu-error: ", error);
      },
    });
    // } else {
    //   Taro.hideShareMenu();
    // }
  }, []);

  const mapRef = useRef(null);

  const ConsultantCard = ({ managerItem }) => (
    <View
      className="avatar_card"
      onClick={() => {
        setIsSelectConsultantModalVisible(true);
        setSelectConsultant(managerItem);
      }}
    >
      <Image
        className="avatar"
        src={managerItem?.avatarUrl}
        mode="aspectFill"
      />
      <Text className="name">{managerItem?.userName}(办公)</Text>
    </View>
  );

  const handlePhoneToBusinessCenter = () => {
    Taro.makePhoneCall({
      phoneNumber: "19934287005",
    });
  };

  return (
    <View className="page_view">
      <TopNav title={detailData?.name} hasBack={true} />
      <View className="build_detail_wrap">
        <View className="img_wrap">
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
                  <Image src={item} mode="aspectFill" />
                </View>
              </SwiperItem>
            ))}
          </Swiper>
        </View>
        <View className="building_name">{detailData?.name}</View>
        <View className="building_location">
          <Text>
            {detailData?.city}
            {detailData?.districtName}
            {detailData?.address}
          </Text>
          <Image
            src={LocationSvg}
            onClick={() => {
              Taro.openLocation({
                latitude: detailData?.latitude,
                longitude: detailData?.longitude,
                scale: 18,
              });
            }}
          />
        </View>
        <View className="building_info">
          {/* <View className="info_item">
            <View className="value">
              {!!!detailData?.minPrice || !!!detailData?.maxPrice
                ? detailData?.price
                : `${detailData?.minPrice}-${detailData?.maxPrice}`}
            </View>
            <View className="label">价格(元/m²/天)</View>
          </View>
          <View className="info_item">
            <View className="value">{detailData?.totalArea}</View>
            <View className="label">面积(m²)</View>
          </View> */}
          <View className="info_item">
            {/* <View className="info_item" style={{ borderRight: "solid #E6E6E6" }}> */}
            <View className="value">
              {" "}
              {!!!detailData?.minPrice || !!!detailData?.maxPrice
                ? detailData?.price
                : `${detailData?.minPrice}-${detailData?.maxPrice}`}
            </View>
            <View className="label">价格(元/m²/天)</View>
          </View>
          <View className="info_item">
            <View className="value">{detailData?.totalArea}</View>
            <View className="label">面积(m²)</View>
          </View>
          <View className="info_item">
            <View className="value">{detailData?.totalFloor}</View>
            <View className="label">楼层数</View>
          </View>
          <View className="info_item">
            <View className="value">{detailData?.floorHeight}</View>
            <View className="label">标准层层高</View>
          </View>
        </View>
        <View className="desc_wrap">
          <View className="business_price"></View>
          <View className="office_price"></View>
          <View className="desc">{detailData?.detail}</View>
          {/* <View className="label_value_wrap">
            <View className="label_value">
              <Text className="label">楼层数：</Text>
              <Text className="value">{detailData?.totalFloor}</Text>
            </View>
            <View className="label_value">
              <Text className="label">标准层层高：</Text>
              <Text className="value">{detailData?.floorHeight}</Text>
            </View>
          </View> */}
        </View>
        <View style={{ paddingTop: 16 }} className="diver_wrap"></View>
        <View className="investment_consultant">
          <View className="title">招商顾问</View>
          <View className="avatar_wrap">
            {detailData?.managers?.map((item) => (
              <ConsultantCard managerItem={item} />
            ))}
            <View className="call_img"></View>
          </View>
          <View
            onClick={handlePhoneToBusinessCenter}
            className="phone_num"
            style={{ marginTop: 16 }}
          >
            <Text> 招商中心：</Text>
            <Text className="number">400-232-2323</Text>
          </View>
        </View>
        <View style={{ paddingTop: 16 }} className="diver_wrap"></View>
        <View className="zhoubianpeitao">
          <View className="title">周边配套</View>
          <View className="zhoubian">
            <Map
              ref={mapRef} // 显示用户当前位置
              longitude={detailData?.longitude} //中心经度
              latitude={detailData?.latitude} //中心纬度
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
          <View
            className="business"
            onClick={() => {
              if (detailData?.managers?.length === 1) {
                Taro.makePhoneCall({
                  phoneNumber: detailData?.managers?.[0]?.phone,
                });
              } else {
                setModalType("phone");
                setIsAppointBuildingVisible(true);
              }
              // Taro.makePhoneCall({
              //   phoneNumber: detailData?.managers?.[0]?.phone,
              // });
            }}
          >
            招商咨询
          </View>
          <View
            className="reserve"
            onClick={async () => {
              // if (detailData?.managers?.length === 1) {
              //   Taro.navigateTo({
              //     url: "/pages/Buildings/ReserveBuilding/index",
              //   });
              // } else {
              //   setIsAppointBuildingVisible(true);
              // }

              const res = await getUserInfo();
              if (res.code === 200 && !!res?.data?.isBindPhone) {
                if (detailData?.managers?.length === 1) {
                  Taro.navigateTo({
                    url: `/pages/Buildings/ReserveBuilding/index?houseId=&parkId=${detailData?.id}&managerId=${detailData?.managers?.[0]?.userId}&from=project`,
                  });
                } else {
                  setModalType("reserve");
                  setIsAppointBuildingVisible(true);
                }
              } else {
                setIsLoginVisible(true);
              }
            }}
          >
            预约看房
          </View>
        </View>
      </View>
      {/* <AtModal
        onClose={() => setIsSelectConsultantModalVisible(false)}
        onCancel={() => setIsSelectConsultantModalVisible(false)}
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
            <View
              className="reserve"
              onClick={() => setIsAppointBuildingVisible(true)}
            >
              预约看房
            </View>
          </View>
        </View>
      </AtModal> */}
      <AtModal
        onClose={() => setIsAppointBuildingVisible(false)}
        onCancel={() => setIsAppointBuildingVisible(false)}
        // onConfirm={this.handleConfirm}
        // isOpened={true}
        isOpened={isAppointBuildingVisible}
      >
        <View className="select_consultant_modal_content">
          <View className="title">
            {modalType === "phone" ? "招商咨询" : "预约看房"}
          </View>
          <View className="prompt">请选择您的招商顾问</View>

          <View className="select_your_consultant">
            {detailData?.managers?.map((item) => (
              <View
                className="item"
                onClick={() => {
                  if (modalType === "phone") {
                    Taro.makePhoneCall({
                      phoneNumber: item?.phone,
                    });
                  } else {
                    Taro.navigateTo({
                      url: `/pages/Buildings/ReserveBuilding/index?houseId=&parkId=${detailData?.id}&managerId=${item?.userId}&from=project`,
                    });
                  }
                  setIsAppointBuildingVisible(false);
                }}
              >
                <Image
                  className="avatar"
                  src={item?.avatarUrl}
                  mode="aspectFill"
                />
                <View className="name">{item?.userName}</View>
              </View>
            ))}
          </View>
        </View>
      </AtModal>
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
