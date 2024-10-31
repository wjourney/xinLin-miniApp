import { View } from "@tarojs/components";
import classnames from "classnames";
import React, { useEffect, useImperativeHandle, useState } from "react";
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

function Item(props: ItemProps) {
  return props.children;
}

interface DropDownProps {
  children: React.ReactNode; // 支持单个元素或数组
}

const DropDown = React.forwardRef((props: DropDownProps, ref: any) => {
  const [activeKey, setActiveKey] = useState("");
  const [navHeight, setNavHeight] = useState(0);

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

  useImperativeHandle(ref, () => ({
    close: () => {
      setActiveKey("");
    },
  }));

  const handleClick = (itemKey) => {
    setActiveKey(itemKey !== activeKey ? itemKey : "");
  };

  const navs = React.Children.map(props.children, (child) => {
    if (React.isValidElement(child)) {
      return (
        <View
          className={classnames(styles.navItem, {
            [styles.open]: child.key === activeKey,
            [styles.selected]: child.props.activeKey,
          })}
          onClick={() => handleClick(child.key)}
        >
          {child.props.title}
          <View
            className={classnames("at-icon at-icon-chevron-down", styles.icon)}
          ></View>
        </View>
      );
    }
    return null;
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
        {React.Children.map(props.children, (item) =>
          item.key === activeKey ? item.props.children : null
        )}
      </View>
      {activeKey && (
        <View
          className={styles.mask}
          onClick={() => ref.current.close()}
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
