const listInitialState = []

const listingReducer =(state = listInitialState, action)=>{
    switch(action.type){
        case 'SET_LIST': {
            return [...action.payload]
        }
        default: {
            return state
        }
    }
}

export default listingReducer