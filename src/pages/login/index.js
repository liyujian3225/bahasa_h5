import React from 'react'
import { useNavigate, connect } from 'umi';
import { Modal, Form, Input, Button, AutoCenter } from 'antd-mobile'
import { request } from '@/services';

const titleStyle = {
  fontSize: '28px',
  fontWeight: 'bold',
  color: '#000',
}

const Login = (props) => {
  //登陆成功提示模态框
  let navigate = useNavigate();
  const handleInputSuccess = () => {
    Modal.show({
      content: (
        <>
          <AutoCenter style={{ fontSize: '14px', color: '#000' }}>本系统仅供已经购买了课程的同学使用，如果您未买课程，请您立即关闭。</AutoCenter>
        </>
      ),
      closeOnAction: true,
      actions: [
        {
          key: 'download',
          text: '我已购买',
          primary: true,
          onClick: async () => {
            navigate("/courseCatalog", { replace: false });
          }
        },
        {
          key: 'online',
          text: '立即关闭',
          primary: true,
          onClick: () => {
            window.location.href = "https://www.gov.cn/guoqing/2021-10/29/content_5647633.htm"
          }
        },
      ],
    })
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
          onClick: () => {
            navigate("/course", { replace: false })
          }
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
      console.log(res)
    })
  })
  //表单信息
  const [form] = Form.useForm()
  const onFinish = () => {
    const values = form.getFieldsValue();
    request.post('/business/web/member/signIn', {
      data: values
    }).then(res => {
        const { success, content, message } = res;
        if(success) {
          const { name, token, id } = content;
          searchDeviceNum(id)
          props.dispatch({
            type: "user/changeToken",
            payload: token
          })
          props.dispatch({
            type: "user/changeWaterMarkContent",
            payload: name
          })
          handleInputSuccess();
        }else {
          if(message === "手机号不存在或密码错误") handleInputError();
          if(message === "登陆设备以达到上限，请联系管理员清除不常用设备") handleDeviceError();
        }
      })
  }
  return (
    <>
      <Form
        layout='horizontal'
        mode='card'
        style={{
          height: '430px',
          position: 'absolute',
          top: 0, bottom: 0,
          left: 0, right: 0,
          margin: 'auto'
        }}
        form={form}
        initialValues={{
          mobile: '',
          password: '',
        }}
        onFinish={onFinish}
        footer={
          <Button
            color='primary'
            type='submit'
            block
            size='large'>
            登陆系统 Masuk
          </Button>
        }
      >
        <Form.Header>
          <AutoCenter style={titleStyle}>Autentikasi</AutoCenter>
          <AutoCenter style={titleStyle}>⽤户身份验证</AutoCenter>
          <div style={{ width: '100%', height: '40px' }}/>
        </Form.Header>
        <Form.Item
          name='mobile'
          label='用户名 / ID：'
          rules={[{ required: true, message: '用户名不能为空' }]}>
          <Input placeholder='请输入用户名' />
        </Form.Item>
        <Form.Item
          name='password'
          label='密码 / Kadi：'
          rules={[{ required: true, message: '密码不能为空' }]}>
          <Input placeholder='请输入密码' />
        </Form.Item>
      </Form>
    </>
  )
}

export default connect((state) => ({}))(Login)
