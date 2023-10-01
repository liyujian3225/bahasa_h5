import React, { useState, useEffect } from 'react'
import {useNavigate, connect } from 'umi';
import {Avatar, Button, Collapse, Space} from 'antd-mobile'
import request from 'umi-request';

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
  const dumpDetail = ({ title, vod }) => {
    navigate("/confidentiality", {
      replace: false,
      state: { title, vod }
    })
  }

  return (
    <>
      <Space block={true} align="center" justify="center" style={{ marginBottom: '20px' }}>
        <Avatar src='./image/logo.png'  style={{ '--size': '56px', margin: '0 auto' }} />
        <span style={titleStyle}>你好，{props.waterMarkContent}</span>
      </Space>
      <Collapse accordion>
        { chaptersData.map(item => (
          <Collapse.Panel
            key={item.id}
            title={<CustomTitle title={item.name} />}>
            <ul>
              {
                item.sectionList.map(jItem => (
                  <li style={sectionStyle} key={jItem.id} onClick={() => dumpDetail(jItem)}>
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
    waterMarkContent: state.user.waterMarkContent
  }
})(courseCatalog)
