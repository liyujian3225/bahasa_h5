import React, { useEffect, useState } from 'react'
import { useLocation, connect } from 'umi';
import { Space, Avatar, Dialog, Button } from 'antd-mobile'
import { request } from '@/services';
import "./index.less"

const titleStyle = {
  fontSize: '34px',
  fontWeight: 'bold',
  color: '#000',
}

const courseDetail = (props) => {
  const stateParams = useLocation();
  const { title, vod } = stateParams.state;
  const [currentTitle, setCurrentTitle] = useState(title);
  const [currentVod, setCurrentVod] = useState(vod);
  const [player, setPlayer] = useState(null);

  if(player) {
    player.on('ended', function() {
      switchCourse('next')
      console.log('视频播放结束')
    })
  }

  const courseList = props.courseList;
  const switchCourse = async (type) => {
    const index = courseList.findIndex(item => item.vod === currentVod);
    let newVod = "";
    let newTitle = "";
    if(type === 'next') {
      if(index === courseList.length - 1) {
        const result = await Dialog.confirm({
          content: '当前课程已是最后一个！',
        })
        return;
      }
      newVod = courseList[index + 1].vod;
      newTitle = courseList[index + 1].title;
    }else {
      if(index === 0) {
        const result = await Dialog.confirm({
          content: '当前课程已是第一个！',
        })
        return;
      }
      newVod = courseList[index - 1].vod;
      newTitle = courseList[index - 1].title;
    }
    setCurrentTitle(newTitle);
    setCurrentVod(newVod);
  }

  useEffect(() => {
    if(player) {
      request.get('/file/web/get-auth/' + currentVod).then(res => {
        const { success, content } = res;
        player.replayByVidAndPlayAuth(currentVod,content);
      })
    }else {
      request.get('/file/web/get-auth/' + currentVod).then(res => {
        const { success, content } = res;
        if(success) {
          new Aliplayer({
            id: "player-con",
            vid: currentVod,
            playauth: content,
            height: "300px",
            cover: './image/cover.jpg',
            "autoplay": true,
            "isLive": false, //是否为直播播放
            "rePlay": false,
            "playsinline": true,
            "preload": true,
            "language": "zh-cn",
            "controlBarVisibility": "click",
            "showBarTime": 5000,
            "useH5Prism": true,
            "components": [{
              name: 'BulletScreenComponent',
              type: AliPlayerComponent.BulletScreenComponent,
              args: [
                props.waterMarkContent + "，加油学习！",
                {
                  fontSize: '16px',
                  color: 'rgba(136, 0, 174, 0.1)'
                },
                'random'
              ]
            }]
          }, function (player) {
            setPlayer(player);
          });
        }
      })
    }
  }, [ currentVod ])

  return (
    <>
      <Space block={true} align="center" justify="center" style={{ marginBottom: '12px' }}>
        <Avatar src='./image/logo.png'  style={{ '--size': '56px', margin: '0 auto' }} />
        <span style={titleStyle}>你好，{props.waterMarkContent}</span>
      </Space>
      <p className="textArea">
        您正在观看的课程是{currentTitle}。如有疑问请联系老师。
      </p>
      <div className="videoContain">
        <div id="player-con"/>
      </div>
      <Space block justify='between'>
        <Button
          block
          color='primary'
          size='mini'
          onClick={() => switchCourse('prve')}>
          上一课 Last
        </Button>
        <Button
          block
          color='primary'
          size='mini'
          onClick={() => switchCourse('next')}>
          下一课 Next
        </Button>
      </Space>
    </>
  )
}

export default connect((state) => {
  return {
    waterMarkContent: state.user.waterMarkContent,
    courseList: state.user.courseList,
  }
})(courseDetail)
