import React, { useState } from 'react'
import { Space, Button, WaterMark } from 'antd-mobile'
import './index.less';

const generatesRandomNumber = () => {
  let res = ''
  for(let i = 0; i < 12; i++){
    res += Math.floor(Math.random()*10);
  }
  return res.slice(0, 3) + '.' + res.slice(3, 6) + '.' + res.slice(6, 9) + '.' + res.slice(9, 12);
}

export default () => {
  return (
    <div className="home">
      <Space className="mySpace" direction='vertical' block={true}>
        <Button className="myButton" block={true}>
          <p>Masuk</p>
          <p>用户登录</p>
        </Button>
        <Button className="myButton" block={true}>
          <p>Percobaan</p>
          <p>购课前试看</p>
        </Button>
      </Space>
      <WaterMark content={generatesRandomNumber()} />
    </div>
  )
}
