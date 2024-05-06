import React from 'react'
import { NavBar, Image } from 'antd-mobile'
import { useNavigate, useRouteProps, Outlet } from 'umi';
import { SetOutline } from 'antd-mobile-icons'
import "./index.less"

const Layout = (props) => {
  const routeProps = useRouteProps()
  const { name } = routeProps;

  const right = (
    <div style={{ fontSize: 24 }} onClick={() => navigate("/setting", { replace: true })}>
      <SetOutline />
    </div>
  )

  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1)
  }

  return (
    <div className="layout" style={{paddingTop: name ? 45 : 0}}>
      { name ?
        <NavBar
          className="navBar"
          back='返回'
          right={right}
          onBack={goBack}>
          { name }
        </NavBar> :
        <></>
      }
      <div className="outletContent">
        <Image className="bgImage" src='./image_/img_background.png'/>
        <Outlet />
      </div>
    </div>
  );
}

export default Layout
