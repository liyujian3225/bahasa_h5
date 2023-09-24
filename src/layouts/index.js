import React, { useState } from 'react'
import { NavBar, WaterMark } from 'antd-mobile'
import { useNavigate, useRouteProps, Outlet, connect } from 'umi';

const Layout = (props) => {
  const navigate = useNavigate();
  const routeProps = useRouteProps()
  const { name } = routeProps;

  return (
    <div style={{ width: '100%', height: '100%', padding: '12px', boxSizing: 'border-box' }}>
      { name && <NavBar style={{ padding: 0 }} onBack={() => navigate(-1)}>{ name }</NavBar> }
      <Outlet />
      <WaterMark content={props.waterMarkContent} />
    </div>
  );
}

export default connect((state) => {
  return {
    waterMarkContent: state.user.waterMarkContent
  }
})(Layout)
