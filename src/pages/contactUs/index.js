import React, { useState } from 'react'
import { Space, ImageViewer } from 'antd-mobile'
import CustomButton from "@/components/CustomButton"
import  './index.less'

export default () => {

  const [visible, setVisible] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  return (
    <div className="contactUs">
      <Space
        className="mySpace"
        direction='vertical'
        block={true}
        style={{ '--gap-vertical': '40px' }}
      >
        <CustomButton onClick={() => window.location.href = "https://wa.me/message/DTU42U33SXXDP1"}>
          <p>whatsApp</p>
          <p>直接对话</p>
        </CustomButton>
        <CustomButton onClick={() => {
          setVisible(true);
          setImageUrl('./image/wechat.jpg')
        }}>
          <p>wechat</p>
          <p>获取老师微信</p>
        </CustomButton>
        <CustomButton onClick={() => {
          setVisible(true)
          setImageUrl('./image/line.jpg')
        }}>
          <p>Line Chat</p>
          <p>获取老师赖</p>
        </CustomButton>
        <ImageViewer
          image={imageUrl}
          visible={visible}
          onClose={() => {
            setVisible(false)
          }}
        />
      </Space>
    </div>
  )
}
