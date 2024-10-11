import { View, Text, Image, ScrollView } from "@tarojs/components";
import "./index.scss";
import TopNav from "@/components/TopNav";
import Trumpt from "@/assets/svg/trumpt.svg";
import { getMessage } from "@/api/my";
import { useEffect, useState } from "react";
import Taro from "@tarojs/taro";
import { AtLoadMore } from "taro-ui";

export default function Index() {
  // const [currentIndex, setCurrentIndex] = useState(0);
  const [listData, setListData] = useState({
    hasNext: false,
    total: 0,
    items: [],
  });
  const [navHeight, setNavHeight] = useState(0);
  const pageSize = 20;
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState(false);

  const getNavHeight = () => {
    const systemInfo = Taro.getSystemInfoSync();
    const menuButtonInfo = Taro.getMenuButtonBoundingClientRect();
    const statusBarHeight = systemInfo.statusBarHeight ?? 44;
    const menuButtonStatusBarGap = menuButtonInfo.top - statusBarHeight;
    const navBarHeight =
      menuButtonStatusBarGap * 2 + menuButtonInfo.height + statusBarHeight;

    return navBarHeight;
  };

  useEffect(() => {
    setNavHeight(getNavHeight());
  }, []);

  const getMessageData = async (page, pageSize, isGetMore = false) => {
    try {
      if (page === 1) {
        setLoading(true);
        Taro.showLoading({
          title: "加载中..",
        });
      }
      const res = await getMessage(page, pageSize);
      const { code, data } = res;
      const { hasNext, list, total } = data;

      if (code === 200) {
        setListData((pre) => ({
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
    if (listData?.hasNext) {
      getMessageData(page, pageSize, true);
    }
  };

  useEffect(() => {
    getMessageData(page, pageSize, false);
  }, []);

  const MessageCard = ({ item }) => {
    return (
      <View className="message_card">
        <View className="img_wrap">
          <Image src={Trumpt} />
        </View>

        <View className="info">
          <View className="title_and_time">
            <View className="title">系统公告</View>
            <View className="time">{item?.createdAt} </View>
          </View>
          <View className="message_detail">{item?.message}</View>
        </View>
      </View>
    );
  };

  return (
    <View className="page_view" catchMove>
      <TopNav title={"我的消息"} hasBack={true} />
      {listData?.items?.length === 0 ? (
        <View className="no_message_wrap">
          <Image src={require("@/assets/images/no-message.png")} />
          <View className="text">暂无消息</View>
        </View>
      ) : (
        <ScrollView
          className="message_wrapper"
          // className="list_wrap"
          id={"scroll-views"}
          onScrollToLower={handleLoadMore}
          lowerThreshold={100}
          scrollY={true}
          style={{
            height: Taro.getSystemInfoSync()?.screenHeight - navHeight - 24,
          }}
        >
          {listData?.items?.map((item) => (
            <MessageCard item={item} />
          ))}
          {/* {listData?.items?.map((item) => (
            <MessageCard item={item} />
          ))}{" "}
          {listData?.items?.map((item) => (
            <MessageCard item={item} />
          ))}{" "}
          {listData?.items?.map((item) => (
            <MessageCard item={item} />
          ))} */}
          {listData?.hasNext ? (
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
      )}
    </View>
  );
}
