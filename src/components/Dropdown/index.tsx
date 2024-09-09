import { View, Text } from "@tarojs/components";
import classnames from "classnames";
import React, {
  CSSProperties,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import "taro-ui/dist/style/components/icon.scss";
import styles from "./index.module.scss";
import Taro from "@tarojs/taro";

// forwardRef 组件增添属性 来自 antd-mobile
export function attachPropertiesToComponent<C, P extends Record<string, any>>(
  component: C,
  properties: P
): C & P {
  const ret = component as any;
  for (const key in properties) {
    if (properties.hasOwnProperty(key)) {
      ret[key] = properties[key];
    }
  }
  return ret;
}

interface ItemProps {
  key: string | number;
  title: string | React.ReactElement;
  activeKey?: string | number;
  children: React.ReactElement;
}

/**
 * @param key
 * @param title 标题
 * @param activeKey
 */
function Item(props: ItemProps) {
  return props.children;
}

interface DropDownProps {
  children: React.ReactElement[];
}

/**
 * @param close 关闭下拉框事件
 */
const DropDown = React.forwardRef((props: DropDownProps, ref: any) => {
  const [activeKey, setActiveKey] = useState("");

  const [navHeight, setNavHeight] = useState(0);

  const getNavHeight = () => {
    // 获取系统信息
    const systemInfo = Taro.getSystemInfoSync();
    // 获取胶囊信息
    const menuButtonInfo = Taro.getMenuButtonBoundingClientRect();

    // 状态栏高度 获取不到的情况给通用的44  图中的1
    const statusBarHeight = systemInfo.statusBarHeight ?? 44;

    // 状态栏到胶囊的间距 图中的2
    const menuButtonStatusBarGap = menuButtonInfo.top - statusBarHeight;

    // 导航栏高度 = 状态栏到胶囊的间距（胶囊距上距离-状态栏高度） * 2 + 胶囊高度 + 状态栏高度   1+ 2 + 2 + 3
    const navBarHeight =
      menuButtonStatusBarGap * 2 + menuButtonInfo.height + statusBarHeight;

    return navBarHeight;
  };

  useEffect(() => {
    setNavHeight(getNavHeight());
  }, []);

  useImperativeHandle(ref, () => ({
    close: () => {
      setActiveKey("");
    },
  }));

  const handleClick = (itemKey) => {
    setActiveKey(itemKey !== activeKey ? itemKey : "");
  };

  const navs = React.Children.map(props.children, (child) => {
    return (
      <View
        className={classnames(styles.navItem, {
          [styles.open]: child.key == activeKey,
          [styles.selected]: child.props.activeKey,
        })}
        onClick={() => {
          handleClick(child.key);
        }}
      >
        {child.props.title}
        <View
          className={classnames("at-icon at-icon-chevron-down", styles.icon)}
        ></View>
      </View>
    );
  });

  return (
    <View className={classnames(styles.wrapper)}>
      <View className={styles.nav}>{navs}</View>
      <View
        className={classnames(styles.popup, {
          [styles.show]: !!activeKey,
          [styles.hide]: !activeKey,
        })}
      >
        {props.children.map(
          (item) => item.key == activeKey && item.props.children
        )}
      </View>
      {activeKey && (
        <View
          className={styles.mask}
          onClick={() => {
            ref.current.close();
          }}
          catchMove
          style={{ top: navHeight + 38 + 16 }}
        ></View>
      )}
    </View>
  );
});

export default attachPropertiesToComponent(DropDown, {
  Item,
});
