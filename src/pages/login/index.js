import React, { useState } from 'react'
import { useNavigate, connect } from 'umi';
import { Modal, Form, Input, Button, AutoCenter, Checkbox, Space, Radio, Image } from 'antd-mobile';
import {setCookie, getCookie, clearCookie} from '@/utils/rememberPassword';
import { request } from '@/services';
import './index.less';

const Login = (props) => {
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState([])
  const {username = "", tempPassword = "", isRemember = false} = getCookie();
  //登陆成功提示模态框
  let navigate = useNavigate();
  const handleInputSuccess = () => {
    navigate("/courseCatalog", { replace: true });
  }
  //登陆失败提示模态框（账户密码错误）
  const handleInputError = () => {
    Modal.show({
      content: (
        <>
          <AutoCenter style={{ fontSize: '24px', color: '#000' }}>用户名或密码错误</AutoCenter>
          <AutoCenter style={{ fontSize: '14px', color: '#ff0000' }}>如您遗忘用户名或密码，请联系老师</AutoCenter>
        </>
      ),
      closeOnAction: true,
      actions: [
        {
          key: 'online',
          text: '再试一次',
          primary: true,
        },
        {
          key: 'download',
          text: '我没买课',
          onClick: () => {}
        },
      ],
    })
  }
  //登陆失败提示模态框（设备过限）
  const handleDeviceError = () => {
    Modal.show({
      content: (
        <>
          <AutoCenter style={{ fontSize: '24px', color: '#000' }}>登陆设备已达到上限</AutoCenter>
          <AutoCenter style={{ fontSize: '14px', color: '#ff0000' }}>请在常用设备登陆或联系老师</AutoCenter>
        </>
      ),
      closeOnAction: true,
      actions: [
        {
          key: 'online',
          text: '再试一次',
          primary: true,
        },
      ],
    })
  }
  //查询设备数量
  const searchDeviceNum = ((memberld) => {
    request.get('/business/web/member/device-count/' + memberld).then(res => {
      const { content } = res;
      props.dispatch({
        type: "user/changeDeviceNum",
        payload: content
      })
    })
  })
  //查询设备列表
  const searchDeviceList = ((memberld) => {
    request.get('/business/web/member/device-list/' + memberld).then(res => {
      const { content } = res;
      props.dispatch({
        type: "user/changeDeviceList",
        payload: content
      })
    })
  })
  //表单信息
  const [form] = Form.useForm()
  const onFinish = () => {
    setLoading(true)
    const values = form.getFieldsValue();
    request.post('/business/web/member/signIn', {
      data: values
    }).then(res => {
        const { success, content, message } = res;
        setLoading(false)
        if(success) {
          //记住密码控制逻辑
          const { mobile, password, autoLogin } = values;
          if(autoLogin === '1') {
            setCookie(mobile, password, 7)
          }else {
            clearCookie()
          }
          //设置token、水印名称
          const { name, token, id } = content;
          props.dispatch({
            type: "user/changeToken",
            payload: token
          })
          props.dispatch({
            type: "user/changeWaterMarkContent",
            payload: name
          })
          //查询设备列表、数量
          searchDeviceNum(id)
          searchDeviceList(id)
          handleInputSuccess();
        }else {
          if(message === "手机号不存在或密码错误") handleInputError();
          if(message === "登陆设备以达到上限，请联系管理员清除不常用设备") handleDeviceError();
        }
      })
  }
  return (
    <div className="login">
      <Image
        className="img_login"
        src='./image/img_login.png' />
      <div className="loginContain">
        <p className="loginHeader">
          <span>登录</span>
          <span>/ Masuk / Entrar / </span>
          <span>
            <i>Login</i>
          </span>
        </p>
        <Form
          layout='horizontal'
          form={form}
          initialValues={{
            mobile: username,
            password: tempPassword,
            autoLogin: isRemember ? "1" : '0',
          }}
          onFinish={onFinish}
          footer={
            <Button
              className="loginBtn"
              loading={loading}
              loadingText='登陆中'
              color='primary'
              type='submit'
              block
              disabled={value.length < 2}
              size='mini'>
              <div className="loginBtnCon">
                <div className="loginBtnConLeft">
                  <Image className="loginIcon" src='./image/icon_LogIn.png' />
                  <span>登录系统</span>
                </div>
                <div className="loginBtnConRight">
                  <p>Masuk sistem</p>
                  <p>Entrar no sistema</p>
                  <p>
                    <i>User login</i>
                  </p>
                </div>
              </div>
            </Button>
          }
        >
          <Form.Item
            name='mobile'
            label='用户名'
            rules={[{ required: true, message: '用户名不能为空' }]}>
            <Input placeholder='请输入用户名' />
          </Form.Item>
          <Form.Item
            name='password'
            label='密码'
            rules={[{ required: true, message: '密码不能为空' }]}>
            <Input placeholder='请输入密码' />
          </Form.Item>
          <Form.Item
            name='autoLogin'
            label='记住密码：'>
            <Radio.Group>
              <Space>
                <Radio value='1'>是</Radio>
                <Radio value='0'>否</Radio>
              </Space>
            </Radio.Group>
          </Form.Item>
        </Form>
      </div>
      <div className='confidentialityBlock'>
        <div className='confidentialityTxt'>
          <Image
            className="questionIcon"
            src='./image/question.png' />
          <div className="questiontxt">
            <span>请您注意，课程仅供您个人使用。若您将账号共享至他人使用，您的账号会在无警告的前提下永久禁用。</span>
          </div>
        </div>
        <Checkbox.Group
          value={value}
          onChange={val => setValue(val)}
        >
          <Space direction='vertical'>
            <Checkbox className="confidentialityCheckbox" value='one'>我是本帐号持有人</Checkbox>
            <Checkbox className="confidentialityCheckbox" value='two'>我同意并遵守《课程保密协议》</Checkbox>
          </Space>
        </Checkbox.Group>
      </div>
    </div>
  )
}

export default connect((state) => ({}))(Login)
