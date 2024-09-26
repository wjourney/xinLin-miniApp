import { useEffect, useRef, useState } from "react";
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
import { appointBuilding } from "@/api/buildings";

// 获取未来 10 年的数据
const getYearsData = () => {
  const currentYear: number = new Date().getFullYear(); // 当前年份
  const years: string[] = [];

  for (let i = 0; i < 10; i++) {
    years.push(`${currentYear + i}年`); // 添加未来的年份并加上 "年"
  }
  return years;
};

// 获取月份数据
const getMonthData = () => {
  return Array.from(
    { length: 12 },
    (_, i) => `${String(i + 1).padStart(2, "0")}月`
  );
};

// 获取指定年份和月份的天数
const getDaysInMonth = (year: number, month: number) => {
  return new Date(year, month, 0).getDate();
};

// 根据年份和月份动态生成日期数据
const getMonthDateData = (year: number, month: number) => {
  const daysInMonth = getDaysInMonth(year, month); // 获取该月的天数
  return Array.from(
    { length: daysInMonth },
    (_, i) => `${String(i + 1).padStart(2, "0")}日`
  );
};

// 获取小时数据
const getHoursData = () => {
  return Array.from(
    { length: 24 },
    (_, i) => `${String(i).padStart(2, "0")}时`
  );
};

// 获取分钟数据
const getMinutesData = () => {
  return Array.from(
    { length: 60 },
    (_, i) => `${String(i).padStart(2, "0")}分`
  );
};

// 获取当前日期的索引
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

const getTimeByIndexes = (indexes) => {
  const year = getYearsData()?.[Number(indexes?.[0])];
  const month = getMonthData()?.[Number(indexes?.[1])];
  const date = getMonthDateData(Number(indexes?.[0]), Number(indexes?.[1]))?.[
    Number(indexes?.[2])
  ];
  const hour = getHoursData()?.[Number(indexes?.[3])];
  const minute = getMinutesData()?.[Number(indexes?.[4])];
  return `${year}${month}${date}${hour}${minute}`;
};

export default function Index() {
  // const [currentIndex, setCurrentIndex] = useState(0);
  const router = Taro.getCurrentInstance()?.router;
  const params: any = router?.params;
  const [formData, setFormData] = useState({
    company: "",
    contact: "",
    reserveTime: getCurrentDateIndexes(),
    remark: "",
  });
  const [showTime, setShowTime] = useState([]);
  const [options, setOptions] = useState([
    getYearsData(),
    getMonthData(),
    getMonthDateData(new Date().getFullYear(), new Date().getMonth() + 1), // 初始化为当前年份和月份的天数
    getHoursData(),
    getMinutesData(),
  ]);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);

  useEffect(() => {
    Taro.setNavigationBarTitle({ title: "预约看房" });
    getYearsData();
  }, []);

  const formSubmit = async () => {
    const { parkId, houseId } = params;
    const formattedDate = getTimeByIndexes(formData?.reserveTime)
      .replace("年", "-")
      .replace("月", "-")
      .replace("日", " ")
      .replace("时", ":")
      .replace("分", "");
    // 提交逻辑，比如发送请求到后端
    const res = await appointBuilding({
      parkId: parkId,
      houseId: houseId,
      reservTime: formattedDate,
      contact: formData?.contact,
      company: formData?.company,
      comment: formData?.remark,
    });
    const { code } = res;
    if (code === 200) {
      Taro.showToast({ title: "预约成功", icon: "none" });
      Taro.navigateTo({
        url: "/pages/User/Reserve/index",
      });
    }
  };

  // 输入框监听
  const handleInputChange = (field, e) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: e.detail.value,
    }));
  };

  // 更新天数选项
  const updateDaysInMonth = (year: number, month: number) => {
    const daysInSelectedMonth = getMonthDateData(year, month);
    setOptions((prevOptions) => {
      const newOptions = [...prevOptions];
      newOptions[2] = daysInSelectedMonth; // 更新天数选项
      return newOptions;
    });
  };

  // 监听年份、月份等滚动变化的列
  const handleColumnChange = (e) => {
    const { column, value } = e.detail;
    console.log("ccc", column);
    if (column === 0) {
      // 年份滚动
      const newYear = parseInt(getYearsData()[value], 10);
      setSelectedYear(newYear);
      updateDaysInMonth(newYear, selectedMonth);
      setFormData((prevData) => ({
        ...prevData,
        reserveTime: [
          value,
          prevData.reserveTime[1],
          prevData.reserveTime[2],
          prevData.reserveTime[3],
          prevData.reserveTime[4],
        ], // 设置为1号
      }));
    } else if (column === 1) {
      // 月份滚动
      const newMonth = value; // +1 以获得实际月份
      console.log("cccfff", value, newMonth);
      setSelectedMonth(newMonth);
      updateDaysInMonth(selectedYear, newMonth);

      setFormData((prevData) => ({
        ...prevData,
        reserveTime: [
          prevData.reserveTime[0],
          newMonth,
          prevData.reserveTime[2],
          prevData.reserveTime[3],
          prevData.reserveTime[4],
        ], // 设置为1号
      }));

      // // 获取新月份的天数
      const daysInNewMonth = getMonthDateData(selectedYear, newMonth).length;

      // 检查当前选择的日期是否需要调整
      const currentDayIndex = formData.reserveTime[2]; // 当前选择的日索引

      // 如果当前日期是31号且新月份没有31号，则将日期设置为1号
      if (currentDayIndex === 30 && daysInNewMonth < 31) {
        setFormData((prevData) => ({
          ...prevData,
          reserveTime: [
            0,
            newMonth - 1,
            0,
            prevData.reserveTime[3],
            prevData.reserveTime[4],
          ], // 设置为1号
        }));
      }
    } else if (column === 2) {
      setFormData((prevData) => ({
        ...prevData,
        reserveTime: [
          prevData.reserveTime[0],
          prevData.reserveTime[1],
          value,
          prevData.reserveTime[3],
          prevData.reserveTime[4],
        ], // 设置为1号
      }));
    } else if (column === 3) {
      setFormData((prevData) => ({
        ...prevData,
        reserveTime: [
          prevData.reserveTime[0],
          prevData.reserveTime[1],
          prevData.reserveTime[2],
          value,
          prevData.reserveTime[4],
        ], // 设置为1号
      }));
    } else if (column === 4) {
      setFormData((prevData) => ({
        ...prevData,
        reserveTime: [
          prevData.reserveTime[0],
          prevData.reserveTime[1],
          prevData.reserveTime[2],
          prevData.reserveTime[3],
          value,
        ], // 设置为1号
      }));
    }
  };

  // 日期选择
  const handleTimeChange = (e) => {
    console.log("ffff", e.detail.value);

    setFormData((prevData) => ({
      ...prevData,
      reserveTime: e.detail.value, // 存储选择的索引
    }));
    setShowTime(e.detail.value);

    console.log("ppp", getTimeByIndexes(e.detail.value));
    // const
  };

  return (
    <View className="reserve_building_wrapper">
      <View className="title">预约看房</View>
      <View className="prompt">
        请填写您的预约信息，我们会安排专人同您联系～
      </View>
      <Form onSubmit={formSubmit}>
        <View className="input_warp">
          <View className="label">
            <Text className="star">*</Text>
            <Text className="label_value">公司</Text>
          </View>
          <Input
            value={formData.company}
            onInput={(e) => handleInputChange("company", e)}
          />
        </View>
        <View className="input_warp" style={{ marginTop: 16 }}>
          <View className="label">
            <Text className="star">*</Text>
            <Text className="label_value">联系方式</Text>
          </View>
          <Input
            value={formData.contact}
            onInput={(e) => handleInputChange("contact", e)}
          />
        </View>
        <View className="input_warp" style={{ marginTop: 16 }}>
          <View className="label">
            <Text className="star">*</Text>
            <Text className="label_value">预约时间</Text>
          </View>
          <Picker
            value={formData.reserveTime}
            mode="multiSelector"
            onChange={handleTimeChange}
            range={options}
            onColumnChange={handleColumnChange} // 监听列滚动事件
          >
            <View className="picker_input">
              {}
              <Text style={{}}>
                {showTime?.length === 0
                  ? "请选择日期"
                  : getTimeByIndexes(showTime)}
              </Text>
              <Image src={Calendar} />
            </View>
          </Picker>
        </View>
        <View className="input_warp" style={{ marginTop: 16 }}>
          <View className="label">
            <Text className="label_value">备注</Text>
          </View>
          <Textarea
            value={formData.remark}
            onInput={(e) => handleInputChange("remark", e)}
          />
        </View>
        <Button className="sub_btn" formType="submit">
          立即预约
        </Button>
      </Form>
    </View>
  );
}
