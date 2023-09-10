import React from 'react'
import { Space, Avatar } from 'antd-mobile'
import { useNavigate } from 'umi';
import CustomButton from "@/components/CustomButton"
import './index.less';

export default () => {

  let navigate = useNavigate();

  return (
    <div className="home">
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
