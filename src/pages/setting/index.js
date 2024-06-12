import React, { useLayoutEffect, useState }  from 'react';
import { useNavigate, connect } from 'umi';
import { List, Switch } from 'antd-mobile';
import { UnorderedListOutline } from 'antd-mobile-icons'
import "./index.less"

export default () => {
  let navigate = useNavigate();
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
        <List.Item description='功能开发中，尽请期待。' onClick={() => {}}>
          修改密码
        </List.Item>
        <List.Item onClick={() => {
          navigate("/aboutUs", { replace: true })
        }}>
          关于我们
        </List.Item>
      </List>
    </div>
  )
}
