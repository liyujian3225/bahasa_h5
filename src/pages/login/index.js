import React, { useState } from 'react'
import { useNavigate, connect } from 'umi';
import { Modal, Form, Input, Button, AutoCenter, Checkbox, Space } from 'antd-mobile'
import { request } from '@/services';
import './index.less';

const Login = (props) => {
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState([])
  //登陆成功提示模态框
  let navigate = useNavigate();
  const handleInputSuccess = () => {
    navigate("/courseCatalog", { replace: true });
  }
  //登陆失败提示模态框（账户密码错误）
  const handleInputError = () => {
    Modal.show({
      content: (
        <>
          <AutoCenter style={{ fontSize: '24px', color: '#000' }}>用户名或密码错误</AutoCenter>
          <AutoCenter style={{ fontSize: '14px', color: '#ff0000' }}>如您遗忘用户名或密码，请联系老师</AutoCenter>
        </>
      ),
      closeOnAction: true,
      actions: [
        {
          key: 'online',
          text: '再试一次',
          primary: true,
        },
        {
          key: 'download',
          text: '我没买课',
          onClick: () => {
            navigate("/course", { replace: false })
          }
        },
      ],
    })
  }
  //登陆失败提示模态框（设备过限）
  const handleDeviceError = () => {
    Modal.show({
      content: (
        <>
          <AutoCenter style={{ fontSize: '24px', color: '#000' }}>登陆设备已达到上限</AutoCenter>
          <AutoCenter style={{ fontSize: '14px', color: '#ff0000' }}>请在常用设备登陆或联系老师</AutoCenter>
        </>
      ),
      closeOnAction: true,
      actions: [
        {
          key: 'online',
          text: '再试一次',
          primary: true,
        },
      ],
    })
  }
  //查询设备数量
  const searchDeviceNum = ((memberld) => {
    request.get('/business/web/member/device-count/' + memberld).then(res => {
      const { content } = res;
      props.dispatch({
        type: "user/changeDeviceContent",
        payload: content
      })
    })
  })
  //表单信息
  const [form] = Form.useForm()
  const onFinish = () => {
    setLoading(true)
    const values = form.getFieldsValue();
    request.post('/business/web/member/signIn', {
      data: values
    }).then(res => {
        const { success, content, message } = res;
        setLoading(false)
        if(success) {
          const { name, token, id } = content;
          searchDeviceNum(id)
          props.dispatch({
            type: "user/changeToken",
            payload: token
          })
          props.dispatch({
            type: "user/changeWaterMarkContent",
            payload: name
          })
          handleInputSuccess();
        }else {
          if(message === "手机号不存在或密码错误") handleInputError();
          if(message === "登陆设备以达到上限，请联系管理员清除不常用设备") handleDeviceError();
        }
      })
  }
  return (
    <div className="login">
      <Form
        className='myForm'
        layout='horizontal'
        mode='card'
        form={form}
        initialValues={{
          mobile: '',
          password: '',
        }}
        onFinish={onFinish}
        footer={
          <Button
            loading={loading}
            loadingText='登陆中'
            color='primary'
            type='submit'
            block
            disabled={value.length < 4}
            size='mini'>
            <p>Masuk</p>
            <p>登陆系统</p>
          </Button>
        }
      >
        <Form.Header>
          <AutoCenter className='title'>Autentikasi</AutoCenter>
          <AutoCenter className='subTitle'>⽤户身份验证</AutoCenter>
        </Form.Header>
        <Form.Item
          name='mobile'
          label='用户名 / ID：'
          rules={[{ required: true, message: '用户名不能为空' }]}>
          <Input placeholder='请输入用户名' />
        </Form.Item>
        <Form.Item
          name='password'
          label='密码 / Kadi：'
          rules={[{ required: true, message: '密码不能为空' }]}>
          <Input placeholder='请输入密码' />
        </Form.Item>
      </Form>
      <div className='attention'>
        <AutoCenter style={{ marginBottom: 10 }}>
          请您注意，您购买的帐号<span style={{ color: '#ff0000' }}>仅供您个人使用</span>。若您将帐号共享至他人使用，您的帐号会在无警告的前提下永久封禁。课程已在两地进行版权登记，
          <span style={{ color: '#ff0000' }}>任何盗版课程的行为将会受到检控</span>。
        </AutoCenter>
        <Checkbox.Group
          className="smallCheckboxGroup"
          value={value}
          onChange={val => {
            setValue(val);
          }}
        >
          <Space direction='vertical'>
            <Checkbox className="smallCheckbox" value='one'>我是本帐号持有人</Checkbox>
            <Checkbox className="smallCheckbox" value='two'>我同意《课程保密协议》</Checkbox>
            <Checkbox className="smallCheckbox" value='three'>我不会将此帐号与他人共享</Checkbox>
            <Checkbox className="smallCheckbox" value='four'>我愿意承担违反保密协议的法律责任</Checkbox>
          </Space>
        </Checkbox.Group>
      </div>
    </div>
  )
}

export default connect((state) => ({}))(Login)
