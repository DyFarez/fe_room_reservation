const initialState = {
    main: false,
    modal: false,
    data:''
}

const errorNotificationReducer =(state = initialState, action)=>{
    switch(action.type){
        case 'SET_ERROR_MAIN': {
            return {...state, main: action.payload}
        }
        case 'SET_ERROR_MODAL': {
            return {...state, modal: action.payload}
        }
        case 'SET_ALERT_REGISTER': {
            return {...state, data: action.payload}
        }
        default: {
            return state
        }
    }
}

export default errorNotificationReducer