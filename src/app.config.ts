export default defineAppConfig({
  pages: ["pages/index/index",  "pages/Buildings/index", "pages/Projects/index", "pages/News/index", "pages/User/index",], //第一项默认为首页
  window: {
    backgroundTextStyle: "light",
    navigationBarBackgroundColor: "#fff",
    navigationBarTitleText: "WeChat",
    navigationBarTextStyle: "black",
  },
  tabBar: {
    color: "#79747E",
    selectedColor: "#9A82DB",
    backgroundColor: "#F7F7F7",
    borderStyle: "white",
    position: "bottom",
    list: [
      {
        pagePath: "pages/index/index",
        text: "首页",
      },
      {
        pagePath: "pages/Buildings/index",
        text: "房源",
      },
      {
        pagePath: "pages/Projects/index",
        text: "项目",
      },
      {
        pagePath: "pages/News/index",
        text: "资讯",
      },
      {
        pagePath: "pages/User/index",
        text: "我的",
      },
    ],
  },
  plugins: {
    calendar: {
      version: "1.1.3",
      provider: "wx92c68dae5a8bb046",
    },
  },
});
