let RoomDetailModel = {
    room_id:'',
    room_desc:'',
    room_price:'',
    nickname: '',
    phone_number: '',
    gender: '',
    prefix: '62'
}

export const getRoomModel = () => {
    return RoomDetailModel;
}

export const updateRoomModel = (value) => {
    const valueDetail = JSON.parse(value?.details)
    const UpdatedRoomDetailModel = {
        ...RoomDetailModel,
        room_id: value.room_id,
        room_desc: value.room_desc,
        room_price: value.room_price,
        nickname: valueDetail?.nickname || null,
        phone_number: valueDetail?.phone_number || null,
        gender: valueDetail?.gender || null
    }
    return UpdatedRoomDetailModel;
}

export const resetRoomModel = (value) => {
    return RoomDetailModel
}

