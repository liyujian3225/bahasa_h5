import React, { useState } from 'react'
import { NavBar, WaterMark } from 'antd-mobile'
import { useNavigate, Outlet, useRouteProps } from 'umi';
import './index.less';

const generatesRandomNumber = () => {
  let res = ''
  for(let i = 0; i < 12; i++){
    res += Math.floor(Math.random()*10);
  }
  return res.slice(0, 3) + '.' + res.slice(3, 6) + '.' + res.slice(6, 9) + '.' + res.slice(9, 12);
}

export default function Layout() {

  const routeProps = useRouteProps()
  const navigate = useNavigate();
  const { name } = routeProps;


  return (
    <div className="layouts">
      <NavBar style={{ padding: 0 }} onBack={() => navigate(-1)}>{ name }</NavBar>
      <Outlet />
      <WaterMark content={generatesRandomNumber()} />
    </div>
  );
}
