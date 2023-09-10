import React from 'react'
import { useNavigate } from 'umi';
import { Space, Avatar, Collapse } from 'antd-mobile'

const titleStyle = {
  fontSize: '34px',
  fontWeight: 'bold',
  color: '#000',
}

const CustomTitle = ({ title }) => {
  return <span style={titleStyle}>{ title }</span>
}

export default function () {
  return (
    <>
      <Space block={true} align="center" justify="center">
        <Avatar src='./image/logo.png'  style={{ '--size': '56px', margin: '0 auto' }} />
        <span style={titleStyle}>你好，刘小鹏</span>
      </Space>
      <Collapse defaultActiveKey={'1'} accordion>
        <Collapse.Panel
          key='1'
          title={<CustomTitle title='第一项' />}>
          dd
        </Collapse.Panel>
        <Collapse.Panel key='2' title={<CustomTitle title='第二项' />}>
          dd
        </Collapse.Panel>
        <Collapse.Panel key='3' title={<CustomTitle title='第三项' />}>
          dd
        </Collapse.Panel>
      </Collapse>
    </>
  )
}
