import React from "react";
import styles from "./style.less";
// import { Toast } from "antd-mobile";
import fetchUpload from "srcDir/common/ajax/upload";
// import fetch from "srcDir/common/ajax/indexWithBody";

// 创建react组件
class View extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   takePictures: false,
    // };
    this.avatar = this.avatar.bind(this);
    this.cancel = this.cancel.bind(this);
    // console.log(props, 2222);
  }
  avatar(e) {
    const _this = this;
    const file = window.document.createElement("input");
    file.id = "js-file";
    file.type = "file";
    file.accept = "image/*";
    if (e) {
      file.capture = "camera";
    }
    window.$(file).change(function () {
      const data = new FormData();
      data.append("file", file.files[0]);
      // console.log(data.values);
      fetchUpload({
        url: "/upload/upload",
        method: "POST",
        entity: data,
        success(res) {
          // const licenseGender = res.entity.obj.gender.code;
          // const licenseData = res.entity.obj;
          // licenseData.id = props.results.obj.driverEntity.id;
          // delete licenseData.drMember;
          // delete licenseData.id;
          // addOrUpdateCarWithBindDefaultCar(licenseData);
          // console.log(res.entity.obj);
          // alert(res.entity);
          _this.props.getImg(res.entity);
          // if (res.entity.success) {
          //   fetch({
          //     url: "/upload/upload",
          //     method: "POST",
          //     params: {
          //       headImageUrl: res.entity.obj,
          //     },
          //     success(ress) {
          //       Toast.success(ress.entity.msg);
          //       // const data1 = ress.entity;
          //       // console.log(data1);
          //       // console.log(ress.entity.obj);
          //       _this.props.headerImg(res.entity.obj);
          //       _this.props.clickFun(true);
          //     }
          //   });
          // } else {
          //   Toast.error(res.entity.msg);
          // }
        }
      });
    });
    file.click();
  }
  cancel() {
    this.props.clickFun(true);
  }
  render() {
    return (
      // <div className={styles.takePictures}>
      //   <div>
      //     <div onTouchEnd={() => { this.avatar(true); }}>拍照</div>
      //     <div onTouchEnd={() => { this.avatar(false); }}>从手机相册中选择</div>
      //     <div onTouchEnd={() => { this.cancel(); }}>取消</div>
      //   </div>
      // </div>
      <div className={styles.upload}>
        <div onTouchEnd={() => { this.avatar(false); }}>上传照片</div>
      </div>
    );
  }
}

export { View as default };
