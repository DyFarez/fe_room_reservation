export const setDetailRoom= (data) =>{
    return {
        type: 'SET_DETAIL',
        payload : data
    }
}

export const getDetailRoom= (data) =>{
    return {
        type: 'GET_DETAIL',
        payload : data
    }
}

export const resetDetailRoom = () =>{
    return {
        type: 'RESET_DETAIL',
    }
}