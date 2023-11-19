import { createStore } from "redux";
import rootReducer from "./reducers/rootReducer";

// export default createStore(combineReducers({listingReducer}));
export default createStore(rootReducer);



