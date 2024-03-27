import React, { useState, useEffect } from 'react'
import { useNavigate, connect } from 'umi';
import { Avatar, Collapse, Space, Modal, Radio, Image } from 'antd-mobile'
import { request } from '@/services';
import './index.less';

const courseCatalogList = [
  {
    id: "NmmbLYYl",
    name: "基础课 Pelajaran Dasar",
    coverArt: <Image src='./image/baseCourse.png' fit='fill' />
  },
  {
    id: "a6RhhcNa",
    name: "进阶课 Pelajaran Lanjut",
    coverArt: <Image src='./image/advancedCourse.png' fit='fill' />
  },
]

const courseCatalog = (props) => {
  const navigate = useNavigate();
  const dumpDetail = ({name, id}) => {
    navigate("/courseList", {
      replace: false,
      state: { name, id }
    })
  }
  return (
    <div className="courseCatalog">
      <p className="reminder">
        <span>学习过程中</span>
        <span style={{color: '#ff0000'}}>请勿开启录屏软件</span>或
        <span style={{color: '#ff0000'}}>第三方下载软件</span>，否则您的帐号可能会受到限制。如果您的网络不佳，视频加载可能需要10-20秒，期间若出现
        <span style={{color: '#ff0000'}}>转圈、黑屏、有声音没画面</span>
        等情况，请耐心等待。如果长时间无法加载，请<span style={{color: '#ff0000'}}>切换网络重新登陆</span>。
        <span>{props.deviceContent}</span>
      </p>
      <ul className="courseCatalogCard">
        {
          courseCatalogList.map(({name, id, coverArt}) => {
            return <li key={id} onClick={() => dumpDetail({name, id})}>{coverArt}</li>
          })
        }
      </ul>
    </div>
  )
}

export default connect((state) => {
  return {
    waterMarkContent: state.user.waterMarkContent,
    deviceContent: state.user.deviceContent,
  }
})(courseCatalog)
