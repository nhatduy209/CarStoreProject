import {REHYDRATE} from 'redux-persist';
import {NAME_ACTIONS} from '../action/change-language/ActionName';

const initialState = {
  language: 'vi',
};

const LanguageReducer = (state = initialState, action) => {
  switch (action.type) {
    case REHYDRATE:
      return {
        ...state,
        language: action.payload?.LanguageReducer.language,
      };
    case NAME_ACTIONS.CHANGE_LANGUAGE.CHANGE_LANGUAGE: {
      state = {
        language: action.data,
      };
      break;
    }
    default:
      break;
  }
  return state;
};

export default LanguageReducer;
