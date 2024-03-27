import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation, connect } from 'umi';
import { Avatar, Collapse, Space, Modal, Radio, Image, List } from 'antd-mobile'
import { request } from "@/services";
import './index.less';

const courseList = () => {
  const stateParams = useLocation();
  const { name, id } = stateParams.state;
  const [courseListData, setCourseListData] = useState([]);

  const ListHeader = () => {
    return (
      <>
        <span>{name}，</span>
        <span>共{courseListData.length}节课程</span>
      </>
    )
  }

  //观看课程
  const navigate = useNavigate();
  const dumpDetail = ({ title, vod }, index) => {
    if(index > 0) {
      Modal.show({
        title: '我们需要知道您的情况',
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

  const queryCourse = () => {
    request.get('/business/web/course/find/TYAIILon')
      .then(res => {
        const { success, content } = res;
        if(success) {
          let { sections } = content;
          let courseList = sections.filter(j => j.chapterId === id )
          courseList = courseList.sort((a, b) => a.sort - b.sort)
          setCourseListData(courseList)
        }
      })
  }
  useEffect(() => {
    queryCourse()
  }, [])

  return (
    <div className="courseList">
      <List header={<ListHeader/>}>
        {
          courseListData.map((item, index) => {
            const { title, vod } = item;
            return (
              <List.Item
                key={vod}
                onClick={() => dumpDetail({title, vod}, index)}
              >
                {title}
              </List.Item>
            )
          })
        }
      </List>
    </div>
  )
}

export default courseList;
