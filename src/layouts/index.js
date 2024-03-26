import React from 'react'
import { NavBar, WaterMark } from 'antd-mobile'
import { useNavigate, useRouteProps, Outlet, connect } from 'umi';
import { SetOutline } from 'antd-mobile-icons'

const Layout = (props) => {
  const routeProps = useRouteProps()
  const { name } = routeProps;

  const navigate = useNavigate();
  const back = () => {
    navigate(-1)
  }

  const right = (
    <div style={{ fontSize: 24 }} onClick={() => navigate("/setting", { replace: true })}>
      <SetOutline />
    </div>
  )

  return (
    <>
      { name &&
        <NavBar
          back='返回'
          right={right}
          onBack={back}>
          { name }
        </NavBar>
      }
      <Outlet />
      <WaterMark content={props.waterMarkContent} />
    </>
  );
}

export default connect((state) => {
  return {
    waterMarkContent: state.user.waterMarkContent
  }
})(Layout)
