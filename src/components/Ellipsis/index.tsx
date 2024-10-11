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
  const [displayedText, setDisplayedText] = useState(""); // 展示的文本内容
  const lineHeight = 20; // 假设行高为16px
  const maxLines = 3; // 限制显示的最大行数
  const maxChars = 100; // 假设最大字符数

  const checkTextOverflow = useCallback(() => {
    Taro.nextTick(() => {
      const query = Taro.createSelectorQuery().in(
        Taro.getCurrentInstance().page as any,
      );
      query.select("#text").boundingClientRect();
      query.exec((rect) => {
        const height = rect[0]?.height || 0;
        const shouldCollapseText = height > lineHeight * maxLines; // 判断是否需要折叠
        setShouldCollapse(shouldCollapseText);
        if (shouldCollapseText) {
          const truncatedText = getTruncatedText(text);
          setDisplayedText(truncatedText);
        }
      });
    });
  }, [text]);

  const getTruncatedText = (fullText: string) => {
    const lines = fullText.split(""); // 你可以根据实际的分割规则调整
    if (lines.length <= maxChars) return fullText; // 如果字符数量少于最大限制，直接显示
    return fullText.slice(0, maxChars) + "..."; // 否则截取前部分并加省略号
  };

  useEffect(() => {
    checkTextOverflow();
  }, [checkTextOverflow]);

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
        {shouldCollapse && !isExpanded ? displayedText : text}
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
