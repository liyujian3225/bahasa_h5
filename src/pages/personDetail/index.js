import React, { useEffect } from 'react'
import { useNavigate } from 'umi';
import { Space, Avatar, Collapse, Button } from 'antd-mobile'
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
      "isLive": false,
      "rePlay": false,
      "playsinline": true,
      "preload": true,
      "language": "zh-cn",
      "controlBarVisibility": "click",
      "showBarTime": 5000,
      "useH5Prism": true
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
        <Space direction='vertical' style={{ '--gap-vertical': '20px' }}>
          <Button color='primary' size='large'>下一课 Next</Button>
          <Button color='primary' size='large'>上一课 Last</Button>
        </Space>
        <div className="operate">
          <span>练习</span>
        </div>
      </Space>
    </>
  )
}
