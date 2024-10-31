import Taro, { useRouter } from "@tarojs/taro";
import { WebView } from "@tarojs/components";

const WebviewPage = () => {
  const router = useRouter();
  const { url } = router.params;

  return <WebView src={decodeURIComponent(url)} />;
};

export default WebviewPage;
