import React, { useEffect, useState } from 'react'
import { Rooms } from './component/Rooms'
import { Layout, Empty, Alert, Spin, Button, Modal, Flex, Breadcrumb  } from 'antd'
import { ExclamationCircleFilled, HomeOutlined } from '@ant-design/icons';
import axios from 'axios'
import { ModalRoomRegistration } from './component/ModalRoomRegistration'
import { AddClassRoom } from './component/AddClassRoom'
import { useDispatch, useSelector } from 'react-redux';
import { setListData } from '../../redux/actions/listingAction';
import { setRegisModal } from '../../redux/actions/modalAction';
import { setErrorMain, setErrorModal } from '../../redux/actions/errorAction';
import pathConfig from '../../config/PathConfig';
import { setDetailRoom } from '../../redux/actions/detailAction';
import { HeaderRoom } from '../../component/HeaderRoom';
import { useHistory } from 'react-router-dom';
import { setUserDetail } from '../../redux/actions/userAction';
import { deleteSelectedRoom, detailRoomInfo, preloadRoomList } from '../../services/roomServices';
import { preloadUserData } from '../../services/userServices';

const { confirm } = Modal;

export const Room = () => {
  const [loading, setLoading] = useState(false)
  const history = useHistory();
  const [actionType, setActionType] = useState('')
  const listingData =  useSelector( state => state.listingReducer)
  const detailRoom =  useSelector( state => state.detailReducer)
  const errorNotification =  useSelector( state => state.errorNotificationReducer)
  const openModal =  useSelector( state => state.openModalReducer)
  const dispatch = useDispatch();
 
  const preloadData = async () => {
    setLoading(true)
    await preloadRoomList()
    .then((res) => {
      dispatch(setListData(res.data.data))
      dispatch(setErrorMain(false))
    }).catch((err) => {
      dispatch(setErrorMain(true))
    }).finally(() => {
      setLoading(false)
    })
  }

  const preloadUser = async () => {
    setLoading(true)
    await preloadUserData()
    .then((res) => {
      dispatch(setUserDetail(res.data.data))
      dispatch(setErrorMain(false))
    }).catch((err) => {
      dispatch(setErrorMain(true))
    }).finally(() => {
      setLoading(false)
    })
  }

  useEffect(() => {
    preloadData()
    preloadUser()
  },[])

  const createRoom = () => {
    setActionType('CREATE')
    dispatch(setRegisModal(true))
  }
  const closeModalAfter = (res) => {
    dispatch(setErrorModal(false))
    dispatch(setRegisModal(false))
    dispatch(setListData(res.data.data))
  }

  const editRoom = async (id) => {
    await detailRoomInfo(id)
    .then((res) => {
      let response = res.data.data
      const details = JSON.parse(response.details)
      const detailedRoom = {...response, ...details}
      dispatch(setDetailRoom(detailedRoom))
    })
    .catch((err) => {

    })
    setActionType('UPDATE')
    dispatch(setRegisModal(true))
  }

  const deleteRoom = async (id) => {
    setLoading(true)
    await deleteSelectedRoom(id)
    .then((res) => {
      dispatch(setListData(res.data.data))
    })
    .catch((err) => {

    }).finally(() => {
      setLoading(false)
    })
  }

  const showDeleteConfirm = (id) => {
    confirm({
      title: 'Are you sure delete this room?',
      icon: <ExclamationCircleFilled />,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      centered: 'Yes',
      onOk() {
        deleteRoom(id);
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };

  const signOut = async () => {
    await axios.post(pathConfig.UserApi.logout)
    .then(() => {
      history.push('/')
    })
  }

  const boxStyle = {
    width: '100%',
    height: '100%',
    background: '#f5f5f5'
  }
  
  return (
    <Spin tip="Loading..." spinning={loading}>
      <Layout 
        style={{ height: '100vh'}}
      >
        <HeaderRoom signOut={signOut}/>
        <Layout
          style={{ padding: 30 }}
        >
          <Breadcrumb
            items={[
              {
                title: (
                  <>
                    <HomeOutlined  />
                    <span>Home</span>
                  </>
                ),
              },
              {
                title: 'Room List',
              },
            ]}
          />
          {errorNotification.main &&  
              <Alert
                message="Error"
                description="Internal Server Error"
                type="error"
                showIcon
              />
          }
        
          {listingData.length !== 0 ? (
            <Flex justify='space-evenly' align='center' wrap='wrap' style={boxStyle}>
              {listingData.map((data, index) => {
                return(
                  <Rooms key={index} loading={loading} data={data} editRoom={editRoom} showDeleteConfirm={showDeleteConfirm}/>
                )
              })}
              <AddClassRoom createRoom={createRoom}/>
            </Flex>
          ):(
            <Layout
              style={{
                padding: 30,
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
              <Button type="primary" size={'default'} onClick={createRoom} disabled={errorNotification.main}>
                Add Room
              </Button>
              {errorNotification.main && 
                <Button 
                  type="text" 
                  danger
                  style={{
                    marginTop:10
                  }}
                  onClick={preloadData}> 
                  Refresh
                </Button>
              }
            </Layout>
          )}
          {openModal.modalRegister &&
          <ModalRoomRegistration 
            openModal={openModal.modalRegister} 
            actionType={actionType} 
            closeModalAfter={closeModalAfter} 
            detailRoom={detailRoom}
            setLoading={setLoading}
          />}
          </Layout>
      </Layout>
    </Spin>
  )
}
