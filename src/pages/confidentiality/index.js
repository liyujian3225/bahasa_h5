import React from 'react'
import { useNavigate } from 'umi';
import { Space, Avatar, Button } from 'antd-mobile'

const titleStyle = {
  fontSize: '24px',
  fontWeight: 'bold',
  color: '#000',
}

const CustomTitle = ({ title }) => {
  return <span style={titleStyle}>{ title }</span>
}

const Content = () => {
  return (
    <p style={{ fontSize: '16px', padding: '20px' }}>
      <span>敬请留意，</span>
      <span style={{ color: '#ff0000' }}>本课程仅供个人单独使用。</span>
      <span>如您欲购买用于多人观看学习的课程，请与我们联系以获取企业授权。我们对盗版课程的传播持绝对零容忍态度，任何个人或组织均不得将本课程传播至互联网或其他学习机构。</span>
      <span style={{ color: '#004aab' }}>为确保课程的保密性，我们将在课程中嵌入带有唯一编码的隐形水印。</span>
      <span>当您选择购买本课程时，即表明您愿意承担保密工作的责任。</span>
    </p>
  )
};

export default function () {
  return (
    <>
      <Space block={true} align="center" justify="center">
        <Avatar src='./image/logo.png'  style={{ '--size': '80px', margin: '0 auto' }} />
        <Space direction='vertical' style={{ '--gap-vertical': 0 }}>
          <CustomTitle title='课程保密协议' />
          <CustomTitle title='Perjanjian kerahasiaan' />
        </Space>
      </Space>
      <Content />
      <Space direction='vertical' block={true}>
        <Button
          style={{
            '--background-color': '#4e8f82',
            '--border-radius': '10px',
            '--text-color': '#fff'
          }}
          size='large'
          fill='solid'>
          我同意本协议
        </Button>
        <Button
          style={{
            '--background-color': '#ff0000',
            '--border-radius': '10px',
            '--text-color': '#fff'
          }}
          size='large'
          fill='solid'>
          不同意并退出
        </Button>
      </Space>
      <Space direction='vertical' style={{ '--gap-vertical': '5px' }}>
        <CustomTitle title='承诺人：刘小鹏' />
        <CustomTitle title='日期：2023年8月' />
      </Space>
    </>
  )
}
