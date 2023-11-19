import { Card, Avatar, Skeleton } from 'antd'
import { EditOutlined, DeleteOutlined, InfoCircleOutlined} from '@ant-design/icons';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setDetailModal } from '../../../redux/actions/modalAction';

export const Rooms = (props) => {
  const dispatch = useDispatch()
  const {loading, data, editRoom, showDeleteConfirm} = props
  const { Meta } = Card;
  const dataDetail = JSON.parse(data.details)
  const userDetail = useSelector( state => state.userReducer)

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'IDR',
  });

  const cardAction = () => {
    if(userDetail.username) {
      return ([
        <EditOutlined key='edit' onClick={() => editRoom(data.room_id)} />,
        <DeleteOutlined key='delete' onClick={() => showDeleteConfirm(data.room_id)}/>
      ])
    }else{
      return ([<InfoCircleOutlined label='Info' key='detail' onClick={() => editRoom(data.room_id)}/>])
    }
  }
  return (
    <>
      <Card
        title={`Room ${data.room_desc}`}
        style={{
          width: 300,
          margin: 16
        }}
        loading={loading}
        hoverable
        bordered={true}
        onClick={()=>dispatch(setDetailModal(true))}
      >
        <Card
          style={{ width: 250  }}
          actions={cardAction()}
        >
          <Skeleton loading={loading} avatar active>
            <Meta
              avatar={<Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=2" />}
              title={dataDetail?.nickname || "-"}
              description={`${formatter.format(data?.room_price)}` || "-"}
            />
          </Skeleton>
        </Card>
      </Card>
    </>
  )
}
