const generatesRandomNumber = () => {
  let res = ''
  for(let i = 0; i < 12; i++){
    res += Math.floor(Math.random()*10);
  }
  return res.slice(0, 3) + '.' + res.slice(3, 6) + '.' + res.slice(6, 9) + '.' + res.slice(9, 12);
}

//生成浏览器指纹
import Fingerprint2 from 'fingerprintjs2';
const createFingerprint = () => {
  // 参数只有回调函数时，默认浏览器指纹依据所有配置信息进行生成
  Fingerprint2.get((components) => {
    const values = components.map((component,index) => {
      //把微信浏览器里UA的wifi或4G等网络替换成空,不然切换网络会ID不一样
      if (index === 0) return component.value.replace(/\bNetType\/\w+\b/, '')
      return component.value
    }); // 配置的值的数组
    // 生成浏览器指纹
    const murmur = Fingerprint2.x64hash128(values.join(''), 31);
    // 存储浏览器指纹，在项目中用于校验用户身份和埋点
    localStorage.setItem('deviceId', murmur);
  });
}

//延迟几秒再生成浏览器指纹
if (window.requestIdleCallback) {
  requestIdleCallback(() => { createFingerprint() });
} else {
  setTimeout(() => { createFingerprint() }, 500);
}

export default {
  state: {
    deviceId: localStorage.getItem("deviceId"),
    token: localStorage.getItem("token") || "",
    waterMarkContent: localStorage.getItem("waterMarkContent") || generatesRandomNumber(),
    courseList: localStorage.getItem("courseList") ? JSON.parse(localStorage.getItem("courseList")) : []
  },
  reducers: {
    changeToken(state, { payload }) {
      localStorage.setItem("token", payload);
      return {
        ...state,
        token: payload,
      };
    },
    changeWaterMarkContent(state, { payload }) {
      localStorage.setItem("waterMarkContent", payload);
      return {
        ...state,
        waterMarkContent: payload,
      };
    },
    changeCourseList(state, { payload }) {
      localStorage.setItem("courseList", JSON.stringify(payload));
      return {
        ...state,
        courseList: payload,
      };
    },
  },
};
