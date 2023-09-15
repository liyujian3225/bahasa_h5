import React from 'react'
import { useNavigate } from 'umi';
import { Modal, Form, Input, Button, AutoCenter } from 'antd-mobile'
import './index.less'

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

  const handleInputError = () => {
    Modal.show({
      content: (
        <>
          <AutoCenter className="errorTitle">用户名或密码错误</AutoCenter>
          <AutoCenter className="errorOperate">如您遗忘用户名或密码，请联系老师</AutoCenter>
        </>
      ),
      closeOnAction: true,
      actions: [
        {
          key: 'online',
          text: '再试一次',
          primary: true,
          onClick: () => {

          }
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
          <div style={{ width: '100%', height: '40px' }}/>
        </Form.Header>
        <Form.Item label='学号 / ID：'>
          <Input placeholder='请输入' />
        </Form.Item>
        <Form.Item label='密码 / Kadi：'>
          <Input placeholder='请输入' />
        </Form.Item>

        <Button
          block
          color='primary'
          onClick={handleInputError}
          size='large'>
          密码错误
        </Button>

      </Form>
    </>
  )
}
