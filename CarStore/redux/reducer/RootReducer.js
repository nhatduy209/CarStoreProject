
    import { combineReducers } from 'redux';


    import UserReducer from './UserReducer';
    import CarReducer from './CarReducer'

    const rootReducer = combineReducers({
      UserReducer,
      CarReducer
    });

    export default rootReducer;