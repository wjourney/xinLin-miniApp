import { useEffect, useRef } from "react";
import {
  View,
  Form,
  Text,
  Input,
  Image,
  Button,
  Picker,
  Textarea,
} from "@tarojs/components";
import "./index.scss";
import Taro from "@tarojs/taro";
import { AtList, AtListItem } from "taro-ui";
import Calendar from "@/assets/svg/calendar.svg";

export default function Index() {
  // const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    Taro.setNavigationBarTitle({ title: "预约看房" });
  }, []);

  const formSubmit = (e) => {
    console.log(e);
  };

  const formReset = (e) => {
    console.log(e);
  };

  const options = [
    ["A", "B"],
    ["2019", "2020", "2011"],
    ["2019", "2020", "2011"],
    ["2019", "2020", "2011"],
    ["1", "2", "3"],
  ];

  return (
    <View className="reserve_building_wrapper">
      <View className="title">预约看房</View>
      <View className="prompt">
        请填写您的预约信息，我们会安排专人同您联系～
      </View>
      <Form onSubmit={formSubmit} onReset={formReset}>
        <View className="input_warp">
          <View className="label">
            <Text className="star">*</Text>
            <Text className="label_value">公司</Text>
          </View>
          <Input />
        </View>
        <View className="input_warp" style={{ marginTop: 16 }}>
          <View className="label">
            <Text className="star">*</Text>
            <Text className="label_value">预约时间</Text>
          </View>
          <View>
            <Picker
              // value=""
              mode="multiSelector"
              onChange={(e) => console.log(e.detail.value)} // 打印出来的是索引index
              range={options}
            >
              <View className="picker_input">
                <Text>请选择日期</Text>
                <Image src={Calendar} />
              </View>
            </Picker>
          </View>
        </View>
        <View className="input_warp" style={{ marginTop: 16 }}>
          <View className="label">
            {/* <Text className="star">*</Text> */}
            <Text className="label_value">备注</Text>
          </View>
          <Textarea />
        </View>
      </Form>
    </View>
  );
}
