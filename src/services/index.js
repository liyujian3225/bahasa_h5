import { Modal } from 'antd-mobile'
import { extend } from "umi-request";
import user from "@/models/user"

export const request = extend({
  timeout: 10000,
  errorHandler: function (error) {
    Modal.alert({
      content: '登录失效，请重新登录',
      onConfirm: () => {
        window.location.href = "/login";
      },
    })
  }
});

//请求拦截
request.interceptors.request.use((url, options) => {
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

