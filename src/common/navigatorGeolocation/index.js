import Cookies from "js-cookie";
// import { Toast } from "antd-mobile";

const getLocationName = () => {
  const getLocationAddress = (location) => {
    const { latitude = "", longitude = "" } = location;
    const locationStr = `${longitude},${latitude}`;
    // console.info(locationStr);
    const data = {
      location: locationStr,
      /* 换成自己申请的key */
      key: "291cb0e3e0afbc7dfa10c3da10059ea0",
      s: "rsv3"
    };
    const url = "http://restapi.amap.com/v3/geocode/regeo";
    $.ajax({
      async: false,
      type: "get",
      dataType: "json",
      data: data,
      url: url,
      success: function (json) {
        // console.log(json.regeocode.address);
        const locationName = json.regeocode.addressComponent.province + json.regeocode.addressComponent.district;
        const locationAddress = json.regeocode.formatted_address;
        $("#locationName").find(".am-flexbox-item").eq(0)
          .text(locationName);
        $("#js-locationAddress").text(locationAddress);
        Cookies.set("locationAddress", locationAddress);
      },
      // error: function () {
      //   alert("服务端错误，请刷新浏览器后重试");
      // }

    });
  };
  const locationSuccess = function (position) {
    // 高德地图定位
    const locationStr = `${position.coords.longitude},${position.coords.latitude}`;
    const data = {
      locations: locationStr,
      /* 换成自己申请的key */
      key: "291cb0e3e0afbc7dfa10c3da10059ea0",
      s: "rsv3",
      coordsys: "gps",
    };
    const url = "http://restapi.amap.com/v3/assistant/coordinate/convert";
    $.ajax({
      async: false,
      type: "get",
      dataType: "json",
      data: data,
      url: url,
      success: function (json) {
        console.log(typeof json.locations);
        const arr = json.locations.split(",");
        const location = {
          latitude: arr[1], longitude: arr[0]
        };
        Cookies.set("location", location);
        getLocationAddress(location);
      },
    });
  };
  const locationError = function () {
    // switch (error.code) {
    // case error.TIMEOUT:
    //   alert("定位失败,请求获取用户位置超时");
    //   break;
    // case error.POSITION_UNAVAILABLE:
    //   alert("定位失败,位置信息是不可用");
    //   break;
    // case error.PERMISSION_DENIED:
    //   alert("定位失败,用户拒绝请求地理定位");
    //   break;
    // case error.UNKNOWN_ERROR:
    //   alert("定位失败,定位系统失效");
    //   break;
    // default:
    //   alert("unknown");
    // }
    let location = Cookies.get("location");
    if (!location || location === "") {
      location = {
        latitude: 39, longitude: 116.4
      };
      Cookies.set("location", location);
      location = JSON.stringify(location);
    }
    getLocationAddress(JSON.parse(location));
    window.wx.getLocation({
      type: "gcj02", // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入"gcj02"
      success: function (res) {
        const latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
        const longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
        const speed = res.speed; // 速度，以米/每秒计
        const accuracy = res.accuracy; // 位置精度
        location = {
          latitude,
          longitude,
          speed,
          accuracy
        };
        Cookies.set("location", JSON.stringify(location));
        getLocationAddress(JSON.parse(location));
      }
    });
  };

  // 浏览器定位
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(locationSuccess, locationError, {
      // 指示浏览器获取高精度的位置，默认为false
      enableHighAccuracy: true,
      // 指定获取地理位置的超时时间，默认不限时，单位为毫秒
      timeout: 5000,
      // 最长有效期，在重复获取地理位置时，此参数指定多久再次获取位置。
      maximumAge: 3000
    });
  } else {
    alert("Your browser does not support Geolocation!");
  }
};

export { getLocationName as default };
