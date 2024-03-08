import React, { useState } from 'react'
import { useNavigate, connect } from 'umi';
import { Modal, Form, Input, Button, AutoCenter, Image } from 'antd-mobile'
import { request } from '@/services';
import './index.less';

const Login = (props) => {
  const [loading, setLoading] = useState(false)
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
      const { content } = res;
      props.dispatch({
        type: "user/changeDeviceContent",
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
        className='myForm'
        layout='horizontal'
        mode='card'
        form={form}
        initialValues={{
          mobile: '',
          password: '',
        }}
        onFinish={onFinish}
        footer={
          <Button
            loading={loading}
            loadingText='登陆中'
            color='primary'
            type='submit'
            block
            size='mini'>
            <p>Masuk</p>
            <p>登陆系统</p>
          </Button>
        }
      >
        <Form.Header>
          <AutoCenter className='title'>Autentikasi</AutoCenter>
          <AutoCenter className='subTitle'>⽤户身份验证</AutoCenter>
          {/*<Image width='80%' style={{ margin: '0 auto '}} src='./image/logo_word.png' />*/}
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
