import React, { useState } from 'react'
import { Button, Form, Input, Flex, Image, Typography, Alert, Spin} from 'antd';
import { Formstate } from '../utils/Constant';
import { useDispatch, useSelector } from 'react-redux';
import { setFormState } from '../redux/actions/formstateAction';
import axios from 'axios'
import image from '../../Illustration2.png'
import pathConfig from '../config/PathConfig';
import { setAlertRegister } from '../redux/actions/errorAction';
import { registerUser } from '../services/userServices';



const { Title } = Typography

export const RegisterPage = (props) => {
  const [isLoading, setLoading] = useState(false)
  const alertData = useSelector( state => state.errorNotificationReducer)
  const dispatch = useDispatch();

  const boxStyle = {
    width:  "100%",
    height: '100vh',
    alignItem: 'center',
    background: '#f5f5f5'
  };
  const inputStyle = {
    width: 500
  }  

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    },
  };

  const register = async (req) => {
    setLoading(true)
    // await axios.post(pathConfig.UserApi.register, req, {
    //     headers: {
    //       'Content-Type': 'application/json'
    //     }
    await registerUser(req)
    .then((res) => {
      dispatch(setAlertRegister(res.data))
      dispatch(setFormState(Formstate.Login))
    }).catch((err) => {
      dispatch(setAlertRegister(err.response.data))
    }).finally(()=> {
      setLoading(false)
    })
  }
  return (
    <Spin tip="Loading..." spinning={isLoading}>
      <Flex style={boxStyle} justify={'center'} align={'center'} wrap="wrap" gap={50}>
        <Image
          width={500}
          src={image}
        />
        <Flex vertical={true}>
          {alertData.data &&
            <Alert 
              message={alertData.data.message}  
              type={alertData.data.type} 
              showIcon 
            />
          }
          <Title level={1} style={{ marginBottom: 20 }}>
            Register Form
          </Title>
          <Form
            {...formItemLayout}
            name="register"
            onFinish={register}
            initialValues={""}
            style={{ maxWidth: 600 }}
            scrollToFirstError
          >
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: 'Please input your Username',
                },
              ]}
            >
              <Input placeholder='Username' style={inputStyle}/>
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Please input your password!',
                },
              ]}
              hasFeedback
            >
              <Input.Password placeholder='Password' style={inputStyle}/>
            </Form.Item>

            <Form.Item
              name="confirm"
              dependencies={['password']}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: 'Please confirm your password!',
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('The new password that you entered do not match!'));
                  },
                }),
              ]}
            >
              <Input.Password placeholder='Confirm Password' style={inputStyle}/>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" style={{marginBottom: 10}}>
                Register
              </Button>
              <br />
              Already Have Account? <Button type='link' onClick={() => {dispatch(setFormState(Formstate.Login))}}>Login</Button>
            </Form.Item>
          </Form>
        </Flex>
      </Flex>
    </Spin>
  )
}
