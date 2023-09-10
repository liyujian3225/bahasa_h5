import { Space, Modal } from 'antd-mobile'
import { useNavigate } from 'umi';
import CustomButton from "@/components/CustomButton"
import  './index.less'

export default () => {

  let navigate = useNavigate();

  return (
    <div className="percobaan">
      <Space
        className="mySpace"
        direction='vertical'
        block={true}
        style={{ '--gap-vertical': '40px' }}
      >
        <CustomButton onClick={() => window.location.href = "https://b23.tv/BJIdQyx"}>
          <p>Domestik</p>
          <p>国内地区试看</p>
        </CustomButton>
        <CustomButton onClick={() => window.location.href = "https://youtube.com/@BahasaIndonesia?si=Cnzezr_HKQ0JgWeX"}>
          <p>Internasional</p>
          <p>国际地区试看</p>
        </CustomButton>
        <CustomButton onClick={() => navigate("/course", { replace: false })}>
          <p>Tentang Les</p>
          <p>课程介绍</p>
        </CustomButton>
        <CustomButton onClick={() => navigate("/contactUs", { replace: false })}>
          <p>Hubungi</p>
          <p>联系我们</p>
        </CustomButton>
      </Space>
    </div>
  )
}
