
import { combineReducers } from 'redux';


import UserReducer from './UserReducer';
import CarReducer from './CarReducer'
import SearchReducer from './SearchReducer.js'
const rootReducer = combineReducers({
  UserReducer,
  CarReducer,
  SearchReducer,
});

export default rootReducer;