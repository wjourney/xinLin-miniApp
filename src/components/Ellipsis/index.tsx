import Taro from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import { useState, useEffect, useCallback } from "react";
import "./index.scss";

interface ILineEllipsis {
  text: string;
}

const Ellipsis: React.FC<ILineEllipsis> = ({ text }) => {
  const [isExpanded, setIsExpanded] = useState(false); // 控制是否展开
  const [shouldCollapse, setShouldCollapse] = useState(false); // 判断是否需要折叠
  const lineHeight = 20; // 行高为20px
  const maxLines = 3; // 限制显示的最大行数

  // 判断文本是否溢出
  const checkTextOverflow = useCallback(() => {
    Taro.nextTick(() => {
      const query = Taro.createSelectorQuery().in(
        Taro.getCurrentInstance().page as any,
      );
      query.select("#text").boundingClientRect();
      query.exec((rect) => {
        if (rect[0]) {
          const height = rect[0].height || 0;
          const shouldCollapseText = height > lineHeight * maxLines; // 判断是否需要折叠
          setShouldCollapse(shouldCollapseText);
        } else {
          console.error("未找到 #text 元素");
        }
      });
    });
  }, []);

  useEffect(() => {
    checkTextOverflow();

    return () => {
      // 页面离开时清理状态
      setIsExpanded(false);
      setShouldCollapse(false);
    };
  }, [checkTextOverflow]);

  // 展开/收起切换
  const handleToggle = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <View
      className="line-ellipsis-container"
      style={{ position: "relative", color: "rgba(77, 77, 77, 1)" }}
    >
      <View
        id="text"
        style={{
          overflow: "hidden",
          display: "-webkit-box",
          WebkitLineClamp: shouldCollapse && !isExpanded ? maxLines : "unset",
          WebkitBoxOrient: "vertical",
          lineHeight: `${lineHeight}px`,
          height:
            shouldCollapse && !isExpanded
              ? `${lineHeight * maxLines}px`
              : "auto",
        }}
      >
        {text}
      </View>
      {shouldCollapse && (
        <Text
          className="expansion-btn"
          onClick={handleToggle}
          style={{
            display: "block",
            marginTop: "8px",
            color: "#2772F3",
          }}
        >
          {isExpanded ? "收起" : "展开"}
        </Text>
      )}
    </View>
  );
};

export default Ellipsis;
