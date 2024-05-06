import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation, connect } from 'umi';
import { Radio, Button, Empty, Form, Space, Modal, AutoCenter } from 'antd-mobile'
import { request } from "@/services";
import  "./index.less"

const doExercises = (props) => {
  const stateParams = useLocation();
  const { id, title } = stateParams.state;
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(false);
  const [initialValues, setInitialValues] = useState({});

  const [form] = Form.useForm();
  const submitExercises = () => {
    setLoading(true)
    const values = form.getFieldsValue()
    request.post('/business/web/section/exam/submit', {
      data: {
        sectionId: id,
        answer: values
      }
    })
      .then(res => {
        const {success, content} = res;
        if(success) {
          setLoading(false)
          let txt = content ? "本次测验通过，是否继续观看下一课？" : "很遗憾，您未通过本次测试。为了保证每名同学的学习效果，您的作答需要全对才能解锁下一课。"
          Modal.show({
            content: <AutoCenter>{txt}</AutoCenter>,
            closeOnAction: true,
            actions: content ? [
              {
                key: 'online',
                text: '观看',
                primary: true,
                onClick: () => {

                }
              },
            ] : [
              {
                key: 'online',
                text: '重新出卷',
                primary: true,
                onClick: () => {
                  form.resetFields();
                  queryExercises();
                }
              },
              {
                key: 'download',
                text: '回到课程',
                onClick: () => {}
              },
            ],
          })
        }
      })
  }

  const queryExercises = () => {
    request.get('/business/web/section/exam/list?sectionId=' + id)
      .then(res => {
        const {success, content} = res;
        if(success) {
          setExercises(content);
          //设置表单默认值
          const initialValues_ = {}
          content.forEach(item => {
            const {id} = item;
            initialValues_[id] = ""
          })
          setInitialValues(initialValues_)
        }
      })
  }

  useEffect(() => {
    queryExercises()
  }, [])

  return (
    <div className="doExercises">
      <div className="formHeader">
        <span>{title.split("】")[1]}</span>
      </div>
      {
        !exercises.length ? <Empty description='暂无数据' style={{padding: '64px 0'}}/> :
          <Form
            form={form}
            mode='card'
            initialValues={initialValues}
            onFinish={submitExercises}
            footer={
              <Button
                block
                type='submit'
                loading={loading}
                loadingText='提交中'
                color='primary'
                size='large'>
                提交
              </Button>
            }
          >
            {
              exercises.map((item, index) => {
                const {id, content, questionOptions} = item;
                return (
                  <>
                    <Form.Header></Form.Header>
                    <Form.Item
                      className="formItem"
                      name={id}
                      key={id}
                      label={content}
                      rules={[{required: true, message: '请选择该题目'}]}>
                      <Radio.Group>
                        <Space direction='vertical'>
                          {
                            questionOptions.map(item_ => (
                              <Radio block value={item_.id}>
                                {item_.content}
                              </Radio>
                            ))
                          }
                        </Space>
                      </Radio.Group>
                    </Form.Item>
                  </>
                )
              })
            }
          </Form>
      }
    </div>
  )
}

export default connect((state) => ({}))(doExercises)
