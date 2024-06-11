import React, { useState } from 'react'
import { Space, Mask, SpinLoading, Divider, Image } from 'antd-mobile'
import { useNavigate } from 'umi';
import './index.less';

export default () => {
  let navigate = useNavigate();
  const [visible, setVisible] = useState(true)
  setTimeout(() => { setVisible(false) }, 500);

  const dumpLink = (type) => {
    const link = type === "youtube" ? "https://www.youtube.com/channel/UCNz0CuIKBXpizEmn8akC42w" : "https://v.douyin.com/iNNrghAv/ 8@5.com";
    window.open(link, "_blank")
  }

  const downLoadApp = (type) => {
    let url = "";
    if(type === "android") {
      url = 'https://taioassets.oss-cn-beijing.aliyuncs.com/Apks/app6.0.1.apk'
    }else {
      url = 'https://apps.apple.com/cn/app/bahasadong/id6502833636'
    }
    var user = navigator.userAgent;
    var isAndroid = user.indexOf("Android") > -1 || user.indexOf("Adr") > -1;
    var isiOS = !!user.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
    if(isAndroid) {
      window.open(url)
    }else if(isiOS) {
      window.location.href = url;
    }
  }

  return (
    <div className="home">
      <Mask opacity='thick' visible={visible}>
        <div className='overlayContent'>
          <Space direction='vertical'>
            <SpinLoading color='primary' />
            <span>加载中...</span>
          </Space>
        </div>
      </Mask>
      <Image
        className="logoCard"
        src='./image/login_home.png'
      />
      <Image src='./image/WechatIMG4809.jpg'/>
      <Image
        style={{marginBottom: 16, marginTop: 16}}
        src='./image/loginBtn.png'
        onClick={() => navigate("/login", { replace: false })}
      />
      <Image
        style={{marginBottom: 60}}
        src='./image/loginProtocol.png'
        onClick={() => window.open("https://taioassets.oss-cn-beijing.aliyuncs.com/Pdfs/%E4%B8%9C%E4%B8%9C%E5%8D%B0%E5%B0%BC%E8%AF%AD%E7%94%A8%E6%88%B7%E4%BD%BF%E7%94%A8%E6%9C%8D%E5%8A%A1%E5%8D%8F%E8%AE%AE.pdf", "_blank")}
      />
      <Divider>下载东东印尼语App</Divider>
      <Space className="downLoadBtn" style={{ '--gap': '8px' }} justify="center" block={true}>
        <Image
          className="androidDownload"
          src='./image/Android.png'
          onClick={() => downLoadApp('android')} />
        <Image
          className="iosDownload"
          src='./image/ios.png'
          onClick={() => downLoadApp('ios')} />
      </Space>
      <div
        className="bahasaindoLink"
        onClick={() => window.open("http://bahasaindo.cn", "_blank")}>
        <div className="icon">
          <Image src="./image/icon_card.png" alt=""/>
        </div>
        <span>单词卡</span>
      </div>
      <div className="bahasaindoFooter">
        <div className="friendLink">
          <span onClick={() => dumpLink('youtube')}>东东印尼语YouTube</span>
          <span onClick={() => dumpLink('tiktok')}>东东印尼语抖音</span>
        </div>
        <p>
          D 2019-2024 PT BahasaDona All rights reserved
        </p>
      </div>
    </div>
  )
}
