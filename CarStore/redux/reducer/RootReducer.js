
import { combineReducers } from 'redux';


import UserReducer from './UserReducer';
import CarReducer from './CarReducer';
import CartReducer from './CartReducer'
import SearchReducer from './SearchReducer.js'
const rootReducer = combineReducers({
  UserReducer,
  CarReducer,
  CartReducer,
  SearchReducer,
});

export default rootReducer;