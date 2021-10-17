import {combineReducers} from 'redux';
import UserReducer from './UserReducer';
import CarReducer from './CarReducer';
import SearchReducer from './SearchReducer.js';
import ModalReducer from './ModalReducer';
import CartReducer from './CartReducer';
import BookingReducer from './BookingReducer';
import persistReducer from 'redux-persist/es/persistReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
const authPersistConfig = {
  key: 'auth',
  storage: AsyncStorage,
};

const rootReducer = combineReducers({
  UserReducer: persistReducer(authPersistConfig, UserReducer),
  CarReducer,
  CartReducer,
  SearchReducer,
  ModalReducer,
  BookingReducer,
});

export default rootReducer;
