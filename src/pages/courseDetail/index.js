import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation, connect } from 'umi';
import { Dialog, Image, Modal, AutoCenter } from 'antd-mobile'
import { request } from '@/services';
import "./index.less"

const courseDetail = (props) => {
  const stateParams = useLocation();
  const { id, title, vod } = stateParams.state;
  const [currentId, setCurrentId] = useState(id);
  const [currentTitle, setCurrentTitle] = useState(title);
  const [currentVod, setCurrentVod] = useState(vod);
  const [player, setPlayer] = useState(null);

  if(player) {
    player.on('ended', function() {
      switchCourse('next')
    })
  }

  let navigate = useNavigate();
  const courseList = props.courseList;
  const switchCourse = async (type) => {
    const index = courseList.findIndex(item => item.vod === currentVod);
    let newId = "";
    let newVod = "";
    let newTitle = "";
    if(type === 'next') {
      if(index === courseList.length - 1) {
        const result = await Dialog.confirm({
          content: '当前课程已是最后一个！',
        })
        return;
      }else {
        const {id, vod, title, isPass} = courseList[index + 1];
        newId = id;
        newVod = vod;
        newTitle = title;
        if(isPass === 0) {
          Modal.show({
            content: <AutoCenter>需要通过本节课测试才能进入下一课，你做好准备了吗？</AutoCenter>,
            closeOnAction: true,
            actions: [
              {
                key: 'online',
                text: '做好准备了',
                primary: true,
                onClick: () => {
                  navigate("/doExercises", {
                    replace: false,
                    state: {
                      id: currentId,
                      title: currentTitle,
                      vod: currentVod,
                      nextId: newId,
                      nextTitle: newTitle,
                      nextVod: newVod,
                    }
                  })
                }
              },
              {
                key: 'online',
                text: '还没准备好',
              },
            ],
          })
          return;
        }
      }
    }else {
      if(index === 0) {
        const result = await Dialog.confirm({
          content: '当前课程已是第一个！',
        })
        return;
      }
      newId = courseList[index - 1].id;
      newVod = courseList[index - 1].vod;
      newTitle = courseList[index - 1].title;
    }
    setCurrentId(newId)
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
    <div className="courseDetail">
      <p className="helloUser">
        <span>你好呀，用户{props.waterMarkContent}</span>
      </p>
      <div className="chapterAttention">
        <ul>
          <li>
            <span>学习过程中请勿开启录屏软件或第三方下载软件，否则您的帐号可能会受到限制。</span>
          </li>
          <li>
            <span>如果您的网络不佳，视频加载可能需要10-20秒，期间若</span>
            <span style={{color: '#ff0000'}}>出现转圈、黑屏、有声音没画面等情况，</span>
            <span> 请耐心等待。如果长时问无法加载，请切换网络重新登陆。</span>
          </li>
        </ul>
        <div className="chapterAttentionImg">
          <Image src='./image_/img_intro.png'/>
        </div>
      </div>
      <p className="textArea">
        <span>{currentTitle}</span>
      </p>
      <div className="videoContain">
        <div id="player-con"/>
      </div>
      <div className="courseBtn">
        <Image
          style={{marginRight: 12}}
          src='./image/prveCourse.png'
          onClick={() => switchCourse('prve')}/>
        <Image
          src='./image/nextCourse.png'
          onClick={() => switchCourse('next')}/>
      </div>
    </div>
  )
}

export default connect((state) => {
  return {
    waterMarkContent: state.user.waterMarkContent,
    courseList: state.user.courseList,
  }
})(courseDetail)
