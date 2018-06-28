import store from "store2";
// import Cookies from "js-cookie";
// try {
//   const code = document.referrer.match(/code=(\S*)&/)[1];
//   $.ajax({
//     async: false,
//     dataType: "json",
//     url: "http://192.168.1.195/oauth2",
//     // method: "POST",
//     data: {
//       code,
//     },
//     success(res) {
//       const openId = res.openId;
//       if (openId && openId !== null && openId !== "") {
//         store.set("openId", openId);
//       }
//       console.log(store.get("openId"));
//     }
//   });
// } catch (err) {
//   console.log("没有用来获取openId的code", err);
// }

const params = document.location.search.substring(1).split("&");
const hash = {};
params.map((v) => {
  const arr = v.split("=");
  hash[arr[0]] = arr[1];
  return hash;
});
// console.log("hash");
// console.log(hash);
if (hash.Authorization && hash.Authorization !== "undefined") {
  // Cookies.set("Authorization", hash.Authorization);
  store.set("Authorization", hash.Authorization);
}
store.session.set("page", hash.page);
store.session.set("itemId", hash.id);
store.session.set("openId", hash.openId);
