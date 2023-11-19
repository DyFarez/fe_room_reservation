import React from 'react'
import { Menu } from 'antd'
import { UserOutlined  } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';


export const HeaderRoom = (props) => {
  const { signOut } = props
  const history = useHistory()
  const userDetail = useSelector( state => state.userReducer)
    const itemsLogin = [
      {
        label: userDetail.username,
        icon: <UserOutlined />,
        children: [
          {
            label: 'Sign Out',
            key: 'SignOut'
          },
        ],
      },
    ];

    const item = [
      {
        label: 'Sign In',
        icon: <UserOutlined />,
        key: 'SignIn'
      }
    ]

    const menuOnClick = (data) => {
        if(data.key === 'SignOut'){
          signOut();
        }
        else if(data.key === 'SignIn'){
          history.push('/')
      }
    }
    return (   
      <Menu
        theme="dark"
        mode="horizontal"
        items={userDetail.username ? itemsLogin : item}
        label={'test'}
        onClick={menuOnClick}
      />     
    )
}
