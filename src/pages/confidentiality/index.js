import React from 'react'
import { useNavigate, useLocation } from 'umi';
import { Image } from 'antd-mobile'
import dayjs from 'dayjs'
import './index.less'

const Confidentiality = (props) => {
  const currentDate = dayjs().format("YYYY年M月")
  const stateParams = useLocation();
  const { id, title, vod } = stateParams.state;

  let navigate = useNavigate();
  const agreeRule = () => {
    navigate("/courseDetail", {
      replace: false,
      state: { id, title, vod }
    })
  }

  return (
    <div className="confidentiality">
      <div className="chapterAttention">
        <p>您是否接受保密协议</p>
        <p>敬请留意，本课程仅供个人单独使用。如您欲购买用于多人观看学习的课程，请与我们联系以获取企业授权。</p>
        <p>
          <span style={{color: '#ff0000'}}>我们对盗版课程的传播持绝对零容忍态度，</span>
          任何个人或组织均不得将本课程传播至互联网或其他学习机构。</p>
        <p>
          <span style={{color: '#ff0000'}}>为确保课程的保密性，我们将在课程中嵌入带有唯一编码的隐形水印。</span>
          当您选择购买本课程时，即表明您愿意承担保密工作的责任。
        </p>
        <Image
          className="chapterDecorate"
          src="./image/img_decorate.png"/>
        <Image
          className='chapterBtn'
          src="./image/confidentialityAgree.png"
          alt=""
          onClick={() => agreeRule()}/>
        <Image
          src="./image/confidentialityRefuse.png"
          alt=""
          onClick={() => window.location.href = "https://www.gov.cn/guoqing/2021-10/29/content_5647633.htm"}
        />
      </div>
      <Image
        className="chapterPrison"
        src="./image/prison.png"/>
    </div>
  )
}

export default Confidentiality
