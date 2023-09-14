import React, { useState } from 'react'
import { Space, Avatar, Mask, SpinLoading } from 'antd-mobile'
import { useNavigate } from 'umi';
import CustomButton from "@/components/CustomButton"
import './index.less';

export default () => {

  const [visible, setVisible] = useState(true)
  let navigate = useNavigate();
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
      <Space
        className="mySpace"
        direction='vertical'
        block={true}
        style={{ '--gap-vertical': '40px' }}
      >
        <Avatar src='./image/logo.png'  style={{ '--size': '128px', margin: '0 auto' }} />
        <CustomButton onClick={() => navigate("/login", { replace: false })}>
          <p>Masuk</p>
          <p>用户登录</p>
        </CustomButton>
        <CustomButton onClick={() => navigate("/percobaan", { replace: false })}>
          <p>Percobaan</p>
          <p>购课前试看</p>
        </CustomButton>
      </Space>
    </div>
  )
}
