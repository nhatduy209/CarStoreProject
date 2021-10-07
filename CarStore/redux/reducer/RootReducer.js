import {combineReducers} from 'redux';

import UserReducer from './UserReducer';
import CarReducer from './CarReducer';
import SearchReducer from './SearchReducer.js';
import ModalReducer from './ModalReducer';
import CartReducer from './CartReducer';
const rootReducer = combineReducers({
  UserReducer,
  CarReducer,
  CartReducer,
  SearchReducer,
  ModalReducer,
  CartReducer,
});

export default rootReducer;
