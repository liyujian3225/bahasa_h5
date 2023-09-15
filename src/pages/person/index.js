import React from 'react'
import {useClientLoaderData, useNavigate} from 'umi';
import {Avatar, Button, Collapse, Space} from 'antd-mobile'

const titleStyle = {
  fontSize: '34px',
  fontWeight: 'bold',
  color: '#000',
}

const CustomTitle = ({ title }) => {
  return <span style={titleStyle}>{ title }</span>
}

export async function clientLoader() {
  const data = await fetch('/api/data');
  return data;
}

export default function () {

  const navigate = useNavigate();
  const { data } = useClientLoaderData(); //data预加载

  return (
    <>
      <Space block={true} align="center" justify="center" style={{ marginBottom: '20px' }}>
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

      <Button block color='primary' onClick={() => navigate("/confidentiality", { replace: false })} size='large'>
        跳转到隐私
      </Button>
    </>
  )
}
