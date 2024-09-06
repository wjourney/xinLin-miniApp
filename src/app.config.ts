export default defineAppConfig({
  pages: [
    "pages/index/index",
    "pages/Buildings/index",
    "pages/Buildings/BuildingDetail/index",
    "pages/Buildings/ReserveBuilding/index",
    "pages/Projects/index",
    "pages/Projects/ProjectDetail/index",
    "pages/News/index",
    "pages/User/index",
    "pages/User/AboutUs/index",
    "pages/User/Collection/index",
    "pages/User/Reserve/index",
    "pages/User/UserDetails/index",
  ], //第一项默认为首页
  window: {
    backgroundTextStyle: "light",
    navigationBarBackgroundColor: "#fff",
    navigationBarTitleText: "WeChat",
    navigationBarTextStyle: "black",
  },
  tabBar: {
    custom: true,
    color: "#79747E",
    selectedColor: "#9A82DB",
    backgroundColor: "#F7F7F7",
    borderStyle: "white",
    position: "bottom",
    list: [
      {
        pagePath: "pages/index/index",
        text: "",
      },
      {
        pagePath: "pages/Buildings/index",
        text: "",
      },
      {
        pagePath: "pages/Projects/index",
        text: "",
      },
      {
        pagePath: "pages/News/index",
        text: "",
      },
      {
        pagePath: "pages/User/index",
        text: "",
      },
    ],
  },
});
