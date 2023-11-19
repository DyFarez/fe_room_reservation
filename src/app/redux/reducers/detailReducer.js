let initialState = {
    room_desc: '',
    room_price: '',
    nickname: '',
    phone_number: '',
    prefix:'+62',
    gender: ''
}

const detailReducer =(state = initialState, action)=>{
    switch(action.type){
        case 'SET_DETAIL': {
            return {...state, ...action.payload}
        }
        case 'GET_DETAIL': {
            return {...state, ...action.payload}
        }
        case 'RESET_DETAIL': 
            return initialState

        default:
            return state
    }
}

export default detailReducer