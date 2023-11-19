import React, { useState } from 'react'
import { Button, Form, Input, Flex, Image, Typography, Alert, Spin} from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Formstate } from '../utils/Constant'
import { useDispatch, useSelector } from 'react-redux';
import { setFormState } from '../redux/actions/formstateAction';
import axios from 'axios'
import image from '../../Illustration2.png'
import pathConfig from '../config/PathConfig';
import { useHistory } from "react-router-dom";
import { setAlertRegister } from '../redux/actions/errorAction';
import { setUserDetail } from '../redux/actions/userAction';
import { loginUser } from '../services/userServices';

const {Title } = Typography

export const LoginPage = (props) => {
  const [isLoading, setLoading] = useState(false)
  const dispatch = useDispatch();
  const alertData = useSelector( state => state.errorNotificationReducer)
  const history = useHistory()

  const verifyLogin = async (req) => {
    setLoading(true)
    // await axios.post(pathConfig.UserApi.login, req
    await loginUser(req)
    .then((res) => {
      dispatch(setUserDetail(res.data.data.username))
      history.push('/room')
    }).catch((err) => {
      dispatch(setAlertRegister(err.response.data))
      console.log(err)
    }).finally(()=> {
      setLoading(false)
    })
  }

  const boxStyle = {
    width:  "100%",
    height: '100vh',
    alignItem: 'center',
    background: '#f5f5f5'
  };

  const inputStyle = {
    width: 500
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
          Sign In
        </Title>
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={verifyLogin}
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: 'Please input your Username!' }]}
        >
          <Input size="large" style={inputStyle} prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please input your Password!' }]}
        >
          <Input
            size="large"
            style={inputStyle}
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button" style={{ marginRight: 10}}>
            Log in
          </Button>
          Or <Button type='link' onClick={() => {dispatch(setFormState(Formstate.Register))}}> register now! </Button>
        </Form.Item>
      </Form>
      </Flex>
    </Flex>
  </Spin>
  )
}
