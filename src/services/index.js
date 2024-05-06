import { Modal } from 'antd-mobile'
import { extend } from "umi-request";

export const request = extend({
  timeout: 10000,
  errorHandler: function (error) {
    Modal.alert({
      confirmText: '好的，我不会与他人分享我的帐号。我只是在自己的新设备登陆。',
      content: <p>
        <span>学习系统仅供1人使用，你的学习帐号已在其他设备登陆。请不要将学习帐号泄露给他人。与他人分享账号或频繁使用新设备登陆可能会导致账号被临时/永久封禁。</span>
        <span style={{fontWeight: 'bold', color: '#ff0000'}}>系统可能因您所在地区网络波动而误判，如果您对此不知情，请忽略本信息并重新登陆。</span>
      </p>,
      onConfirm: () => {
        window.location.href = "/#/login";
      },
    })
  }
});

//请求拦截
request.interceptors.request.use((url, options) => {
  //设置登陆token
  const token = localStorage.getItem("token");
  const headers = { token };
  return {
    url,
    options: { ...options, headers }
  }
})

//响应拦截
request.interceptors.response.use(async (response, options) => {
  const { url, status } = response;
  if(status === 200) {
    let data = await response.clone().json();
    console.log(data)
  }else if(status === 401) {
    //未登录或登录失效
    props.dispatch({
      type: "user/changeToken",
      payload: ""
    })

    props.dispatch({
      type: "user/changeWaterMarkContent",
      payload: ""
    })

    props.dispatch({
      type: "user/changeCourseList",
      payload: []
    })
  }
  return response
})

