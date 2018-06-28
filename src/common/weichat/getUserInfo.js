import store from "store2";
import fetch from "srcDir/common/ajax/index";

const getUserInfo = () => {
  const user = store.get("garage-wechat-user");

  // if (!user) {
  fetch({
    url: "/mb/user/show/selfInfo",
    // method: "POST",
    // params: {
    // },
    success(res) {
      const data = JSON.parse(res.entity).obj;
      if (data !== user) {
        store.set("garage-wechat-user", data);
      }
    },
    error() {
      // setTimeout(getUserInfo, 1000);
    }
  });
  // }
};

getUserInfo();

export { getUserInfo as default };
