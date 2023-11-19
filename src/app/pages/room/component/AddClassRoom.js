import React from 'react'
import { Empty, Card } from 'antd'

export const AddClassRoom = (props) => {
  const {createRoom} = props
  return (
    <Card 
      style={{ 
        width: 300, 
        height:230, 
        margin:16,
        paddingTop:16,
        justifyContent:'center',
        alignContent:'center'
      }}
      hoverable
      onClick={createRoom}
    >
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={'Add Room'} />
      
    </Card>
  )
}
