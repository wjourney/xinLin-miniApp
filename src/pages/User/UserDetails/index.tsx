import { View, Text, Image, Button, Input } from "@tarojs/components";
import { useLoad } from "@tarojs/taro";
import BottomTabBar from "@/components/BottomTabBar";
import "./index.scss";
import TopNav from "@/components/TopNav";
import { login, getUserInfo } from "@/api/user";
import { useEffect, useState } from "react";
import Taro from "@tarojs/taro";
import { AtFloatLayout } from "taro-ui";
import EditSvg from "@/assets/svg/edit.svg";
import { updateUser } from "@/api/user";

export default function Index() {
  // const [currentIndex, setCurrentIndex] = useState(0);

  const [userInfo, setUserInfo] = useState<any>();
  const [userAvatar, setUserAvatar] = useState("");
  const [username, setUsername] = useState("");
  // const [visible, setVisible] = useState(false);
  // const [uploadAvatar, setUploadAvatar] = useState("");

  const getUserInfoData = async () => {
    const res = await getUserInfo();
    const { code, data } = res;
    if (code === 200) {
      setUserInfo(data);
    } else {
    }
  };

  // 获取用户头像
  const handleGetUserMoreInfo = () => {
    Taro.getUserInfo({
      success: function (res) {
        const userInfo = res.userInfo;
        setUserAvatar(userInfo.avatarUrl);
        setUsername(userInfo.nickName);
      },
    });
  };

  // 选择上传图片
  const handleUploadImg = () => {
    Taro.chooseImage({
      count: 1,
      sizeType: ["compressed", "original"],
      sourceType: ["album", "camera"],
      success: async (res) => {
        const imgListInfo: any = res?.tempFiles || [];
        const imgList = res?.tempFilePaths || [];
        console.log("gggg", imgListInfo, imgList);
        // 如果没有选中图片
        if (!imgListInfo.length) {
          Taro.showToast({
            icon: "none",
            title: "未选中图片",
          });
          return;
        }

        Taro.showLoading({ title: "上传中" });
        const token = Taro.getStorageSync("token");
        try {
          // 使用 Taro.uploadFile 进行文件上传
          const result = await Taro.uploadFile({
            url: "https://www.shmod.cn/api/upload_image", // 替换为你实际的接口
            filePath: imgList[0], // 选择的图片路径
            name: "file", // 文件字段名
            formData: {
              // 可以附加其他表单数据，例如用户ID等
            },
            header: {
              "Content-Type": "multipart/form-data", // 确保发送的是表单数据
              Cookie: `token=${token}`,
            },
          });
          // 后端返回的result.data是 JSON 格式数据
          const data = JSON.parse(result.data);
          if (data.code === 200) {
            Taro.showToast({
              title: "上传成功",
              icon: "success",
            });
            setUserAvatar(data?.data?.url);
          }
        } catch (error) {
          console.log("上传失败222：", error);
          Taro.showToast({
            title: "上传失败",
            icon: "none",
          });
        } finally {
          Taro.hideLoading();
        }
      },
      fail: (error) => {
        console.log("error: ", error);
        if (error.errMsg === "chooseImage:fail") {
          Taro.showToast({
            icon: "none",
            title: "获取图片失败",
          });
        }
      },
    });
  };

  useEffect(() => {
    getUserInfoData();
    handleGetUserMoreInfo();
  }, []);

  useEffect(() => {
    getUserInfoData();
  }, []);

  // 监听用户输入并更新状态
  const handleInput = (e) => {
    setUsername(e.target.value); // 更新username
  };

  // 修改用户名
  const handleEditUserInfo = async () => {
    const res = await updateUser({
      avatar: userAvatar,
      username,
    });
    const { code } = res;
    if (code === 200) {
      await Taro.showToast({
        title: "修改信息已提交，请耐心等待审核",
        icon: "none",
        // success: () => Taro.navigateBack(),
      });
    }
  };

  return (
    <View className="page_view">
      <TopNav title={"个人信息"} hasBack={true} />
      <View className="user_detail_wrapper">
        <View className="menu_wrap">
          <View className="menu_item">
            <View className="label">个人头像</View>
            <View className="value" onClick={handleUploadImg}>
              <Image
                className="avatar"
                src={userAvatar}
                // onClick={handleUploadImg}
              />
            </View>
          </View>
          <View className="menu_item">
            <View className="label">昵称</View>
            <Input
              className="input-field"
              value={username}
              onInput={handleInput}
            />
            <Image className="edit_svg" src={EditSvg} />
          </View>
          <View className="menu_item">
            <View className="label">手机</View>
            <View className="value">{userInfo?.phone}</View>
          </View>
        </View>
        <View className="btn_wrap" onClick={handleEditUserInfo}>
          保存
        </View>
      </View>
      {/* <AtFloatLayout
        isOpened={visible}
        // isOpened={true}
        className="login-phone-modal"
        onClose={() => {
          setVisible(false);
        }}
      >
        <View className="modal-content">
          <View className="logo">
          </View>
          <Button
            className="btn"
          >
            手机号快捷登录
          </Button>
        </View>
      </AtFloatLayout> */}
    </View>
  );
}
