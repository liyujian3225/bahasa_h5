import React, { useState, useEffect } from 'react'
import {useNavigate, connect } from 'umi';
import {Avatar, Collapse, Space, Modal, Radio, Image} from 'antd-mobile'
import { request } from '@/services';
import './index.less'

const CustomTitle = ({ title, index }) => {
  return <div className='courseCard'>
    {index === 0 ? <Image src='./image/baseCourse.png' width={200} fit='fill' /> : <Image src='./image/advancedCourse.png' width={200} fit='fill' />}
    <span>{title}</span>
  </div>
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
    <div className="courseCatalog">
      <Space block={true} align="center" justify="center" style={{ marginBottom: '12px' }}>
        <Avatar src='./image/logo.png'  style={{ '--size': '56px', margin: '0 auto' }} />
        <span className='title'>你好，{props.waterMarkContent}</span>
      </Space>
      <p style={{ marginBottom: '12px'}}>
        <span>学习过程中</span>
        <span style={{color: '#ff0000'}}>请勿开启录屏软件</span>或
        <span style={{color: '#ff0000'}}>第三方下载软件</span>，否则您的帐号可能会受到限制。如果您的网络不佳，视频加载可能需要10-20秒，期间若出现
        <span style={{color: '#ff0000'}}>转圈、黑屏、有声音没画面</span>
        等情况，请耐心等待。如果长时间无法加载，请<span style={{color: '#ff0000'}}>切换网络重新登陆</span>。
      </p>
      <p style={{fontSize: '20px', marginBottom: '12px'}}>
        <span>您已经在</span>
        <span style={{color: '#ff0000', fontWeight: 'bold'}}>{props.deviceContent}</span>
        <span>个设备上登陆了学习系统。</span>
      </p>
      <Collapse accordion>
        {chaptersData.map((item, index) => (
          <Collapse.Panel
            key={item.id}
            title={<CustomTitle title={item.name} index={index} />}>
            <ul>
              {
                item.sectionList.map((jItem, jIndex) => (
                  <li
                    className='sectionItem'
                    key={jItem.id}
                    onClick={() => dumpDetail(jItem, jIndex)}>
                    {jItem.title}
                  </li>
                ))
              }
            </ul>
          </Collapse.Panel>
        ))}
      </Collapse>
    </div>
  )
}

export default connect((state) => {
  return {
    waterMarkContent: state.user.waterMarkContent,
    deviceContent: state.user.deviceContent,
  }
})(courseCatalog)
