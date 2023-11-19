import { Formstate } from "../../utils/Constant"

const listInitialState = Formstate.Login

const formstateReducer =(state = listInitialState, action)=>{
    switch(action.type){
        case 'SET_FORMSTATE': {
            return action.payload
        }
        default: {
            return state
        }
    }
}

export default formstateReducer