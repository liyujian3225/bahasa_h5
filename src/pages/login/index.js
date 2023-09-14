import React from 'react'
import { useNavigate } from 'umi';
import { Card, Form, Input, Button, AutoCenter, Space } from 'antd-mobile'

const titleStyle = {
  fontSize: '28px',
  fontWeight: 'bold',
  color: '#000',
}

export default function () {

  let navigate = useNavigate();
  const onSubmit = () => {
    navigate("/person", { replace: false })
  }

  return (
    <>
      <Form
        style={{
          height: '430px',
          position: 'absolute',
          top: 0, bottom: 0,
          left: 0, right: 0,
          margin: 'auto'
        }}
        layout='horizontal'
        mode='card'
        footer={
          <Button block color='primary' onClick={onSubmit} size='large'>
            登陆系统 Masuk
          </Button>
        }
      >
        <Form.Header>
          <AutoCenter style={titleStyle}>Autentikasi</AutoCenter>
          <AutoCenter style={titleStyle}>⽤户身份验证</AutoCenter>
        </Form.Header>
        <Form.Item label='学号 / ID：'>
          <Input placeholder='请输入' />
        </Form.Item>
        <Form.Item label='密码 / Kadi：'>
          <Input placeholder='请输入' />
        </Form.Item>
      </Form>
    </>
  )
}
