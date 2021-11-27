import {combineReducers} from 'redux';
import UserReducer from './UserReducer';
import CarReducer from './CarReducer';
import SearchReducer from './SearchReducer.js';
import ListColorReducer from './ListColorReducer';
import CartReducer from './CartReducer';
import CategoryReducer from './CategoryReducer';
import BookingReducer from './BookingReducer';
import StoreInfoReducer from './StoreInfoReducer';
import persistReducer from 'redux-persist/es/persistReducer';
import LanguageReducer from './ChangeLanguageReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';

const rootPersistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['LanguageReducer', 'UserReducer'],
};

const rootReducer = combineReducers({
  UserReducer,
  LanguageReducer,
  CarReducer,
  CartReducer,
  SearchReducer,
  CategoryReducer,
  BookingReducer,
  ListColorReducer,
  StoreInfoReducer,
});

export default persistReducer(rootPersistConfig, rootReducer);
