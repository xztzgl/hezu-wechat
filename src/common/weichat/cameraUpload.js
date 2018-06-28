import fetch from "srcDir/common/ajax/index";

const cameraUpload = ({ url, method, success }) => {
  const wx = window.wx;
  wx.chooseImage({
    count: 1, // 默认9
    sizeType: ["original", "compressed"], // 可以指定是原图还是压缩图，默认二者都有
    sourceType: ["album", "camera"], // 可以指定来源是相册还是相机，默认二者都有
    success: function (res) {
      const localId = res.localIds[0].toString(); // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
      alert(JSON.stringify(localId));
      setTimeout(() => {
        wx.uploadImage({
          localId, // 需要上传的图片的本地ID，由chooseImage接口获得
          isShowProgressTips: 1, // 默认为1，显示进度提示
          success: function (res1) {
            const serverId = res1.serverId; // 返回图片的服务器端ID
            alert(serverId);
            fetch({
              url,
              method,
              params: {
                media_id: serverId
              },
              success(res2) {
                const data = JSON.parse(res2.entity);
                if (typeof success === "function") {
                  success(data);
                }
              }
            });
          }
        });
      }, 0);
    }
  });
};

export { cameraUpload as default };
