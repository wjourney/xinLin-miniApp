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

const getYearsData = () => {
  const currentYear: number = new Date().getFullYear(); // 当前年份
  const years: string[] = [];

  for (let i = 0; i < 10; i++) {
    years.push(`${currentYear + i}年`); // 添加未来的年份并加上 "年"
  }
  return years;
};

const getMonthData = () => {
  return Array.from(
    { length: 12 },
    (_, i) => `${String(i + 1).padStart(2, "0")}月`
  );
};

const getMonthDateData = () => {
  return Array.from(
    { length: 30 },
    (_, i) => `${String(i + 1).padStart(2, "0")}日`
  );
};

const getHoursData = () => {
  return Array.from(
    { length: 24 },
    (_, i) => `${String(i).padStart(2, "0")}时`
  );
};

const getMinutesData = () => {
  return Array.from(
    { length: 60 },
    (_, i) => `${String(i).padStart(2, "0")}分`
  );
};

const getCurrentDateIndexes = () => {
  const now = new Date();

  // 月份索引（1 到 12）
  const monthIndex = now.getMonth(); // JavaScript 中月份是从 0 开始的
  // 当前月在 12 个月中的索引
  const monthInYearIndex = monthIndex; // 加 1，因为索引从 1 开始

  // 日期索引（1 到 31）
  const dayIndex = now.getDate() - 1; // 日期是从 1 开始的
  // 当前日期在一个月中的索引
  const dayInMonthIndex = dayIndex; // 减 1，因为索引从 0 开始

  // 小时索引（0 到 23）
  const hourIndex = now.getHours();
  // 当前小时在 24 小时中的索引
  const hourInDayIndex = hourIndex; // 索引从 0 开始

  // 分钟索引（0 到 59）
  const minuteIndex = now.getMinutes();
  // 当前分钟在 60 分钟中的索引
  const minuteInHourIndex = minuteIndex; // 索引从 0 开始

  return [
    0,
    monthInYearIndex, // 月在12个月中的索引
    dayInMonthIndex, // 日在当月中的索引
    hourInDayIndex, // 时在一天中的索引
    minuteInHourIndex, // 分在一小时中的索引
  ];
};

export default function Index() {
  // const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    Taro.setNavigationBarTitle({ title: "预约看房" });
    getYearsData();
  }, []);

  const formSubmit = (e) => {
    console.log(e);
  };

  const formReset = (e) => {
    console.log(e);
  };

  const options = [
    getYearsData(),
    getMonthData(),
    getMonthDateData(),
    getHoursData(),
    getMinutesData(),
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
              value={getCurrentDateIndexes()}
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
