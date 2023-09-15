import React, { useEffect } from 'react'
import { useNavigate } from 'umi';
import { Space, Avatar, Modal, Button } from 'antd-mobile'
import "./index.less"

const titleStyle = {
  fontSize: '34px',
  fontWeight: 'bold',
  color: '#000',
}

export default function () {

  useEffect(() => {
    var player = new Aliplayer({
      id: "player-con",
      source: "//player.alicdn.com/video/editor.mp4",
      height: "200px",
      cover: 'https://img.alicdn.com/tps/TB1EXIhOFXXXXcIaXXXXXXXXXXX-760-340.jpg',
      "autoplay": false,
      "isLive": false, //是否为直播播放
      "rePlay": false,
      "playsinline": true,
      "preload": true,
      "language": "zh-cn",
      "controlBarVisibility": "click",
      "showBarTime": 5000,
      "useH5Prism": true,
      skinLayout:[
        {name: "bigPlayButton", align: "blabs", x: 30, y: 80},
        {
          name: "H5Loading", align: "cc"
        },
        {name: "errorDisplay", align: "tlabs", x: 0, y: 0},
        {name: "infoDisplay"},
        {name:"tooltip", align:"blabs",x: 0, y: 56},
        {name: "thumbnail"},
        {
          name: "controlBar", align: "blabs", x: 0, y: 0,
          children: [
            {name: "progress", align: "blabs", x: 0, y: 44},
            {name: "playButton", align: "tl", x: 15, y: 12},
            {name: "timeDisplay", align: "tl", x: 10, y: 7},
            {name: "fullScreenButton", align: "tr", x: 10, y: 12},
            {name:"subtitle", align:"tr",x:15, y:12},
            {name:"setting", align:"tr",x:15, y:12},
            {name: "volume", align: "tr", x: 5, y: 10}
          ]
        }
      ]
    }, function (player) {
      console.log("The player is created");
    });
  }, [])

  return (
    <>
      <Space block={true} align="center" justify="center" style={{ marginBottom: '20px' }}>
        <Avatar src='./image/logo.png'  style={{ '--size': '56px', margin: '0 auto' }} />
        <span style={titleStyle}>你好，刘小鹏</span>
      </Space>
      <p className="textArea">
        您正在观看的课程是【01｜带你进入印尼语的世 界】。如有疑问请联系老师。
      </p>
      <div className="videoContain">
        <div id="player-con"/>
      </div>
      <Space block justify="between" style={{ width: '100%' }}>
        <Space block direction='vertical' style={{ '--gap-vertical': '20px' }}>
          <Button
            block
            color='primary'
            size='large'>
            下一课 Next
          </Button>
          <Button
            block
            color='primary'
            size='large'>
            上一课 Last
          </Button>
        </Space>
        <div
          className="operate"
          onClick={() =>
            Modal.alert({
              content: '功能开发中，敬请期待！',
              onConfirm: () => {
                console.log('Confirmed')
              },
            })
          }
        >
          <span>练习</span>
        </div>
      </Space>
    </>
  )
}
