// export const opnModal = () => {
//     return {
//         type: 'OPEN'
//     }
// }
// 
// export const clsModal = () => {
//     return {
//         type: 'CLOSE'
//     }
// }

export const setRegisModal = (data) => {
    return {
        type: 'SET_REGIS_MODAL',
        payload: data
    }
}

export const setDetailModal = (data) => {
    return {
        type: 'SET_DETAIL_MODAL',
        payload: data
    }
}