import { View, Text, Image } from "@tarojs/components";
import { useLoad } from "@tarojs/taro";
import BottomTabBar from "@/components/BottomTabBar";
import "./index.scss";
import MyMessage from "@/assets/svg/myMessage.svg";
import MyReserve from "@/assets/svg/myReserve.svg";
import myCollection from "@/assets/svg/myCollection.svg";
import AboutUs from "@/assets/svg/aboutUs.svg";
import Logout from "@/assets/svg/logout.svg";
import LeftArrow from "@/assets/svg/leftArrow.svg";
import TopNav from "@/components/TopNav";
import Trumpt from "@/assets/svg/trumpt.svg";

const mockData = [];

export default function Index() {
  // const [currentIndex, setCurrentIndex] = useState(0);

  const MessageCard = ({}) => {
    return (
      <View className="message_card">
        <View className="img_wrap">
          <Image src={Trumpt} />
        </View>

        <View className="info">
          <View className="title_and_time">
            <View className="title">系统公告</View>
            <View className="time">2024年7月4日 17:00</View>
          </View>
          <View className="message_detail">
            您的预约时间是明天上午12:00，请您注意时间安排注意时间安排注意时间安排哦
          </View>
        </View>
      </View>
    );
  };

  return (
    <View className="page_view">
      <TopNav title={"我的消息"} hasBack={true} />
      {mockData?.length === 0 ? (
        <View className="no_message_wrap">
          <Image src={require("@/assets/images/no-message.png")} />
          <View className="text">暂无收藏</View>
        </View>
      ) : (
        <View className="message_wrapper">
          <MessageCard />
          <MessageCard />
          <MessageCard />
          <MessageCard />
          <MessageCard />
          <MessageCard />
          <MessageCard />
          <MessageCard />
          <MessageCard />
          <MessageCard />
          <MessageCard />
          <MessageCard />
          <MessageCard />
        </View>
      )}
    </View>
  );
}
