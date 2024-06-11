import React from 'react'
import { NavBar, Image, WaterMark } from 'antd-mobile'
import { useNavigate, useRouteProps, Outlet, connect } from 'umi';
import { SetOutline } from 'antd-mobile-icons'
import "./index.less"

const Layout = (props) => {
  const routeProps = useRouteProps()
  const { name } = routeProps;
  console.log(name)

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
        <Image className="bgImage" src='./image/img_background.png'/>
        <Outlet />
        { (name && name !== "Selamat datang 欢迎") ?
          <WaterMark
            content={props.waterMarkContent}
            gapX={12}
            gapY={24}
            fullPage={false}
          /> :
          <></>
        }
      </div>
    </div>
  );
}

export default connect((state) => {
  return {
    waterMarkContent: state.user.waterMarkContent,
  }
})(Layout)
