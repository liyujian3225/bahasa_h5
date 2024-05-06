import React, { useLayoutEffect, useState }  from 'react'
import { List, Switch } from 'antd-mobile'
import "./index.less"

export default () => {
  //初始化暗黑模式
  // const defaultEnableDarkMode = localStorage.getItem("enableDarkMode") || false;
  // const [enableDarkMode, setEnableDarkMode] = useState(defaultEnableDarkMode);

  // useLayoutEffect(() => {
  //   localStorage.setItem("enableDarkMode", enableDarkMode);
  //   document.documentElement.setAttribute(
  //     'data-prefers-color-scheme',
  //     enableDarkMode ? 'dark' : 'light'
  //   )
  // }, [enableDarkMode])

  //初始化老人模式
  const defaultOlderMode = localStorage.getItem("olderMode") || false;
  const [olderMode, setOlderMode] = useState(defaultOlderMode);

  useLayoutEffect(() => {
    localStorage.setItem("olderMode", olderMode);
  }, [olderMode]);

  return (
    <div className="setting">
      <List header='偏好设置'>
        <List.Item
          extra={
            <Switch
              checked={olderMode}
              onChange={v => {
                setOlderMode(v)
              }}
            />
          }
          description='大字号模式，页面更简洁、字体更清晰。'>
          老年版
        </List.Item>
        {/*<List.Item*/}
        {/*  extra={*/}
        {/*    <Switch*/}
        {/*      checked={enableDarkMode}*/}
        {/*      onChange={v => {*/}
        {/*        setEnableDarkMode(v)*/}
        {/*      }}*/}
        {/*    />*/}
        {/*  }*/}
        {/*  description='让您在夜间也能更好的学习。'>*/}
        {/*  暗黑模式*/}
        {/*</List.Item>*/}
      </List>
    </div>
  )
}
