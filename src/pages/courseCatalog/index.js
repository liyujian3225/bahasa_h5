import React, { useState, useEffect } from 'react';
import { useNavigate, connect } from 'umi';
import { Image, Modal, AutoCenter, Empty, Skeleton } from 'antd-mobile'
import { request } from '@/services';
import './index.less';

const coverArtList = [
  {
    title: "东东基础课 Dasar",
    iconArt: './image/img_base.png',
    coverArt: <Image src='./image/baseCourse.png' fit='fill' />
  },
  {
    title: "东东进阶课 Lanjutan",
    iconArt: './image/img_advanced.png',
    coverArt: <Image src='./image/advancedCourse.png' fit='fill' />
  },
  {
    title: "东东发音课 Pgucapan",
    iconArt: './image/img_voice.png',
    coverArt: <Image src='./image/voiceCourse.png' fit='fill' />
  }
]

const courseCatalog = (props) => {

  //获取课程
  const [chapters, setChapters] = useState([]);
  const [isPass_, setIsPass_] = useState(0);
  const [loading, setLoading] = useState(false)
  const queryChapters = () => {
    setLoading(true)
    request.get('/business/web/course/find/TYAIILon')
      .then(res => {
        const { success, content } = res;
        setLoading(false)
        if(success) {
          let { chapters } = content;
          chapters = chapters.map((item, index) => {
            const {id, name, isPass, doQuestion} = item;
            return {
              id, name, isPass, doQuestion,
              title: coverArtList[index]['title'],
              iconArt: coverArtList[index]['iconArt'],
              coverArt: coverArtList[index]['coverArt'],
            }
          })
          setIsPass_(chapters[0].isPass);
          setChapters(chapters);
        }
      })
  }
  useEffect(() => {
    queryChapters()
  }, [])

  //查看章节
  const navigate = useNavigate();
  const dumpDetail = (item, index) => {
    const {id, name, isPass, title, iconArt} = item;
    if(index === 1) {
      //进阶课要提示是否解锁
      if(isPass_ === 0) {
        Modal.show({
          content: <AutoCenter>请先完成基础课的学习。</AutoCenter>,
          closeOnAction: true,
          actions: [
            {
              key: 'online',
              text: '我知道了',
              primary: true,
            },
          ],
        })
      }else {
        navigate("/courseList", {
          replace: false,
          state: { id, name: title, iconArt }
        })
      }
    }else {
      navigate("/courseList", {
        replace: false,
        state: { id, name: title, iconArt }
      })
    }
  }

  return (
    <div className="chapterCatalog">
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
          <Image src='./image/img_intro.png' />
        </div>
      </div>
      {
        loading ? (
          <>
            <Skeleton.Title animated />
            <Skeleton.Paragraph lineCount={5} animated />
            <Skeleton.Title animated />
            <Skeleton.Paragraph lineCount={5} animated />
            <Skeleton.Title animated />
            <Skeleton.Paragraph lineCount={5} animated />
          </>
        ) : (
          chapters.length ? (
            <ul className="courseCatalogCard">
              {
                chapters.map((item, index) => {
                  return <li key={item.id} onClick={() => dumpDetail(item ,index)}>{item.coverArt}</li>
                })
              }
            </ul>
          ) : <Empty description='暂无数据' style={{ marginTop: '50%' }} />
        )
      }
    </div>
  )
}

export default courseCatalog
