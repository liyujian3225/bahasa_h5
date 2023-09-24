import React from 'react'
import { useNavigate, connect } from 'umi';
import { Modal, Form, Input, Button, AutoCenter } from 'antd-mobile'
import request from 'umi-request';

const titleStyle = {
  fontSize: '28px',
  fontWeight: 'bold',
  color: '#000',
}

const Login = (props) => {
  //密码错误提示模态框
  let navigate = useNavigate();
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
  //表单信息
  const [form] = Form.useForm()
  const onFinish = () => {
    const values = form.getFieldsValue();
    request.post('/business/web/member/signIn', {
      data: values
    }).then(res => {
        const { success, content } = res;
        if(success) {
          navigate("/courseCatalog", { replace: false });
          const { id, mobile, name, photo, token } = content;
          props.dispatch({
            type: "user/changeWaterMarkContent",
            payload: name
          })
        }else {
          handleInputError()
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
