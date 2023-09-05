import { Space, Modal } from 'antd-mobile'
import { useNavigate } from 'umi';
import CustomButton from "@/components/CustomButton"
import  './index.less'

export default () => {

  let navigate = useNavigate();

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
          Modal.alert({
            image: './image/wechat.jpg',
          })
        }}>
          <p>wechat</p>
          <p>获取老师微信</p>
        </CustomButton>
        <CustomButton onClick={() => {
          Modal.alert({
            image: './image/line.jpg',
          })
        }}>
          <p>Line Chat</p>
          <p>获取老师赖</p>
        </CustomButton>
      </Space>
    </div>
  )
}
