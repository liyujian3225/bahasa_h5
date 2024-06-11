import React from 'react'
import { Image, Card, Space } from 'antd-mobile'
import "./index.less"

const CardTitle = function({title}) {
  return (
    <div className="CardTitle">

    </div>
  )
}

export default () => {
  return (
    <div className="aboutMe" >
      <Space
        block
        direction='vertical'
        align="center"
        style={{ '--gap': '24px'}}>
        <Image width={125} height={25} src='./image/AboutMe/logo.png' />
        <Image width={300} height={45} src='./image/AboutMe/word.png' />
        <Image width={252} height={179} src='./image/AboutMe/icon1.png' />
      </Space>
      <Card
        headerClassName="cardHeader"
        title={<CardTitle title="资质介绍" />}>
        <div className="certification">
          <p>
            东东外语自2018年起进入中国大陆市场，致力于提供印度尼西亚语言培训。目前，我们在多个平台拥有近10万粉丝，井吸引了来自全国各地的学员。我们采用了创新的“视频课程＋一对一课后答疑〞模式，有效满足了有意学习印尼语但难以抽出时间参加传统课堂的学员的需求，为了增强学习体验，我们不断开发新的应用程序，使学员能更好地投入到学习中。
          </p>
          <div>
            <span>公司地址：</span>
            <span>No.01 G6 L4, Rd Ls, CM, 52300</span>
          </div>
          <div>
            <span>中国大陆地区实体税号：</span>
            <span>91441900MABLHM2T92</span>
          </div>
          <div>
            <span>东东印尼语学习系统备案号：</span>
            <span>粤ICP备2024177696号</span>
          </div>
        </div>
      </Card>
    </div>
  )
}
