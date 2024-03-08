import React, { useState } from 'react'
import { Space, Mask, SpinLoading, Button, Footer, Image, FloatingBubble } from 'antd-mobile'
import { useNavigate } from 'umi';
import './index.less';

export default () => {
  const links = [
    {
      text: '东东印尼语YouTube',
      href: 'https://www.youtube.com/channel/UCNz0CuIKBXpizEmn8akC42w',
    },
    {
      text: '东东印尼语抖音',
      href: 'https://v.douyin.com/iNNrghAv/ 8@5.com',
    },
  ]
  let navigate = useNavigate();
  const [visible, setVisible] = useState(true)
  setTimeout(() => {
    setVisible(false);
  }, 500)
  return (
    <div className="home">
      <Mask opacity='thick' visible={visible}>
        <div className='overlayContent'>
          <Space direction='vertical'>
            <SpinLoading color='primary' />
            <span>加载中...</span>
          </Space>
        </div>
      </Mask>
      <Space className="mySpace" direction='vertical' block={true}>
        <Image width='80%' style={{ margin: '0 auto '}} src='./image/login_home.png' />
        <Button size='mini' color='primary' block onClick={() => navigate("/login", { replace: false })}>
          <p>Masuk</p>
          <p>用户登录</p>
        </Button>
        <Button size='mini' color='primary' fill='outline' block onClick={() => window.open("https://taioassets.oss-cn-beijing.aliyuncs.com/Pdfs/%E4%B8%9C%E4%B8%9C%E5%8D%B0%E5%B0%BC%E8%AF%AD%E7%94%A8%E6%88%B7%E4%BD%BF%E7%94%A8%E6%9C%8D%E5%8A%A1%E5%8D%8F%E8%AE%AE.pdf", "_blank")}>
          <p>Perjanjian Les</p>
          <p>用户协议</p>
        </Button>
        <FloatingBubble
          axis='xy'
          magnetic='x'
          style={{
            '--initial-position-bottom': '24px',
            '--initial-position-right': '24px',
            '--edge-distance': '24px',
          }}
          onClick={() => window.open("http://bahasaindo.cn", "_blank")}
        >
          <span>单词卡</span>
        </FloatingBubble>
      </Space>
      <Footer
        className="myFooter"
        label='东东印尼语'
        content='@ 2019-2024 PT BahasaDong All rights reserved'
        links={links}
      ></Footer>
    </div>
  )
}
