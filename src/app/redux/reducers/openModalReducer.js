// const initialState = false;

const initialState = {
    modalRegister: false,
    modalDetail: false
}

const openModalReducer = (state = initialState, action) => {
    // switch(action.type){
    //     case 'OPEN':
    //         return true;
    //     case 'CLOSE':
    //         return false;
    //     default:
    //         return state;
    // }
    switch(action.type){
        case 'SET_REGIS_MODAL':
            return {...state, modalRegister: action.payload}
        case 'SET_DETAIL_MODAL':
            return {...state, modalDetail: action.payload}
        default:
            return state;
    }
}

export default openModalReducer;