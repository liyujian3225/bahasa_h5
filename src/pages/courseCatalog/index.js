import React, { useState, useEffect } from 'react'
import {useNavigate, connect } from 'umi';
import {Avatar, Collapse, Space, Modal, Radio} from 'antd-mobile'
import { request } from '@/services';

const titleStyle = {
  fontSize: '28px',
  fontWeight: 'bold',
  color: '#000',
}

const sectionStyle = {
  marginBottom: 20,
  fontSize: '18px',
  color: '#000',
}

const CustomTitle = ({ title }) => {
  return <span style={titleStyle}>{ title }</span>
}

const courseCatalog = (props) => {
  //获取数据
  const [chaptersData, setChaptersData] = useState([])
  const queryCourse = () => {
    request.get('/business/web/course/find/TYAIILon')
      .then(res => {
        const { success, content } = res;
        if(success) {
          let { chapters, sections } = content;
          chapters = chapters.map(item => {
            const { id } = item;
            item.sectionList = sections.filter(j => j.chapterId === id );
            item.sectionList = item.sectionList.sort((a, b) => a.sort - b.sort)
            return item;
          })
          setChaptersData(chapters)

          props.dispatch({
            type: "user/changeCourseList",
            payload: sections
          })

        }
      })
  }
  useEffect(() => { queryCourse() }, [])
  //观看课程
  const navigate = useNavigate();
  const dumpDetail = ({ title, vod }, index) => {
    if(index > 0) {
      Modal.show({
        title: '在看课程前，我们需要知道您的情况',
        content:
          <Radio.Group defaultValue='2' >
            <Space direction='vertical'>
              <Radio value='1'>
                <span style={{color: 'blue'}}>我已经认真看完上节课的内容同时做好了笔记，背诵好了所有知识点，做好了学习下节课的准备。</span>
              </Radio>
              <Radio value='2'>
                <span style={{color: 'red'}}>我没有看过上节课，或者我并没有认真背诵好上节课的单词，但是我仍然希望观看这节课，我愿意承担学到后面越来越学不懂的风险。</span>
              </Radio>
            </Space>
          </Radio.Group>,
        actions: [
          {
            key: 'agree',
            text: '开始学习',
            disabled: false,
            primary: true,
            onClick: () => {
              navigate("/confidentiality", {
                replace: false,
                state: { title, vod }
              })
            }
          },
          {
            key: 'refuse',
            text: '我不学了'
          },
        ],
        closeOnAction: true
      })
    }else {
      navigate("/confidentiality", {
        replace: false,
        state: { title, vod }
      })
    }
  }

  return (
    <>
      <Space block={true} align="center" justify="center" style={{ marginBottom: '20px' }}>
        <Avatar src='./image/logo.png'  style={{ '--size': '56px', margin: '0 auto' }} />
        <span style={titleStyle}>你好，{props.waterMarkContent}</span>
      </Space>
      <p style={{ marginBottom: '10px'}}>
        <span>学习过程中</span>
        <span style={{color: '#ff0000'}}>请勿开启录屏软件</span>或
        <span style={{color: '#ff0000'}}>第三方下载软件</span>，否则您的帐号可能会受到限制。如果您的网络不佳，视频加载可能需要10-20秒，期间若出现
        <span style={{color: '#ff0000'}}>转圈、黑屏、有声音没画面</span>
        等情况，请耐心等待。如果长时间无法加载，请<span style={{color: '#ff0000'}}>切换网络重新登陆</span>。
      </p>
      <p style={{fontSize: '20px', marginBottom: '20px'}}>
        <span>
          您已经在
          <span style={{color: '#ff0000', fontWeight: 'bold'}}>{props.deviceContent}</span>
          个设备上登陆了学习系统，您还可以在
          <span style={{color: '#ff0000', fontWeight: 'bold'}}>{4 - props.deviceContent}</span>
          个设备上继续登陆。</span>
      </p>
      <Collapse accordion>
        {chaptersData.map(item => (
          <Collapse.Panel
            key={item.id}
            title={<CustomTitle title={item.name} />}>
            <ul>
              {
                item.sectionList.map((jItem, jIndex) => (
                  <li style={sectionStyle} key={jItem.id} onClick={() => dumpDetail(jItem, jIndex)}>
                    {jItem.title}
                  </li>
                ))
              }
            </ul>
          </Collapse.Panel>
        ))}
      </Collapse>
    </>
  )
}

export default connect((state) => {
  return {
    waterMarkContent: state.user.waterMarkContent,
    deviceContent: state.user.deviceContent,
  }
})(courseCatalog)
