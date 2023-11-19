import { combineReducers } from 'redux';

import listingReducer from './listingReducers';
import openModalReducer from './openModalReducer';
import errorNotificationReducer from './errorNotificationReducer';
import detailReducer from './detailReducer';
import formstateReducer from './formstateReducer';
import userReducer from './userReducer';

export default combineReducers({listingReducer, openModalReducer, errorNotificationReducer, detailReducer, formstateReducer, userReducer});