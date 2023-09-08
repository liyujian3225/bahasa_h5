import React from 'react'
import { Card, Form, Input } from 'antd-mobile'

export default function () {
  return (
    <>
      <Form layout='horizontal' mode='card'>
        <Form.Header>Autentikasi⽤户身份验证</Form.Header>
        <Form.Item label='学号 / ID：'>
          <Input placeholder='请输入' />
        </Form.Item>
        <Form.Item label='密码 / Kadi：'>
          <Input placeholder='请输入' />
        </Form.Item>


        登陆系统Masuk

      </Form>
    </>
  )
}
