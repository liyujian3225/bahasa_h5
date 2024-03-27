import React from 'react'
import { useNavigate, useLocation, connect } from 'umi';
import { Space, Avatar, Button } from 'antd-mobile'
import dayjs from 'dayjs'
import './index.less'

const Layout = (props) => {
  const currentDate = dayjs().format("YYYY年M月")
  const stateParams = useLocation();
  const { title, vod } = stateParams.state;
  let navigate = useNavigate();
  const agreeRule = () => {
    navigate("/courseDetail", {
      replace: false,
      state: { title, vod }
    })
  }

  return (
    <div className="confidentiality">
      <Space style={{marginBottom: '12px'}} block={true} align="center" justify="center">
        <Avatar src='./image/lock.png' fit='contain' style={{'--size': '80px'}}/>
        <Space direction='vertical' style={{'--gap-vertical': 0}}>
          <span>课程保密协议</span>
          <span>Perjanjian kerahasiaan</span>
        </Space>
      </Space>
      <p className="notice">
        <span>敬请留意，</span>
        <span style={{color: '#ff0000'}}>本课程仅供个人单独使用。</span>
        <span>如您欲购买用于多人观看学习的课程，请与我们联系以获取企业授权。我们对盗版课程的传播持绝对零容忍态度，任何个人或组织均不得将本课程传播至互联网或其他学习机构。</span>
        <span style={{color: '#004aab'}}>为确保课程的保密性，我们将在课程中嵌入带有唯一编码的隐形水印。</span>
        <span>当您选择购买本课程时，即表明您愿意承担保密工作的责任。</span>
      </p>
      <Space style={{marginBottom: '12px'}} direction='vertical' block={true}>
        <Button
          onClick={() => agreeRule()}
          style={{
            '--background-color': '#4e8f82',
            '--border-radius': '10px',
            '--text-color': '#fff',
            'fontWeight': 'bold'
          }}
          size='large'
          fill='solid'>
          我同意本协议
        </Button>
        <Button
          onClick={() => window.location.href = "https://www.gov.cn/guoqing/2021-10/29/content_5647633.htm"}
          style={{
            '--background-color': '#ff0000',
            '--border-radius': '10px',
            '--text-color': '#fff',
            'fontWeight': 'bold'
          }}
          size='large'
          fill='solid'>
          不同意并退出
        </Button>
      </Space>
      <Space direction='vertical' style={{'--gap-vertical': '5px'}}>
        <span>{'承诺人：' + props.waterMarkContent}</span>
        <span>{'日期：' + currentDate}</span>
      </Space>
      <img className="myAvatar" src="./image/person.jpg" alt=""/>
    </div>
  )
}

export default connect((state) => {
  return {
    waterMarkContent: state.user.waterMarkContent
  }
})(Layout)
