
import { combineReducers } from 'redux';


import UserReducer from './UserReducer';
import CarReducer from './CarReducer'
import SearchReducer from './SearchReducer.js'
import ModalReducer from './ModalReducer'
const rootReducer = combineReducers({
  UserReducer,
  CarReducer,
  SearchReducer,
  ModalReducer,
});

export default rootReducer;