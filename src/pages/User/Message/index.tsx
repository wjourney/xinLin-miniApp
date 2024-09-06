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

export default function Index() {
  // const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <View className="page_view">
      <TopNav title={"我的消息"} hasBack={true} />
      <View className="user_wrapper">消息</View>
    </View>
  );
}